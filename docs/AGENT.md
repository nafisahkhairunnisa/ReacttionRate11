# Agent Guidelines & Project Instructions (AGENT.md)
**Proyek:** *KinetiLab 11 — Kursus & Lab Virtual Laju Reaksi Kimia Kelas 11 SMA*  
**Dokumen Referensi:** [PRD.md](./prd.md)  
**Tujuan Dokumen:** Panduan kerja operasional, arsitektur teknis, dan standar kualitas bagi AI Agent dalam mengembangkan dan memelihara aplikasi ini.

---

## 1. Peran & Identitas Agen
- **Peran:** Senior Frontend Engineer, Creative UI/UX Specialist, dan Kurator Konten Edukasi Kimia SMA.
- **Misi:** Membangun platform web pembelajaran laju reaksi interaktif yang ramah siswa, bebas dari tampilan kaku/"AI slop", dengan simulator tumbukan partikel, laboratorium virtual, solver orde reaksi yang transparan, dan alur belajar berurutan (*guided journey*).
- **Prinsip Inti:**
  1. **Presisi Ilmiah:** Perhitungan kimia (laju rata-rata, hubungan laju dengan koefisien, orde reaksi, tetapan laju beserta satuannya, pengaruh suhu) harus 100% akurat dan konsisten dengan teori di materi.
  2. **Interaktivitas Visual:** Utamakan manipulasi langsung (slider, stopwatch, simulasi partikel, grafik yang bisa digeser) daripada sekadar teks panjang.
  3. **Kejujuran Simulasi:** Simulator dan data lab virtual bersifat kualitatif-edukatif. Beri label yang jelas ("Simulasi" / "Data simulasi") dan jangan menyajikannya sebagai hasil pengukuran nyata.
  4. **Bebas Slop:** Mengikuti standar *anti-slop* baik pada kode, estetika desain, maupun narasi materi.

---

## 2. Tech Stack

| Komponen | Teknologi | Keterangan & Ketentuan |
| :--- | :--- | :--- |
| **Framework Utama** | **React 19** (`^19.3.1`) | Functional components, Hooks modern (`useState`, `useReducer`, `useMemo`, `useCallback`, `useContext`, `useRef`). |
| **Build Tool & Dev Server** | **Vite 8** (`^8.3.4`) | Loading cepat, modular ESM, HMR instan, dan lazy loading (`React.lazy`) untuk simulator serta lab virtual. |
| **Linter & Code Quality** | **Oxlint** (`^1.88.0`) | Linter cepat berbasis Rust (`npm run lint`). Pertahankan kode bebas warning dan error. |
| **Styling Engine** | **Modern Vanilla CSS3** | **DILARANG menggunakan Tailwind CSS** atau framework utility eksternal kecuali diminta khusus. Gunakan CSS Variables (Design Tokens), Flexbox, CSS Grid, scoped/modular CSS, dan CSS keyframe micro-animations. |
| **Simbol & Rumus Kimia** | **Semantic HTML / SVG** | Menggunakan subskrip (`<sub>`), superskrip (`<sup>`), entitas Unicode, dan komponen `FormulaRenderer` (termasuk notasi konsentrasi `[A]`, `E<sub>a</sub>`, dan `k`). Hindari library LaTeX berat agar bundle tetap ringan. Notasi LaTeX di dokumen PRD hanya untuk keterbacaan dokumen, bukan untuk dipakai di aplikasi. |
| **Visualisasi Simulasi** | **HTML5 Canvas / Pure SVG** | Canvas 2D untuk simulator tumbukan partikel. SVG untuk grafik (konsentrasi-waktu, orde reaksi, distribusi energi), diagram profil energi, dan ilustrasi lab virtual. Tanpa library grafik eksternal. |
| **Testing & Scripting** | **Node.js 22+ (ESM)** | Unit test logika kimia memakai test runner bawaan Node (`node --test`), tanpa dependensi tambahan. |

---

## 3. Storage & State Management

Aplikasi ini beroperasi penuh secara *client-side* (offline-friendly dan ramah kuota siswa):

### 3.1. LocalStorage Strategy
Gunakan helper terpusat (misal `src/utils/storage.js` atau hook `useLocalStorage.js`) dengan *namespace* yang terstruktur:

| Key Name | Struktur Data | Deskripsi |
| :--- | :--- | :--- |
| `kinetilab_progress_v1` | `{ completedChapters: string[], currentChapter: string, milestoneProgress: Record<string, boolean> }` | Melacak status penyelesaian bab (Bab 1 s.d. 5) dan checkpoint subbab (misal `"2.3"`). |
| `kinetilab_quiz_history_v1` | `Record<chapterId, { bestScore: number, total: number, attempts: { score: number, answers: Record<string, any>, completedAt: string }[] }>` | Riwayat pengerjaan kuis tiap bab. |
| `kinetilab_assessment_v1` | `{ pretest: AssessmentResult \| null, posttest: AssessmentResult \| null, final: AssessmentResult \| null }` | Pre-test, post-test, dan ujian akhir. `AssessmentResult` memuat skor total dan skor per subbab untuk analisis kelemahan. |
| `kinetilab_gamification_v1` | `{ xp: number, badges: string[], currentRank: string }` | Poin pengalaman (XP) dan lencana yang telah diraih siswa. |
| `kinetilab_lab_state_v1` | `Record<simId, Record<string, any>>` | Menyimpan data praktikum dan input sementara. `simId` yang dipakai: `expA`, `expB`, `expC`, `orderSolver`, `collisionSim`, `energyProfile`. |
| `kinetilab_notes_v1` | `{ bookmarks: string[], notes: Record<subchapterId, string> }` | Bookmark dan catatan pribadi per subbab. |
| `kinetilab_profile_v1` | `{ name: string }` | Nama siswa untuk sertifikat (diisi sendiri, tidak dikirim ke mana pun). |
| `kinetilab_user_settings_v1` | `{ fontSize: 'sm' \| 'md' \| 'lg', reducedMotion: boolean \| null, showHints: boolean }` | Preferensi pengguna. Nilai `null` pada `reducedMotion` berarti mengikuti `prefers-reduced-motion` peramban. |

