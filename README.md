# express-js-tutor-m

REST API tutorial menggunakan **Express.js 5**, **TypeScript**, dan **Drizzle ORM** dengan database **PostgreSQL** (Neon Serverless). Project ini dibuat sebagai media belajar untuk memahami struktur project Express + TypeScript yang terorganisir (routes, controller, schema) sekaligus integrasi ORM modern ke database cloud.

## Fitur

- REST API CRUD untuk resource `users` (get all, get by id, create, update, delete).
- Schema database menggunakan Drizzle ORM (`users` dan `galleries` dengan relasi foreign key).
- Migrasi database via Drizzle Kit.
- Endpoint `testapi` yang mengembalikan data statis sebagai contoh respons sederhana.
- Struktur folder yang terpisah antara `routes`, `controller`, `config`, dan `data`.

## Tech Stack

- Node.js
- TypeScript
- Express.js 5
- Drizzle ORM
- PostgreSQL (Neon Serverless)
- Drizzle Kit (migrasi / push schema)
- dotenv
- nodemon

## Instalasi

```bash
git clone <repository-url>

cd express-js-tutor-m

npm install
```

> **Catatan penting:** `package.json` saat ini hanya mendeklarasikan `express` sebagai dependency. Kode juga mengimpor `drizzle-orm`, `@neondatabase/serverless`, dan `dotenv` (serta `drizzle-kit` untuk konfigurasi migrasi) yang belum terdaftar di `package.json`. Instalasi bersih (`npm install` di folder kosong tanpa `node_modules`) akan gagal menjalankan fitur database sampai dependency tersebut ditambahkan ke `package.json`.

## Environment Configuration

Buat file `.env` di root project (contoh ada di `.env.example`):

```env
DATABASE_URL=NEON_DB_KEY
```

Ganti `NEON_DB_KEY` dengan connection string PostgreSQL dari dashboard Neon.

## Menjalankan Project

```bash
npm run dev
```

Server berjalan di `http://localhost:8000` dengan hot-reload via nodemon.

Untuk menerapkan schema ke database Neon (migrasi):

```bash
npx drizzle-kit push
```

> Karena database bersifat remote (Neon), `drizzle-kit push` langsung menerapkan perubahan schema ke database yang aktif.

## API Endpoint

Semua route di-mount di bawah prefix `/api/`.

| Method | Endpoint          | Deskripsi                                      |
| ------ | ----------------- | ---------------------------------------------- |
| GET    | `/`               | Pesan selamat datang ("Hello Express")         |
| GET    | `/api/testapi`    | Mengembalikan data user statis                 |
| GET    | `/api/users`      | Mengambil semua user                           |
| GET    | `/api/users/:id`  | Mengambil satu user berdasarkan id             |
| POST   | `/api/users`      | Membuat user baru (body: `{ "name": "..." }`)  |
| PUT    | `/api/users/:id`  | Mengupdate nama user berdasarkan id             |
| DELETE | `/api/users/:id`  | Menghapus user berdasarkan id                  |

### Contoh Request

**Create User**

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Budi"}'
```

### Format Respons

Semua endpoint mengembalikan JSON dengan struktur berikut:

```json
{
  "success": true,
  "data": { "id": 1, "name": "Budi" }
}
```

## Database Schema

Skema didefinisikan di `src/config/schema/` dan dire-export melalui `src/config/schema.ts`.

### Tabel `users`

| Kolom  | Tipe    | Keterangan                 |
| ------ | ------- | -------------------------- |
| id     | serial  | Primary key                |
| name   | varchar | Nama user (wajib, max 100) |

### Tabel `galleries`

| Kolom  | Tipe    | Keterangan                        |
| ------ | ------- | --------------------------------- |
| id     | serial  | Primary key                       |
| user_id| integer | Foreign key ke `users.id`         |
| title  | varchar | Judul galeri (wajib, max 100)     |

## Struktur Folder

```
express-js-tutor-m/
├── src/
│   ├── index.ts                  # Entry point, mount router di bawah /api/
│   ├── config/
│   │   ├── db.ts                 # Koneksi Drizzle + Neon
│   │   ├── schema.ts             # Re-export seluruh schema
│   │   └── schema/
│   │       ├── role/users.ts     # Tabel users
│   │       └── gallery/gallerys.ts # Tabel galleries
│   ├── routes/
│   │   ├── auth/auth.routes.ts   # Route CRUD users
│   │   └── testapi/testapi.routes.ts # Route testapi
│   ├── controller/
│   │   ├── auth/auth.controller.ts   # Handler CRUD users
│   │   └── testapi/testapi.controller.ts # Handler testapi
│   └── data/
│       └── user.data.ts          # Data statis untuk testapi
├── drizzle/                      # Hasil migrasi Drizzle Kit
├── drizzle.config.ts             # Konfigurasi Drizzle Kit
├── package.json
└── tsconfig.json
```

## Lisensi

ISC
