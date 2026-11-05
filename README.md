# LBA Website (Next.js + Tailwind + Sanity)

## Jalankan lokal
1. Gunakan Node.js `20.19.x` atau versi yang sesuai dengan `package.json#engines`.
2. `npm ci`
3. Isi `.env.local` (copy dari `.env.local.example`).
4. Tambah CORS di Sanity Manage → project → API → CORS origins untuk `http://localhost:3000`.
5. `npm run dev` → web di http://localhost:3000, CMS di http://localhost:3000/studio.

## Quality gate

```bash
npm test
npm run typecheck
npm run build
```

## Environment

Wajib:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=iq8peaua
NEXT_PUBLIC_SANITY_DATASET=production
SITE_URL=http://localhost:3000
ROBOTS_INDEX=false
```

Gunakan `ROBOTS_INDEX=false` pada local/staging dan `true` hanya pada production. Translasi upstream default nonaktif; untuk mengaktifkannya diperlukan `TRANSLATE_API_ENABLED=true` dan `GOOGLE_TRANSLATE_API_KEY`. Tanpa keduanya endpoint mengembalikan teks asli tanpa memanggil Google.
Jangan commit key atau kredensial ke repository.

## Gambar statis

Aset statis berada di `/public/images` dan `/public/videos`. Konten/gambar dari Sanity akan didahulukan jika tersedia.

## Deploy cPanel Biznet Gio

Ikuti [`DEPLOY_CPANEL.md`](./DEPLOY_CPANEL.md). Ringkasnya: buat **Setup Node.js App** dengan Node `20.19.x`, mode `Production`, startup file `server.js`, set environment, jalankan `npm ci` dan `npm run build`, lalu restart aplikasi.

Deploy ke staging dan selesaikan smoke test sebelum mengubah DNS produksi.
