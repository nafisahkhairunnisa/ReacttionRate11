import { useAuth } from '../../hooks/useAuth';

/**
 * Header Component - ChemVerse
 * Navigasi atas dengan identitas platform pembelajaran kimia,
 * penanda halaman aktif, status profil pengguna (Siswa/Guru), dan tombol Login/Logout.
 */
export function Header({ currentPage = 'home', onNavigate }) {
  const { currentUser, isLoggedIn, isTeacher, logout } = useAuth();

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Logo & Judul ChemVerse — S2-05-08: ganti div menjadi button agar dapat dijangkau keyboard */}
        <button
          type="button"
          className="brand-group"
          onClick={() => onNavigate && onNavigate('home')}
          aria-label="Kembali ke Beranda ChemVerse"
        >
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
        </button>

        {/* Navigasi Lengkap Halaman ChemVerse (Modul terbuka setelah login) */}
        {onNavigate && (
          <nav className="header-nav" aria-label="Navigasi Halaman ChemVerse">
            <button
              type="button"
              className={`nav-tab-btn ${currentPage === 'home' ? 'active' : ''}`}
              onClick={() => onNavigate('home')}
            >
              🏠 Beranda
            </button>

            {/* Pilihan Modul 1 s.d. 5 & Kuis hanya muncul setelah pengguna berhasil masuk */}
            {isLoggedIn && (
              <>
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
              </>
            )}

            {isTeacher && (
              <button
                type="button"
                className={`nav-tab-btn nav-teacher-btn ${currentPage === 'guru' ? 'active' : ''}`}
                onClick={() => onNavigate('guru')}
              >
                👩‍🏫 Panel Guru
              </button>
            )}
          </nav>
        )}

        {/* Sesi Pengguna & Tombol Login / Profil */}
        <div className="header-auth-group">
          {isLoggedIn ? (
            <div className="user-profile-badge">
              <span className="user-avatar">{currentUser.avatar}</span>
              <div className="user-text-info">
                <span className="user-display-name">{currentUser.name}</span>
                <span className="user-role-tag">
                  {currentUser.role === 'guru' ? 'Guru Kimia' : currentUser.className}
                </span>
              </div>
              <button
                type="button"
                className="btn-header-logout"
                title="Keluar / Ganti Akun"
                onClick={logout}
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="btn-header-login"
              onClick={() => onNavigate && onNavigate('login')}
            >
              🔑 Masuk / Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
