# Portfolio — Cloud/DevOps Journey

Website portfolio untuk perjalanan belajar Cloud & DevOps. Dibangun dengan Next.js, di-deploy ke AWS EC2 menggunakan Docker dan GitHub Actions.

---

## Teknologi yang dipakai

| Kegunaan | Teknologi |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 |
| 3D Hero | React Three Fiber + Three.js |
| Blog | MDX (file `.mdx` dibaca langsung tanpa database) |
| Container | Docker (multi-stage build) |
| CI/CD | GitHub Actions |
| Server | AWS EC2 Ubuntu 24 |

---

## Cara menjalankan di lokal

### Prasyarat
- Node.js versi 20 ke atas
- npm

### Langkah-langkah

```bash
# 1. Clone repository ini
git clone https://github.com/yassir420/Portofolio.git
cd Portofolio

# 2. Install semua dependency
npm install

# 3. Jalankan server development
npm run dev
```

Buka browser dan akses **http://localhost:3000**

---

## Cara menjalankan dengan Docker (di lokal)

Kalau mau test versi production di lokal tanpa perlu deploy ke EC2:

```bash
# Build image Docker
docker build -t portfolio:local .

# Jalankan container
docker run -p 3000:3000 portfolio:local
```

Atau pakai Docker Compose (lebih simpel):

```bash
docker compose up
```

Akses di **http://localhost:3000**

---

## Struktur folder

```
Portofolio/
├── src/
│   ├── app/                    # Halaman-halaman website
│   │   ├── page.tsx            # Halaman utama (/)
│   │   ├── about/              # Halaman /about
│   │   ├── skills/             # Halaman /skills
│   │   ├── projects/           # Halaman /projects dan /projects/[slug]
│   │   ├── blog/               # Halaman /blog dan /blog/[slug]
│   │   └── contact/            # Halaman /contact
│   ├── components/
│   │   ├── 3d/                 # Komponen Three.js (hero 3D)
│   │   ├── layout/             # Navbar dan Footer
│   │   └── sections/           # Bagian-bagian halaman
│   ├── content/
│   │   ├── blog/               # File .mdx untuk artikel blog
│   │   ├── projects/           # Data project (projects.ts)
│   │   ├── skills.ts           # Data skill dan kategori
│   │   └── timeline.ts         # Data timeline perjalanan
│   └── lib/
│       ├── constants.ts        # Konfigurasi site (nama, email, sosmed)
│       └── blog.ts             # Fungsi baca file MDX
├── Dockerfile                  # Resep build Docker image
├── docker-compose.yml          # Shortcut jalankan Docker di lokal
└── .github/
    └── workflows/
        └── deploy.yml          # Otomatisasi deploy ke EC2
```

---

## Cara mengubah isi website

### Ganti nama, email, dan sosial media

Buka file **`src/lib/constants.ts`** dan ubah bagian ini:

```ts
export const SITE = {
  name: "Nama Kamu",
  email: "email@kamu.com",
  social: {
    github: "https://github.com/username-kamu",
    linkedin: "https://linkedin.com/in/username-kamu",
  },
  url: "https://domain-kamu.com",
};
```

### Tambah/ubah project

Buka **`src/content/projects/projects.ts`** dan tambahkan objek baru ke array `PROJECTS`.

### Tambah artikel blog

Buat file baru di **`src/content/blog/`** dengan format:

```
src/content/blog/nama-artikel.mdx
```

Isi file harus diawali dengan frontmatter seperti ini:

```mdx
---
title: "Judul Artikelmu"
date: "2025-08-01"
category: "cloud"
tags: ["AWS", "EC2"]
summary: "Satu kalimat ringkasan artikel."
---

Isi artikel di sini...
```

Artikel akan otomatis muncul di halaman `/blog` setelah disimpan.

### Tambah/ubah skill

Buka **`src/content/skills.ts`**.

### Tambah/ubah timeline

Buka **`src/content/timeline.ts`**.

---

## Setup deploy ke EC2 (sekali saja)

### 1. Siapkan EC2

- Launch EC2 dengan **Ubuntu 24.04 LTS** (t3.small minimum, t3.medium lebih nyaman)
- Di Security Group, buka port berikut:
  - **22** — untuk SSH
  - **80** — untuk akses website

> Docker akan diinstall otomatis oleh GitHub Actions saat pertama deploy. Tidak perlu install manual di EC2.

### 2. Tambahkan Secrets di GitHub

Buka repository → **Settings → Secrets and variables → Actions → New repository secret**

| Nama Secret | Isi |
|---|---|
| `EC2_HOST` | IP publik EC2 kamu (contoh: `13.229.x.x`) |
| `EC2_SSH_KEY` | Isi lengkap file `.pem` (private key SSH) |

Cara copy isi file `.pem`:
```bash
cat nama-key.pem
# Copy semua output termasuk baris -----BEGIN RSA PRIVATE KEY----- dan -----END RSA PRIVATE KEY-----
```

### 3. Pastikan repo bersifat Public

Repository ini harus **Public** supaya EC2 bisa clone kode tanpa perlu token.

---

## Cara deploy

Tidak perlu langkah manual. Cukup:

```bash
git add .
git commit -m "update sesuatu"
git push origin main
```

GitHub Actions akan otomatis:
1. SSH masuk ke EC2
2. Install Docker jika belum ada
3. Clone/pull kode terbaru
4. Build Docker image di EC2
5. Jalankan container baru di port 80
6. Hapus image lama

Proses selesai dalam sekitar 5–10 menit. Website langsung bisa diakses di `http://IP-EC2-kamu`.

---

## Melihat log deploy

Buka tab **Actions** di repository GitHub untuk melihat status dan log setiap deploy.

Kalau ada error, log akan menunjukkan di langkah mana gagalnya.

---

## Troubleshooting umum

**Build gagal karena RAM kurang**
→ Upgrade EC2 ke t3.medium (4GB RAM). `docker build` untuk Next.js butuh sekitar 1–2GB RAM.

**Website tidak bisa diakses setelah deploy**
→ Pastikan Security Group EC2 membuka port 80.

**Error `Permission denied` saat SSH**
→ Pastikan isi `EC2_SSH_KEY` di GitHub Secrets sudah benar dan lengkap termasuk header/footer `-----BEGIN...-----`.

**Container jalan tapi halaman error**
→ Cek log container di EC2:
```bash
docker logs portfolio
```
