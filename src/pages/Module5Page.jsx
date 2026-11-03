import { useState } from 'react';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { getStorageItem, STORAGE_KEYS } from '../utils/storage';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

/**
 * Module5Page Component - ChemVerse
 * Halaman Khusus Mandiri untuk Modul 5: Evaluasi Akhir & Penghargaan Prestasi.
 * Dilengkapi Sertifikat Kelulusan Digital Interaktif (bisa dicetak/disimpan PDF).
 */
export function Module5Page({ onNavigate }) {
  const { isSubchapterComplete, toggleSubchapter, progressPercent } = useCourseProgress();
  const [activeTab, setActiveTab] = useState('5.1');

  // Ambil riwayat kuis dari localStorage
  const quizHistory = getStorageItem(STORAGE_KEYS.QUIZ, null);
  const bestScore = quizHistory?.score ?? null;

  // Nama siswa untuk sertifikat (disimpan lokal di peramban)
  const [studentName, setStudentName] = useState(() => {
    const profile = getStorageItem(STORAGE_KEYS.PROFILE, { name: '' });
    return profile?.name || 'Pelajar Kimia Hebat';
  });

  // Tanggal sertifikat
  const [issueDate] = useState(() =>
    new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
  );

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="module-page-container">
      {/* Navigasi Breadcrumb */}
      <nav className="page-breadcrumb-bar" aria-label="Navigasi Halaman Modul 5">
        <div className="breadcrumb-links">
          <button type="button" className="breadcrumb-btn" onClick={() => onNavigate('home')}>
            Beranda
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Modul 5: Evaluasi Akhir & Sertifikat</span>
        </div>
        <div className="page-nav-actions">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-4')}>
            ← Ke Modul 4
          </Button>
          <Button variant="primary" size="sm" onClick={() => onNavigate('kuis')}>
            📝 Buka Kuis (10 Soal) →
          </Button>
        </div>
      </nav>

      {/* Hero Header Modul 5 */}
      <header className="module-page-hero">
        <div className="hero-badge-row">
          <Badge variant="primary">LKPD DIGITAL #05</Badge>
          <Badge variant="cyan">Kelulusan & Sertifikasi</Badge>
          <span className="hero-time-estimate">⏱ Evaluasi Mandiri</span>
        </div>
        <h1 className="module-page-title">
          Modul 5: Evaluasi Akhir & Klaim Sertifikat Kelulusan
        </h1>
        <p className="module-page-desc">
          Uji pemahaman komprehensif Anda melalui arena kuis 10 soal, tinjau analisis diagnostik per bab, 
          dan klaim sertifikat digital kelulusan resmi ChemVerse.
        </p>
      </header>

      {/* Konten Tab Modul 5 */}
      <main className="module-page-content">
        <div className="module-study-view">
          <div className="study-tabs-nav" role="tablist" aria-label="Bagian Belajar Modul 5">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '5.1'}
              className={`study-tab-btn ${activeTab === '5.1' ? 'active' : ''}`}
              onClick={() => setActiveTab('5.1')}
            >
              <span className="tab-num">5.1</span>
              <span className="tab-label">Ujian Komprehensif</span>
              {isSubchapterComplete('5.1') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '5.2'}
              className={`study-tab-btn ${activeTab === '5.2' ? 'active' : ''}`}
              onClick={() => setActiveTab('5.2')}
            >
              <span className="tab-num">5.2</span>
              <span className="tab-label">Analisis Diagnostik</span>
              {isSubchapterComplete('5.2') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '5.3'}
              className={`study-tab-btn ${activeTab === '5.3' ? 'active' : ''}`}
              onClick={() => setActiveTab('5.3')}
            >
              <span className="tab-num">5.3</span>
              <span className="tab-label">Sertifikat Digital</span>
              {isSubchapterComplete('5.3') && <span className="tab-check">✓</span>}
            </button>
          </div>

          <div className="study-content-panel">
            {/* SUBBAB 5.1 UJIAN KOMPREHENSIF */}
            {activeTab === '5.1' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 5.1 • Evaluasi Pengetahuan</span>
                    <h3 className="section-heading">Ujian Komprehensif Kinetika Kimia Kelas 11</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('5.1') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('5.1')}
                  >
                    {isSubchapterComplete('5.1') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Ujian komprehensif terdiri atas <strong>10 soal pilihan ganda interaktif</strong> yang menguji 
                    pemahaman Anda pada Modul 1 (Konsep & Stoikiometri Laju), Modul 2 (Teori Tumbukan & 4 Faktor), 
                    Modul 3 (Persamaan Laju & Orde), serta Modul 4 (Energi Aktivasi & Katalis).
                  </p>

                  <div className="exam-card-cta">
                    <div className="exam-status-box">
                      <span className="status-label">Status Pengerjaan Kuis Anda:</span>
                      {bestScore !== null ? (
                        <div className="score-summary-badge">
                          <span className="score-num">{bestScore}/100</span>
                          <span className="score-text">
                            {bestScore >= 70 ? '🎉 LULUS (Memenuhi Standar KKM)' : '⚠️ Belum Mencapai KKM (Disarankan Ulangi)'}
                          </span>
                        </div>
                      ) : (
                        <div className="score-empty-badge">
                          <span>Belum Ada Skor Kuis Tersimpan</span>
                        </div>
                      )}
                    </div>

                    <div className="exam-action-buttons">
                      <Button
                        variant="primary"
                        size="lg"
                        className="btn-launch-quiz"
                        onClick={() => onNavigate('kuis')}
                      >
                        📝 {bestScore !== null ? 'Kerjakan Ulang Kuis (10 Soal)' : 'Mulai Kerjakan Kuis Sekarang (10 Soal)'}
                      </Button>
                      <span className="exam-hint">
                        Dilengkapi pembahasan lengkap dan umpan balik langsung setelah submit.
                      </span>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="primary" onClick={() => setActiveTab('5.2')}>
                    Lanjut ke Bagian 5.2: Analisis Diagnostik →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 5.2 ANALISIS DIAGNOSTIK */}
            {activeTab === '5.2' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 5.2 • Refleksi Belajar</span>
                    <h3 className="section-heading">Analisis Diagnostik & Rekomendasi Remedial</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('5.2') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('5.2')}
                  >
                    {isSubchapterComplete('5.2') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Tinjau penguasaan materi kinetika kimia Anda per modul. Klik tombol modul terkait jika Anda ingin 
                    mempelajari kembali subbab yang belum optimal:
                  </p>

                  <div className="diagnostic-grid">
                    <div className="diag-item">
                      <div className="diag-header">
                        <span className="diag-title">Modul 1: Konsep Laju Reaksi</span>
                        <Badge variant="cyan">Modul 1</Badge>
                      </div>
                      <p>Definisi r, tanda (+/−), satuan M/s, dan perbandingan koefisien reaksi.</p>
                      <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-1')}>
                        Buka Modul 1 ↗
                      </Button>
                    </div>

                    <div className="diag-item">
                      <div className="diag-header">
                        <span className="diag-title">Modul 2: Teori Tumbukan & Faktor</span>
                        <Badge variant="cyan">Modul 2</Badge>
                      </div>
                      <p>Syarat tumbukan efektif, pengaruh konsentrasi, luas permukaan, suhu, dan katalis.</p>
                      <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-2')}>
                        Buka Modul 2 ↗
                      </Button>
                    </div>

                    <div className="diag-item">
                      <div className="diag-header">
                        <span className="diag-title">Modul 3: Persamaan Laju & Orde</span>
                        <Badge variant="cyan">Modul 3</Badge>
                      </div>
                      <p>Menentukan orde dari data tabel eksperimen, grafik kinetika, dan menghitung k.</p>
                      <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-3')}>
                        Buka Modul 3 ↗
                      </Button>
                    </div>

                    <div className="diag-item">
                      <div className="diag-header">
                        <span className="diag-title">Modul 4: Energi Aktivasi & Aplikasi</span>
                        <Badge variant="cyan">Modul 4</Badge>
                      </div>
                      <p>Diagram profil energi eksoterm/endoterm, kompleks teraktivasi, dan katalis.</p>
                      <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-4')}>
                        Buka Modul 4 ↗
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('5.1')}>
                    ← Kembali ke Bagian 5.1
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('5.3')}>
                    Lanjut ke Bagian 5.3: Klaim Sertifikat Digital →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 5.3 SERTIFIKAT DIGITAL */}
            {activeTab === '5.3' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 5.3 • Penghargaan Resmi</span>
                    <h3 className="section-heading">Sertifikat Kelulusan Digital ChemVerse</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('5.3') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('5.3')}
                  >
                    {isSubchapterComplete('5.3') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Ketikkan nama lengkap Anda pada formulir di bawah ini untuk dicetak pada sertifikat kelulusan. 
                    Nama Anda disimpan secara aman hanya di perangkat lokal peramban Anda.
                  </p>

                  <div className="certificate-input-row">
                    <label htmlFor="student-name-input" className="cert-label">
                      Nama Lengkap Siswa / Pelajar:
                    </label>
                    <input
                      id="student-name-input"
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="Masukkan nama Anda..."
                      className="cert-text-input"
                    />
                  </div>

                  {/* TAMPILAN FISIK SERTIFIKAT DIGITAL */}
                  <div className="certificate-frame" id="printable-certificate">
                    <div className="cert-inner-border">
                      <div className="cert-watermark">CHEMVERSE</div>
                      
                      <div className="cert-header">
                        <div className="cert-logo-circle">🔬</div>
                        <h2 className="cert-main-title">SERTIFIKAT KELULUSAN</h2>
                        <span className="cert-subtitle">KURSUS & LABORATORIUM VIRTUAL KINETIKA KIMIA</span>
                      </div>

                      <div className="cert-body">
                        <p className="cert-statement">Diberikan dengan bangga kepada:</p>
                        <h3 className="cert-recipient-name">{studentName || 'Pelajar Kimia Hebat'}</h3>
                        <p className="cert-description">
                          Telah berhasil menyelesaikan seluruh rangkaian materi lembar belajar laboratorium 
                          <strong> Laju Reaksi Kimia (Modul 1 s.d. Modul 5)</strong> sesuai Capaian Pembelajaran 
                          Fase F Kurikulum Merdeka dengan pencapaian modul <strong>{progressPercent}%</strong>.
                        </p>
                      </div>

                      <div className="cert-details-row">
                        <div className="cert-detail-item">
                          <span className="detail-label">Nilai Kuis:</span>
                          <strong className="detail-val">{bestScore !== null ? `${bestScore} / 100` : '100 / 100'}</strong>
                        </div>
                        <div className="cert-detail-item">
                          <span className="detail-label">Predikat:</span>
                          <strong className="detail-val">Master Kinetika Kimia</strong>
                        </div>
                        <div className="cert-detail-item">
                          <span className="detail-label">Tanggal:</span>
                          <strong className="detail-val">{issueDate}</strong>
                        </div>
                      </div>

                      <div className="cert-footer">
                        <div className="cert-signature-box">
                          <div className="sign-line"></div>
                          <span className="sign-name">ChemVerse Digital Academic</span>
                          <span className="sign-role">Platform Bahan Ajar Digital Kimia SMA</span>
                        </div>
                        <div className="cert-seal">
                          <span>VERIFIED</span>
                          <span>Fase F</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="certificate-actions">
                    <Button variant="primary" size="lg" onClick={handlePrintCertificate}>
                      🖨️ Cetak / Simpan PDF Sertifikat
                    </Button>
                    <Button variant="secondary" size="lg" onClick={() => onNavigate('kuis')}>
                      📝 Buka Arena Kuis
                    </Button>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('5.2')}>
                    ← Kembali ke Bagian 5.2
                  </Button>
                  <Button variant="primary" onClick={() => onNavigate('home')}>
                    🏠 Selesai & Kembali ke Beranda
                  </Button>
                </div>
              </article>
            )}
          </div>
        </div>
      </main>

      {/* Navigasi Bawah */}
      <footer className="page-bottom-nav">
        <Button variant="secondary" size="lg" onClick={() => onNavigate('modul-4')}>
          ← Kembali ke Modul 4
        </Button>
        <Button variant="primary" size="lg" onClick={() => onNavigate('home')}>
          🏠 Kembali ke Beranda ChemVerse
        </Button>
      </footer>
    </div>
  );
}
