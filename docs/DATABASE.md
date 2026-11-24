# ARSITEKTUR BASIS DATA & SKEMA PENYIMPANAN (DATABASE.md)
**Proyek:** ChemVerse — Laboratorium Kinetika Kimia Kelas 11 SMA  
**Kelompok:** S2 Pendidikan Kimia · Kelompok 5

---

## 1. Strategi Penyimpanan Berjenjang (Hybrid Local-First + Cloud)
Aplikasi ChemVerse menerapkan arsitektur *Local-First* sebagai basis utama agar aplikasi tetap dapat digunakan secara offline di ruang laboratorium sekolah tanpa koneksi internet yang stabil, dilengkapi dengan sinkronisasi ke Firebase Cloud Firestore saat terhubung ke internet.

---

## 2. Skema Kunci Penyimpanan Lokal (`localStorage`)

### A. Progres Modul (`kinetilab_progress_v1`)
Menyimpan status keterbacaan subbab dan modul pembelajaran:
```json
{
  "currentChapterId": "bab1",
  "completedChapters": ["bab1"],
  "milestoneProgress": {
    "1.1": true,
    "1.2": true,
    "2.1": true
  }
}
```
*Schema Guard:* Didukung fungsi `validateProgress()` di `CourseProgressContext.jsx` untuk menangani nilai rusak atau `null`.

### B. Riwayat Kuis Komprehensif (`kinetilab_quiz_history_v1`)
Merekam akumulasi pengerjaan kuis siswa (tidak tertimpa):
```json
{
  "score": 100,
  "bestScore": 100,
  "correctCount": 10,
  "total": 10,
  "questionVersion": "v1",
  "completedAt": "2026-11-24T14:00:00.000Z",
  "attempts": [
    {
      "attemptId": "attempt-1732431600000",
      "questionVersion": "v1",
      "score": 100,
      "correctCount": 10,
      "total": 10,
      "answers": { "q1": "B", "q2": "C" },
      "completedAt": "2026-11-24T14:00:00.000Z"
    }
  ]
}
```

### C. Draf Jawaban Kuis (`kinetilab_quiz_history_v1_draft`)
Menyimpan draf per butir sebelum disubmit agar tidak hilang saat reload atau berpindah modul:
```json
{
  "answers": { "q1": "B", "q2": "D" },
  "questionVersion": "v1",
  "savedAt": "2026-11-24T13:55:00.000Z"
}
```

### D. Profil Siswa (`kinetilab_profile_v1`)
Menyimpan identitas nama siswa untuk dicetak pada sertifikat kelulusan:
```json
{
  "name": "Nafisah",
  "school": "SMA Negeri 1",
  "className": "XI MIPA 1"
}
```

### E. Rekapitulasi Nilai Siswa untuk Guru (`kinetilab_student_scores_v1`)
Array riwayat nilai seluruh siswa yang dapat dilihat dan diekspor oleh guru:
```json
[
  {
    "id": "quiz-1732431600000",
    "name": "Nafisah",
    "className": "XI MIPA 1",
    "score": 100,
    "correctCount": 10,
    "total": 10,
    "passed": true,
    "date": "24 Nov 2026"
  }
]
```

---

## 3. Skema Cloud Firestore (Firebase)
- Koleksi `users/{uid}`: profil pengguna, peran (`siswa` atau `guru`), email, nama lengkap.
- Koleksi `quiz_attempts/{attemptId}`: rekapitulasi skor, timestamp pengerjaan, dan status kelulusan KKM.
- Koleksi `classes/{classId}`: manajemen rombel kelas dan kelompok siswa yang diampu guru.

