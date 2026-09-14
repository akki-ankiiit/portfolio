import { writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { projects } from '../src/data/portfolio.js';

const root = 'public/assets/ankit';
const source = 'public/assets/newlogo/image.png';
const metadata = await sharp(source).metadata();
const scaleX = metadata.width / 1320;
const scaleY = metadata.height / 1191;
console.log(`Using supplied artwork: ${metadata.width} × ${metadata.height}`);

await sharp(source).resize({ width: 1320, withoutEnlargement: true }).webp({ quality: 94 }).toFile(`${root}/ink-hero.webp`);
await sharp(source).resize({ width: 800, withoutEnlargement: true }).webp({ quality: 91 }).toFile(`${root}/ink-hero-small.webp`);

// Extract real ink from the supplied artwork, removing its paper/grid for small cutouts.
async function cutout(name, region, width) {
  const { data, info } = await sharp(source).extract({ left: Math.round(region[0] * scaleX), top: Math.round(region[1] * scaleY), width: Math.round(region[2] * scaleX), height: Math.round(region[3] * scaleY) }).resize({ width }).removeAlpha().greyscale().raw().toBuffer({ resolveWithObject: true });
  const rgba = Buffer.alloc(info.width * info.height * 4);
  for (let i = 0; i < data.length; i++) {
    rgba[i * 4] = 32; rgba[i * 4 + 1] = 34; rgba[i * 4 + 2] = 29;
    rgba[i * 4 + 3] = Math.max(0, Math.min(255, ((198 - data[i]) / 100) * 255));
  }
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).webp({ lossless: true }).toFile(`${root}/${name}.webp`);
}
await cutout('ink-portrait', [713, 167, 297, 340], 500);
await cutout('ink-book-cutout', [229, 102, 307, 233], 420);

const ink = '#242821';
const paper = '#fdfdf5';
const sage = '#dce7c6';
const esc = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const path = (d, width = 3, color = ink, extra = '') => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const filled = (d, color = ink, width = 2) => `<path d="${d}" fill="${color}" stroke="${ink}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
const rect = (x, y, w, h, fill = paper, r = 4) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${ink}" stroke-width="2.5"/>`;
const circle = (x, y, r, fill = 'none', w = 3) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${ink}" stroke-width="${w}"/>`;
const label = (x, y, text, size = 20) => `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" font-weight="600" letter-spacing="1.1" fill="${ink}">${esc(text)}</text>`;
const scribble = (x, y, text, size = 26) => `<text x="${x}" y="${y}" font-family="Comic Sans MS,Georgia,serif" font-size="${size}" font-style="italic" fill="${ink}">${esc(text)}</text>`;
const hatch = (x, y, count, length = 23, step = 8) => Array.from({ length: count }, (_, i) => path(`m${x + i * step} ${y} ${length} -${length}`, 1.2)).join('');
const burst = (x, y, radius = 16) => Array.from({ length: 8 }, (_, i) => {
  const a = i * Math.PI / 4;
  return path(`M${x + Math.cos(a) * 6} ${y + Math.sin(a) * 6} ${x + Math.cos(a) * radius} ${y + Math.sin(a) * radius}`, 2.5);
}).join('');

