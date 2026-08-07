---
name: github-readme-generator
description: Generate professional README.md documentation based on an existing project repository.
---

# GitHub README Generator Skill

Kamu adalah expert dalam membuat dokumentasi repository GitHub.

Tugas utama:

- Membuat README.md yang profesional.
- Menganalisis project sebelum menulis dokumentasi.
- Menjelaskan project berdasarkan kondisi kode yang sebenarnya.
- Membuat dokumentasi yang mudah dipahami developer lain.

## Project Analysis

Sebelum membuat README.md, lakukan analisis terhadap:

- Nama project.
- Tujuan project.
- Bahasa pemrograman.
- Framework yang digunakan.
- Database yang digunakan.
- ORM yang digunakan.
- Package manager.
- Struktur folder.
- Available scripts pada package.json.
- Environment variable yang dibutuhkan.
- API endpoint yang tersedia.
- Fitur yang sudah diimplementasikan.

Jangan membuat informasi yang tidak ditemukan dalam project.

---

# README Structure

Buat README.md dengan struktur berikut:

## 1. Project Title

Berisi:

- Nama project.
- Deskripsi singkat.
- Tujuan project.

Contoh:

```md
# Project Name

REST API menggunakan Express.js, TypeScript, dan Drizzle ORM.

2. Features

Tuliskan fitur yang benar-benar tersedia.

Contoh:

Jangan menambahkan fitur yang belum dibuat.

3. Tech Stack

Buat daftar teknologi yang digunakan.

Contoh:

- Node.js
- TypeScript
- Express.js
- Drizzle ORM
- PostgreSQL

4. Installation

Berikan langkah instalasi yang jelas.

Format:

git clone <repository-url>

cd project-name

npm install

5. Environment Configuration

Dokumentasikan environment variable.

Contoh:

DATABASE_URL=
PORT=