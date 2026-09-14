import { chromium } from '@playwright/test';
import { profile, experience, education, projects, skills } from '../src/data/portfolio.js';

const escape = (text) => String(text).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const jobProjects = ['neostra', 'tejas', 'kamdhenu'];
const resumeHighlights = {
  tejas: [
    'Designed and launched five internal business products: Chiraag, Tejas Captain, ContractorBhai, MistriBhai, and Adhikar.',
    'Led UX strategy with business leadership, defining product vision, user journeys, workflows, and feature roadmaps.',
    'Established a unified design system and supported the Tejas ecosystem through branding, websites, presentations, and product identities.',
  ],
  kamdhenu: [
    'Designed user-centric interfaces for dealer management, contractor loyalty, product marketing, and sales enablement.',
    'Collaborated with product, engineering, sales, and marketing to deliver digital experiences aligned with business objectives.',
    'Contributed to product branding, campaigns, websites, presentations, and scalable design assets across the digital ecosystem.',
  ],
};
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${profile.fullName} — Résumé</title><style>
  *{box-sizing:border-box}body{font-family:Arial,sans-serif;color:#28372f;margin:0;font-size:9pt;line-height:1.42}
  h1{font-size:26pt;letter-spacing:-1.2px;margin:0;font-weight:650}h1 span{font-weight:400}header{border-bottom:2px solid #779467;padding-bottom:12px}
  .title{font-size:12pt;color:#5d7852;margin:3px 0 9px}.contact{display:flex;flex-wrap:wrap;gap:4px 16px;font-size:8.2pt;color:#52614a}a{color:inherit;text-decoration:none}
  .summary{margin:15px 0}h2{font-size:9pt;letter-spacing:1.2px;text-transform:uppercase;color:#5d7852;border-bottom:1px solid #ced7c7;padding-bottom:5px;margin:18px 0 10px}
  article{margin-bottom:13px;break-inside:avoid}.job-line{display:flex;justify-content:space-between;align-items:baseline;gap:10px}h3{font-size:11pt;margin:0}.location{font-size:8pt;color:#71816a}
  .role{font-size:9pt;margin:3px 0 6px}ul{margin:5px 0;padding-left:15px}li{padding-left:2px;margin-bottom:4px}.education p{margin:3px 0}.skills p{margin:5px 0}.skills strong{font-size:8.6pt}footer{font-size:7pt;color:#7b8973;border-top:1px solid #dce2d6;margin-top:15px;padding-top:7px}
  @page{size:A4;margin:13mm}
  </style></head><body>
  <header><h1>ANKIT <span>CHANDRAKAR</span></h1><p class="title">Lead Product Designer</p><div class="contact"><a href="${profile.website}">ankitchandrakar.in</a><a href="mailto:${profile.email}">${profile.email}</a><a href="tel:${profile.telephone}">${profile.phone}</a><a href="${profile.socials[0].url}">LinkedIn / ankit-chandrakar-001akki</a></div></header>
  <p class="summary">Lead Product Designer with 2+ years of experience designing enterprise SaaS platforms, AI-powered products, privacy technology, and scalable design systems. Experienced in product strategy, UX research, cross-functional leadership, AI-assisted workflows, and end-to-end product delivery from discovery to implementation. Combines user needs, business goals, and engineering collaboration to build scalable digital products.</p>
  <h2>Work experience</h2>
  ${experience.map((job, index) => `<article><div class="job-line"><h3>${escape(job.company)}</h3><span class="location">${job.location}</span></div><p class="role"><strong>${job.role}</strong> · ${job.period}</p><ul>${(resumeHighlights[jobProjects[index]] || projects.find((project) => project.id === jobProjects[index]).highlights).map((highlight) => `<li>${escape(highlight)}</li>`).join('')}</ul></article>`).join('')}
  <h2>Education</h2><section class="education"><strong>${education.degree}</strong><p>${education.school} · ${education.period}</p></section>
  <h2>Core skills</h2><section class="skills">
  ${skills.map((skill) => `<p><strong>${escape(skill.title)}:</strong> ${escape(skill.items.join(', '))}</p>`).join('')}
  <p><strong>Domain expertise:</strong> Enterprise SaaS, privacy compliance, consent management, DSAR, construction technology, internal business tools, CRM, dealer management, and brand experience.</p>
  <p><strong>Research & strategy:</strong> Competitive analysis, journey mapping, product validation, UX audits, design documentation, product analytics, and A/B testing.</p></section>
  <footer>Portfolio: ankitchandrakar.in · Contact: ${profile.email}</footer></body></html>`;

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.pdf({ path: 'public/ankit-chandrakar-resume.pdf', format: 'A4', printBackground: true, preferCSSPageSize: true });
  console.log('Created public/ankit-chandrakar-resume.pdf');
} finally { await browser.close(); }
