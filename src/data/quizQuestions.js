/**
 * Bank Soal Kuis Interaktif ChemVerse - Laju Reaksi Kelas 11 SMA
 * 10 Soal Pilihan Ganda Berstandar Kurikulum Merdeka (Fase F)
 * Mencakup Modul 1 s.d. Modul 4 dengan pembahasan kimia lengkap.
 * Menggunakan notasi laju reaksi "r" (tanpa "v").
 */

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    category: 'Modul 1: Konsep Laju Reaksi',
    module: 'modul-1',
    question: 'Untuk reaksi penguraian dinitrogen pentaoksida: 2N₂O₅(g) → 4NO₂(g) + O₂(g), pernyataan laju reaksi (r) yang tepat berdasarkan perubahan konsentrasi per satuan waktu adalah...',
    options: [
      { id: 'A', text: 'r = + Δ[N₂O₅] / Δt' },
      { id: 'B', text: 'r = − Δ[NO₂] / Δt' },
      { id: 'C', text: 'r = − (1/2) Δ[N₂O₅] / Δt = + (1/4) Δ[NO₂] / Δt = + Δ[O₂] / Δt' },
      { id: 'D', text: 'r = − (1/4) Δ[NO₂] / Δt = + (1/2) Δ[N₂O₅] / Δt' },
      { id: 'E', text: 'r = − Δ[O₂] / Δt' }
    ],
    correctAnswer: 'C',
    hint: 'Ingat tanda minus (−) untuk reaktan yang berkurang dan tanda plus (+) untuk produk yang bertambah, masing-masing dibagi koefisien reaksinya.',
    explanation: 'Laju reaksi dinyatakan sebagai laju berkurangnya reaktan atau bertambahnya produk dibagi koefisiennya masing-masing. Karena N₂O₅ adalah reaktan berkoefisien 2, maka diberi tanda (−) dan faktor 1/2. Sedangkan NO₂ (koefisien 4) dan O₂ (koefisien 1) adalah produk sehingga bertanda (+) dengan faktor 1/4 dan 1/1.'
  },
  {
    id: 2,
    category: 'Modul 1: Stoikiometri Laju',
    module: 'modul-1',
    question: 'Pada reaksi pembentukan gas amonia: N₂(g) + 3H₂(g) → 2NH₃(g), jika laju pengurangan gas hidrogen (H₂) terukur sebesar 0,060 M · s⁻¹, maka laju pembentukan gas amonia (NH₃) adalah...',
    options: [
      { id: 'A', text: '0,020 M · s⁻¹' },
      { id: 'B', text: '0,040 M · s⁻¹' },
      { id: 'C', text: '0,060 M · s⁻¹' },
      { id: 'D', text: '0,090 M · s⁻¹' },
      { id: 'E', text: '0,120 M · s⁻¹' }
    ],
    correctAnswer: 'B',
    hint: 'Gunakan perbandingan koefisien: r(NH₃) / koef(NH₃) = r(H₂) / koef(H₂).',
    explanation: 'Perbandingan laju reaksi sama dengan perbandingan koefisien reaksinya: r(NH₃) / 2 = r(H₂) / 3. Maka r(NH₃) = (2/3) × r(H₂) = (2/3) × 0,060 M · s⁻¹ = 0,040 M · s⁻¹.'
  },
  {
    id: 3,
    category: 'Modul 1: Laju Sesaat vs Rata-rata',
    module: 'modul-1',
    question: 'Pada kurva kinetika reaksi yang memplot konsentrasi produk terhadap waktu (t), laju reaksi sesaat (r) pada detik ke-30 diperoleh dari...',
    options: [
      { id: 'A', text: 'Membagi konsentrasi total produk pada detik ke-30 dengan angka 30' },
      { id: 'B', text: 'Kemiringan (gradien) garis singgung/tangen pada kurva di titik t = 30 detik' },
      { id: 'C', text: 'Luas daerah di bawah kurva dari t = 0 hingga t = 30 detik' },
      { id: 'D', text: 'Titik potong kurva dengan sumbu vertikal konsentrasi' },
      { id: 'E', text: 'Rata-rata konsentrasi reaktan dan produk pada saat t = 30 detik' }
    ],
    correctAnswer: 'B',
    hint: 'Laju sesaat adalah limit Δ[Zat]/Δt saat Δt mendekati nol, yang secara geometris merupakan kemiringan garis singgung (tangen).',
    explanation: 'Laju reaksi sesaat pada titik waktu tertentu dihitung dari gradien atau kemiringan garis singgung (tangen) yang menyentuh kurva kinetika pada titik waktu tersebut (d[Zat]/dt).'
  },
  {
    id: 4,
    category: 'Modul 2: Teori Tumbukan',
    module: 'modul-2',
    question: 'Menurut Teori Tumbukan, reaksi kimia antarpartikel hanya akan menghasilkan produk (tumbukan efektif) apabila memenuhi dua syarat utama, yaitu...',
    options: [
      { id: 'A', text: 'Partikel bermassa sama dan bergerak searah jarum jam' },
      { id: 'B', text: 'Volume wadah sangat kecil dan tekanan selalu nol' },
      { id: 'C', text: 'Orientasi tumbukan molekul tepat dan energi kinetik partikel mencukupi (E ≥ Eₐ)' },
      { id: 'D', text: 'Partikel bermuatan positif dan tidak memiliki energi kinetik' },
      { id: 'E', text: 'Reaksi berlangsung dalam medium air pada suhu di bawah 0 °C' }
    ],
    correctAnswer: 'C',
    hint: 'Tumbukan harus mengenai bagian molekul yang tepat (orientasi) dan memiliki energi minimal yang melampaui ambang aktivasi (Ea).',
    explanation: 'Tumbukan efektif memerlukan: (1) Posisi/orientasi ruang yang tepat agar ikatan dapat putus dan tersusun kembali, serta (2) Energi kinetik partikel yang bertumbukan harus sama dengan atau lebih besar dari Energi Aktivasi (E ≥ Eₐ).'
  },
  {
    id: 5,
    category: 'Modul 2: Luas Permukaan',
    module: 'modul-2',
    question: 'Batu pualam (CaCO₃) berbentuk serbuk halus bereaksi jauh lebih cepat dengan larutan asam klorida (HCl) dibandingkan batu pualam berbentuk kepingan/bongkahan dengan massa yang sama. Alasan mikroskopis fenomena ini adalah...',
    options: [
      { id: 'A', text: 'Serbuk memiliki massa total yang lebih berat daripada bongkahan' },
      { id: 'B', text: 'Bentuk serbuk menurunkan energi aktivasi reaksi secara drastis' },
      { id: 'C', text: 'Serbuk memiliki luas bidang sentuh total yang lebih besar sehingga frekuensi tumbukan antarpartikel per satuan waktu meningkat' },
      { id: 'D', text: 'Bentuk serbuk mengubah reaksi dari endoterm menjadi eksoterm' },
      { id: 'E', text: 'Kepingan batu pualam tidak mengandung ion kalsium' }
    ],
    correctAnswer: 'C',
    hint: 'Makin halus partikel zat padat, makin luas permukaan yang bersentuhan langsung dengan pereaksi cairan.',
    explanation: 'Pada zat padat, reaksi hanya dapat terjadi pada permukaannya yang bersentuhan dengan reaktan lain. Bentuk serbuk memperluas bidang sentuh partikel secara masif, meningkatkan kemungkinan dan frekuensi tumbukan antarpartikel per detik.'
  },
  {
    id: 6,
    category: 'Modul 2: Pengaruh Suhu',
    module: 'modul-2',
    question: 'Suatu reaksi kimia memiliki laju reaksi r₁ = 0,050 M · s⁻¹ pada suhu 25 °C. Jika setiap kenaikan suhu sebesar 10 °C laju reaksi meningkat menjadi 2 kali lipat, maka laju reaksi pada suhu 55 °C adalah...',
    options: [
      { id: 'A', text: '0,100 M · s⁻¹' },
      { id: 'B', text: '0,200 M · s⁻¹' },
      { id: 'C', text: '0,400 M · s⁻¹' },
      { id: 'D', text: '0,800 M · s⁻¹' },
      { id: 'E', text: '1,600 M · s⁻¹' }
    ],
    correctAnswer: 'C',
    hint: 'Gunakan rumus kenaikan suhu: r₂ = r₁ × n^((T₂ − T₁)/10) dengan n = 2 dan kenaikan suhu = 55 − 25 = 30 °C.',
    explanation: 'Selisih suhu ΔT = 55 − 25 = 30 °C. Jumlah kenaikan 10 °C adalah 30/10 = 3 kali. Maka r₂ = r₁ × 2³ = 0,050 × 8 = 0,400 M · s⁻¹.'
  },
  {
    id: 7,
    category: 'Modul 2 & 4: Peran Katalis',
    module: 'modul-4',
    question: 'Peran katalis dalam mempercepat laju reaksi kimia yang tepat adalah...',
    options: [
      { id: 'A', text: 'Menaikkan suhu sistem sehingga partikel bergerak lebih cepat' },
      { id: 'B', text: 'Menyediakan rute reaksi alternatif dengan energi aktivasi (Eₐ) yang lebih rendah tanpa mengubah entalpi reaksi (ΔH)' },
      { id: 'C', text: 'Mengubah reaksi endoterm menjadi eksoterm sempurna' },
      { id: 'D', text: 'Menambah jumlah mol produk akhir melebihi kapasitas stoikiometri' },
      { id: 'E', text: 'Bereaksi secara permanen dan habis terkonsumsi bersama reaktan' }
    ],
    correctAnswer: 'B',
    hint: 'Katalis memotong bukit energi aktivasi (Ea) lebih rendah, tetapi energi awal reaktan dan akhir produk (ΔH) tidak berubah sama sekali.',
    explanation: 'Katalis bekerja dengan cara menyediakan mekanisme tahapan reaksi alternatif yang memiliki energi aktivasi (Eₐ) lebih rendah. Katalis tidak mengubah nilai perubahan entalpi reaksi (ΔH) dan diperoleh kembali di akhir reaksi.'
  },
  {
    id: 8,
    category: 'Modul 3: Penentuan Orde Reaksi',
    module: 'modul-3',
    question: 'Dari percobaan reaksi: A + B → C diperoleh data kinetika sebagai berikut:\n• Percobaan 1: [A] = 0,10 M; [B] = 0,10 M; r = 0,020 M · s⁻¹\n• Percobaan 2: [A] = 0,20 M; [B] = 0,10 M; r = 0,080 M · s⁻¹\n• Percobaan 3: [A] = 0,10 M; [B] = 0,20 M; r = 0,040 M · s⁻¹\nPersamaan laju reaksi (r) yang tepat adalah...',
    options: [
      { id: 'A', text: 'r = k [A] [B]' },
      { id: 'B', text: 'r = k [A]² [B]' },
      { id: 'C', text: 'r = k [A] [B]²' },
      { id: 'D', text: 'r = k [A]² [B]²' },
      { id: 'E', text: 'r = k [A]³ [B]' }
    ],
    correctAnswer: 'B',
    hint: 'Bandingkan perc. 1 & 2 untuk cari orde A: (0,20/0,10)^m = 0,080/0,020. Bandingkan perc. 1 & 3 untuk cari orde B: (0,20/0,10)^n = 0,040/0,020.',
    explanation: '1. Orde terhadap A: dari perc. 1 dan 2 ([B] tetap), saat [A] dilipatgandakan 2×, laju r menjadi 4× (0,080 / 0,020 = 4). Maka 2^m = 4 → m = 2.\n2. Orde terhadap B: dari perc. 1 dan 3 ([A] tetap), saat [B] dilipatgandakan 2×, laju r menjadi 2× (0,040 / 0,020 = 2). Maka 2^n = 2 → n = 1.\nMaka rumus laju reaksi: r = k [A]² [B].'
  },
  {
    id: 9,
    category: 'Modul 3: Satuan Tetapan Laju k',
    module: 'modul-3',
    question: 'Jika suatu reaksi kimia memiliki persamaan laju r = k [A] [B], yang berarti orde reaksi total adalah 2, maka satuan tetapan laju reaksi (k) tersebut adalah...',
    options: [
      { id: 'A', text: 'M · s⁻¹' },
      { id: 'B', text: 's⁻¹' },
      { id: 'C', text: 'M⁻¹ · s⁻¹ (atau L · mol⁻¹ · s⁻¹)' },
      { id: 'D', text: 'M⁻² · s⁻¹' },
      { id: 'E', text: 'mol · L⁻¹' }
    ],
    correctAnswer: 'C',
    hint: 'Gunakan dimensi: k = r / ([A][B]) = (M/s) / (M × M).',
    explanation: 'Rumus dimensi tetapan k: k = r / ([A][B]). Satuan r adalah M · s⁻¹ dan satuan [A][B] adalah M². Maka satuan k = (M · s⁻¹) / M² = M⁻¹ · s⁻¹ = L · mol⁻¹ · s⁻¹.'
  },
  {
    id: 10,
    category: 'Modul 4: Diagram Profil Energi',
    module: 'modul-4',
    question: 'Pada diagram profil energi reaksi eksotermik, puncak kurva energi menyatakan keadaan...',
    options: [
      { id: 'A', text: 'Molekul reaktan sebelum bertumbukan' },
      { id: 'B', text: 'Kompleks teraktivasi (keadaan transisi dengan energi tertinggi)' },
      { id: 'C', text: 'Zat produk yang telah stabil' },
      { id: 'D', text: 'Katalis yang mengendap di dasar wadah' },
      { id: 'E', text: 'Titik beku campuran larutan reaksi' }
    ],
    correctAnswer: 'B',
    hint: 'Puncak kurva potensial adalah kondisi peralihan berenergi paling tinggi di mana ikatan lama sedang putus dan ikatan baru mulai tersusun.',
    explanation: 'Puncak kurva pada diagram profil energi menyatakan keadaan Kompleks Teraktivasi (Activated Complex atau Transition State). Keadaan ini memiliki energi potensial tertinggi dan tidak stabil sebelum meluruh menjadi produk.'
  }
];

