/**
 * Header Component - ChemVerse
 * Navigasi atas dengan identitas platform pembelajaran kimia dan tab navigasi modul 1 s.d. 5 serta kuis.
 * Didesain bersih (Clean Academic Light Mode) dan ramah perangkat seluler.
 */
export function Header({ currentPage = 'home', onNavigate }) {
  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo & Judul ChemVerse */}
        <div className="brand-group" onClick={() => onNavigate && onNavigate('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10 2v7.31a2 2 0 0 1-.37 1.16l-4.92 7.37A2 2 0 0 0 6.38 21h11.24a2 2 0 0 0 1.67-3.16l-4.92-7.37A2 2 0 0 1 14 9.31V2" />
              <path d="M8.5 2h7" />
              <path d="M14 9.3a6.5 6.5 0 1 1-4 0" />
            </svg>
          </div>
          <div className="brand-text">
            <h1 className="brand-title">ChemVerse</h1>
            <span className="brand-subtitle">Laboratorium Kinetika Kimia • Kelas 11 SMA</span>
          </div>
        </div>

        {/* Navigasi Lengkap Halaman ChemVerse */}
        {onNavigate && (
          <nav className="header-nav" aria-label="Navigasi Halaman ChemVerse">
            <button
              type="button"
              className={`nav-tab-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => onNavigate('home')}
            >
              🏠 Beranda
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${currentPage === 'modul-1' ? 'active' : ''}`}
              onClick={() => onNavigate('modul-1')}
            >
              🧪 Modul 1
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${currentPage === 'modul-2' ? 'active' : ''}`}
              onClick={() => onNavigate('modul-2')}
            >
              ⚗️ Modul 2
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${currentPage === 'modul-3' ? 'active' : ''}`}
              onClick={() => onNavigate('modul-3')}
            >
              📊 Modul 3
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${currentPage === 'modul-4' ? 'active' : ''}`}
              onClick={() => onNavigate('modul-4')}
            >
              ⚡ Modul 4
            </button>
            <button
              type="button"
              className={`nav-tab-btn ${currentPage === 'modul-5' ? 'active' : ''}`}
              onClick={() => onNavigate('modul-5')}
            >
              🎓 Modul 5
            </button>
            <button
              type="button"
              className={`nav-tab-btn nav-quiz-btn ${currentPage === 'kuis' ? 'active' : ''}`}
              onClick={() => onNavigate('kuis')}
            >
              📝 Kuis (10 Soal)
            </button>
          </nav>
        )}

        {/* Informasi Akses & Kurikulum */}
        <div className="header-meta">
          <span className="meta-pill meta-curriculum">Kurikulum Merdeka (Fase F)</span>
          <span className="meta-pill meta-access">Akses Bebas • Tanpa Login</span>
        </div>
      </div>
    </header>
  );
}