// Original pen-and-ink vignettes. Shared by the site accents and project covers.
function sketchbook() {
  return filled('m110 96 116-25 89 27v154l-89-27-116 25Z', paper) + path('M226 79v146m-116 13-10-14V84l111-24 119 27v169l-104-25-113 25-13-9m17-125 89-23m-89 43 87-23m-87 44 89-23m27-42 61 18m-61 13 61 19m-61 13 61 18', 2) + filled('m252 175 67-116 14 8-68 118-18 14Z', sage) + path('m319 59 9-16 15 9-10 15m-86 132 5-24 13 10m-151 75 111-27 88 26', 2.5) + hatch(123, 230, 9, 10, 9) + burst(92, 58) + burst(349, 200);
}
function headphones() {
  return path('M127 151c-27-136 193-150 185-10', 12) + path('M127 149c-18-119 170-128 185-4', 5, paper) + filled('M121 119c-36 1-48 31-34 83 7 22 18 28 40 21l23-12-13-86Z', ink) + filled('M316 116c29-2 51 21 44 65-3 32-10 48-34 49l-25-10 6-96Z', ink) + rect(113, 126, 29, 90, paper, 12) + rect(303, 124, 30, 96, paper, 12) + path('M340 226c28 42-50 48-36 76m-184-164 7 60m187-62 6 62', 2) + hatch(143, 98, 13, 12, 8) + path('m374 79 9-20m-1 40 19-9m-306-2-17-13m12 35-23-2', 2.5);
}
function sneaker() {
  return filled('M76 198c44-1 79-49 118-70l81 15 45 69c40 6 76 28 76 47l-11 19-194 15c-52 1-105-17-119-41Z', paper) + filled('m193 128 51-32 32 46-56 41Z', paper) + path('M80 240c78 39 178 17 311 9M81 253c62 36 156 25 304 8M97 268l11-8m9 14 13-9m13 15 12-11m12 13 11-9m13 10 12-10m14 9 11-10m15 8 11-10m15 8 13-11m13 10 13-12m13 11 12-12', 2) + path('m164 173 89 34m-72-50 80 37m-59-48 65 36M97 230c24-28 52-24 67-13m110-62 11 54 35 3', 3) + filled('M181 220c48 18 71 5 95-28-17 45-50 56-102 44Z', ink) + path('m245 103 15 34m-49 2 23-26m-16 83 21-20m-4 28 21-19', 2) + hatch(310, 237, 7, 11, 7);
}
function robot() {
  return rect(126, 114, 197, 144, paper, 29) + filled('M131 220c1 26 6 38 28 40l138-1 24-29Z', sage, 0) + path('M126 226v-83q0-29 29-29h139q29 0 29 30v82q0 31-28 31H155q-29 0-29-31ZM224 114V72', 3) + circle(224, 60, 12, paper) + filled('M116 149c-32-1-34 67 0 68Zm219-3c32 1 36 67 1 72Z', ink) + circle(178, 177, 16, ink) + circle(273, 177, 16, ink) + circle(173, 171, 4, paper, 0) + circle(268, 171, 4, paper, 0) + path('M188 218q35 27 75-1m-88 64 20-24m81 22-11-21m-67 37h56m-46 9h35', 3) + hatch(149, 241, 10, 10, 9) + burst(363, 95) + path('m88 80 18 22m-35 0 20 8', 3);
}
function wallet() {
  return filled('m108 131 207-30 9 30v134l-23 15H108Z', paper) + rect(92, 137, 239, 142, paper, 13) + filled('m96 254 226 0-2 24H107Z', ink) + rect(267, 184, 89, 51, sage, 7) + circle(286, 209, 7, paper) + circle(291, 98, 49, paper) + circle(291, 98, 39, 'none', 2) + label(276, 114, '₿', 44) + path('M113 123 310 95M109 158h145m-145 11h118m-118 72h111', 2) + hatch(108, 269, 15, 9, 9) + burst(372, 148);
}
function shield() {
  return filled('m220 61 105 41v80c-4 66-62 115-105 136-40-19-102-64-106-136v-80Z', paper) + filled('M220 62v256c65-33 102-82 104-134v-83Z', '#edf1df', 0) + path('m220 61 105 41v80c-4 66-62 115-105 136-40-19-102-64-106-136v-80Zm0 17 88 37v67c-4 56-52 103-88 119-35-19-85-62-89-119v-67Z', 3) + path('m166 179 39 39 76-88', 10) + hatch(223, 279, 7, 14, 8) + burst(357, 89) + path('m84 158-18-7m22 25H62m22 17-17 9', 3);
}
function map() {
  return filled('m81 113 98-31 95 28 106-33v180l-106 35-97-29-96 30Z', paper) + path('M179 84v177m95-147v176m-176-37 73-82 75 53 57-73 63 26', 2, ink, 'stroke-dasharray="5 6"') + filled('M191 126c-48-60 51-101 63-42 5 21-33 55-33 55Z', sage) + circle(221, 86, 12, paper) + filled('M302 225c-43-48 47-85 53-33 2 18-25 45-25 45Z', paper) + circle(329, 193, 10, ink) + hatch(91, 271, 8, 10, 8) + burst(374, 57);
}
function research() {
  return filled('m85 90 148 13-7 149-154-14Z', paper) + path('m99 125 93 9m-94 14 82 7m-84 13 88 9', 2) + rect(219, 154, 143, 124, '#edf1df', 0) + path('M237 190h93m-93 20h78m-78 21h96', 2) + circle(227, 127, 62, paper, 5) + circle(227, 127, 47, 'none', 2) + path('m270 176 69 86', 15) + path('m270 176 69 86', 7, paper) + path('M196 94c-11 5-15 13-16 22', 3) + hatch(90, 226, 10, 10, 8) + burst(379, 120);
}
function shirt() {
  return path('M218 68c-4-35 38-37 38-12 0 15-22 23-22 31m0 0-103 65h205L234 87', 3) + filled('m166 124-54 32-36 70 54 28 21-31-1 77h165l-2-77 24 31 57-28-39-70-56-32c-39 46-76 46-133 0Z', paper) + filled('m150 275 165 0v25H150Z', ink) + path('m168 151 21 21m90-21-22 21m-91 24-3 66m132-67 4 67', 2) + label(184, 223, 'STREET', 19) + path('m183 235 89-2', 2) + hatch(156, 279, 16, 10, 9) + burst(369, 99);
}
function bicycle() {
  return circle(114, 224, 61, paper, 4) + circle(353, 224, 61, paper, 4) + circle(114, 224, 49, 'none', 1.5) + circle(353, 224, 49, 'none', 1.5) + path('m114 224 90-105 48 105H114l100-83h85l54 83m-101 0 48-152h45m-161 46h55', 6) + path('m230 168 29-12-6 21 25-9-37 41 5-30-17 6', 3) + path('M71 301h321m-295-5 11-11m8 12 12-12m195 13 12-12m9 13 12-13', 2) + burst(122, 105) + path('m352 64 19-19m-10 44 25-9', 3);
}
function laptop() {
  return rect(82, 83, 276, 192, paper, 9) + rect(95, 98, 250, 155, '#f2f3e8', 2) + path('m181 141-47 38 47 32m85-70 41 38-41 32m-29-86-34 109', 5) + filled('M62 278h317l-21 29H90Z', paper) + filled('m89 299 269 0-4 9H94Z', ink) + path('M105 278h227m-147 5h61l10 13h-80Z', 2) + hatch(90, 305, 22, 8, 11) + burst(389, 109);
}
function system() {
  return rect(84, 72, 291, 235, paper, 3) + label(107, 122, 'Aa', 46) + path('M190 87h148m-148 20h121', 2) + rect(108, 147, 49, 44, ink) + rect(170, 147, 49, 44, sage) + rect(232, 147, 49, 44, paper) + rect(294, 147, 49, 44, '#e6e7dd') + rect(108, 211, 114, 35, sage, 17) + label(128, 234, 'BUTTON', 11) + rect(235, 211, 108, 35, paper) + path('M250 228h69M108 270h233m-233 15h160', 2) + hatch(287, 299, 8, 10, 8) + burst(53, 154);
}
function ecosystem() {
  let art = circle(223, 174, 41, sage) + label(196, 181, 'TEJAS', 14);
  [[72, 74], [286, 60], [320, 207], [173, 264], [50, 210]].forEach(([x, y], i) => { art += path(`M223 174 ${x + 46} ${y + 20}`, 2, ink, 'stroke-dasharray="5 6"') + rect(x, y, 93, 42, paper) + label(x + 13, y + 26, ['01','02','03','04','05'][i], 17); });
  return art + burst(378, 143) + hatch(191, 202, 5, 10, 9);
}
function cards() {
  return [0, 1, 2].map((i) => `<g transform="rotate(${(i - 1) * 9} ${120 + i * 105} 180)">${rect(66 + i * 108, 94 - (i === 1 ? 27 : 0), 104, 171, paper, 3)}${circle(118 + i * 108, 143 + (i === 1 ? -27 : 0), 32, i === 1 ? sage : paper)}${path(`m${95 + i * 108} ${142 + (i === 1 ? -27 : 0)} 7-24 16 9 15-9 8 24m-39 8h7m23 0h7m-26 13 8 5 8-5`, 2)}${path(`M${83 + i * 108} 228h65m-65 14h40`, 2)}</g>`).join('') + burst(384, 70);
}
function cricket() {
  return path('M61 263c38-156 298-159 346 0M81 263c40-128 251-133 304 0M57 281h354', 3) + path('M168 151v100m19-103v103m19-102v102m-45-105h51', 4) + `<g transform="rotate(26 286 190)">${rect(278, 64, 17, 65, paper, 2)}${rect(266, 128, 41, 132, '#edf1df', 6)}${path('M276 145v96m10-96v96m-10-158h22m-22 12h22m-22 12h22', 2)}</g>` + circle(360, 237, 24, paper) + path('M346 218q28 18 25 39m-28-34q26 12 23 34', 2) + burst(101, 103);
}

