# Product Requirements Document (PRD)
## Web Pembelajaran Kimia: Laju Reaksi Interaktif Kelas 11 SMA
**Proyek:** *KinetiLab 11 — Kursus & Lab Virtual Laju Reaksi Kimia*  
**Versi Dokumen:** 1.0 (Draft Rencana)  
**Status:** Siap Ditinjau & Diimplementasi  

---

### 1. Ringkasan Eksekutif & Tujuan Produk
*KinetiLab 11* adalah platform pembelajaran kimia digital berbasis web yang dirancang khusus untuk siswa SMA Kelas 11 (Fase F Kurikulum Merdeka). Aplikasi ini mengemas materi Laju Reaksi, yang selama ini dianggap abstrak karena menyangkut gerak dan tumbukan partikel yang tidak kasatmata serta perhitungan berbasis data percobaan, menjadi **alur kursus interaktif berurutan (guided learning journey)** yang dilengkapi **simulator tumbukan partikel**, **laboratorium virtual**, **kalkulator orde reaksi**, **grafik interaktif**, serta **sistem evaluasi adaptif dengan gamifikasi**.

#### Tujuan Utama:
1. Membantu siswa memahami laju reaksi dari tingkat makroskopis (perubahan warna, gelembung gas, waktu reaksi) hingga tingkat mikroskopis (tumbukan efektif antarpartikel dan energi aktivasi).
2. Menyediakan visualisasi interaktif pada faktor-faktor yang memengaruhi laju reaksi (konsentrasi, luas permukaan, suhu, dan katalis) sehingga siswa dapat "melihat" penjelasan teori tumbukan secara langsung.
3. Melatih kemampuan menganalisis data percobaan: menentukan orde reaksi, persamaan laju, dan tetapan laju ($k$) secara bertahap dan transparan.
4. Memberikan pengalaman belajar mandiri terstruktur dengan umpan balik instan (*instant feedback*) dan pembahasan langkah demi langkah.

---

### 2. Sasaran Pengguna & Kebutuhan (User Persona)
- **Siswa Kelas 11 SMA:** Membutuhkan media belajar yang visual, tidak membosankan, mudah dipahami langkah demi langkah, dan bisa diakses lancar di smartphone maupun laptop. Bagian yang umumnya menjadi tantangan adalah membayangkan tumbukan partikel dan menentukan orde reaksi dari tabel data.
- **Guru Kimia SMA:** Membutuhkan media peraga digital di kelas untuk mendemonstrasikan faktor-faktor laju reaksi dan analisis data percobaan tanpa perlu alat serta bahan lab kimia basah.

---

### 3. Konsep Desain & Identitas Visual (UI/UX)
Platform mengusung tema **Clean Academic Light Mode** agar konsisten dengan seri pembelajaran kimia sebelumnya:
- **Palet Warna:**
  - *Primary Background:* Putih bersih dan abu-abu kebiruan sangat lembut (`#F8FAFC`, `#FFFFFF`).
  - *Primary Accent:* Biru Kimia Sains Profesional (`#0284C7` / `#2563EB`) yang memberikan kesan akademis, fokus, dan kredibel.
  - *Secondary / Accent Highlights (dengan makna semantik):*
    - Cyan laboratorium (`#06B6D4`) untuk elemen lab dan grafik utama.
    - Emerald (`#10B981`) untuk tumbukan efektif dan jawaban benar.
    - Amber (`#F59E0B`) untuk energi aktivasi dan peringatan.
    - Rose (`#EF4444`) untuk tumbukan tidak efektif dan jawaban salah.
    - Violet (`#8B5CF6`) untuk katalis.
  - *Typography:* Tipografi modern nan jernih (Inter / Plus Jakarta Sans) dengan hirarki keterbacaan tinggi. Format rumus kimia dan persamaan laju ditulis rapi dengan subskrip/superskrip presisi (misal: $\text{Na}_2\text{S}_2\text{O}_3$, $E_a$, $v = k[\text{A}]^m[\text{B}]^n$).
- **Komponen Visual:**
  - Kartu pembelajaran berbayang lembut (*soft layered cards*), borders tipis bersih, dan ikon sains modern.
  - Grafik dan simulasi memakai gaya visual seragam (warna, ketebalan garis, label sumbu) agar siswa tidak perlu beradaptasi ulang di setiap bab.
  - Tata letak responsif (mobile-friendly dan desktop-optimized).

