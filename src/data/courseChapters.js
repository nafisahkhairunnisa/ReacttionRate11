/**
 * KinetiLab 11 - Course Syllabus & Chapter Metadata
 */

export const COURSE_CHAPTERS = [
  {
    id: 'bab1',
    number: 1,
    title: 'Konsep Laju Reaksi & Cara Menyatakannya',
    shortTitle: 'Konsep Laju',
    description: 'Memahami definisi laju perubahan konsentrasi per satuan waktu, laju rata-rata vs sesaat, dan perbandingan dengan koefisien.',
    color: '#0284c7',
    subchapters: [
      { id: '1.1', title: 'Pengertian Laju Reaksi (Δ[Zat] / Δt)' },
      { id: '1.2', title: 'Laju Rata-rata vs Laju Sesaat (Grafik Tangen)' },
      { id: '1.3', title: 'Hubungan Laju dengan Koefisien Reaksi' },
      { id: '1.4', title: 'Kuis Cek Pemahaman Bab 1', isQuiz: true }
    ]
  },
  {
    id: 'bab2',
    number: 2,
    title: 'Teori Tumbukan & Faktor yang Memengaruhi Laju',
    shortTitle: 'Teori Tumbukan & Faktor',
    description: 'Visualisasi tumbukan partikel reaktan, energi aktivasi, serta pengaruh konsentrasi, luas permukaan, suhu, dan katalis.',
    color: '#06b6d4',
    subchapters: [
      { id: '2.1', title: 'Teori Tumbukan & Tumbukan Efektif' },
      { id: '2.2', title: 'Pengaruh Konsentrasi & Luas Permukaan' },
      { id: '2.3', title: 'Pengaruh Suhu & Teori Distribusi Energi' },
      { id: '2.4', title: 'Pengaruh Katalis & Penurunan Ea' },
      { id: '2.5', title: 'Simulator: Tumbukan Partikel 2D', isInteractive: true },
      { id: '2.6', title: 'Lab Virtual: Praktikum Faktor Laju', isInteractive: true },
      { id: '2.7', title: 'Kuis Cek Pemahaman Bab 2', isQuiz: true }
    ]
  },
  {
    id: 'bab3',
    number: 3,
    title: 'Persamaan Laju & Orde Reaksi',
    shortTitle: 'Persamaan Laju',
    description: 'Menentukan orde reaksi dari data percobaan tabel, menghitung nilai tetapan k dan satuannya, serta grafik orde 0, 1, dan 2.',
    color: '#10b981',
    subchapters: [
      { id: '3.1', title: 'Bentuk Umum Persamaan Laju & Tetapan k' },
      { id: '3.2', title: 'Menentukan Orde dari Data Percobaan' },
      { id: '3.3', title: 'Karakteristik Kurva Orde 0, 1, dan 2' },
      { id: '3.4', title: 'Alat Cerdas: Solver & Prediktor Orde', isInteractive: true },
      { id: '3.5', title: 'Kuis Cek Pemahaman Bab 3', isQuiz: true }
    ]
  },
  {
    id: 'bab4',
    number: 4,
    title: 'Energi Aktivasi, Mekanisme & Penerapan',
    shortTitle: 'Energi Aktivasi & Aplikasi',
    description: 'Analisis profil energi reaksi eksoterm/endoterm, mekanisme reaksi multi-tahap, dan penerapan kinetika di industri.',
    color: '#8b5cf6',
    subchapters: [
      { id: '4.1', title: 'Diagram Profil Energi & Kompleks Teraktivasi' },
      { id: '4.2', title: 'Jalur Alternatif Katalis' },
      { id: '4.3', title: 'Tahap Penentu Laju (Pengayaan)' },
      { id: '4.4', title: 'Laju Reaksi dalam Kehidupan & Industri' },
      { id: '4.5', title: 'Kuis Cek Pemahaman Bab 4', isQuiz: true }
    ]
  },
  {
    id: 'bab5',
    number: 5,
    title: 'Evaluasi Akhir & Penghargaan Prestasi',
    shortTitle: 'Evaluasi Akhir',
    description: 'Ujian komprehensif, post-test, analisis kelemahan per subbab, serta klaim sertifikat kelulusan digital.',
    color: '#f59e0b',
    subchapters: [
      { id: '5.1', title: 'Ujian Komprehensif Laju Reaksi' },
      { id: '5.2', title: 'Analisis Diagnostik & Rekomendasi' },
      { id: '5.3', title: 'Sertifikat Kelulusan & Lencana Prestasi' }
    ]
  }
];
