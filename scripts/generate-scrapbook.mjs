import { readFile, writeFile } from 'node:fs/promises';
import sharp from 'sharp';
import { projects } from '../src/data/portfolio.js';

const root = 'public/assets/ankit';
const ink = '#604b39';
const orange = '#d57d48';
const soft = '#f4c799';
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const line = (d, color = ink, width = 3, extra = '') => `<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;
const box = (x, y, width, height, fill = '#fffaf0', radius = 3, extra = '') => `<rect x="${x}" y="${y}" width="${width}" height="${height}" rx="${radius}" fill="${fill}" stroke="${ink}" stroke-width="2" ${extra}/>`;
const note = (x, y, value, size = 24, color = ink) => `<text x="${x}" y="${y}" font-family="Georgia,serif" font-style="italic" font-size="${size}" fill="${color}">${escape(value)}</text>`;
const label = (x, y, value, size = 13) => `<text x="${x}" y="${y}" font-family="Courier New,monospace" font-size="${size}" letter-spacing="1" fill="${ink}">${escape(value)}</text>`;
const circle = (x, y, radius, fill = 'none', width = 3) => `<circle cx="${x}" cy="${y}" r="${radius}" stroke="${ink}" stroke-width="${width}" fill="${fill}"/>`;
const star = (x, y, size = 18) => line(`M${x} ${y - size}q2 ${size - 2} ${size} ${size}q-${size - 2} 2 -${size} ${size}q-2 -${size - 2} -${size} -${size}q${size - 2}-2 ${size}-${size}Z`, orange, 2.5);
const browser = () => box(135, 195, 590, 358, '#fffaf5', 5) + line('M135 235H725') + circle(158, 215, 4, soft, 1) + circle(176, 215, 4, soft, 1) + circle(194, 215, 4, soft, 1);

function shield() {
  return line('M414 254 517 287v82c-4 68-71 112-103 126-35-17-101-61-103-126v-82Z', ink, 4) + line('M414 272 498 300v69c-4 50-49 89-84 107-34-19-81-56-84-107v-69Z', orange, 2) + line('m374 370 28 28 62-66', ink, 7) + box(164, 279, 104, 51) + box(570, 281, 101, 51) + box(178, 419, 99, 51) + box(564, 421, 113, 51) + line('M271 305h33m218 0h43M282 443l45-17m183 1 48 17', ink, 2, 'stroke-dasharray="5 7"') + label(182, 309, 'DSAR') + label(584, 309, 'CONSENT') + label(190, 450, 'DATA') + label(578, 451, 'PRIVACY');
}

function chatbot() {
  return box(271, 288, 296, 171, '#fff6e4', 33) + line('M312 459v52l67-52M419 288v-37', ink, 4) + circle(419, 239, 12, soft) + circle(349, 357, 13, ink) + circle(489, 357, 13, ink) + line('M365 399q53 44 108-1', ink, 4) + box(174, 233, 143, 45, '#f4d0ae', 20) + line('M194 252h73m-72 11h94', ink, 2) + box(535, 248, 136, 63, '#eee2cf', 19) + line('M553 270h82m-82 17h51', ink, 2) + line('M231 327h-24q-25 43-2 77h43m344-77h25q23 41-1 79h-24', ink, 3) + star(603, 468, 21);
}

function wallet(crypto = false) {
  let art = box(227, 305, 347, 184, '#f5dbc0', 18) + line('M242 304v-43l295-29v71M258 278l261-25M228 342h345', ink, 3) + box(490, 368, 107, 65, '#fff9ef', 10) + circle(515, 400, 8, soft);
  art += circle(597, 274, 69, '#f6d5a8') + circle(597, 274, 54, 'none', 2) + note(576, 298, '₿', 65);
  art += line('M169 520H672m-489-51 39-23m381 3 24-28 42 8', ink, 2);
  if (crypto) art += line('m160 295 24-31 21 9 27-51 31 11', orange, 4) + note(243, 537, 'a little more clarity.', 24);
  else art += line('m639 444 12 13 25-32', orange, 5) + note(242, 537, 'one place for your assets.', 24);
  return art;
}

function ecosystem() {
  let art = circle(419, 374, 52, '#f4ccaa') + note(386, 383, 'Tejas', 25);
  [[202, 239, 'Chiraag'], [475, 220, 'Captain'], [558, 404, 'Contractor'], [314, 475, 'MistriBhai'], [166, 403, 'Adhikar']].forEach(([x, y, title]) => { art += line(`M419 374 ${x + 60} ${y + 25}`, ink, 2, 'stroke-dasharray="4 5"') + box(x, y, 137, 55, '#fffaf1', 8) + note(x + 13, y + 34, title, 18); });
  return art + star(608, 327, 17);
}

function research() {
  return box(192, 250, 155, 175, '#f6dfb9', 1, 'transform="rotate(-8 267 335)"') + note(215, 293, 'listen.', 28) + line('M217 318h87m-87 21h68m-68 21h93', ink, 2) + box(437, 325, 147, 151, '#ead6be', 2, 'transform="rotate(8 510 400)"') + note(452, 365, 'understand.', 21) + line('M457 391h93m-93 20h69m-69 20h87', ink, 2) + circle(402, 319, 81, '#fffaf199', 5) + line('m460 378 89 108', ink, 14) + line('m460 378 89 108', soft, 8) + circle(402, 319, 63, 'none', 2) + note(210, 522, 'ask better questions.', 26);
}

function map() {
  return line('m178 292 137-50 183 46 154-36v222l-154 45-183-47-137 47Z', ink, 3) + line('M315 245v224m183-178v224', ink, 2) + line('m192 440 100-111 88 60 76-64 95 33 86-80', orange, 4, 'stroke-dasharray="8 8"') + `<path d="M361 344c-68-79 64-113 69-45 0 21-39 64-39 64Z" fill="#edc09b" stroke="${ink}" stroke-width="3"/>` + circle(391, 303, 13, '#fffaf1') + `<path d="M527 450c-58-74 61-99 64-40 0 19-35 55-35 55Z" fill="#fffaf1" stroke="${ink}" stroke-width="3"/>` + circle(555, 410, 11, soft) + star(222, 247, 17);
}

function bicycle() {
  return circle(252, 429, 80, '#fffaf055', 4) + circle(609, 429, 80, '#fffaf055', 4) + circle(252, 429, 64, 'none', 1.5) + circle(609, 429, 64, 'none', 1.5) + line('m253 429 123-132 74 132H253l126-98h143l87 98m-160 0 62-196h63m-219 62h69', ink, 6) + line('m409 349 44-19-8 38 31-11-48 47 5-35-26 7', orange, 3) + line('M161 524h531M186 254c-5-53 48-72 62-75 3 22-12 73-62 75Zm3-3 32-45', ink, 2) + note(425, 535, 'a greener journey.', 23);
}

function shirt() {
  return line('M404 270c-6-37 42-44 45-16 1 18-19 23-26 36m0 0-150 83h301L423 290', ink, 4) + `<path d="m342 324-65 32-47 98 77 34 19-40-3 90h211l-3-90 24 40 76-34-46-98-65-32c-55 54-91 54-178 0Z" fill="#f4d2ae" stroke="${ink}" stroke-width="3"/>` + line('M365 340c25 38 89 42 127 0M344 389v128m172-132v132', ink, 2) + note(363, 440, 'street', 34) + note(373, 478, 'stories.', 31) + star(616, 250, 18);
}

function collectibles() {
  let art = '';
  [0, 1, 2].forEach((i) => {
    const x = 190 + i * 160; const y = i === 1 ? 229 : 268;
    art += `<g transform="rotate(${(i - 1) * 9} ${x + 69} ${y + 120})">` + box(x, y, 144, 229, i === 1 ? '#f3d0a7' : '#fffaf0', 4) + box(x + 12, y + 14, 120, 143, '#e8dac7', 2) + circle(x + 72, y + 79, 42, '#fffaf0', 2) + line(`m${x + 41} ${y + 63} 8-25 23 15 24-15 8 25m-47 13 10 0m21 0h10m-34 17 10 8 11-8`, ink, 2.5) + note(x + 26, y + 188, 'collectible', 17) + line(`M${x + 26} ${y + 208}h89`, ink, 2) + '</g>';
  });
  return art + star(654, 257, 17);
}

function system(isTejas) {
  let art = box(176, 231, 458, 294, '#fffaf3', 4) + note(201, 287, 'Aa', 53) + line('M312 255h273m-273 22h201', ink, 2);
  ['#d17e4d', '#f5cfa7', '#e9dccb', '#7a6050'].forEach((color, index) => { art += `<rect x="${205 + index * 87}" y="313" width="66" height="51" rx="2" fill="${color}" stroke="${ink}" stroke-width="1.5"/>`; });
  art += box(205, 389, 169, 45, '#f5cfa7', 21) + note(228, 418, 'a good action', 19) + box(393, 389, 196, 45, '#fffaf0', 4) + label(410, 417, 'INPUT / LABEL', 12) + line('M205 466h91m29 0h90m26 0h145', ink, 3) + note(211, 499, isTejas ? 'one family. many products.' : 'small pieces. shared purpose.', 21);
  return art + line('M162 209h484v330H162Z', orange, 1, 'stroke-dasharray="5 7"') + star(669, 408, 22);
}

function code() {
  return box(203, 254, 406, 245, '#fffaf1', 8) + box(218, 270, 376, 207, '#f0e2cd', 3) + line('m340 329-56 46 56 41m131-87 55 46-55 41m-57-110-33 136', ink, 6) + line('M178 508h458l-28 23H203Z', ink, 3) + note(220, 240, 'build something, together.', 22) + star(642, 298, 19);
}

function cricket() {
  return line('M170 495c48-215 425-225 487 0M189 499c52-173 359-177 448 0', ink, 3) + line('M165 508h504M340 332v126m24-129v129m25-126v126m-54-126h60', ink, 5) + `<g transform="rotate(30 469 386)">${box(449, 272, 29, 78, '#fff7e9', 4)}${box(437, 346, 53, 159, '#e3b783', 8)}${line('M447 365v123m12-123v124m-10-193h23m-23 12h23m-23 12h23', ink, 2)}</g>` + circle(568, 448, 28, '#d88960', 3) + line('M548 428q35 13 34 41m-41-37q32 13 34 39', '#fff6e6', 2) + note(208, 249, 'match-day stories.', 27) + star(621, 266, 18);
}

function editorial(project) {
  let art = browser();
  art += note(163, 281, project.id === 'jd-institute' ? 'a creative beginning.' : 'a fresh perspective.', 25) + line('M165 307h252m-252 20h189', ink, 2) + box(164, 362, 158, 131, '#f0d2b0', 2) + box(342, 362, 158, 131, '#e7ddcd', 2) + box(520, 362, 174, 131, '#f8edda', 2);
  if (project.id === 'jd-institute') art += line('m195 429 48-37 46 37-46 22Zm15 13v26q30 17 61 0v-25m19-10v44', ink, 3) + line('m379 461 72-71 12 12-72 71-25 8Z', ink, 3);
  else art += line('m184 471 43-60 37 24 36-45m66 83 43-38 29 13 39-50', ink, 3);
  art += circle(605, 425, 28, '#fffaf1') + line('M605 382v-12m0 98v12m-43-55h-12m98 0h12', ink, 2);
  return art;
}

const motifs = {
  neostra: shield, yesbot: chatbot, cryptotax: () => wallet(true), cypherwallet: () => wallet(false), tejas: ecosystem,
  thanq: research, kamdhenu: map, electrawheeler: bicycle, streetsnap: shirt, lionlab: collectibles,
  'neostra-system': () => system(false), 'tejas-system': () => system(true), cfc: code, ipl24: cricket,
};
const notes = {
  neostra: ['untangle', 'the complex.', 'privacy, made human'], yesbot: ['a helpful', 'conversation.', 'listen. connect. respond.'],
  cryptotax: ['less friction.', 'more clarity.', 'make the numbers make sense'], tejas: ['one family.', 'five products.', 'bring the pieces together'],
  thanq: ['start with', 'a question.', 'curiosity comes first'], kamdhenu: ['people.', 'places. progress.', 'connect the dots'],
  streetsnap: ['a little', 'street character.', 'wear your point of view'], electrawheeler: ['a spark of', 'possibility.', 'design for the journey'],
  lionlab: ['a small', 'collection.', 'make room for discovery'], cfc: ['better,', 'together.', 'a place for people who build'],
  ipl24: ['bring on', 'match day.', 'a story behind every score'], cypherwallet: ['keep it', 'connected.', 'your assets, in one place'],
};

for (const [index, project] of projects.entries()) {
  const scribbles = notes[project.id] || ['thoughtful', 'little details.', 'a shared visual language'];
  const paper = index % 3 === 0 ? '#f1dfc6' : index % 3 === 1 ? '#eee0cf' : '#f1e5d4';
  const titleSize = project.title.length > 28 ? 29 : project.title.length > 19 ? 34 : 43;
  const motif = (motifs[project.id] || (() => editorial(project)))();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
    <defs>
      <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M26 0H0v26" fill="none" stroke="#927d6028" stroke-width=".7"/></pattern>
      <filter id="paper-shadow" x="-20%" y="-20%" width="150%" height="150%"><feDropShadow dx="3" dy="5" stdDeviation="4" flood-color="#77583a" flood-opacity=".12"/></filter>
      <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".72" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".045"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter>
    </defs>
    <rect width="1200" height="850" fill="${paper}"/>
    <path d="M0 0h181l-7 103 8 89-12 124 10 108-6 130 9 129-6 167H0Z" fill="#e0c5a156"/>
    <g transform="rotate(3 502 359)"><path d="M109 123 837 139 824 638 116 633Z" fill="#d6bfa2" opacity=".5"/></g>
    <g transform="rotate(-3 447 365)" filter="url(#paper-shadow)">
      <path d="m79 126 118-2 14 4 124-5 119 4 88-3 115 4 100-3 28 8-4 119 3 114-4 109 5 121-7 20-62-3-19 5-106-3-133 4-140-5-130 3-118-4-9-13 2-132-4-137 4-91Z" fill="#fffaf0"/>
      <path d="M98 145h652v442H98Z" fill="url(#grid)"/>
      ${label(119, 176, 'FROM THE SKETCHBOOK / ' + project.category.toUpperCase(), 11)}
      ${motif}
      ${line('M116 576q295 5 598-2', ink, 1)}
    </g>
    <g transform="rotate(8 294 131)"><path d="m232 106 12 5 12-4 13 3 16-4 11 3 15-3 14 4 13-3 12 5-1 49-15-2-14 3-16-3-12 4-14-3-15 2-13-4-13 3Z" fill="#d7996070"/></g>
    <g transform="rotate(6 926 319)" filter="url(#paper-shadow)">
      <path d="m807 218 241 3-4 217-227 3Z" fill="#f6ce9e"/>
      ${note(835, 294, scribbles[0], 28)}${note(835, 333, scribbles[1], 28)}
      ${line('M833 353q78 11 159-3', orange, 3)}
      ${star(984, 390, 15)}
      <path d="M875 206h102v30H875Z" fill="#b9957060"/>
    </g>
    ${line('M1053 476c-31 74-92 88-184 61m21-16-21 16 19 17', ink, 2)}
    <g transform="rotate(-7 947 592)">${box(852, 557, 204, 74, '#fcf2df', 2)}${label(867, 585, 'A LITTLE CARE IN', 12)}${label(867, 608, 'EVERY DETAIL.', 12)}</g>
    ${star(1073, 148, 28)}${line('M1090 200l22 9m-4-51 16-11M45 530l13-12m-13 33 17 2', ink, 2)}
    <g transform="rotate(-2 360 705)">${note(99, 718, project.title, titleSize)}${note(101, 759, scribbles[2], 20, '#92765a')}${line('M96 728q177 14 367 2', orange, 3)}</g>
    <g transform="rotate(9 1050 739)"><circle cx="1050" cy="739" r="48" fill="none" stroke="${orange}" stroke-width="2"/><circle cx="1050" cy="739" r="40" fill="none" stroke="${orange}" stroke-width="1"/>${note(1027, 750, String(index + 1).padStart(2, '0'), 30, orange)}</g>
    ${label(98, 808, 'ANKIT CHANDRAKAR / PROJECT NOTES', 10)}
    <rect width="1200" height="850" fill="transparent" filter="url(#grain)"/>
  </svg>`;
  const sageColors = {
    '#604b39': '#526048', '#d57d48': '#849b62', '#f4c799': '#d6e1bb',
    '#f1dfc6': '#e8ebd7', '#eee0cf': '#e6e8d8', '#f1e5d4': '#eeecdc',
    '#e0c5a156': '#cbd2b656', '#d6bfa2': '#c1c9ad', '#fffaf0': '#fdfdf1',
    '#927d6028': '#84957228', '#77583a': '#6d7956', '#d7996070': '#aabb8570',
    '#f6ce9e': '#dce5b8', '#b9957060': '#9cae7a60', '#fcf2df': '#f5f6e7',
    '#92765a': '#83926f', '#f4d0ae': '#dbe5bd', '#eee2cf': '#e9ecd9',
    '#fff6e4': '#f5f8e9', '#f5dbc0': '#e4e9ce', '#f6d5a8': '#dce6b9',
    '#f4ccaa': '#d4e0b7', '#f6dfb9': '#e5e9c9', '#ead6be': '#d9dfc8',
    '#edc09b': '#cad9ab', '#f4d2ae': '#dce5c4', '#f3d0a7': '#d4dfb6',
    '#e8dac7': '#e2e5d0', '#d17e4d': '#819766', '#f5cfa7': '#d3e0b7',
    '#e9dccb': '#e6e8d8', '#7a6050': '#667356', '#f0e2cd': '#e7ecd5',
    '#e3b783': '#bdce9a', '#d88960': '#98ad79', '#f0d2b0': '#d4dfb8',
    '#e7ddcd': '#e6e8d8', '#f8edda': '#f1f3e3',
  };
  let themedSvg = svg;
  for (const [before, after] of Object.entries(sageColors)) themedSvg = themedSvg.replaceAll(before, after);
  await sharp(Buffer.from(themedSvg)).webp({ quality: 91 }).toFile(`${root}/scrapbook-${project.id}.webp`);
  console.log(`Created scrapbook-${project.id}.webp`);
}

