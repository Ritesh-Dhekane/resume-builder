import { writeManifest } from './galleryManifest.js';

const manifest = await writeManifest();
console.log(`Wrote ${manifest.length} entr${manifest.length === 1 ? 'y' : 'ies'} to gallery/manifest.json`);
