import { useState, useEffect } from 'react';
import { CourseProgressProvider } from './context/CourseProgressContext.jsx';
import { GamificationProvider } from './context/GamificationContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { useAuth } from './hooks/useAuth';
import { Header } from './components/layout/Header';
import { HomePage } from './components/home/HomePage';
import { Module1Page } from './pages/Module1Page';
import { Module2Page } from './pages/Module2Page';
import { Module3Page } from './pages/Module3Page';
import { Module4Page } from './pages/Module4Page';
import { Module5Page } from './pages/Module5Page';
import { QuizPage } from './pages/QuizPage';
import { LoginPage } from './pages/LoginPage';
import { TeacherDashboardPage } from './pages/TeacherDashboardPage';
import { Footer } from './components/layout/Footer';

/**
 * Mendapatkan ID halaman awal dari hash URL peramban
 * Mendukung navigasi: #home, #modul-1 s.d. #modul-5, #kuis, #login, #guru
 */
function getInitialPage() {
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'modul-1', 'modul-2', 'modul-3', 'modul-4', 'modul-5', 'kuis', 'login', 'guru'];
  if (validPages.includes(hash)) return hash;
  return 'home';
}

/**
 * Komponen Pengelola Rute & Hak Akses Berdasarkan Status Login
 */
function AppContent({ currentPage, navigateTo }) {
  const { isLoggedIn, isTeacher, authLoading } = useAuth();

  // Halaman terlindungi yang mensyaratkan pengguna masuk (login)
  const protectedPages = ['modul-1', 'modul-2', 'modul-3', 'modul-4', 'modul-5', 'kuis'];
  const isProtected = protectedPages.includes(currentPage);
  const isTeacherPage = currentPage === 'guru';

  // Tampilan transisi saat verifikasi Firebase awal berjalan
  if (authLoading) {
    return (
      <div className="auth-loading-screen">
        <div className="loading-spinner">🧪</div>
        <p>Menghubungkan ke sesi ChemVerse...</p>
      </div>
    );
  }

  // Jika mengakses modul atau kuis tanpa login, arahkan ke login dengan pemberitahuan
  if (isProtected && !isLoggedIn) {
    return (
      <LoginPage
        onNavigate={navigateTo}
        redirectNotice="Akses Modul Terkunci: Silakan masuk menggunakan Akun Google atau Email Anda untuk membuka Modul 1 sampai Modul 5."
      />
    );
  }

  // Jika mengakses Panel Guru tanpa login sebagai guru
  if (isTeacherPage && (!isLoggedIn || !isTeacher)) {
    return (
      <LoginPage
        onNavigate={navigateTo}
        redirectNotice="Akses Panel Guru memerlukan otorisasi pendidik. Silakan masuk menggunakan akun Guru Kimia."
      />
    );
  }

  return (
    <>
      {currentPage === 'home' && (
        <HomePage onNavigate={navigateTo} />
      )}

      {currentPage === 'modul-1' && (
        <Module1Page onNavigate={navigateTo} />
      )}

      {currentPage === 'modul-2' && (
        <Module2Page onNavigate={navigateTo} />
      )}

      {currentPage === 'modul-3' && (
        <Module3Page onNavigate={navigateTo} />
      )}

      {currentPage === 'modul-4' && (
        <Module4Page onNavigate={navigateTo} />
      )}

      {currentPage === 'modul-5' && (
        <Module5Page onNavigate={navigateTo} />
      )}

      {currentPage === 'kuis' && (
        <QuizPage onNavigate={navigateTo} />
      )}

      {currentPage === 'login' && (
        <LoginPage onNavigate={navigateTo} />
      )}

      {currentPage === 'guru' && (
        <TeacherDashboardPage onNavigate={navigateTo} />
      )}
    </>
  );
}

/**
 * Root Application Component - ChemVerse (KinetiLab 11)
 * Mengelola navigasi terpusat seluruh modul (Modul 1 s.d. 5), kuis interaktif,
 * sistem autentikasi pengguna (Login), dan Panel Guru.
 */
function App() {
  const [currentPage, setCurrentPage] = useState(getInitialPage);

  // Pantau perubahan hash di URL
  useEffect(() => {
    const handleHashChange = () => {
      const page = getInitialPage();
      setCurrentPage(page);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Fungsi navigasi halaman terpusat
  const navigateTo = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId === 'home' ? '' : pageId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <CourseProgressProvider>
        <GamificationProvider>
          <div className="app-layout">
            {/* Header Navigasi & Status Pengguna */}
            <Header currentPage={currentPage} onNavigate={navigateTo} />

            <main className="app-main-content">
              <AppContent currentPage={currentPage} navigateTo={navigateTo} />
            </main>

            <Footer />
          </div>
        </GamificationProvider>
      </CourseProgressProvider>
    </AuthProvider>
  );
}

export default App;
