# LAPORAN PENGUJIAN DAN TINDAK LANJUT EVALUASI (TESTING.md)
**Proyek:** ChemVerse — Laboratorium Kinetika Kimia Kelas 11 SMA (`ReacttionRate11`)  
**Tim:** S2 Pendidikan Kimia · Kelompok 5  
**Tanggal Pengujian:** 24 November 2026  
**Lingkungan Uji:** Windows, Node.js v24.20.0, npm 11.19.1, Vite 8.3.5, React 19  
**Browser Uji:** Google Chrome / Playwright Chromium Headless (Desktop 1440×1000 & Mobile 375×812)

---

## 1. Rekapitulasi Status Temuan Evaluasi (S2-05-01 s.d. S2-05-08)

| ID Temuan | Prioritas | Deskripsi Masalah Awal | Status Perbaikan | Lokasi Berkas Perbaikan |
|---|---|---|---|---|
| **S2-05-01** | **P1** | Sertifikat 100/100 & predikat Master dapat dicetak tanpa kuis atau saat skor 0. Nama siswa tidak persisten di `kinetilab_profile_v1`. | **TERATASI (LULUS)** | [`src/pages/Module5Page.jsx`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/pages/Module5Page.jsx) |
| **S2-05-02** | **P1** | Draf jawaban per butir hilang saat reload/pindah halaman; pengulangan kuis menimpa riwayat kuis sebelumnya. | **TERATASI (LULUS)** | [`src/pages/QuizPage.jsx`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/pages/QuizPage.jsx) |
| **S2-05-03** | **P1** | Nilai JSON valid `"null"` pada `kinetilab_progress_v1` memicu `TypeError: Cannot read properties of null (reading 'milestoneProgress')` & layar putih `#root`. | **TERATASI (LULUS)** | [`src/context/CourseProgressContext.jsx`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/context/CourseProgressContext.jsx) |
| **S2-05-04** | **P2** | Ketika `localStorage.setItem` melempar `QuotaExceededError`, kuis tetap bertindak sukses tanpa pesan kesalahan simpan. | **TERATASI (LULUS)** | [`src/pages/QuizPage.jsx`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/pages/QuizPage.jsx) |
| **S2-05-05** | **P2** | Modul 2 simulator/lab awalnya placeholder dan notasi LaTeX `\(E_a\)` tampil mentah. | **TERATASI (LULUS)** | [`src/pages/Module2Page.jsx`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/pages/Module2Page.jsx), [`src/components/chemistry/VirtualLab.jsx`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/components/chemistry/VirtualLab.jsx) |
| **S2-05-06** | **P1** | Prediktor laju Modul 3 menerima nilai negatif (misal $[B] = -0.20$) dan menghasilkan laju reaksi negatif $r = -0.2500\text{ M}\cdot\text{s}^{-1}$. | **TERATASI (LULUS)** | [`src/pages/Module3Page.jsx`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/pages/Module3Page.jsx), [`src/styles/home.css`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/styles/home.css) |
| **S2-05-07** | **P2** | Pada layar sempit ponsel 375 px, bilah navigasi header dengan `justify-content: center` memotong tombol Beranda dan Modul 1 di luar batas kiri gulir. | **TERATASI (LULUS)** | [`src/styles/home.css`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/styles/home.css) |
| **S2-05-08** | **P2** | Logo ChemVerse menggunakan elemen `<div>` dengan `onClick` tanpa `tabIndex`/keyboard listener sehingga tidak dapat difokuskan tombol Tab. | **TERATASI (LULUS)** | [`src/components/layout/Header.jsx`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/components/layout/Header.jsx), [`src/styles/home.css`](file:///d:/S2/Semester%201/Pengembangan%20Bahan%20Ajar%20Digital%20berbasis%20AI%20dan%20Coding%20untuk%20Pembelajaran%20Kimia/New%20folder/src/styles/home.css) |

---

## 2. Rincian Pelaksanaan Uji (Test Cases)

### TC-01: Navigasi Hash dan Halaman Awal
- **Langkah Uji:** Buka `#home`, navigasikan ke `#modul-1` s.d. `#modul-5`, `#kuis`.
- **Hasil yang Diharapkan:** Setiap rute hash merender komponen halaman yang sesuai tanpa galat perutean.
- **Hasil Aktual:** Lulus. Seluruh 7 rute hash berfungsi mulus dengan browser back/forward support.

### TC-02: Kuis 10 Soal dan Kalkulasi Nilai
- **Langkah Uji:** Kerjakan kuis dengan kombinasi: (a) kirim kosong, (b) 7 benar 3 salah, (c) 10 benar.
- **Hasil yang Diharapkan:** (a) Skor 0/100, label Tidak Dijawab; (b) Skor 70/100 (LULUS STANDAR KKM); (c) Skor 100/100, pembahasan lengkap, XP +100.
- **Hasil Aktual:** Lulus. Pembahasan tampil akurat dengan visualisasi status per nomor soal.

### TC-03 & S2-05-02: Persistensi Draf Jawaban dan Riwayat Pengerjaan Kuis
- **Langkah Uji:**
  1. Pilih jawaban pada Soal 1 dan 2 (Terjawab: 2/10), kemudian segarkan halaman (F5) atau pindah ke `#home` lalu kembali ke `#kuis`.
  2. Kumpulkan dengan skor 100/100.
  3. Klik "Ulangi Pengerjaan Kuis", lalu kumpulkan kosong (skor 0/100).
- **Hasil yang Diharapkan:**
  1. Draf jawaban tersimpan di `kinetilab_quiz_history_v1_draft` dan pulih otomatis saat halaman dibuka kembali.
  2. Skor 100/100 dicatat sebagai `bestScore` dalam array `attempts`.
  3. Skor 0 dari percobaan ulang tidak menghapus bukti percobaan pertama; `bestScore` tetap 100.
- **Hasil Aktual:** Lulus. Data kuis tersimpan dengan struktur `{ score, bestScore, correctCount, total, questionVersion, attempts: [...] }`.

### TC-05 & S2-05-06: Validasi Input Konsentrasi Negatif pada Prediktor Modul 3
- **Langkah Uji:** Pada Modul 3 Tab 3.4 (Langkah 4), masukkan nilai $[A] = 0.25$ dan $[B] = -0.20$.
- **Hasil yang Diharapkan:** Sistem menolak masukan negatif, menampilkan pesan peringatan: *"Konsentrasi molar tidak dapat nol atau negatif"*, dan menghentikan perhitungan sehingga tidak menghasilkan nilai laju negatif ($r < 0$).
- **Hasil Aktual:** Lulus. Nilai prediksi menampilkan placeholder aman `— Masukkan konsentrasi positif untuk melihat hasil —` dan banner peringatan merah aktif.

### TC-10 & S2-05-07: Tampilan Bilah Navigasi Layar Ponsel (Viewport 375×812 px)
- **Langkah Uji:** Buka aplikasi pada mode inspeksi peramban lebar 375 px (iPhone SE / standar mobile).
- **Hasil yang Diharapkan:** Tombol "🏠 Beranda" dan "🧪 Modul 1" tampak di sisi kiri bilah navigasi tanpa terpotong ke koordinat negatif.
- **Hasil Aktual:** Lulus. Properti `justify-content: flex-start` pada `@media (max-width: 960px)` memastikan menu selalu mulai dari koordinat `scrollLeft = 0` dan dapat digulir bebas ke kanan.

### TC-11 & S2-05-08: Aksesibilitas Keyboard Logo Header ChemVerse
- **Langkah Uji:** Tekan tombol `Tab` berulang kali dari awal dokumen untuk mencapai logo header. Tekan tombol `Enter` atau `Space`.
- **Hasil yang Diharapkan:** Fokus keyboard berpindah ke logo ChemVerse dengan garis batas fokus (`focus-visible`) yang jelas, dan penekanan `Enter`/`Space` mengarahkan ke `#home`.
- **Hasil Aktual:** Lulus. Wadah logo diubah menjadi elemen semantik `<button type="button" className="brand-group" aria-label="Kembali ke Beranda ChemVerse">`.

### TC-14 & TC-15: Pengujian Build Produksi dan Preview
- **Perintah:** `npm run build && npm run preview`
- **Hasil Aktual:** Lulus. Vite mentranspilasi 68 modul dengan keluaran berkas `dist/index.html` (0.90 kB), `dist/assets/index-*.css` (96.58 kB), dan `dist/assets/index-*.js` (992 kB) tanpa kegagalan sintaks.

### TC-23 & S2-05-03: Ketahanan terhadap JSON Null dan Storage Rusak
- **Langkah Uji:** Jalankan `localStorage.setItem('kinetilab_progress_v1', 'null')` lalu muat ulang halaman.
- **Hasil yang Diharapkan:** Fungsi `validateProgress` mendeteksi bahwa data bukan objek progres valid, lalu memulihkan ke `defaultProgress` tanpa memicu `TypeError`.
- **Hasil Aktual:** Lulus. Aplikasi terbuka normal tanpa layar putih (#root utuh).

### S2-05-04: Simulasi Kegagalan Penyimpanan QuotaExceededError
- **Langkah Uji:** Simulasikan kegagalan `localStorage.setItem` saat submit kuis.
- **Hasil yang Diharapkan:** Tampil banner peringatan penyimpanan gagal di atas kartu hasil kuis, sementara pembahasan tetap dapat dipelajari oleh siswa.
- **Hasil Aktual:** Lulus. State `saveError` mengaktifkan komponen peringatan penyimpanan di antarmuka.

---

## 3. Catatan Pengujian Tambahan
- **Autentikasi Firebase & Cloud Database:** Fitur login email & Google Sign-In terintegrasi dengan Firebase SDK v12 (`ihir-fecd3`). Apabila pengguna tidak memiliki koneksi internet, fallback Local-First tetap aktif penuh.
- **Panel Guru:** Guru yang telah masuk dapat mengakses rekapitulasi nilai kuis siswa, mengelola data rombel/kelas, dan mengekspor nilai ke format CSV.

