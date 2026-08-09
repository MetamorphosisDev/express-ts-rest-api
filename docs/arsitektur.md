# Arsitektur Project

Catatan tentang bagaimana project ini disusun dan alur sebuah request diproses.

## Alur Request

```
Client
  │  HTTP Request
  ▼
src/index.ts            ── Entry point, mount semua router di bawah prefix /api/
  │
  ▼
src/routes/<name>/      ── Definisi endpoint (method + path + handler)
  │
  ▼
src/controller/<name>/  ── Logika bisnis handler (baca request, query DB, kirim respons)
  │
  ▼
src/config/db.ts        ── Koneksi Drizzle + Neon (dipakai controller)
src/config/schema/      ── Definisi tabel (users, galleries)
```

## Pembagian Tanggung Jawab

- **routes**: hanya berisi pemetaan URL ke fungsi controller. Tidak berisi logika bisnis.
- **controller**: menerima `req`/`res`, menjalankan logika (CRUD via Drizzle), lalu mengirim respons.
- **config/db.ts**: single source of truth untuk koneksi database. Controller cukup `import { db } from "../../config/db"`.
- **config/schema/**: definisi tabel per domain (misal `role/` untuk users, `gallery/` untuk galleries). Semua di-re-export lewat `src/config/schema.ts` agar pemakaian di controller seragam.
- **data/**: data statis (dipakai endpoint `testapi` sebagai contoh respons tanpa database).

## Menambah Fitur Baru

1. Buat definisi tabel di `src/config/schema/<domain>/<nama>.ts`, lalu re-export di `src/config/schema.ts`.
2. Buat `src/controller/<nama>/<nama>.controller.ts` berisi handler.
3. Buat `src/routes/<nama>/<nama>.routes.ts` yang memetakan URL ke handler.
4. Mount router di `src/index.ts` dengan `app.use("/api/", namaRoutes)`.
5. Terapkan schema ke database: `npx drizzle-kit push`.

## Catatan Express 5

Project ini memakai **Express 5**. Beberapa hal yang berbeda dari Express 4:

- Syntax route memakai `path-to-regexp` v8: wildcard `*` harus ditulis `/*splat`, optional param `:id?`.
- Handler yang melempar error di dalam `async` function otomatis diteruskan ke error handler.
- `app.del()` dan beberapa API lama sudah dihapus/rename (misal `res.sendfile` → `res.sendFile`).

Selalu cek tipe yang terpasang di `node_modules/express` saat ragu, bukan dokumentasi Express 4.
