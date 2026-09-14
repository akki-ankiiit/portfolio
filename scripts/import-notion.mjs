import sharp from 'sharp';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const download = promisify(execFile);

// Public image blocks from Ankit's linked "Short & Sweet Portfolio" page.
const space = '351d1538-b62f-4d5d-b5f1-f91d14b3e7b9';
const slides = [
  ['d165544f-e6b6-46f5-822b-d8df84bb4ff2', 'c8c2558a-53a1-47a0-8a07-a0134f7082bf'],
  ['7df22fd0-baef-4321-a72d-02866490e557', '238d4a95-6de2-4530-92ee-8e5966ff923f'],
  ['22c5cde7-11c5-42fd-92ec-76b4b48935d7', 'd59d1302-04ee-4fff-815e-cf5acec1d0be'],
  ['72e01849-a9c6-46e8-8c8d-80521289c29a', 'f74cffea-9272-450d-8327-fff8ab194fcb'],
  ['811bdd9c-29fa-4b6f-b51c-c3777a02736b', 'cfe03140-abde-4bf0-89be-30a7b6e2764e'],
  ['2bff3d31-3655-4776-9e8b-456326ebd2b9', 'bdaf49b3-84e1-4e63-be88-9a0e0d75308a'],
  ['c949fbae-5a97-409c-ad71-7c67f43112da', 'd4e4385b-58c8-4cd6-9db1-6053ac7c41eb'],
  ['f814fb9f-fb3b-4ae5-a775-e4501d9a5d2a', '3156e2aa-5fb4-4355-9ca5-b2ad722e2b97'],
  ['51a408fe-cf60-4776-92fe-95c07b9d3bc4', 'c1647da0-b79f-434b-92ee-0eefe856d6dc'],
  ['a48082cb-6649-4444-8671-155811a86643', 'b068f738-b33a-48d6-aa1c-93690ce69b6d'],
  ['fb0374f5-a4db-488f-aba6-9452c153421d', '34ed191c-a721-4dde-842b-3a76a42f0c01'],
  ['68e603e4-cec6-4261-987b-90adef04f421', '95328ac2-979a-484b-b140-5c885729b924'],
  ['acaf4fce-ee3d-46a8-9882-0adb5141ec6d', 'e07f94ad-55f3-4cae-be95-d444f8c0dd29'],
];
{
  const sources = slides.map(([file, block], index) => {
    const image = `https://prod-files-secure.s3.us-west-2.amazonaws.com/${space}/${file}/${String(index + 1).padStart(2, '0')}.png`;
    return `https://www.notion.so/image/${encodeURIComponent(image)}?table=block&id=${block}&spaceId=${space}&width=1410&cache=v2`;
  });
  const thumbs = [];
  for (const [index, source] of sources.entries()) {
    const { stdout: buffer } = await download('curl', ['--fail', '--location', '--silent', '--show-error', source], { encoding: 'buffer', maxBuffer: 20 * 1024 * 1024 });
    const filename = `public/assets/ankit/notion-slide-${String(index + 1).padStart(2, '0')}.webp`;
    await sharp(buffer).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 90 }).toFile(filename);
    thumbs.push({ input: await sharp(buffer).resize(500, 360, { fit: 'contain', background: '#ffffff' }).png().toBuffer(), left: (index % 3) * 500, top: Math.floor(index / 3) * 360 });
    console.log(filename);
  }
  await sharp({ create: { width: 1500, height: Math.ceil(thumbs.length / 3) * 360, channels: 3, background: '#e7e7e7' } }).composite(thumbs).png().toFile('/var/folders/kx/m43wk16d7bscsnc5wk7ct1l80000gn/T/opencode/ankit-notion-overview.png');
}
