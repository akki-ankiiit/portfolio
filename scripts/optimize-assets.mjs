import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

// Preserve the source files and generate lightweight browser assets beside them.
const folders = ['public/assets/imagery', 'public/assets/work/art', 'public/assets/work/design'];
for (const folder of folders) {
  for (const file of await readdir(folder)) {
    if (!/\.(png|gif|jpg)$/i.test(file)) continue;
    const source = path.join(folder, file);
    const destination = source.replace(/\.(png|gif|jpg)$/i, '.webp');
    const output = file.endsWith('.gif') ? destination.replace('.webp', '-animated.webp') : destination;
    const width = file.startsWith('folder-') || file.startsWith('flower-') ? 180 : file.startsWith('artist-') ? 640 : file.endsWith('.gif') ? 800 : 1200;
    await sharp(source, { animated: file.endsWith('.gif'), limitInputPixels: false })
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 84, effort: 4 })
      .toFile(output);
    const before = (await stat(source)).size;
    const after = (await stat(output)).size;
    console.log(`${file}: ${(before / 1024).toFixed(0)} KB → ${(after / 1024).toFixed(0)} KB`);
  }
}