---

### 4. Struktur Arsitektur & Alur Navigasi (Sequential Course Journey)
Aplikasi menggunakan pola **Alur Berurutan ala Kursus Interaktif (Guided Course Progression)**. Siswa dipandu melalui peta perjalanan belajar (Milestone Path) yang berurutan, dengan penanda progres (*checkbox/progress bar*) yang otomatis tersimpan di peramban (`localStorage`).

```
[ Beranda / Peta Belajar Kursus + Tes Diagnostik Awal (Pre-test) ]
          │
          ▼
[ Bab 1: Konsep Laju Reaksi & Cara Menyatakannya ]
  ├── 1.1 Pengertian Laju Reaksi (Perubahan Konsentrasi per Waktu)
  ├── 1.2 Laju Reaksi Rata-rata vs Laju Sesaat [Grafik Interaktif]
  ├── 1.3 Hubungan Laju Reaksi dengan Koefisien Reaksi
  └── Kuis Cek Pemahaman Bab 1
          │
          ▼
[ Bab 2: Teori Tumbukan & Faktor-Faktor yang Memengaruhi Laju ]
  ├── 2.1 Teori Tumbukan & Tumbukan Efektif
  ├── 2.2 Pengaruh Konsentrasi
  ├── 2.3 Pengaruh Luas Permukaan Bidang Sentuh
  ├── 2.4 Pengaruh Suhu
  ├── 2.5 Pengaruh Katalis (Homogen, Heterogen, Enzim)
  ├── Simulator Interaktif: Laboratorium Tumbukan Partikel
  ├── Lab Virtual: Eksperimen Faktor-Faktor Laju Reaksi
  └── Kuis Cek Pemahaman Bab 2
          │
          ▼
[ Bab 3: Persamaan Laju & Orde Reaksi ]
  ├── 3.1 Persamaan Laju Reaksi & Tetapan Laju ($k$)
  ├── 3.2 Menentukan Orde Reaksi dari Data Percobaan
  ├── 3.3 Orde Reaksi 0, 1, dan 2 pada Grafik
  ├── 3.4 Orde Total, Satuan $k$, & Prediksi Laju
  ├── Alat Cerdas: Kalkulator & Solver Orde Reaksi
  └── Kuis Cek Pemahaman Bab 3
          │
          ▼
[ Bab 4: Energi Aktivasi, Mekanisme Reaksi & Penerapan ]
  ├── 4.1 Energi Aktivasi & Diagram Profil Energi
  ├── 4.2 Peran Katalis dalam Menurunkan Energi Aktivasi
  ├── 4.3 Mekanisme Reaksi & Tahap Penentu Laju (Pengayaan)
  ├── 4.4 Laju Reaksi dalam Kehidupan & Industri
  ├── Simulator Interaktif: Diagram Profil Energi Dinamis
  └── Kuis Cek Pemahaman Bab 4
          │
          ▼
[ Bab 5: Evaluasi Akhir & Penghargaan Prestasi ]
  ├── Ujian Komprehensif Laju Reaksi Kelas 11
  ├── Post-test, Analisis Kelemahan, Rekomendasi Remedial, & Pembahasan Lengkap
  └── Sertifikat Kelulusan Digital & Badge Koleksi
```

---

### 5. Detail Spesifikasi Fitur Utama

#### 5.1. Grafik Interaktif Laju Reaksi (Bab 1 & Bab 3)
- **Kurva Konsentrasi terhadap Waktu:**
  - Menampilkan kurva reaktan yang menurun dan produk yang meningkat terhadap waktu.
  - Siswa menggeser slider selang waktu ($\Delta t$) untuk menghitung **laju rata-rata** ($v = \frac{\Delta[\text{P}]}{\Delta t}$), lalu menggeser satu titik waktu untuk melihat garis singgung sebagai **laju sesaat**.
- **Hubungan Laju dan Koefisien:**
  - Untuk reaksi contoh (misal $2\text{N}_2\text{O}_5 \rightarrow 4\text{NO}_2 + \text{O}_2$), siswa melihat bahwa perbandingan laju perubahan tiap zat sama dengan perbandingan koefisien reaksinya.
- **Grafik Orde Reaksi:**
  - Menampilkan kurva $[\text{A}]$ terhadap $t$ dan $v$ terhadap $[\text{A}]$ untuk orde 0, 1, dan 2 secara berdampingan, dengan slider $k$ dan konsentrasi awal.

