# BACKLOG PENGEMBANGAN FITUR (BACKLOG.md)
**Proyek:** ChemVerse — Laboratorium Kinetika Kimia Kelas 11 SMA  
**Kelompok:** S2 Pendidikan Kimia · Kelompok 5

---

## 1. Sprint 1: Pondasi & Konten Pembelajaran (Selesai)
- [x] Inisialisasi proyek React 19 + Vite 8 dengan styling CSS modern responsif.
- [x] Pembuatan Beranda interaktif dengan navigasi hash 7 halaman (`#home`, `#modul-1` s.d. `#modul-5`, `#kuis`).
- [x] Modul 1: Konsep Laju Reaksi, kalkulator stoikiometri $2\text{N}_2\text{O}_5 \rightarrow 4\text{NO}_2 + \text{O}_2$, rasio laju $r$, tanda $(+/-)$.
- [x] Modul 2: Teori Tumbukan, energi aktivasi ($E_a$), integrasi PhET Diffusion, dan Virtual Lab 3 eksperimen (Effervescent, Na₂S₂O₃, H₂O₂).
- [x] Modul 3: Persamaan Laju Reaksi, grafik kinetika Orde 0, 1, 2, Solver 4 langkah, dan Prediktor Laju Kinetika.
- [x] Modul 4: Pengaruh Suhu, Energi Aktivasi, dan Diagram Profil Energi SVG interaktif (Eksoterm/Endoterm dengan Katalis).
- [x] Modul 5: Ujian Komprehensif, Analisis Diagnostik Remedial, dan Sertifikat Kelulusan Digital.
- [x] Kuis Interaktif 10 Soal Pilihan Ganda dengan petunjuk rumus, pembahasan kimia mendalam, dan poin XP gamifikasi.

## 2. Sprint 2: Autentikasi, Database, & Peran Guru (Selesai)
- [x] Sistem autentikasi pengguna (Siswa & Guru) dengan dukungan Email/Password dan Google Sign-In via Firebase Auth.
- [x] Panel Guru (`#guru`) untuk rekapitulasi nilai kuis siswa, manajemen kelas/kelompok, dan ekspor data nilai ke format CSV UTF-8.
- [x] Gateway perlindungan rute: pengguna belum login diarahkan ke login terpusat.
- [x] Integrasi database Firestore & sinkronisasi multi-perangkat dengan Local-First fallback.

## 3. Sprint 3: Tindak Lanjut Evaluasi Peer Review (Selesai)
- [x] **S2-05-01 (P1):** Gate sertifikat digital — hanya dapat dicetak jika ada skor kuis valid $\ge 70$, nama persisten di storage.
- [x] **S2-05-02 (P1):** Simpan draf kuis per butir dan simpan riwayat kuis lengkap (skor baru tidak menimpa skor lama).
- [x] **S2-05-03 (P1):** Tangani nilai JSON `"null"` pada progres agar tidak memicu `TypeError` layar kosong.
- [x] **S2-05-04 (P2):** Tampilkan pesan peringatan jika penyimpanan hasil kuis ke `localStorage` gagal.
- [x] **S2-05-05 (P2):** Sinkronisasi klaim beranda dengan status simulator aktif (VirtualLab & PhET telah terintegrasi penuh).
- [x] **S2-05-06 (P1):** Validasi domain input konsentrasi non-negatif pada prediktor laju Modul 3.
- [x] **S2-05-07 (P2):** Perbaikan tata letak navigasi header pada viewport sempit ponsel 375 px (`justify-content: flex-start`).
- [x] **S2-05-08 (P2):** Aksesibilitas keyboard pada logo header ChemVerse (`<button>` semantik dengan `:focus-visible`).

