import { useRef } from 'react';
import { COURSE_CHAPTERS } from '../../data/courseChapters';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import { useAuth } from '../../hooks/useAuth';
import { FormulaLabSheet } from './FormulaLabSheet';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { ProgressBar } from '../common/ProgressBar';

/**
 * HomePage Component - ChemVerse
 * Beranda utama ChemVerse untuk Kelas 11 SMA.
 * Seluruh Modul 1 s.d. Modul 5 dan Arena Kuis Interaktif dapat diakses setelah pengguna masuk (login).
 */
export function HomePage({ onNavigate }) {
  const { progressPercent, isSubchapterComplete } = useCourseProgress();
  const { currentUser, isLoggedIn } = useAuth();
  const moduleSectionRef = useRef(null);

  const handleScrollToModules = () => {
    if (moduleSectionRef.current) {
      moduleSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page-container">
      {/* 1. HERO SECTION: Judul & Penjelasan Singkat */}
      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-badge-row">
          <Badge variant="primary" className="hero-tag">CHEMVERSE • KINETIKALAB 11</Badge>
          <span className="hero-phase">Fase F • Kurikulum Merdeka</span>
          {isLoggedIn ? (
            <Badge variant="effective">Sesi Aktif: {currentUser?.name}</Badge>
          ) : (
            <Badge variant="cyan">Autentikasi Firebase Aktif</Badge>
          )}
        </div>

        <h1 id="hero-title" className="hero-main-title">
          Kuasai Konsep <span className="highlight-text">Laju Reaksi Kimia</span> Melalui Lembar Belajar Digital
        </h1>

        <p className="hero-description">
          Media ajar kinetika kimia interaktif untuk SMA Kelas 11. Menjembatani pemahaman tingkat 
          <strong> makroskopis</strong> (perubahan warna, waktu reaksi) dengan tingkat 
          <strong> mikroskopis</strong> (tumbukan efektif partikel, orde reaksi, energi aktivasi) 
          melalui alur bertahap yang mudah dipahami.
        </p>

        {/* TOMBOL UTAMA HERO: JIKA BELUM LOGIN TAMPILKAN TOMBOL LOGIN DI TENGAH */}
        {!isLoggedIn ? (
          <div className="hero-cta-center-login">
            <Button
              variant="primary"
              size="lg"
              className="btn-hero-login-center"
              onClick={() => onNavigate('login')}
            >
              🔐 Masuk untuk Mulai Belajar (Email / Akun Google) →
            </Button>
            <p className="hero-login-subtext">
              Masuk dengan akun siswa atau guru untuk membuka Modul 1 sampai Modul 5, laboratorium praktikum, dan kuis interaktif.
            </p>
          </div>
        ) : (
          <div className="hero-cta-group">
            <Button
              variant="primary"
              size="lg"
              className="btn-hero-start"
              onClick={() => onNavigate('modul-1')}
            >
              🚀 Lanjut Belajar Modul 1
            </Button>
            <Button
              variant="primary"
              size="lg"
              className="btn-hero-quiz"
              onClick={() => onNavigate('kuis')}
            >
              📝 Kuis Interaktif (10 Soal)
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="btn-hero-outline"
              onClick={handleScrollToModules}
            >
              📋 Lihat 5 Modul Belajar
            </Button>
          </div>
        )}

        {/* Hiasan Visual Kinetika Kimia Dinamis */}
        <div className="hero-kinetic-decorations" aria-hidden="true">
          <span className="kinetic-floating-pill k-pill-1">⚛️ r = −Δ[A]/Δt</span>
          <span className="kinetic-floating-pill k-pill-2">🔥 E ≥ Eₐ (Tumbukan Efektif)</span>
          <span className="kinetic-floating-pill k-pill-3">🧪 r = k[A]ᵐ[B]ⁿ</span>
          <span className="kinetic-floating-pill k-pill-4">🫧 ΔT = +10°C ⇒ Laju × 2–3</span>
          <span className="kinetic-floating-pill k-pill-5">⚡ Katalis ↓ Eₐ</span>
        </div>

        {/* Ringkasan Progres Belajar */}
        <div className="hero-progress-card">
          <div className="progress-info-row">
            <span className="progress-title">Progres Kelulusan Kursus Anda:</span>
            <span className="progress-percentage">{progressPercent}%</span>
          </div>
          <ProgressBar percent={progressPercent} />
          <div className="progress-meta">
            <span>Data tersimpan otomatis di peramban (Local-First)</span>
            <span>Simbol Laju: r (Satuan: M · s⁻¹) • Tanpa Biaya</span>
          </div>
        </div>
      </section>

      {/* 1.5 PITA FITUR KHAS KINETIKA KIMIA */}
      <div className="kinetic-features-ribbon" role="region" aria-label="Sorotan Fitur Laboratorium">
        <div className="ribbon-item">
          <span className="ribbon-icon">🧪</span>
          <div>
            <strong>Lab Virtual 3 Eksperimen</strong>
            <span>Effervescent, Uji Silang Na₂S₂O₃, H₂O₂ + Katalis</span>
          </div>
        </div>
        <div className="ribbon-item">
          <span className="ribbon-icon">⚛️</span>
          <div>
            <strong>Simulasi Tumbukan 2D</strong>
            <span>PhET Diffusion & Tumbukan Efektif Mikroskopis</span>
          </div>
        </div>
        <div className="ribbon-item">
          <span className="ribbon-icon">📈</span>
          <div>
            <strong>Grafik Orde 0, 1, dan 2</strong>
            <span>Visualisasi Kurva r vs [A] & Waktu Paruh</span>
          </div>
        </div>
        <div className="ribbon-item">
          <span className="ribbon-icon">👩‍🏫</span>
          <div>
            <strong>Panel Guru & Ekspor Nilai</strong>
            <span>Manajemen Rombel/Kelompok & Unduh Nilai CSV</span>
          </div>
        </div>
      </div>

      {/* 2. BANNER SPESIAL KUIS INTERAKTIF */}
      <section className="quiz-highlight-banner" aria-labelledby="quiz-banner-title">
        <div className="quiz-banner-content">
          <div className="quiz-banner-badge">
            <span className="star-icon">⭐</span>
            <span>ARENA EVALUASI BARU</span>
          </div>
          <h2 id="quiz-banner-title" className="quiz-banner-title">
            Kuis Interaktif Kinetika Kimia (10 Soal Pilihan Ganda)
          </h2>
          <p className="quiz-banner-desc">
            Uji pemahaman Anda dengan umpan balik langsung, pembahasan kimia langkah demi langkah, 
            dan klaim sertifikat kelulusan digital setelah menyelesaikan evaluasi!
          </p>
        </div>
        <div className="quiz-banner-action">
          <Button
            variant="primary"
            size="lg"
            className="btn-banner-quiz"
            onClick={() => onNavigate(isLoggedIn ? 'kuis' : 'login')}
          >
            {isLoggedIn ? 'Mulai Kuis Sekarang (10 Soal) →' : '🔐 Masuk untuk Mengikuti Kuis →'}
          </Button>
        </div>
      </section>

      {/* 3. SASARAN PENGGUNA (USER PERSONA) */}
      <section className="audience-section" aria-labelledby="audience-title">
        <div className="section-title-wrap">
          <span className="section-eyebrow">TARGET AUDIENCE</span>
          <h2 id="audience-title" className="section-main-title">Sasaran Pengguna Platform</h2>
          <p className="section-lead-text">
            ChemVerse dirancang spesifik untuk mendukung proses belajar mengajar kimia di tingkat SMA:
          </p>
        </div>

        <div className="audience-grid">
          {/* Persona 1: Siswa SMA */}
          <div className="audience-card student-persona">
            <div className="persona-header">
              <div className="persona-avatar student-avatar">🎓</div>
              <div>
                <h3 className="persona-role">Siswa Kelas 11 SMA</h3>
                <span className="persona-stage">Fase F Kurikulum Merdeka</span>
              </div>
            </div>
            <ul className="persona-benefits">
              <li>
                <strong>Visual & Tidak Membosankan:</strong> Memahami rumus laju reaksi (r) bukan dengan hafalan buta, 
                melainkan lewat peraga grafik dan lembar kerja laboratorium terstruktur.
              </li>
              <li>
                <strong>Akses Fleksibel di Ponsel:</strong> Tampilan responsif dengan ruang rumus yang lega, 
                nyaman dibaca saat belajar mandiri di smartphone maupun laptop.
              </li>
              <li>
                <strong>Alur Belajar Mandiri:</strong> Dilengkapi penanda progres otomatis untuk memeriksa 
                pemahaman langkah demi langkah.
              </li>
            </ul>
          </div>

          {/* Persona 2: Guru Kimia */}
          <div className="audience-card teacher-persona">
            <div className="persona-header">
              <div className="persona-avatar teacher-avatar">👩‍🏫</div>
              <div>
                <h3 className="persona-role">Guru Kimia SMA</h3>
                <span className="persona-stage">Pendidik & Demonstrator Kelas</span>
              </div>
            </div>
            <ul className="persona-benefits">
              <li>
                <strong>Media Peraga Digital:</strong> Mendemonstrasikan perbandingan laju reaksi dan hubungan koefisien 
                di depan kelas tanpa perlu alat serta bahan kimia basah yang berbahaya.
              </li>
              <li>
                <strong>Standar Capaian Pembelajaran:</strong> Selaras dengan materi esensial kinetika kimia Kurikulum Merdeka.
              </li>
              <li>
                <strong>Praktis & Terintegrasi:</strong> Langsung masuk dengan Akun Google atau Email tanpa biaya langganan apapun.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. DAFTAR 5 MODUL LENGKAP CHEMVERSE */}
      <section className="all-modules-section" ref={moduleSectionRef} aria-labelledby="modules-title">
        <div className="section-title-wrap">
          <span className="section-eyebrow">KURIKULUM KINETIKA LENGKAP</span>
          <h2 id="modules-title" className="section-main-title">Daftar Modul Pembelajaran (Modul 1 s.d. 5)</h2>
          <p className="section-lead-text">
            {isLoggedIn
              ? 'Seluruh modul telah terbuka dan siap dipelajari secara mendalam:'
              : 'Pilihan modul hanya dapat diakses setelah siswa atau guru masuk (login) ke platform:'}
          </p>
        </div>

        {/* JIKA BELUM LOGIN: TAMPILKAN GATE PENGUNCI DENGAN TOMBOL LOGIN DI TENGAH */}
        {!isLoggedIn ? (
          <div className="modules-locked-gate">
            <div className="gate-lock-icon">🔒</div>
            <h3 className="gate-title">Pilihan Modul Terkunci untuk Tamu</h3>
            <p className="gate-desc">
              Pilihan Modul 1 sampai Modul 5, simulasi partikel PhET, 3 eksperimen laboratorium virtual, 
              dan kuis kinetika kimia hanya dapat dibuka setelah Anda masuk menggunakan <strong>Email</strong> atau <strong>Akun Google</strong>.
            </p>
            <div className="gate-center-action">
              <Button
                variant="primary"
                size="lg"
                className="btn-gate-login"
                onClick={() => onNavigate('login')}
              >
                🔐 Masuk Sekarang untuk Membuka Seluruh Modul (Email / Google) →
              </Button>
            </div>
            <div className="gate-preview-strip">
              <span className="gate-pill">Modul 1: Konsep & Hubungan Koefisien (+/−)</span>
              <span className="gate-pill">Modul 2: Teori Tumbukan & Lab Virtual (3 Eksperimen)</span>
              <span className="gate-pill">Modul 3: Grafik Kinetika Orde 0, 1, 2 & Solver</span>
              <span className="gate-pill">Modul 4: Diagram Profil Energi Kinetik (SVG)</span>
              <span className="gate-pill">Modul 5: Rangkuman & Sertifikat Kelulusan</span>
            </div>
          </div>
        ) : (
          <div className="modules-catalog-grid">
            {COURSE_CHAPTERS.map((module) => {
              const pageTarget = `modul-${module.number}`;
              const isCompleted = module.subchapters.every((s) => isSubchapterComplete(s.id));

              return (
                <Card key={module.id} className="catalog-module-card">
                  <div className="catalog-card-header">
                    <div className="catalog-badge-strip">
                      <span className="catalog-mod-num">MODUL 0{module.number}</span>
                      <Badge variant={isCompleted ? 'effective' : 'primary'}>
                        {isCompleted ? '✓ Selesai' : 'Siap Dipelajari'}
                      </Badge>
                    </div>
                    <h3 className="catalog-mod-title">{module.title}</h3>
                    <p className="catalog-mod-desc">{module.description}</p>
                  </div>

                  <div className="catalog-subchapters-list">
                    <span className="list-label">Rincian Materi:</span>
                    <ul>
                      {module.subchapters.slice(0, 3).map((sub) => (
                        <li key={sub.id}>
                          {sub.id} {sub.title}
                        </li>
                      ))}
                      {module.subchapters.length > 3 && (
                        <li className="more-item">+ {module.subchapters.length - 3} subbagian lainnya...</li>
                      )}
                    </ul>
                  </div>

                  <div className="catalog-card-actions">
                    <Button
                      variant="primary"
                      size="md"
                      className="btn-open-catalog"
                      onClick={() => onNavigate(pageTarget)}
                    >
                      Buka Halaman Modul {module.number} →
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. RUANG RUMUS LEMBAR LABORATORIUM */}
      <FormulaLabSheet />
    </div>
  );
}