#### 5.2. Simulator Tumbukan Partikel (Bab 2)
- **Visualisasi Partikel Dinamis (Canvas 2D):**
  - Partikel reaktan bergerak acak di dalam wadah dan bertumbukan satu sama lain.
  - Panel kontrol berisi slider dan tombol:
    - **Suhu:** mengubah kecepatan gerak partikel.
    - **Konsentrasi:** mengubah jumlah partikel per satuan volume.
    - **Luas permukaan:** membandingkan satu keping padatan dengan padatan yang dihaluskan menjadi banyak partikel kecil.
    - **Katalis (on/off):** menurunkan ambang energi aktivasi.
  - Tumbukan dengan energi di atas ambang $E_a$ ditandai **hijau (efektif)** dan menghasilkan produk; tumbukan lainnya ditandai **rose (tidak efektif)** dan partikel memantul.
- **Panel Statistik Langsung:**
  - Menampilkan jumlah tumbukan total, tumbukan efektif, persentase tumbukan efektif, dan laju relatif (tumbukan efektif per detik) dalam mini-grafik waktu nyata.
  - Mini-grafik distribusi energi kinetik dengan area di atas $E_a$ diarsir, sehingga siswa melihat mengapa kenaikan suhu atau penambahan katalis memperbesar fraksi tumbukan efektif.
- **Catatan:** simulasi bersifat kualitatif-edukatif untuk membangun intuisi, bukan model kuantitatif eksak. Catatan ini ditampilkan jelas di antarmuka.

#### 5.3. Laboratorium Virtual Faktor Laju Reaksi (Bab 2)
- **Eksperimen A: Tablet Effervescent**
  - Variasi suhu air (dingin, suhu ruang, hangat) dan bentuk tablet (utuh, dipecah, serbuk).
  - Stopwatch interaktif mencatat waktu hingga tablet larut sempurna; hasil masuk otomatis ke tabel data.
- **Eksperimen B: Reaksi $\text{Na}_2\text{S}_2\text{O}_3$ dengan $\text{HCl}$ (Uji Tanda Silang)**
  - Reaksi: $\text{Na}_2\text{S}_2\text{O}_3 + 2\text{HCl} \rightarrow 2\text{NaCl} + \text{S} + \text{SO}_2 + \text{H}_2\text{O}$.
  - Siswa memvariasikan konsentrasi $\text{Na}_2\text{S}_2\text{O}_3$ dan mengukur waktu hingga tanda silang di dasar gelas tidak terlihat akibat endapan belerang.
  - Sistem menampilkan grafik $\frac{1}{t}$ terhadap konsentrasi sebagai ukuran laju relatif.
- **Eksperimen C: Penguraian $\text{H}_2\text{O}_2$ dengan Katalis**
  - Reaksi: $2\text{H}_2\text{O}_2 \rightarrow 2\text{H}_2\text{O} + \text{O}_2$.
  - Siswa membandingkan tanpa katalis dan dengan beberapa jenis katalis (misal $\text{MnO}_2$, $\text{KI}$) berdasarkan volume gas $\text{O}_2$ terhadap waktu.
- **Pembuatan Data & Laporan Singkat:**
  - Data dihasilkan dari model kinetika sederhana dengan variasi acak kecil agar terasa seperti data percobaan nyata.
  - Setiap eksperimen ditutup dengan pertanyaan penarik kesimpulan dan tombol **unduh lembar kerja praktikum** (PDF/cetak).

#### 5.4. Alat Cerdas: Kalkulator & Solver Orde Reaksi (Bab 3)
- **Input Data Percobaan:**
  - Tabel isian dengan 2 reaktan ($[\text{A}]$, $[\text{B}]$), kolom laju awal ($v$), minimal 3 dan maksimal 6 baris percobaan. Tersedia contoh data siap pakai.
- **Penyelesaian Transparan Langkah demi Langkah:**
  1. Sistem mengenali pasangan percobaan yang konsentrasi salah satu reaktannya tetap.
  2. Menghitung orde terhadap tiap reaktan dari perbandingan $\left(\frac{[\text{A}]_2}{[\text{A}]_1}\right)^m = \frac{v_2}{v_1}$.
  3. Menyusun persamaan laju $v = k[\text{A}]^m[\text{B}]^n$ dan orde total.
  4. Menghitung nilai $k$ beserta satuannya.
  5. Memprediksi laju untuk konsentrasi baru yang diinput siswa.