const art = { shield, robot, wallet, ecosystem, research, map, bicycle, shirt, cards, system, laptop, cricket, sketchbook, headphones, sneaker };
const motifByProject = {
  neostra: 'shield', yesbot: 'robot', cryptotax: 'wallet', cypherwallet: 'wallet', tejas: 'ecosystem',
  thanq: 'research', kamdhenu: 'map', electrawheeler: 'bicycle', streetsnap: 'shirt', lionlab: 'cards',
  'neostra-system': 'system', 'tejas-system': 'system', cfc: 'laptop', ipl24: 'cricket', 'jd-institute': 'sketchbook', acetech: 'laptop',
};
const phrases = {
  neostra: ['LESS CHAOS.', 'MORE CLARITY.'], yesbot: ['HEAR', 'ME OUT!'], cryptotax: ['MAKE IT', 'MAKE SENSE.'],
  cypherwallet: ['KEEP IT', 'CONNECTED.'], tejas: ['BETTER', 'TOGETHER.'], thanq: ['ASK', 'WHY?'],
  kamdhenu: ['CONNECT', 'THE DOTS.'], streetsnap: ['A LITTLE', 'ATTITUDE.'], lionlab: ['STAY', 'CURIOUS.'],
  electrawheeler: ['ENJOY', 'THE RIDE!'], cfc: ['LET’S', 'BUILD IT.'], ipl24: ['GAME', 'ON!'],
};

