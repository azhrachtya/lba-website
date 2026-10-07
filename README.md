# LBA Website (Next.js + Tailwind + Sanity)

## Jalankan lokal
1. `npm install`
2. Daftar di https://www.sanity.io/login (gratis, pakai Google/GitHub)
3. Buat project: https://www.sanity.io/manage → Create project → catat **Project ID**, dataset `production`
4. Isi `.env.local` (copy dari `.env.local.example`)
5. Tambah CORS: sanity.io/manage → project → API → CORS origins → `http://localhost:3000` (centang Allow credentials)
6. `npm run dev` → web di http://localhost:3000, CMS di http://localhost:3000/studio (login pakai akun Sanity)

## Gambar statis (taruh di /public/images)
logo.png, hero.jpg, about.jpg, project.jpg, cta.jpg, indonesia-map.svg
Semua foto di atas bisa juga diupload lewat Studio (siteSettings / project), yang di Studio didahulukan.

## Deploy (Vercel)
Push ke GitHub → import di vercel.com → isi 2 env variable yang sama → Deploy.
Lalu tambah domain Vercel ke CORS Sanity.
