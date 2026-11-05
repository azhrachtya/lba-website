# Deploy ke Biznet Gio NEO Web Hosting (cPanel)

Panduan ini ditujukan untuk **NEO Web Hosting Personal Extra** dan aplikasi LBA ini. Lakukan staging dahulu; perubahan DNS produksi memerlukan review → GO terpisah.

## 1. Prasyarat

- Paket cPanel menampilkan **Setup Node.js App** dan menyediakan Node `20.19.x` atau yang lebih baru sesuai `package.json#engines`.
- Domain/subdomain staging sudah dibuat, misalnya `staging.example.com`.
- Backup hosting lama dan catatan DNS/TTL sudah tersedia.
- Akses ke Sanity project `iq8peaua` tersedia untuk menambahkan CORS origin.
- Jangan menaruh token/API key di Git, File Manager publik, atau chat.

## 2. Ambil source

Pilihan yang disarankan: cPanel **Git Version Control**.

- Clone URL: `https://github.com/azhrachtya/lba-website.git`
- Branch: branch release yang sudah direview.
- Repository path/application root: direktori di luar `public_html`, misalnya `lba-website`.

Jika Git Version Control tidak tersedia, unggah arsip source tanpa `.git`, `.next`, dan `node_modules`, lalu ekstrak ke application root.

## 3. Buat Node.js App

Di cPanel → **Setup Node.js App** → **Create Application**:

| Field | Nilai |
|---|---|
| Node.js version | `20.19.x` |
| Application mode | `Production` |
| Application root | `lba-website` atau path source |
| Application URL | subdomain staging |
| Application startup file | `server.js` |

Aplikasi memakai `process.env.PORT`; jangan menetapkan port publik secara manual.

## 4. Environment variables

Tambahkan melalui halaman Node.js App sebelum build:

```text
NODE_ENV=production
NEXT_PUBLIC_SANITY_PROJECT_ID=iq8peaua
NEXT_PUBLIC_SANITY_DATASET=production
SITE_URL=https://STAGING-DOMAIN
ROBOTS_INDEX=false
```

Opsional, hanya jika terjemahan otomatis memang diperlukan:

```text
GOOGLE_TRANSLATE_API_KEY=<nilai rahasia>
TRANSLATE_API_ENABLED=true
```

`NEXT_PUBLIC_*` dibundel ketika build. Jika nilainya berubah, jalankan build ulang dan restart aplikasi.

## 5. Install dan build

Gunakan command aktivasi virtual environment yang ditampilkan cPanel, kemudian dari application root:

```bash
node --version
npm --version
npm ci
npm test
npm run typecheck
npm run build
```

Acceptance:

- Node memenuhi `package.json#engines`.
- 14 test lulus.
- Typecheck exit 0.
- Build exit 0 dan menghasilkan `.next`.

Kembali ke **Setup Node.js App** lalu tekan **Restart**.

## 6. Sanity CORS

Di Sanity Manage → project `iq8peaua` → API → CORS Origins:

1. Tambahkan origin HTTPS staging secara exact, tanpa path.
2. Aktifkan credentials hanya bila Studio memerlukannya.
3. Setelah domain final aktif, tambahkan origin final.
4. Hapus origin staging bila staging sudah dipensiunkan.

## 7. Smoke test staging

Jalankan automated smoke test terhadap domain staging:

```bash
SMOKE_BASE_URL=https://STAGING-DOMAIN SMOKE_EXPECT_NOINDEX=true npm run smoke
```

Script memeriksa homepage, locale routing, project/service pages, Studio, robots, sitemap, response translate, dan penolakan MIME invalid. Lanjutkan verifikasi manual berikut:

- `/`
- `/id`
- `/zh`
- `/projects`
- `/id/projects`
- `/services/import-export-cargo-handling`
- `/id/services/import-export-cargo-handling`
- `/studio`
- `/robots.txt`
- `/sitemap.xml`

API translate:

```bash
curl -i \
  -H 'content-type: application/json' \
  --data '{"texts":["Hello"],"lang":"id"}' \
  https://STAGING-DOMAIN/api/translate
```

Periksa:

- Respons 200 dan header `Cache-Control: no-store`.
- Payload invalid ditolak 400/413/415.
- Request berlebihan mendapat 429. Aplikasi membatasi 5 request/menit per key dan 10 request/menit global per proses.
- Satu payload dikirim ke Google sebagai satu batch, bukan satu request upstream per teks. Translasi upstream tetap nonaktif kecuali `TRANSLATE_API_ENABLED=true` dan API key tersedia.
- Pastikan proxy cPanel menimpa `X-Forwarded-For`/`X-Real-IP`; jika tidak dapat dibuktikan, aktifkan rate limit/WAF di depan aplikasi karena header client dapat dipalsukan.
- Log aplikasi tidak berisi stack trace/error berulang.
- Resource cPanel tidak mencapai limit ketika membuka homepage, service page, dan Studio.

## 8. Security gate sebelum production

`npm audit --omit=dev` masih melaporkan advisory transitif pada rantai Sanity CLI/migrate. Versi perbaikan penuh saat panduan ini dibuat adalah Sanity 6, yang membutuhkan Node `22.12+`, sedangkan target tervalidasi untuk paket hosting adalah Node `20.19.x`.

- Staging boleh dilanjutkan untuk verifikasi runtime.
- Production tetap HOLD sampai cPanel terbukti menyediakan Node `22.12+` dan migrasi Sanity 6 lulus, atau risiko residual disetujui secara eksplisit.
- Jangan menjalankan Sanity CLI/migration dari request web atau mengekspos shell cPanel.

## 9. Cutover produksi

Hanya setelah hasil staging direview dan mendapat GO:

1. Turunkan TTL bila registrar mendukung dan waktunya memungkinkan.
2. Backup konfigurasi/DNS aktif.
3. Arahkan domain final ke hosting cPanel.
4. Ubah `SITE_URL` ke domain final dan `ROBOTS_INDEX=true`, lalu build/restart.
5. Aktifkan/verifikasi SSL.
6. Tambahkan origin final ke Sanity CORS.
7. Jalankan smoke test yang sama pada domain final.
8. Pertahankan target lama selama masa observasi untuk rollback.

## 10. Rollback

Jika staging/produksi gagal:

- Restart release terakhir yang lulus build, atau checkout commit/branch sebelumnya lalu `npm ci && npm run build`.
- Untuk kegagalan setelah cutover, pulihkan DNS ke target lama sesuai catatan backup.
- Jangan menghapus backup atau deployment lama sampai observasi selesai.
