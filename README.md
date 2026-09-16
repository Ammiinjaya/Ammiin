# AMMIIN — Digital Memory Book Website

Website storytelling untuk AMMIIN. Dibangun murni dengan HTML5, CSS3, dan Vanilla JavaScript — tanpa framework, tanpa backend. Sudah berisi foto dan video asli AMMIIN.

## Struktur folder

```
AMMIIN/
├── index.html
├── favicon.png
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── hero.jpg
│   ├── memory-01.jpg ... memory-05.jpg      (foto momen grup asli)
│   ├── member-01.jpg ... member-09.jpg      (foto individual asli)
│   ├── gallery-01.jpg ... gallery-05.jpg    (dipakai ulang dari foto momen)
│   └── vidio1-poster.jpg ... vidio6-poster.jpg (thumbnail video)
├── videos/
│   └── vidio1.mp4 ... vidio6.mp4            (video sudah dikompres untuk web)
└── README.md
```

## Tentang foto & video yang sudah dimasukkan

- Foto asli (termasuk yang tadinya format `.HEIC`) sudah dikonversi ke `.jpg`, diperbaiki orientasinya, dan dikompres supaya ringan di-load.
- 9 foto individual di folder `Foto/` dipetakan ke section **People**, nama diambil dari nama file aslinya (Ageng, April, Geri, Indra, Mek, Sikibb, Thariq, Umar, Wendi). **Role, quote, dan deskripsi masing-masing masih placeholder** — silakan lengkapi di `js/script.js` (array `members`) supaya lebih personal.
- 5 foto momen grup (foto formal, makan bareng, tidur di masjid, foto candid, kumpul di sekre) dipakai di section **Our Memories**, dengan judul & cerita yang saya tulis berdasarkan isi foto. Silakan sesuaikan lagi di array `memories` kalau cerita aslinya berbeda.
- Section **Gallery** ("More Memories") untuk sementara memakai ulang 5 foto yang sama karena baru itu materi foto grup yang tersedia — tambahkan foto baru kapan saja di array `galleryPhotos`.
- 6 video asli sudah dikompres dari total ±328MB (4K) menjadi ±39MB (720p H.264) supaya website tetap cepat dibuka, ditaruh di folder `videos/`. Judul & sinopsis tiap video ada di array `videos` di `js/script.js` — silakan diedit supaya sesuai cerita aslinya.
- Logo/bendera AMMIIN dipakai sebagai favicon (ikon kecil di tab browser).

## Section "Video Kenangan" — cara kerjanya

Section ini sengaja **tidak langsung menampilkan video**. Saat halaman dibuka:
1. Yang muncul pertama adalah panel gelap dengan tombol **"Putar Kenangan"**.
2. Setelah tombol diklik, panel itu hilang dan muncul grid berisi 6 video — masing-masing dengan foto thumbnail, judul, dan sinopsis singkat.
3. Klik salah satu video untuk membuka modal pemutar video (otomatis play) lengkap dengan sinopsis penuhnya.

Kalau mau menambah video baru: taruh file video (format `.mp4`) di folder `videos/`, buat thumbnail-nya, lalu tambahkan satu object baru di array `videos` pada `js/script.js` mengikuti format yang sudah ada.

## ⚠️ PENTING — cara membuka website ini supaya video jalan

Video **wajib** dibuka lewat server lokal (Live Server), **jangan** dengan cara double-click `index.html` langsung atau buka dari aplikasi file di HP. Ini penting karena banyak browser (terutama Chrome/WebView di Android, dan Safari di iOS) membatasi akses video saat halaman dibuka lewat `file://` — biasanya gejalanya persis seperti "cuma kedengeran suaranya doang, videonya nggak muncul", padahal video filenya sendiri baik-baik saja. Kalau dibuka lewat server (`http://...`), masalah ini hilang karena browser memperlakukannya seperti website sungguhan.

Cara paling gampang: ikuti langkah **Cara menjalankan di VS Code** di bawah, lalu selalu buka lewat Live Server. Kalau mau upload ke hosting asli (nanti), video otomatis akan berjalan normal karena hosting selalu menyajikan lewat `http://`/`https://`.

Saya juga sudah menambahkan fallback: kalau suatu saat video tetap gagal diputar langsung di dalam modal, akan muncul link kecil "Buka video di tab baru" di bawah sinopsis supaya video tetap bisa ditonton.

## Cara menjalankan di VS Code

1. Buka folder `AMMIIN` di VS Code (`File → Open Folder...`).
2. Install extension **Live Server** (oleh Ritwick Dey) dari VS Code Marketplace, kalau belum ada.
3. Klik kanan pada `index.html` → **Open with Live Server**.
   - Atau, cukup buka `index.html` langsung di browser (double click) — website tetap jalan karena tidak butuh backend, hanya saja Live Server memberi auto-reload saat kamu mengedit kode.
4. Website akan terbuka di `http://127.0.0.1:5500` (atau port serupa).

## Cara mengganti konten

