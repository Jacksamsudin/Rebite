# ReBite – Marketplace Makanan Surplus

**ReBite** merupakan aplikasi marketplace yang menghubungkan penjual makanan dengan konsumen untuk menjual makanan surplus atau makanan berlebih dengan harga lebih terjangkau.

Aplikasi ini dibuat sebagai upaya mengurangi pemborosan makanan (*food waste*) sekaligus memberikan kesempatan kepada konsumen untuk mendapatkan makanan dengan harga hemat.

## Fitur Aplikasi

Berikut fitur utama yang tersedia pada aplikasi ReBite:

1. **Login** – Halaman masuk untuk pengguna.
2. **Beranda** – Menampilkan daftar makanan surplus yang tersedia.
3. **Detail Makanan** – Menampilkan informasi produk, harga normal, harga diskon, stok, dan deskripsi makanan.
4. **Checkout** – Memproses ringkasan pesanan, jumlah pembelian, dan metode pembayaran.
5. **Order Ticket** – Menampilkan informasi tiket pesanan dan QR Code untuk simulasi pengambilan pesanan.
6. **Profil** – Menampilkan dan mengelola informasi profil pengguna.
7. **Riwayat Pesanan** – Menampilkan informasi pesanan pengguna.

## Teknologi yang Digunakan

- **React.js** – Library JavaScript untuk membangun antarmuka pengguna.
- **Vite** – Build tool dan development server.
- **React Router DOM** – Mengatur navigasi antarhalaman.
- **JavaScript (ES6+)** – Bahasa pemrograman aplikasi.
- **HTML5** – Membuat struktur halaman.
- **CSS3** – Mengatur tampilan dan desain responsif.
- **Fetch API** – Mengambil data makanan dari file JSON.

## Sumber Data

Aplikasi menggunakan data makanan berbentuk JSON yang disimpan pada:

`public/makanan.json`

Data tersebut berisi informasi seperti:

- ID makanan
- Nama makanan
- Kategori
- Harga normal
- Harga diskon
- Stok
- Lokasi
- Deskripsi
- Nama penjual

Data diambil menggunakan Fetch API melalui service yang tersedia pada:

`src/services/makananService.js`

## Struktur Folder

```text
ReBite/
├── public/
│   └── makanan.json
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── HomePage.jsx
│   │   ├── DetailMakanan.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderTicket.jsx
│   │   ├── ProfilePage.jsx
│   │   └── RiwayatPesanan.jsx
│   │
│   ├── services/
│   │   └── makananService.js
│   │
│   ├── styles/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── index.html
├── package.json
└── README.md
```

## Cara Menjalankan Aplikasi

Pastikan Node.js dan npm sudah terpasang pada komputer.

**1. Clone repository**

```bash
git clone https://github.com/Jacksamsudin/Rebite.git
```

**2. Masuk ke folder proyek**

```bash
cd Rebite
```

**3. Install dependencies**

```bash
npm install
```

**4. Jalankan development server**

```bash
npm run dev
```

**5. Buka aplikasi**

Buka alamat lokal yang muncul pada terminal, biasanya:

`http://localhost:5173`

## Tujuan Pengembangan

Melalui ReBite, diharapkan makanan surplus yang masih layak konsumsi dapat dimanfaatkan kembali sehingga membantu mengurangi food waste.

Selain itu, ReBite diharapkan dapat memberikan alternatif bagi konsumen untuk memperoleh makanan dengan harga yang lebih terjangkau.

---

**ReBite – Save Food, Save Money!**
