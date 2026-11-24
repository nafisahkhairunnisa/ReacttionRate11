# DESAIN TEKNIS DAN ARSITEKTUR SISTEM (DESAIN_TEKNIS.md)
**Proyek:** ChemVerse — Laboratorium Kinetika Kimia Kelas 11 SMA  
**Kelompok:** S2 Pendidikan Kimia · Kelompok 5  
**Framework:** React 19, Vite 8, CSS Modern (Scoped Component Styles), Firebase v12

---

## 1. Arsitektur Komponen

```
src/
├── components/
│   ├── chemistry/
│   │   ├── EnergyDiagram.jsx      # Diagram profil energi SVG eksoterm & endoterm
│   │   └── VirtualLab.jsx         # 3 eksperimen interaktif (Effervescent, Na₂S₂O₃, H₂O₂)
│   ├── common/
│   │   ├── Badge.jsx              # Komponen pill status warna
│   │   ├── Button.jsx             # Komponen tombol semantik
│   │   └── ProgressBar.jsx        # Bilah progres kemajuan modul
│   ├── home/
│   │   └── HomePage.jsx           # Beranda kurikulum kinetika & gate otentikasi
│   └── layout/
│       └── Header.jsx             # Navigasi atas, semantik logo keyboard, status login
├── context/
│   ├── AuthContext.jsx            # Autentikasi Firebase (Google & Email) + Local fallback
│   ├── CourseProgressContext.jsx  # Status progres belajar dengan schema validation
│   └── GamificationContext.jsx    # Perhitungan XP dan lencana prestasi
├── data/
│   ├── classData.js               # Data awal rombel kelas dan rekapitulasi siswa
│   ├── courseChapters.js          # Konten kurikulum 5 bab kinetika kimia
│   └── quizQuestions.js           # Bank 10 butir soal pilihan ganda & pembahasan
├── pages/
│   ├── LoginPage.jsx              # Halaman masuk siswa dan guru
│   ├── Module1Page.jsx            # Modul 1: Konsep Laju Reaksi & Stoikiometri N₂O₅
│   ├── Module2Page.jsx            # Modul 2: Teori Tumbukan & Lab Virtual
│   ├── Module3Page.jsx            # Modul 3: Persamaan Laju, Orde Reaksi & Prediktor Laju
│   ├── Module4Page.jsx            # Modul 4: Suhu, Energi Aktivasi & Profil Katalis
│   ├── Module5Page.jsx            # Modul 5: Ujian Komprehensif & Sertifikat Kelulusan
│   ├── QuizPage.jsx               # Kuis Interaktif 10 Soal dengan auto-save draf
│   └── TeacherDashboardPage.jsx   # Panel Guru: manajemen rombel & ekspor nilai CSV
├── styles/
│   └── home.css                   # Lembar gaya terpadu modern responsif
└── utils/
    ├── authErrors.js              # Pemetaan pesan galat Firebase ke bahasa Indonesia
    └── storage.js                 # Wrapper localStorage aman dengan try-catch
```

---

## 2. Alur Navigasi & Gateway Autentikasi
- Pengguna yang belum login dapat melihat ringkasan kurikulum di Beranda, namun rute modul belajar diproteksi.
- Terdapat tombol *"Masuk untuk Mulai Belajar"* di tengah beranda yang mengarahkan ke formulir masuk.
- Siswa dan guru dapat masuk menggunakan Email/Password atau Akun Google.
- Setelah login, seluruh menu modul (`#modul-1` s.d. `#modul-5`), `#kuis`, dan `#guru` (khusus guru) aktif di bilah navigasi header.

