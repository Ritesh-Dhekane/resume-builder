import { promises as fs } from 'node:fs';
import path from 'node:path';

export const GALLERY_DIR = path.resolve(process.cwd(), 'gallery');
export const MANIFEST_PATH = path.join(GALLERY_DIR, 'manifest.json');

export async function buildManifest() {
  await fs.mkdir(GALLERY_DIR, { recursive: true });
  const entries = await fs.readdir(GALLERY_DIR, { withFileTypes: true });
  const pdfs = entries.filter((e) => e.isFile() && e.name.toLowerCase().endsWith('.pdf'));

  const manifest = await Promise.all(
    pdfs.map(async (entry) => {
      const stat = await fs.stat(path.join(GALLERY_DIR, entry.name));
      return {
        filename: entry.name,
        label: entry.name.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' '),
        sizeBytes: stat.size,
        modifiedAt: stat.mtime.toISOString(),
      };
    })
  );

  manifest.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
  return manifest;
}

export async function writeManifest() {
  const manifest = await buildManifest();
  await fs.writeFile(MANIFEST_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf-8');
  return manifest;
}