for (const [index, project] of projects.entries()) {
  const type = motifByProject[project.id];
  const phrase = phrases[project.id] || ['MIND THE', 'DETAILS.'];
  const accentMotif = index % 3 === 0 ? 'headphones' : index % 3 === 1 ? 'sketchbook' : 'sneaker';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
    <defs><pattern id="grid" width="38" height="38" patternUnits="userSpaceOnUse"><path d="M38 0H0v38" fill="none" stroke="#c8cdbd" stroke-width="1" opacity=".48"/></pattern></defs>
    <rect width="1200" height="850" fill="${paper}"/><rect width="1200" height="850" fill="url(#grid)"/>
    ${path('M41 55 1147 43m-1102 7 3 740m1 1 1100 7m3-743-2 738', 1, '#c9cebe')}
    ${label(82, 107, 'FIELD NOTES / ' + String(index + 1).padStart(2, '0'), 17)}
    ${label(82, 137, project.category.toUpperCase(), 12)}
    <g transform="translate(30 129) scale(1.76)">${art[type]()}</g>
    <g transform="translate(824 84) rotate(6)">${filled('M-20 38 0 9 21 25 43 0 64 20 91 1 114 23 144 9 158 33 185 24 183 56 207 71 187 93 202 118 173 130 178 158 149 154 130 180 109 161 84 181 62 161 37 178 23 153-5 155 0 126-24 114-9 89-30 71Z', paper)}${label(17, 73, phrase[0], 24)}${label(14, 109, phrase[1], 24)}</g>
    <g transform="translate(824 377) scale(.63) rotate(-8)">${art[accentMotif]()}</g>
    ${path('M839 626c-24 50-68 57-111 37m8-12-8 12 15 7', 2)}
    ${burst(1062, 682, 22)}${burst(733, 176, 16)}
    ${scribble(86, 744, project.title, project.title.length > 29 ? 31 : project.title.length > 20 ? 36 : 45)}
    ${path('M84 759q217 8 419-2', 2)}
    ${label(87, 795, 'ANKIT CHANDRAKAR / DESIGN IN THE MARGINS', 10)}
    ${path('m1126 733 13 14-15 12-13-13Z', 2)}
  </svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 93 }).toFile(`${root}/ink-${project.id}.webp`);
  console.log(`Created ink-${project.id}.webp`);
}

for (const name of ['sketchbook', 'headphones', 'sneaker', 'robot']) {
  await writeFile(`${root}/ink-${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="340" viewBox="40 30 380 300">${art[name]()}</svg>`);
}
