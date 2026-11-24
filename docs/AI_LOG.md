# LOG PENGGUNAAN ASISTEN AI (AI_LOG.md)
**Proyek:** ChemVerse — Laboratorium Kinetika Kimia Kelas 11 SMA  
**Kelompok:** S2 Pendidikan Kimia · Kelompok 5  
**Model Asisten:** Antigravity AI Assistant

---

## Log Interaksi dan Pengembangan

### 1. Sesi Awal: Perancangan Beranda & Modul Pembelajaran
- **Tujuan:** Membuat beranda dan struktur modul sesuai PRD dengan pendekatan Local-First.
- **Tindakan:** Mengembangkan komponen modular React 19, kalkulator stoikiometri $2\text{N}_2\text{O}_5$, dan visualisasi laju reaksi dengan simbol baku $r$.

### 2. Sesi Penguatan: Virtual Lab, Solver Orde, & Diagram Energi
- **Tujuan:** Melengkapi Modul 2 dengan Virtual Lab mandiri (3 reaksi), Modul 3 dengan grafik kinetika SVG Orde 0, 1, 2, dan Modul 4 dengan diagram profil energi transisi keadaan endoterm/eksoterm.
- **Tindakan:** Membangun `VirtualLab.jsx` dengan stopwatch dan tabel data pengamatan; memperbaiki notasi LaTeX mentah menjadi representasi HTML subskrip kimia semantik.

### 3. Sesi Autentikasi & Panel Guru: Firebase v12
- **Tujuan:** Mengintegrasikan Firebase Auth (Google + Email) dan dashboard rekapitulasi nilai guru beserta ekspor CSV.
- **Tindakan:** Menambahkan `src/config/firebase.js`, `AuthContext.jsx`, `TeacherDashboardPage.jsx`, dan konfigurasi `.env`.

### 4. Sesi Perbaikan Berdasarkan Hasil Uji Evaluator (24 November 2026)
- **Tujuan:** Merevisi 8 temuan formatif (S2-05-01 s.d. S2-05-08) dari laporan Playwright headless `23_S2_K05_ReacttionRate11.pdf`.
- **Tindakan:**
  1. Memasang validasi ketuntasan sertifikat dan persistensi nama siswa (`Module5Page.jsx`).
  2. Mengimplementasikan penyimpanan draf per butir dan array riwayat pengerjaan `attempts` (`QuizPage.jsx`).
  3. Memasang schema guard `validateProgress` untuk mencegah crash saat nilai JSON `"null"` dibaca (`CourseProgressContext.jsx`).
  4. Menambahkan status dan peringatan antarmuka jika storage penuh (`QuizPage.jsx`).
  5. Memvalidasi domain positif untuk input konsentrasi prediktor laju (`Module3Page.jsx`).
  6. Mengubah `justify-content` bilah navigasi ponsel menjadi `flex-start` (`home.css`).
  7. Mengubah wadah logo menjadi elemen semantik berfokus keyboard (`Header.jsx`).
  8. Menyusun `TESTING.md` komprehensif.