### Mengganti foto
Cukup timpa file di folder `images/` dengan nama yang sama persis (misalnya `member-01.jpg`), atau ubah path-nya di `js/script.js`.

### Mengganti data anggota (People)
Buka `js/script.js`, cari array `members` di bagian atas. Setiap anggota berbentuk:

```js
{ name: "Nama", role: "Peran", image: "images/member-01.jpg", quote: "Kutipan pendek.", desc: "Deskripsi singkat." }
```

Tinggal ubah teksnya, atau tambah/kurangi baris untuk menambah/mengurangi jumlah anggota — kartu akan otomatis ter-generate.

### Mengganti data kenangan (Memories)
Sama seperti di atas, cari array `memories` di `js/script.js`.

### Mengganti data galeri (Gallery)
Cari array `galleryPhotos` — cukup array berisi path gambar.

### Mengganti data video (Video Kenangan)
Cari array `videos` — setiap video berbentuk:

```js
{ title: "Judul", year: "2025", poster: "images/vidio1-poster.jpg", src: "videos/vidio1.mp4", synopsis: "Sinopsis singkat." }
```

## Penjelasan singkat bagian penting kode

### HTML (`index.html`)
- Struktur dibagi per `<section>` sesuai urutan storytelling: Hero → Introduction → Memories → Story/Timeline → Transition → People → Gallery → Closing → Footer.
- Bagian **Memories**, **People**, dan **Gallery** sengaja dikosongkan (`<div id="memoryGrid"></div>`, dst) karena kontennya di-generate secara dinamis oleh JavaScript dari data di `script.js`. Ini memudahkan penambahan/pengubahan data tanpa menyentuh HTML.
- Dua `<div>` di akhir file (`#lightbox` dan `#memberModal`) adalah kerangka modal yang dipakai ulang untuk semua foto/anggota — isinya diisi ulang oleh JavaScript setiap kali diklik.

### CSS (`css/style.css`)
- Warna, font, dan jarak disimpan sebagai **CSS variable** di `:root` (bagian paling atas file) — jadi kalau mau ubah warna aksen atau font, cukup ubah satu baris di situ.
- `.memory-grid` memakai CSS Grid dengan kolom bervariasi supaya galeri kenangan terasa seperti mosaic, bukan grid kaku.
- `.gallery-grid` memakai `column-count` (masonry sederhana tanpa JavaScript tambahan).
- `.scroll-reveal` adalah class yang elemen-elemennya sengaja disembunyikan (`opacity: 0`) sampai JavaScript menambahkan class `.is-visible` ketika elemen itu masuk ke layar saat scroll.
- Bagian `@media` di paling bawah mengatur tampilan mobile: menu berubah jadi hamburger, grid kenangan jadi 2 kolom, galeri jadi 1 kolom, dan modal anggota ditumpuk vertikal.

### JavaScript (`js/script.js`)
Dibagi menjadi beberapa bagian dengan komentar, garis besarnya:
1. **Data** (`memories`, `members`, `galleryPhotos`, `videos`) — satu-satunya tempat yang perlu diedit untuk mengganti konten.
2. **Render** — fungsi yang membaca data di atas dan otomatis membuat elemen HTML (card) untuk tiap kenangan/anggota/foto galeri, lalu memasangnya ke halaman.
3. **Lightbox & Member Modal** — fungsi `openLightbox()`/`closeLightbox()` dan `openMemberModal()`/`closeMemberModal()` yang mengisi modal dengan data yang diklik lalu menampilkannya dengan animasi CSS.
4. **Video gate & modal** — klik tombol `videoGateBtn` memanggil `renderVideoGrid()` (hanya sekali) untuk membuat 6 video card, lalu menyembunyikan gate dan menampilkan grid. Klik salah satu card memanggil `openVideoModal()` yang mengisi `<video>` dengan `src` yang benar dan langsung memutarnya.
5. **Navbar scroll effect** — mengecek posisi scroll (`window.scrollY`) untuk menambah/menghapus class `.is-scrolled` yang mengubah tampilan navbar.
6. **Mobile menu** — toggle class `.is-open` pada menu saat tombol hamburger diklik.
7. **Scroll reveal** — menggunakan `IntersectionObserver`, API bawaan browser yang efisien untuk mendeteksi kapan elemen masuk ke area layar, tanpa perlu menghitung scroll manual.

## Catatan pengembangan lanjutan
- Semua teks masih dalam bahasa Indonesia sesuai brief; silakan sunting langsung di `index.html` untuk teks statis, atau di `script.js` untuk data dinamis.
- Untuk menambah foto lebih banyak di section Memories/Gallery, cukup tambah baris baru di array terkait — layout akan menyesuaikan otomatis.
- Font yang dipakai: **Fraunces** (heading, serif elegan) dan **Karla** (body, sans-serif mudah dibaca), dimuat dari Google Fonts. Jika ingin dipakai offline, unduh file font dan ubah tag `<link>` di `index.html`.