const palette = {
  '#c5de9b': '#efba8b', '#343831': '#4b3628', '#fdfdf5': '#fffaf1', '#465d4b': '#a76844',
  '#5d755e': '#c1875b', '#d1dfad': '#efb986', '#8d9f60': '#c1814d', '#596843': '#855c3c',
  '#667749': '#a06b40', '#65764b': '#956441', '#e8e9ca': '#f5d8b2', '#edcf94': '#edb979',
  '#282828': '#382b23', '#666b60': '#806c5a', '#e8d3a4': '#f0cca1', '#bea48d': '#dbad89',
};
for (const [input, output] of [
  ['wordmark.svg', 'wordmark-orange.svg'], ['monogram.svg', 'monogram-orange.svg'],
  ['portrait-placeholder.svg', 'portrait-orange.svg'], ['idea-doodle.svg', 'idea-orange.svg'],
  ['folder-products.svg', 'folder-products-orange.svg'], ['folder-websites.svg', 'folder-websites-orange.svg'], ['folder-systems.svg', 'folder-systems-orange.svg'],
]) {
  let svg = await readFile(`${root}/${input}`, 'utf8');
  for (const [before, after] of Object.entries(palette)) svg = svg.replaceAll(before, after);
  await writeFile(`${root}/${output}`, svg);
}
