import { promises as fs } from 'node:fs';
import path from 'node:path';

const HISTORY_PATH = path.resolve(process.cwd(), 'data/history.json');

async function readHistory() {
  try {
    const raw = await fs.readFile(HISTORY_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeHistory(list) {
  await fs.mkdir(path.dirname(HISTORY_PATH), { recursive: true });
  await fs.writeFile(HISTORY_PATH, `${JSON.stringify(list, null, 2)}\n`, 'utf-8');
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => (data += chunk));
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

// Dev-only: writes straight to data/history.json on disk. Never runs against
// the deployed static build — there is no server there.
export function devHistoryPlugin() {
  return {
    name: 'dev-history-middleware',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/history', async (req, res) => {
        if (req.method === 'GET') {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(await readHistory()));
          return;
        }
        if (req.method === 'POST') {
          try {
            const body = JSON.parse(await readBody(req));
            const list = await readHistory();
            const entry = { ...body, meta: { ...body.meta, savedAt: new Date().toISOString() } };
            list.push(entry);
            await writeHistory(list);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ ok: true, entry }));
          } catch (err) {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: String(err) }));
          }
          return;
        }
        res.statusCode = 405;
        res.end();
      });
    },
  };
}