- **Validasi Data:** peringatan jika data tidak konsisten atau orde hasil hitungan bukan bilangan bulat yang wajar.
- **Mode Latihan (Tebak Dulu):** siswa menebak nilai $m$ dan $n$ terlebih dahulu, kemudian sistem memeriksa dan menjelaskan letak kesalahan jika ada.

#### 5.5. Kalkulator Pengaruh Suhu & Diagram Profil Energi (Bab 2 & Bab 4)
- **Kalkulator Pengaruh Suhu:**
  - Input laju awal ($v_1$), suhu awal ($T_1$), suhu akhir ($T_2$), dan faktor kenaikan laju per $10\,^\circ\text{C}$ (misal 2× atau 3×).
  - Sistem menghitung laju baru dengan $v_2 = v_1 \times n^{\frac{T_2 - T_1}{10}}$, lengkap dengan langkah hitung dan grafik kenaikannya.
- **Diagram Profil Energi Dinamis:**
  - Siswa mengubah slider $E_a$ dan $\Delta H$ (reaksi eksoterm atau endoterm), dan menyalakan/mematikan katalis.
  - Diagram menampilkan label reaktan, kompleks teraktivasi, dan produk, serta menunjukkan bahwa katalis menurunkan $E_a$ tanpa mengubah $\Delta H$.

#### 5.6. Arena Kuis Adaptif & Gamifikasi (Bab 5 & Tiap Modul)
- **Sistem Soal Bertingkat:**
  - Soal Konseptual (Level 1), Soal Hitungan (laju rata-rata, hubungan koefisien, orde reaksi, pengaruh suhu) (Level 2), dan Soal Analisis Data/Grafik/Studi Kasus bergaya HOTS (Level 3).
  - Format soal: pilihan ganda, isian angka (dengan toleransi pembulatan), dan analisis tabel/grafik.
- **Pre-test & Post-test:**
  - Tes diagnostik awal (sekitar 10 soal) di Beranda, dan post-test dengan soal setara di Bab 5 untuk melihat peningkatan pemahaman.
- **Pembahasan Langkah demi Langkah:**
  - Tombol "Lihat Pembahasan Detail" dan "Petunjuk Rumus" jika siswa membutuhkan bimbingan.
- **Analisis Kelemahan & Rekomendasi Remedial:**
  - Skor dipetakan per subbab. Jika di bawah ambang batas, sistem menampilkan tautan "Ulangi Materi" ke subbab yang relevan.
- **Sistem Poin (XP) & Lencana Keberhasilan:**
  - Badge prestasi: *"Pemburu Tumbukan"*, *"Ilmuwan Lab Virtual"*, *"Detektif Orde Reaksi"*, *"Ahli Katalis"*, hingga *"Master Laju Reaksi Kelas 11"*.
  - Riwayat skor dan status kelulusan tersimpan di `localStorage`. Ambang kelulusan default 70% dan dapat dikonfigurasi.
- **Sertifikat Kelulusan Digital:**
  - Berisi nama siswa (diisi sendiri), tanggal, dan skor akhir; dapat diunduh/dicetak lewat print stylesheet atau ekspor canvas ke gambar.

#### 5.7. Mode Presentasi Guru
- Tombol layar penuh pada simulator dan lab virtual dengan ukuran huruf dan kontrol lebih besar untuk diproyeksikan di kelas.
- Kontrol cepat untuk mengatur ulang simulasi dan menjeda animasi saat guru menjelaskan.

---

### 6. Spesifikasi Teknis & Stack Implementasi
- **Framework:** React 19 + Vite (modern, modular, ringan, dan loading cepat).
- **Styling:** CSS3 Modern Vanilla (Custom Design System: CSS Variables, Flexbox/Grid, micro-animations).
- **Simulasi & Grafik:** Canvas 2D untuk simulator partikel dan SVG untuk grafik, ditulis sendiri tanpa library grafik berat. Jumlah partikel menyesuaikan kemampuan perangkat secara otomatis.
- **Penyimpanan Status:** `localStorage` (progres bab, riwayat kuis, data lab, konfigurasi preferensi pengguna) dengan struktur berikut:
  ```json
  {
    "kinetilab:v1": {
      "profile": { "nama": "" },
      "progress": { "bab1": { "1.1": true, "1.2": false } },
      "quiz": { "bab2": { "bestScore": 0, "attempts": [] } },
      "pretest": { "score": null },
      "posttest": { "score": null },
      "xp": 0,
      "badges": [],
      "lab": { "expA": [], "expB": [], "expC": [] },
      "prefs": { "fontSize": "md", "reducedMotion": false }
    }
  }
  ```
