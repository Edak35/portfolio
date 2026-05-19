import sharp from 'sharp';
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const cwd = process.cwd();

const tasks = [
  {
    src: '_source/pfp.png',
    dest: 'public/images/personal/cade-profile.jpg',
    compress: true,
    format: 'jpeg',
    quality: 85,
  },
  {
    src: '_source/Competitions/iMasons/Award Photo.JPEG',
    dest: 'public/images/competitions/thermoloop-award.jpg',
    compress: false,
  },
  {
    src: '_source/Competitions/iMasons/Pitch Photo.JPEG',
    dest: 'public/images/competitions/thermoloop-pitch.jpg',
    compress: false,
  },
  {
    src: '_source/Competitions/ball-innov8x/Award Photo.JPEG',
    dest: 'public/images/competitions/ball-award.jpg',
    compress: true,
    format: 'jpeg',
    quality: 78,
  },
  {
    src: '_source/Competitions/ball-innov8x/Pitch Photo.JPEG',
    dest: 'public/images/competitions/ball-pitch.jpg',
    compress: true,
    format: 'jpeg',
    quality: 78,
  },
  {
    src: '_source/Projects/arc-ssg/Arcssg Image.png',
    dest: 'public/images/projects/arc-ssg.jpg',
    compress: true,
    format: 'jpeg',
    quality: 82,
  },
  {
    src: '_source/Projects/fea-suspension/FEA Image.png',
    dest: 'public/images/projects/fea-suspension.jpg',
    compress: true,
    format: 'jpeg',
    quality: 85,
  },
  {
    src: '_source/Projects/derby-car/Derby Car Pic.png',
    dest: 'public/images/projects/derby-car.jpg',
    compress: true,
    format: 'jpeg',
    quality: 82,
  },
];

for (const task of tasks) {
  const src = join(cwd, task.src);
  const dest = join(cwd, task.dest);
  if (!existsSync(src)) {
    console.error(`MISSING: ${task.src}`);
    continue;
  }
  if (task.compress) {
    await sharp(src).jpeg({ quality: task.quality, mozjpeg: true }).toFile(dest);
  } else {
    copyFileSync(src, dest);
  }
  const { size } = (await import('node:fs')).statSync(dest);
  console.log(`${task.dest}  ${Math.round(size / 1024)} KB`);
}

const pdfs = [
  ['_source/resume.pdf', 'public/resume.pdf'],
  ['_source/Competitions/iMasons/ThermoLoop_Pitch_Deck.pdf', 'public/documents/thermoloop-pitch.pdf'],
  ['_source/Competitions/ball-innov8x/Ball Challenge Final Presentation.pdf', 'public/documents/ball-innov8x-presentation.pdf'],
  ['_source/Projects/fea-suspension/MEGN324_FinalReport_CadeKaminski.pdf', 'public/documents/fea-report.pdf'],
  ['_source/Projects/thermo-chevron/EES Mini-Project Part 3 Cade & Noah.pdf', 'public/documents/chevron-report.pdf'],
  ['_source/Projects/arc-ssg/Final Paper ArcSSG.pdf', 'public/documents/arc-ssg-paper.pdf'],
];

for (const [src, dest] of pdfs) {
  const srcPath = join(cwd, src);
  const destPath = join(cwd, dest);
  if (!existsSync(srcPath)) { console.error(`MISSING: ${src}`); continue; }
  copyFileSync(srcPath, destPath);
  console.log(`Copied: ${dest}`);
}
