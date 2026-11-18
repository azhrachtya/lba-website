import sharp from 'sharp';
import path from 'node:path';

const dir = 'public/images';
// [sumber, hasil, lebar, tinggi (null = proporsional), quality]
const jobs = [
  ['logo.png',      'logo-144.webp',       144,  null, 80],
  ['logo.png',      'logo-288.webp',       288,  null, 80],
  ['about.jpeg',    'about-640x398.webp',  640,  398,  75],
  ['about.jpeg',    'about-1120x696.webp', 1120, 696,  75],
  ['hero.webp',     'hero-768.webp',       768,  432,  70],
  ['hero.webp',     'hero-1280.webp',      1280, 720,  72],
  ['why-crop.webp', 'why-960.webp',        960,  457,  75],
  ['why-crop.webp', 'why-1600.webp',       1600, 762,  75],
  ['about.jpeg',    'about-1600x900.webp', 1600, 900,  75],
  ['why-crop.webp', 'why-m-800.webp',       800, 1200, 72],
  ['why-crop.webp', 'why-1920.webp',        1920, 914, 75],
];

for (const [src, out, w, h, q] of jobs) {
  await sharp(path.join(dir, src))
    .resize(w, h ?? undefined, { fit: 'cover' })
    .webp({ quality: q })
    .toFile(path.join(dir, out));
  console.log('✓', out);
}