- **Formula & Simbol Kimia:** Komponen typography ramah subskrip/superskrip untuk rumus kimia dan persamaan laju, tanpa ketergantungan library berat eksternal.
- **Bank Soal:** Disimpan sebagai berkas JSON terpisah per bab, memuat tingkat kesulitan, kunci jawaban, petunjuk, dan pembahasan agar mudah ditambah atau direvisi.
- **Performa:** Bundle awal ringan (target ≤ ±200 KB gzip), lazy loading untuk simulator dan lab virtual, serta ramah koneksi internet sekolah/kuota terbatas.

---

### 7. Rencana Roadmap Pelaksanaan (Implementation Milestones)
1. **Milestone 1:** Pembangunan Core Design System (Clean Academic Light Theme, tokens, layout header, navigasi kursus, sidebar progres, dan penyimpanan `localStorage`).
2. **Milestone 2:** Implementasi Bab 1 (Teori Konsep Laju Reaksi + Grafik Interaktif laju rata-rata dan sesaat).
3. **Milestone 3:** Implementasi Bab 2 (Teori Tumbukan dan faktor-faktor laju, Simulator Tumbukan Partikel, Lab Virtual, dan Kalkulator Pengaruh Suhu).
4. **Milestone 4:** Implementasi Bab 3 & Kalkulator/Solver Orde Reaksi (tabel data, langkah penyelesaian, Mode Tebak Dulu, dan grafik orde).
5. **Milestone 5:** Implementasi Bab 4 & Diagram Profil Energi Dinamis, serta konten penerapan dalam kehidupan dan industri.
6. **Milestone 6:** Implementasi Bab 5 (Pre-test/Post-test, Ujian Akhir, Analisis Kelemahan, Gamifikasi, Sistem Badge, dan Sertifikat Kelulusan).
7. **Milestone 7:** Pengujian menyeluruh (akurasi hitungan dan kunci soal), uji responsivitas mobile/desktop, aksesibilitas, dan penyempurnaan UI/UX.

---

### 8. Kebutuhan Non-Fungsional
- **Responsif:** Nyaman digunakan mulai lebar layar ±360 px hingga desktop.
- **Aksesibilitas:** Kontras warna memenuhi WCAG AA, slider dan kontrol simulasi dapat dioperasikan dengan keyboard, setiap grafik disertai ringkasan teks/tabel, dan animasi mengikuti preferensi `prefers-reduced-motion`.
- **Fluiditas Simulasi:** Simulator berjalan mulus pada smartphone kelas menengah dengan pembatasan jumlah partikel adaptif.
- **Pengaturan Pengguna:** Ukuran huruf dapat diubah dan tersedia pencarian materi, bookmark, serta catatan pribadi sederhana (disimpan lokal).
- **Privasi:** Tidak ada akun maupun pengiriman data ke server pada versi 1.0; seluruh data pengguna tersimpan di peramban masing-masing.

---

### 9. Metrik Keberhasilan & Batasan Cakupan

#### Metrik Keberhasilan (Target Awal)
- Rata-rata skor post-test lebih tinggi daripada pre-test.
- Mayoritas pengguna yang memulai kursus menyelesaikan Bab 1 dan Bab 2.
- Simulator tumbukan dan solver orde reaksi sering digunakan ulang oleh siswa.
- Umpan balik guru bahwa mode presentasi membantu penjelasan di kelas.

*Angka target spesifik ditetapkan bersama guru/pengguna uji coba setelah prototipe tersedia.*

#### Di Luar Cakupan Versi 1.0
- Login/akun berbasis server dan sinkronisasi antarperangkat.
- Dashboard guru untuk memantau nilai siswa.
- Forum tanya jawab atau chatbot tutor.
- Perhitungan kuantitatif persamaan Arrhenius (dapat dipertimbangkan sebagai materi pengayaan di versi berikutnya).
