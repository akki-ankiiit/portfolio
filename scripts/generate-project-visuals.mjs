import sharp from 'sharp';
import { projects } from '../src/data/portfolio.js';

const root = 'public/assets/ankit';
const esc = (text) => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const rect = (x, y, w, h, fill, radius = 12, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" ${extra}/>`;
const text = (x, y, value, size = 16, fill = '#243b34', weight = 400) => `<text x="${x}" y="${y}" font-family="Arial,sans-serif" font-size="${size}" fill="${fill}" font-weight="${weight}">${esc(value)}</text>`;
const themes = {
  neostra: ['#dce7dc', '#285a47', '#b1c6b4'], yesbot: ['#e5dff4', '#5b42a3', '#d0c0ee'],
  cryptotax: ['#d6ece9', '#307b7d', '#a4d4d2'], tejas: ['#f0dfc6', '#9a542b', '#e2be8a'],
  thanq: ['#eaded5', '#945b49', '#cfa692'], kamdhenu: ['#e9e8d3', '#696d35', '#ceceaa'],
  'neostra-system': ['#dce1f0', '#455b8b', '#b8c7df'], 'tejas-system': ['#eddecf', '#8c5d40', '#d4b69a'],
  'jd-institute': ['#efe4c9', '#79633b', '#d6bd80'], lionlab: ['#e2dcef', '#58447e', '#c2aedb'],
  streetsnap: ['#e6e1d9', '#645549', '#c6b7a7'], electrawheeler: ['#d7e3d7', '#3e6649', '#a8c3a9'],
  acetech: ['#dbe8ec', '#356f7f', '#accdd5'],
};

function dashboard(project, accent) {
  const isResearch = project.id === 'thanq';
  const isTejas = project.id === 'tejas';
  const labels = isResearch ? ['Research overview', 'User interviews', 'Journey mapping', 'Insights', 'Recommendations'] : isTejas ? ['Chiraag', 'Tejas Captain', 'ContractorBhai', 'MistriBhai', 'Adhikar'] : project.id === 'kamdhenu' ? ['Overview', 'Dealer network', 'Contractors', 'Loyalty programs', 'Site map'] : ['Overview', 'Privacy portal', 'DSAR requests', 'Data mapping', 'Assessments'];
  let svg = rect(90, 245, 1020, 485, '#fffdf8', 16) + rect(90, 245, 190, 485, accent, 16);
  svg += text(113, 287, isResearch ? 'ThanQ / Research' : isTejas ? 'Tejas' : project.title.split(' ')[0], isResearch ? 16 : 22, '#ffffff', 700);
  labels.forEach((label, index) => {
    if (!index) svg += rect(106, 320 + index * 49, 159, 36, '#ffffff25', 7);
    svg += text(121, 343 + index * 49, label, 13, '#ffffff');
  });
  svg += text(313, 288, isResearch ? 'Understanding the experience' : isTejas ? 'Your business, connected.' : 'A clearer view of your workspace', 22, '#23372f', 600);
  svg += text(314, 312, isResearch ? 'Discovery / insights / opportunities' : 'Overview / Workspace', 11, '#7b8276');
  if (isResearch) {
    ['Listen', 'Map', 'Improve'].forEach((label, index) => {
      const x = 315 + index * 250;
      svg += rect(x, 345, 226, 321, ['#f5e6ce', '#e4ebd6', '#eee3dc'][index], 12);
      svg += text(x + 18, 382, label, 24, accent, 600);
      svg += text(x + 18, 411, ['User needs & context', 'Journeys & friction', 'Design recommendations'][index], 12, '#6d7367');
      [0, 1, 2].forEach((row) => { svg += rect(x + 15, 433 + row * 69, 196, 54, '#ffffffbb', 7) + rect(x + 29, 450 + row * 69, 140 - row * 15, 5, '#8e9c8560', 2) + rect(x + 29, 462 + row * 69, 108, 4, '#8e9c8530', 2); });
    });
  } else {
    const cards = isTejas ? ['Sales teams', 'Contractor network', 'Business operations'] : project.id === 'kamdhenu' ? ['Dealer network', 'Contractor engagement', 'Loyalty programs'] : ['Requests overview', 'Consent preferences', 'Data inventory'];
    cards.forEach((label, index) => {
      const x = 314 + index * 252;
      svg += rect(x, 340, 231, 90, '#f3f4ed', 9) + text(x + 16, 366, label, 12, '#697368');
      svg += rect(x + 16, 383, 42, 23, accent, 7) + text(x + 72, 400, 'Workspace', 14, accent, 600);
    });
    svg += rect(314, 453, 488, 239, '#f3f4ed', 10) + text(334, 485, isTejas ? 'A shared product foundation' : 'Activity at a glance', 15, '#334a3c', 600);
    for (let i = 0; i < 9; i++) svg += rect(339 + i * 48, 646 - [75, 105, 63, 111, 89, 136, 111, 160, 138][i], 27, [75, 105, 63, 111, 89, 136, 111, 160, 138][i], i === 7 ? accent : '#c3d2c4', 4);
    svg += rect(818, 453, 244, 239, '#f3f4ed', 10) + text(836, 485, 'Your workspace', 15, '#334a3c', 600);
    labels.slice(1).forEach((label, i) => { svg += rect(836, 509 + i * 39, 21, 21, '#dae2d1', 6) + text(866, 524 + i * 39, label, 12, '#606e5c'); });
  }
  return svg;
}

function system(project, accent) {
  let svg = rect(88, 240, 1024, 495, '#fdfdf8', 18);
  svg += text(122, 290, 'Foundations, thoughtfully connected.', 25, '#343831', 600);
  svg += text(122, 316, 'DESIGN TOKENS   /   COMPONENTS   /   INTERACTION PATTERNS', 11, '#7c8276');
  ['#343831', accent, '#c5de9b', '#efeedc', '#fdfdf5'].forEach((color, i) => {
    svg += rect(122 + i * 79, 346, 65, 61, color, 9, 'stroke="#34383115"');
  });
  svg += text(123, 463, 'Aa', 59, accent, 600) + text(215, 443, 'Clarity at every scale.', 22, '#343831') + text(215, 473, 'A language for products that grow.', 14, '#7c8276');
  svg += rect(122, 509, 170, 46, accent, 23) + text(145, 538, 'Primary action  →', 15, '#fff');
  svg += rect(310, 509, 170, 46, '#eff1e8', 23) + text(334, 538, 'Secondary action', 14, accent);
  svg += rect(122, 580, 361, 63, '#f3f4ed', 8) + text(138, 607, 'A considered input', 12, '#7c8276') + text(138, 630, 'Every detail has a purpose', 16, '#343831');
  svg += rect(551, 346, 516, 333, '#f0f2e9', 12) + text(577, 384, 'Reusable by design', 20, accent, 600);
  for (let i = 0; i < 3; i++) {
    svg += rect(576, 410 + i * 69, 461, 52, '#ffffff', 8) + rect(591, 424 + i * 69, 24, 24, i === 1 ? '#c5de9b' : '#e9ecdf', 6) + text(630, 442 + i * 69, ['Accessible interaction patterns', 'Consistent product experiences', 'Documented for engineering'][i], 15, '#52614b');
  }
  return svg;
}

function conversation(accent) {
  let svg = rect(145, 254, 910, 466, '#34383118', 22) + rect(135, 242, 910, 466, '#fffdf8', 22);
  svg += rect(135, 242, 910, 60, accent, 20) + text(165, 281, 'YesBot / a helpful conversation', 20, '#ffffff');
  svg += rect(178, 334, 432, 77, '#efebf9', 18) + text(204, 367, 'How can I help you today?', 23, accent, 600) + text(204, 392, 'Knowledge, connected to conversation.', 14, '#7c7193');
  svg += rect(482, 441, 490, 61, accent, 18) + text(510, 479, 'Let’s make support feel more human.', 20, '#ffffff');
  svg += rect(178, 532, 480, 86, '#efebf9', 18) + text(204, 566, 'A thoughtful response starts here.', 20, accent) + text(204, 595, 'Your sources. Your workflows. Your voice.', 14, '#7c7193');
  svg += rect(178, 643, 794, 39, '#f0eee8', 19) + text(200, 668, 'Ask a question…', 13, '#8c8696');
  svg += `<circle cx="977" cy="241" r="48" fill="#c5de9b" stroke="${accent}" stroke-width="2"/><rect x="950" y="226" width="53" height="33" rx="10" fill="#fffdf8" stroke="${accent}" stroke-width="2"/><path d="M966 235v4m20-4v4m-22 8q11 11 24 0m-12-29v8" fill="none" stroke="${accent}" stroke-width="3" stroke-linecap="round"/>`;
  return svg;
}

function finance(accent) {
  let svg = rect(155, 246, 892, 476, '#ffffff', 20) + text(191, 291, 'A little more clarity.', 26, accent, 600) + text(191, 322, 'PORTFOLIO  /  TRANSACTIONS  /  TAX', 12, '#7e9b95');
  svg += rect(190, 350, 552, 227, '#eaf4f0', 12);
  svg += `<path d="M214 541h496m-496-60h496m-496-60h496" stroke="#c7e0d7" fill="none"/><path d="m213 532 60-30 51 14 57-59 58 19 57-79 54 32 59-45 91-11" stroke="${accent}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>`;
  ['Connected wallets', 'Organized transactions', 'Simpler tax workflows'].forEach((label, index) => { svg += rect(190, 595 + index * 31, 552, 24, '#f4f7f1', 6) + text(203, 612 + index * 31, label, 12, '#678375'); });
  svg += `<circle cx="878" cy="463" r="107" fill="#e2c990" stroke="${accent}" stroke-width="3"/><circle cx="878" cy="463" r="86" fill="none" stroke="${accent}" stroke-width="2"/>` + text(838, 494, '₿', 88, accent, 600);
  svg += `<circle cx="995" cy="617" r="49" fill="#d0e4d4" stroke="${accent}" stroke-width="2"/><path d="m975 616 15 15 25-30" stroke="${accent}" stroke-width="4" fill="none"/>`;
  return svg;
}

function website(project, accent, soft) {
  let svg = rect(100, 253, 1000, 475, '#34383114', 19) + rect(88, 240, 1000, 475, '#fffdf8', 19);
  svg += rect(88, 240, 1000, 46, accent, 16);
  [114, 134, 154].forEach((x) => { svg += `<circle cx="${x}" cy="263" r="5" fill="#ffffff80"/>`; });
  svg += rect(382, 252, 370, 21, '#ffffff20', 10) + text(425, 267, 'A considered corner of the internet', 11, '#ffffff');
  svg += text(128, 333, project.title, 18, accent, 600) + text(820, 330, 'Explore    About    Contact', 11, accent);
  if (project.id === 'electrawheeler') {
    svg += text(128, 423, 'A greener journey', 36, accent, 600) + text(128, 469, 'starts with a spark.', 36, accent, 600);
    svg += rect(129, 518, 177, 40, accent, 20) + text(148, 544, 'Explore electric  →', 15, '#ffffff');
    svg += `<path d="M616 622c47-53 93-26 147-80 79-79 149-16 280-114" stroke="${soft}" stroke-width="70" fill="none"/><circle cx="771" cy="552" r="49" fill="#fffdf8" stroke="${accent}" stroke-width="8"/><circle cx="978" cy="552" r="49" fill="#fffdf8" stroke="${accent}" stroke-width="8"/><path d="m771 552 72-77 86 0 49 77m-135-77 42 77H771m114 0 33-116h39m-140 33h57" fill="none" stroke="${accent}" stroke-width="10" stroke-linecap="round"/>`;
  } else if (project.id === 'lionlab') {
    svg += text(129, 416, 'Collect a little', 36, accent, 600) + text(129, 461, 'extraordinary.', 36, accent, 600);
    svg += rect(129, 510, 161, 40, accent, 20) + text(150, 536, 'Explore the gallery', 14, '#ffffff');
    for (let i = 0; i < 3; i++) { const x = 570 + i * 152; svg += rect(x, 374 + (i === 1 ? -24 : 15), 137, 224, [soft, '#d8e3c7', '#ead3bd'][i], 16); svg += `<circle cx="${x + 69}" cy="${442 + (i === 1 ? -24 : 15)}" r="39" fill="#fffdf880"/><path d="m${x + 31} 514 36-50 36 50Z" fill="${accent}" opacity=".6"/>`; }
  } else {
    const lines = project.id === 'streetsnap' ? ['Made for', 'your everyday.'] : project.id === 'jd-institute' ? ['A place to', 'think creatively.'] : ['A fresh', 'perspective.'];
    svg += text(130, 421, lines[0], 43, accent, 600) + text(130, 474, lines[1], 43, accent, 600);
    svg += rect(130, 516, 175, 40, accent, 20) + text(151, 542, 'Take a closer look  →', 14, '#ffffff');
    svg += rect(615, 358, 380, 244, soft, 100);
    svg += `<circle cx="798" cy="419" r="40" fill="#d6ab87"/><path d="M754 410c-1-72 90-69 90 0-35 10-52-20-61-15Z" fill="${accent}"/><path d="M705 600v-73c10-74 179-74 194 0v73" fill="${accent}"/><path d="m772 475 26 40 27-40M798 515v83" stroke="#ffffff80" stroke-width="2" fill="none"/><path d="m932 365 7 15 17 5-17 5-7 16-5-16-16-5 16-5Z" fill="${accent}"/>`;
  }
  svg += rect(128, 650, 225, 8, soft, 4) + rect(377, 650, 225, 8, soft, 4) + rect(626, 650, 225, 8, soft, 4);
  return svg;
}

for (const project of projects) {
  const [background, accent, soft] = themes[project.id];
  let body = rect(0, 0, 1200, 850, background, 0);
  body += `<circle cx="1130" cy="95" r="255" fill="${soft}" opacity=".45"/><circle cx="53" cy="811" r="210" fill="${soft}" opacity=".4"/>`;
  body += text(68, 75, `${project.client.toUpperCase()}  /  ${project.category.toUpperCase()}`, 14, accent, 600);
  body += text(66, 142, project.title, project.title.length > 30 ? 36 : 49, accent, 600);
  body += text(69, 183, project.subtitle, 20, accent);
  body += text(69, 802, 'A PROJECT ILLUSTRATION', 11, accent);
  body += text(1010, 802, 'ANKIT / DESIGN', 11, accent);
  if (project.group === 'websites') body += website(project, accent, soft);
  else if (project.group === 'systems') body += system(project, accent);
  else if (project.id === 'yesbot') body += conversation(accent);
  else if (project.id === 'cryptotax') body += finance(accent);
  else body += dashboard(project, accent);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">${body}</svg>`;
  await sharp(Buffer.from(svg)).webp({ quality: 91 }).toFile(`${root}/project-${project.id}.webp`);
  console.log(`Created project-${project.id}.webp`);
}
