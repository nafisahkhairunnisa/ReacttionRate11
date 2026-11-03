import { ModuleStudyView } from '../components/home/ModuleStudyView';
import { FormulaLabSheet } from '../components/home/FormulaLabSheet';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

/**
 * Module1Page Component - ChemVerse
 * Halaman Khusus Mandiri untuk Modul 1: Konsep Laju Reaksi & Cara Menyatakannya.
 */
export function Module1Page({ onNavigate }) {
  return (
    <div className="module-page-container">
      {/* Baris Navigasi / Breadcrumb Halaman */}
      <nav className="page-breadcrumb-bar" aria-label="Navigasi Halaman Modul 1">
        <div className="breadcrumb-links">
          <button type="button" className="breadcrumb-btn" onClick={() => onNavigate('home')}>
            Beranda
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Modul 1: Konsep Laju Reaksi</span>
        </div>
        <div className="page-nav-actions">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('home')}>
            ← Kembali ke Beranda
          </Button>
          <Button variant="primary" size="sm" onClick={() => onNavigate('modul-2')}>
            Lanjut ke Modul 2: Teori Tumbukan →
          </Button>
        </div>
      </nav>

      {/* Identitas Halaman Modul 1 */}
      <header className="module-page-hero">
        <div className="hero-badge-row">
          <Badge variant="primary">LKPD DIGITAL #01</Badge>
          <Badge variant="cyan">Materi Inti Aktif</Badge>
          <span className="hero-time-estimate">⏱ Estimasi Belajar: 25 Menit</span>
        </div>
        <h1 className="module-page-title">
          Modul 1: Konsep Laju Reaksi & Cara Menyatakannya
        </h1>
        <p className="module-page-desc">
          Pelajari definisi fisis laju reaksi kimia (r), perbedaan laju rata-rata dengan laju sesaat, 
          dan hubungan perbandingan laju antarzat dengan koefisien reaksi menggunakan tanda (+/−).
        </p>
      </header>

      {/* Lembar Belajar Interaktif Modul 1 (Subbab 1.1 - 1.4) */}
      <main className="module-page-content">
        <ModuleStudyView onClose={() => onNavigate('home')} />
        
        {/* Ruang Rumus Laboratorium Kinetika Kimia */}
        <div className="module-formula-wrapper">
          <FormulaLabSheet />
        </div>
      </main>

      {/* Navigasi Bawah Halaman */}
      <footer className="page-bottom-nav">
        <Button variant="secondary" size="lg" onClick={() => onNavigate('home')}>
          ← Kembali ke Beranda
        </Button>
        <Button variant="primary" size="lg" onClick={() => onNavigate('modul-2')}>
          Buka Halaman Modul 2: Teori Tumbukan →
        </Button>
      </footer>
    </div>
  );
}

