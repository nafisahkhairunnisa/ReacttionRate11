import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { DEFAULT_CLASSES } from '../data/classData';
import { getStorageItem, STORAGE_KEYS } from '../utils/storage';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

const AVATAR_OPTIONS = ['🧪', '⚛️', '🔬', '🧬', '⚗️', '🥽'];

/**
 * LoginPage Component - ChemVerse
 * Halaman Autentikasi Modern Terintegrasi Firebase:
 * - Masuk Cepat dengan Akun Google (Popup Web SDK)
 * - Masuk & Pendaftaran Akun Baru dengan Email & Kata Sandi
 * - Dukungan Peran Siswa SMA & Guru Kimia
 * - Mode Demonstrasi Cepat (1-Klik) untuk evaluasi instan
 */
export function LoginPage({ onNavigate, redirectNotice = '' }) {
  const {
    currentUser,
    isLoggedIn,
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginDemo,
    logout
  } = useAuth();

  // Mode Autentikasi: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');
  // Peran: 'siswa' | 'guru'
  const [activeRole, setActiveRole] = useState('siswa');

  // Ambil daftar kelas dinamis yang dikelola di Panel Guru
  const availableClasses = getStorageItem(STORAGE_KEYS.CLASSES, DEFAULT_CLASSES);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [studentClass, setStudentClass] = useState(() => availableClasses[0] || 'XI MIPA 1');
  const [studentGroup, setStudentGroup] = useState('');
  const [teacherCode, setTeacherCode] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🧪');

  // UI State
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // 1. Tangani Masuk dengan Akun Google
  const handleGoogleAuth = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
    try {
      const finalClass = activeRole === 'guru'
        ? 'Pendidik Kimia SMA'
        : (studentGroup.trim() ? `${studentClass} (${studentGroup.trim()})` : studentClass);

      await loginWithGoogle(activeRole, finalClass, selectedAvatar);
      setSuccessMessage('Berhasil masuk dengan Akun Google!');
      setTimeout(() => {
        onNavigate(activeRole === 'guru' ? 'guru' : 'home');
      }, 600);
    } catch (err) {
      setErrorMessage(err.message || 'Gagal masuk dengan akun Google.');
    } finally {
      setLoading(false);
    }
  };

  // 2. Tangani Masuk / Daftar dengan Email & Kata Sandi
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      if (authMode === 'login') {
        // Proses Masuk (Login)
        await loginWithEmail(email, password);
        setSuccessMessage('Berhasil masuk ke akun ChemVerse!');
        setTimeout(() => {
          onNavigate(activeRole === 'guru' ? 'guru' : 'home');
        }, 600);
      } else {
        // Proses Pendaftaran Baru (Register)
        if (activeRole === 'guru' && teacherCode.trim() !== 'GURU11' && teacherCode.trim() !== 'guru11') {
          setErrorMessage('Kode verifikasi guru tidak sesuai. Masukkan kode akses pengajar "GURU11".');
          setLoading(false);
          return;
        }

        const finalName = fullName.trim() || (activeRole === 'guru' ? 'Ibu Rahmawati, M.Pd.' : 'Siswa Kinetika');
        const finalClass = activeRole === 'guru'
          ? 'Pendidik Kimia SMA'
          : (studentGroup.trim() ? `${studentClass} (${studentGroup.trim()})` : studentClass);

        await registerWithEmail(email, password, finalName, activeRole, finalClass, selectedAvatar);
        setSuccessMessage('Akun baru berhasil didaftarkan di Firebase! Membuka beranda...');
        setTimeout(() => {
          onNavigate(activeRole === 'guru' ? 'guru' : 'home');
        }, 700);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Terjadi kesalahan saat memproses akun.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Masuk Cepat Mode Demo
  const handleQuickDemo = (role) => {
    if (role === 'guru') {
      loginDemo({
        name: 'Ibu Rahmawati, M.Pd.',
        role: 'guru',
        className: 'Pendidik Kimia SMA',
        avatar: '👩‍🏫'
      });
      onNavigate('guru');
    } else {
      loginDemo({
        name: 'Budi Santoso',
        role: 'siswa',
        className: 'XI MIPA 1 (Kelompok 1)',
        avatar: '🧪'
      });
      onNavigate('home');
    }
  };

  return (
    <div className="login-page-container">
      {/* Breadcrumb Navigasi */}
      <nav className="page-breadcrumb-bar" aria-label="Navigasi Halaman Login">
        <div className="breadcrumb-links">
          <button type="button" className="breadcrumb-btn" onClick={() => onNavigate('home')}>
            Beranda
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Masuk (Autentikasi Akun)</span>
        </div>
        <div className="page-nav-actions">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('home')}>
            ← Kembali ke Beranda
          </Button>
        </div>
      </nav>

      {/* Header Halaman Login */}
      <header className="login-page-hero">
        <div className="hero-badge-row">
          <Badge variant="primary">AUTENTIKASI FIREBASE</Badge>
          <Badge variant="cyan">Google & Email/Password</Badge>
        </div>
        <h1 className="login-page-title">
          Masuk ke Platform ChemVerse
        </h1>
        <p className="login-page-desc">
          Masuk menggunakan Akun Google atau Email untuk membuka seluruh Modul 1 sampai Modul 5, 
          laboratorium kinetika virtual, serta mencatat hasil evaluasi belajar.
        </p>
      </header>

      {/* Pemberitahuan Jika Dialihkan karena Membuka Modul Terkunci */}
      {redirectNotice && (
        <div className="login-notice-banner">
          <span>⚠️ {redirectNotice}</span>
        </div>
      )}

      {/* JIKA SUDAH MASUK */}
      {isLoggedIn ? (
        <div className="already-logged-card">
          <div className="logged-user-info">
            <span className="logged-avatar">{currentUser.avatar || '🧪'}</span>
            <div className="logged-details">
              <span className="logged-greeting">Anda sedang aktif sebagai:</span>
              <h2 className="logged-name">{currentUser.name}</h2>
              {currentUser.email && (
                <span className="logged-email">📧 {currentUser.email}</span>
              )}
              <div className="logged-badges">
                <Badge variant={currentUser.role === 'guru' ? 'primary' : 'cyan'}>
                  {currentUser.role === 'guru' ? '👩‍🏫 Guru Kimia' : '🎓 Siswa SMA'}
                </Badge>
                <span className="logged-class">{currentUser.className}</span>
              </div>
            </div>
          </div>

          <div className="logged-actions">
            <Button variant="primary" size="lg" onClick={() => onNavigate(currentUser.role === 'guru' ? 'guru' : 'home')}>
              {currentUser.role === 'guru' ? '👩‍🏫 Buka Panel Guru →' : '🚀 Buka Seluruh Modul di Beranda →'}
            </Button>
            <Button variant="secondary" size="lg" onClick={logout}>
              🚪 Keluar (Ganti Akun)
            </Button>
          </div>
        </div>
      ) : (
        /* FORMULIR LOGIN / REGISTER UTAMA */
        <div className="login-card-main-box">
          {/* TAB 1: PILIH PERAN (SISWA VS GURU) */}
          <div className="role-selector-tabs" role="tablist" aria-label="Pilih Peran">
            <button
              type="button"
              role="tab"
              aria-selected={activeRole === 'siswa'}
              className={`role-tab-btn ${activeRole === 'siswa' ? 'active' : ''}`}
              onClick={() => {
                setActiveRole('siswa');
                setErrorMessage('');
              }}
            >
              <span className="role-tab-icon">🎓</span>
              <div className="role-tab-text">
                <span className="role-title">Siswa (Pelajar SMA)</span>
                <span className="role-desc">Akses modul, lab virtual, & kuis kinetika</span>
              </div>
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeRole === 'guru'}
              className={`role-tab-btn ${activeRole === 'guru' ? 'active' : ''}`}
              onClick={() => {
                setActiveRole('guru');
                setErrorMessage('');
              }}
            >
              <span className="role-tab-icon">👩‍🏫</span>
              <div className="role-tab-text">
                <span className="role-title">Guru Kimia (Pendidik)</span>
                <span className="role-desc">Akses Panel Guru, kunci kuis, & ekspor nilai</span>
              </div>
            </button>
          </div>

          <div className="auth-form-card">
            {/* OPSI 1: MASUK DENGAN GOOGLE (SANGAT MUDAH & CEPAT) */}
            <div className="google-auth-section">
              <button
                type="button"
                className="btn-google-sign-in"
                onClick={handleGoogleAuth}
                disabled={loading}
              >
                <svg className="google-svg-icon" viewBox="0 0 24 24" width="22" height="22">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.27 21.41 7.34 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.27 2.59 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
                </svg>
                <span>
                  {loading ? 'Menghubungkan ke Google...' : `Masuk Cepat dengan Akun Google (${activeRole === 'guru' ? 'Guru' : 'Siswa'})`}
                </span>
              </button>
              <span className="google-hint">
                Tersinkronisasi otomatis dengan Firebase Authentication proyek Anda.
              </span>
            </div>

            {/* PEMBATAS ANTARA GOOGLE & EMAIL */}
            <div className="auth-divider">
              <span>ATAU DENGAN EMAIL & KATA SANDI</span>
            </div>

            {/* TOGGLE MASUK ATAU DAFTAR */}
            <div className="auth-mode-switch" role="tablist">
              <button
                type="button"
                className={`mode-btn ${authMode === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('login');
                  setErrorMessage('');
                }}
              >
                Sudah Punya Akun? Masuk
              </button>
              <button
                type="button"
                className={`mode-btn ${authMode === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setAuthMode('register');
                  setErrorMessage('');
                }}
              >
                Pengguna Baru? Daftar Akun
              </button>
            </div>

            {/* PESAN FEEDBACK ERROR & SUKSES */}
            {errorMessage && (
              <div className="auth-alert-message error" role="alert">
                ⚠️ {errorMessage}
              </div>
            )}
            {successMessage && (
              <div className="auth-alert-message success" role="status">
                ✓ {successMessage}
              </div>
            )}

            {/* FORMULIR EMAIL & PASSWORD */}
            <form onSubmit={handleEmailAuth} className="email-auth-form">
              {/* Field Tambahan Saat Mendaftar Akun Baru */}
              {authMode === 'register' && (
                <>
                  <div className="input-group">
                    <label className="input-label" htmlFor="full-name">
                      {activeRole === 'guru' ? 'Nama Lengkap Guru (beserta gelar):' : 'Nama Lengkap Siswa:'}
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      required
                      placeholder={activeRole === 'guru' ? 'Contoh: Ibu Rahmawati, M.Pd.' : 'Contoh: Ahmad Rizki'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="chem-text-input"
                    />
                  </div>

                  {/* Pilihan Rombel / Kelompok Siswa */}
                  {activeRole === 'siswa' && (
                    <div className="form-double-group">
                      <div className="input-group">
                        <label className="input-label" htmlFor="student-class-reg">
                          Pilih Kelas:
                        </label>
                        <select
                          id="student-class-reg"
                          value={studentClass}
                          onChange={(e) => setStudentClass(e.target.value)}
                          className="chem-select-input"
                        >
                          {availableClasses.map((cls) => (
                            <option key={cls} value={cls}>{cls}</option>
                          ))}
                        </select>
                      </div>

                      <div className="input-group">
                        <label className="input-label" htmlFor="student-group-reg">
                          Kelompok (Opsional):
                        </label>
                        <input
                          id="student-group-reg"
                          type="text"
                          placeholder="Kelompok 1 / Alpha"
                          value={studentGroup}
                          onChange={(e) => setStudentGroup(e.target.value)}
                          className="chem-text-input"
                        />
                      </div>
                    </div>
                  )}

                  {/* Kode Verifikasi Khusus Guru */}
                  {activeRole === 'guru' && (
                    <div className="input-group">
                      <label className="input-label" htmlFor="teacher-passcode">
                        Kode Akses Guru (Passcode):
                      </label>
                      <input
                        id="teacher-passcode"
                        type="password"
                        required
                        placeholder="Masukkan kode: GURU11"
                        value={teacherCode}
                        onChange={(e) => setTeacherCode(e.target.value)}
                        className="chem-text-input"
                      />
                      <span className="input-hint">
                        Gunakan kode otorisasi pendidik <code>GURU11</code>.
                      </span>
                    </div>
                  )}

                  {/* Pilihan Avatar Sains */}
                  <div className="input-group">
                    <label className="input-label">Pilih Avatar Kimia:</label>
                    <div className="avatar-selection-grid">
                      {AVATAR_OPTIONS.map((av) => (
                        <button
                          key={av}
                          type="button"
                          className={`avatar-option-btn ${selectedAvatar === av ? 'active' : ''}`}
                          onClick={() => setSelectedAvatar(av)}
                        >
                          {av}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Input Email & Password */}
              <div className="input-group">
                <label className="input-label" htmlFor="auth-email">
                  Alamat Email:
                </label>
                <input
                  id="auth-email"
                  type="email"
                  required
                  placeholder="nama@sekolah.sch.id / email@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="chem-text-input"
                />
              </div>

              <div className="input-group">
                <label className="input-label" htmlFor="auth-password">
                  Kata Sandi (Password):
                </label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  minLength={6}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="chem-text-input"
                />
              </div>

              <div className="form-submit-row">
                <Button
                  variant="primary"
                  size="lg"
                  type="submit"
                  className="btn-full-width"
                  disabled={loading}
                >
                  {loading
                    ? 'Sedang Memproses...'
                    : authMode === 'login'
                    ? `🚀 Masuk sebagai ${activeRole === 'guru' ? 'Guru Kimia' : 'Siswa'}`
                    : `📝 Daftarkan Akun ${activeRole === 'guru' ? 'Guru' : 'Siswa'}`}
                </Button>
              </div>
            </form>

            {/* PINTASAN DEMO CEPAT (1-KLIK) */}
            <div className="quick-demo-container">
              <span className="demo-label">⚡ Ingin Uji Coba Cepat Tanpa Mengetik?</span>
              <div className="demo-buttons-row">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => handleQuickDemo('siswa')}
                >
                  Masuk Instan Siswa Demo (Budi)
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={() => handleQuickDemo('guru')}
                >
                  Masuk Instan Guru Demo (Ibu Rahmawati)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
