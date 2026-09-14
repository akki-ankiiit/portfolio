import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';

const download = promisify(execFile);
const entries = [
  { id: 'case-study-02', url: 'https://www.behance.net/gallery/200179343/CaseStudy02', files: [
    'fb8b52200179343.665e4447a1f3c', 'f8e11e200179343.665e4447a7c7a', 'd49f82200179343.665e4447a0a28', '5d628e200179343.665e4447a1359', '42291d200179343.665e4447a3633', 'c3bdfe200179343.665e4447a3aed', '8c58ba200179343.665e4447a1810', '022246200179343.665e4447a3f62', '0c11ba200179343.665e4447a8ab1', '64d085200179343.665e4447a43f1', '52c1e1200179343.665e4447a6a45', '4f2334200179343.665e4447a2dbf', 'ad3d9d200179343.665e4447a528d', 'bc66c0200179343.665e4447a269d', 'c2eacb200179343.665e4447a7806', '84aad5200179343.665e4447a5a8f', 'a6dcb7200179343.665e4447a732e', '133780200179343.665e4447a4b08', 'e3c4f8200179343.665e4447a62a8', '68fee3200179343.665e4447a8390',
  ] },
  { id: 'case-study-01', url: 'https://www.behance.net/gallery/199883289/CaseStudy01', files: [
    '0c0d45199883289.6658c9f5bff07', '1b7c1f199883289.6658c9f5bb66d', '3b40d6199883289.6658c9f5ba1c9', '0bf011199883289.6658c9f5b8ddf', '341d3c199883289.6658c9f5b9519', 'ebc842199883289.6658c9f5bae7c', 'b17a8e199883289.6658c9f5c1b70', '05aa38199883289.6658c9f5bdeeb', 'fbb99e199883289.6658c9f5c2104', '0e4967199883289.6658c9f5bf365', '0f39f4199883289.6658c9f5bbf9f', 'cd7517199883289.6658c9f5c1418', '5108e1199883289.6658c9f5be7f9', '44e148199883289.6658c9f5c06e7', 'c486ea199883289.6658c9f5bedc9', '547c17199883289.6658c9f5bf8cc', 'eb5211199883289.6658c9f5c0e8b', '7b7ca2199883289.6658c9f5ba8e7', 'f8e156199883289.6658c9f5b9c1b', '5a6b6b199883289.6658c9f5bc908', '85414f199883289.6658c9f5bd3d5',
  ] },
  { id: 'cypherwallet', url: 'https://www.behance.net/gallery/194698599/CypherWallet', files: ['da5682194698599.6600dd7788ae8', '7429de194698599.6600dd778a5e0', '652708194698599.6600dd778b1ad', 'c6422f194698599.6600dd77896ef'] },
  { id: 'lionlab', url: 'https://www.behance.net/gallery/195176573/LionLabNFT', files: ['2943a8195176573.66094f9f4d517'] },
  { id: 'streetsnap', url: 'https://www.behance.net/gallery/194697613/StreetSnapco', files: ['c6e4bd194697613.6600d5bb67925', '9601a2194697613.6600d5bb65f7e', 'e39bd4194697613.6600d5bb6a357', 'fbac91194697613.6600d5bb6482b', '2f6ddb194697613.6600d5bb68cce'] },
  { id: 'cfc', url: 'https://www.behance.net/gallery/171777397/CFC-Website', files: ['b4ce59171777397.6474b7148e67a'] },
  { id: 'ipl24', url: 'https://www.behance.net/gallery/195176733/IPL24', files: ['026b46195176733.6609507a2eaa4', '1fb348195176733.6609507a2d546', 'c86a4b195176733.6609507a2ed80', '5add51195176733.6609507a2e281', '6728fb195176733.6609507a2df49', '4df6d2195176733.6609507a2dc54', 'e05792195176733.6609507a2e7f5'] },
  { id: 'electrawheeler', url: 'https://www.behance.net/gallery/185457973/AkkiDesign02', files: ['14275b185457973.65649531698fc'] },
];

const manifest = {};
for (const entry of entries) {
  const images = [];
  const thumbs = [];
  for (const [index, file] of entry.files.entries()) {
    const size = entry.id === 'streetsnap' && index >= 2 ? 'max_1200_webp' : '1400_webp';
    const remote = `https://mir-s3-cdn-cf.behance.net/project_modules/${size}/${file}.png`;
    const { stdout } = await download('curl', ['--fail', '--location', '--silent', '--show-error', '--retry', '2', remote], { encoding: 'buffer', maxBuffer: 35 * 1024 * 1024 });
    const name = `${entry.id}-${String(index + 1).padStart(2, '0')}.webp`;
    const info = await sharp(stdout).resize({ width: 1400, withoutEnlargement: true }).webp({ quality: 89 }).toFile(`public/assets/behance/${name}`);
    images.push({ src: `/assets/behance/${name}`, width: info.width, height: info.height });
    const thumbnail = await sharp(stdout).resize(440, 280, { fit: 'contain', background: '#eeeae3' }).png().toBuffer();
    const label = Buffer.from(`<svg width="440" height="300"><rect y="280" width="440" height="20" fill="#fff"/><text x="10" y="295" font-family="Arial" font-size="13">${entry.id} / ${index + 1}</text></svg>`);
    const input = await sharp(label).composite([{ input: thumbnail, top: 0, left: 0 }]).png().toBuffer();
    thumbs.push({ input, left: (index % 3) * 440, top: Math.floor(index / 3) * 300 });
  }
  manifest[entry.id] = { url: entry.url, images };
  await sharp({ create: { width: 1320, height: Math.ceil(thumbs.length / 3) * 300, channels: 3, background: '#eeeae3' } }).composite(thumbs).png().toFile(`/var/folders/kx/m43wk16d7bscsnc5wk7ct1l80000gn/T/opencode/behance-${entry.id}.png`);
  console.log(`${entry.id}: imported ${images.length} original images`);
}
await writeFile('src/data/behance-media.json', `${JSON.stringify(manifest, null, 2)}\n`);
