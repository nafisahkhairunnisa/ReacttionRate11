import { useState, useEffect } from 'react';
import { CourseProgressProvider } from './context/CourseProgressContext.jsx';
import { GamificationProvider } from './context/GamificationContext.jsx';
import { Header } from './components/layout/Header';
import { HomePage } from './components/home/HomePage';
import { Module1Page } from './pages/Module1Page';
import { Module2Page } from './pages/Module2Page';
import { Module3Page } from './pages/Module3Page';
import { Module4Page } from './pages/Module4Page';
import { Module5Page } from './pages/Module5Page';
import { QuizPage } from './pages/QuizPage';
import { Footer } from './components/layout/Footer';

/**
 * Mendapatkan ID halaman awal dari hash URL peramban
 * Mendukung navigasi: #home, #modul-1, #modul-2, #modul-3, #modul-4, #modul-5, #kuis
 */
function getInitialPage() {
  const hash = window.location.hash.replace('#', '');
  const validPages = ['home', 'modul-1', 'modul-2', 'modul-3', 'modul-4', 'modul-5', 'kuis'];
  if (validPages.includes(hash)) return hash;
  return 'home';
}

/**
 * Root Application Component - ChemVerse (KinetiLab 11)
 * Mengelola navigasi terpusat seluruh modul (Modul 1 s.d. 5) dan kuis interaktif.
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
    <CourseProgressProvider>
      <GamificationProvider>
        <div className="app-layout">
          {/* Header Navigasi Lengkap */}
          <Header currentPage={currentPage} onNavigate={navigateTo} />

          <main className="app-main-content">
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
          </main>

          <Footer />
        </div>
      </GamificationProvider>
    </CourseProgressProvider>
  );
}

export default App;