### 3.2. Aturan Pengelolaan Storage
- **Safe Parsing:** Selalu gunakan blok `try...catch` saat membaca/menulis `localStorage` dengan *default fallback* jika JSON korup, kuota penuh, atau *private browsing* membatasi akses.
- **Versioning:** Akhiran `_v1` menandai versi skema.
- **Reaktivitas:** Gunakan React Context (`CourseProgressContext`, `GamificationContext`).
- **Performa Penulisan:** Dilarang menulis ke `localStorage` di dalam loop animasi atau setiap frame simulasi.

---

## 4. Struktur Direktori Proyek

Proyek diatur menggunakan pola **Modular Feature-Driven Architecture**:

```text
kinetilab-11/
├── .agent/
│   ├── AGENT.md                 # Dokumen aturan & panduan agen (file ini)
│   ├── prd.md                   # Spesifikasi produk lengkap
├── public/                      # Aset statis publik (favicon)
├── src/
│   ├── assets/                  # Grafis, logo, ilustrasi peralatan lab SVG
│   ├── components/              # Komponen modular UI yang dapat digunakan ulang
│   │   ├── common/              # Button, Card, Modal, Tooltip, Badge, ProgressBar, Slider
│   │   ├── chemistry/           # FormulaRenderer, ReactionEquation, ParticleCanvas, EnergyProfileDiagram
│   │   ├── charts/              # LineChart, AxisLabel, TangentLine, ChartSummary
│   │   └── layout/              # Header, CourseSidebar, MilestoneMap, PresentationMode, Footer
│   ├── features/                # Modul materi & simulator per bab (sesuai PRD)
│   │   ├── chapter1-rate-concept/      # Konsep laju, laju rata-rata vs sesaat, hubungan dengan koefisien
│   │   ├── chapter2-collision-factors/ # Teori tumbukan, faktor laju, Simulator Tumbukan, Lab Virtual A/B/C, Kalkulator Suhu
│   │   ├── chapter3-rate-law/          # Persamaan laju, Solver Orde Reaksi, grafik orde 0/1/2
│   │   ├── chapter4-energy-applications/ # Profil energi, katalis & Ea, tahap penentu laju (pengayaan), penerapan
│   │   └── chapter5-evaluation/        # Pre/Post-test, Ujian Akhir, Analisis Kelemahan, Sertifikat Digital
│   ├── context/                 # State global React (CourseProgressContext, GamificationContext)
│   ├── hooks/                   # Custom hooks (useCourseProgress, useLocalStorage, useParticleSimulation, useStopwatch, usePresentationMode)
│   ├── data/                    # Data statis terverifikasi
│   │   ├── courseChapters.js    # Silabus, milestone, dan checkpoint tiap bab
│   │   ├── labExperiments.js    # Parameter model kinetika tiap eksperimen lab
│   │   ├── orderExamples.js     # Contoh data percobaan siap pakai untuk Solver Orde Reaksi
│   │   ├── quizBank/            # Bank soal berjenjang per bab
│   │   └── badges.js            # Definisi lencana gamifikasi dan syarat membukanya
│   ├── utils/                   # Utilitas & logika kalkulasi kimia murni
│   │   ├── rateCalculations.js  # Laju rata-rata, laju sesaat, hubungan laju dengan koefisien
│   │   ├── reactionOrderSolver.js # Penentuan orde dari data percobaan, k, prediksi
│   │   ├── temperatureEffect.js # Pengaruh suhu
│   │   ├── kineticsModel.js     # Generator data lab virtual
│   │   ├── particleSimulation.js # Mesin simulasi tumbukan
│   │   ├── numberFormat.js      # Format angka gaya Indonesia
│   │   ├── assessment.js        # Penilaian kuis, remedial
│   │   ├── storage.js           # Wrapper aman localStorage
│   │   └── __tests__/           # Unit test
│   ├── styles/                  # Arsitektur CSS Modern
│   │   ├── variables.css        # Design tokens
│   │   ├── typography.css       # Tipografi & formula
│   │   ├── components.css       # Styling komponen UI
│   │   ├── charts.css           # Styling grafik
│   │   └── animations.css       # Animasi & transisi
│   ├── App.jsx                  # Root component & navigasi
│   ├── index.css                # Global reset & baseline styles
│   └── main.jsx                 # Entry point aplikasi
```

---

## 5. Standar Desain UI/UX & Bahasa
- **Tema Desain:** *Clean Academic Light Mode*
  - Background bersih (`#F8FAFC`, `#FFFFFF`), kartu berbayang halus.
  - Warna aksen sains profesional:
    - Biru Kimia (`#0284C7`): aksen utama dan navigasi.
    - Cyan Laboratorium (`#06B6D4`): lab dan grafik.
    - Emerald (`#10B981`): tumbukan efektif dan jawaban benar.
    - Amber (`#F59E0B`): energi aktivasi dan peringatan.
    - Rose (`#EF4444`): tumbukan tidak efektif dan jawaban salah.
    - Violet (`#8B5CF6`): katalis.
- **Bahasa:** UI dan materi dalam Bahasa Indonesia komunikatif; kode program dalam Bahasa Inggris.
