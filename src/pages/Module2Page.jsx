import { useState } from 'react';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

/**
 * Module2Page Component - ChemVerse
 * Halaman Khusus Mandiri untuk Modul 2: Teori Tumbukan & Faktor yang Memengaruhi Laju.
 * Sesuai PRD: Memuat 4 faktor kinetika (konsentrasi, luas permukaan, suhu, katalis)
 * serta pratinjau simulator dan lab virtual yang dijadwalkan pada tahap berikutnya.
 */
export function Module2Page({ onNavigate }) {
  const { isSubchapterComplete, toggleSubchapter } = useCourseProgress();
  const [activeTab, setActiveTab] = useState('2.1');

  return (
    <div className="module-page-container">
      {/* Baris Navigasi / Breadcrumb Halaman */}
      <nav className="page-breadcrumb-bar" aria-label="Navigasi Halaman Modul 2">
        <div className="breadcrumb-links">
          <button type="button" className="breadcrumb-btn" onClick={() => onNavigate('home')}>
            Beranda
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Modul 2: Teori Tumbukan & Faktor Laju</span>
        </div>
        <div className="page-nav-actions">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('home')}>
            ← Kembali ke Beranda
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-1')}>
            ← Ke Modul 1: Konsep Laju
          </Button>
        </div>
      </nav>

      {/* Header Halaman Modul 2 */}
      <header className="module-page-hero">
        <div className="hero-badge-row">
          <Badge variant="cyan">LKPD DIGITAL #02</Badge>
          <Badge variant="primary">Halaman Modul 2</Badge>
          <span className="hero-time-estimate">⏱ Estimasi Belajar: 30 Menit</span>
        </div>
        <h1 className="module-page-title">
          Modul 2: Teori Tumbukan & Faktor-Faktor yang Memengaruhi Laju Reaksi
        </h1>
        <p className="module-page-desc">
          Mengupas kinetika kimia dari sudut pandang mikroskopis: bagaimana partikel-partikel pereaksi 
          saling bertumbukan, syarat terbentuknya tumbukan efektif, serta pengaruh 4 faktor lingkungan reaksi.
        </p>
      </header>

      {/* Konten Utama Modul 2 */}
      <main className="module-page-content">
        <div className="module-study-view">
          {/* Navigasi Tab Subbab Modul 2 */}
          <div className="study-tabs-nav" role="tablist" aria-label="Bagian Belajar Modul 2">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '2.1'}
              className={`study-tab-btn ${activeTab === '2.1' ? 'active' : ''}`}
              onClick={() => setActiveTab('2.1')}
            >
              <span className="tab-num">2.1</span>
              <span className="tab-label">Teori Tumbukan</span>
              {isSubchapterComplete('2.1') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '2.2'}
              className={`study-tab-btn ${activeTab === '2.2' ? 'active' : ''}`}
              onClick={() => setActiveTab('2.2')}
            >
              <span className="tab-num">2.2</span>
              <span className="tab-label">Konsentrasi & Luas</span>
              {isSubchapterComplete('2.2') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '2.3'}
              className={`study-tab-btn ${activeTab === '2.3' ? 'active' : ''}`}
              onClick={() => setActiveTab('2.3')}
            >
              <span className="tab-num">2.3</span>
              <span className="tab-label">Pengaruh Suhu</span>
              {isSubchapterComplete('2.3') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '2.4'}
              className={`study-tab-btn ${activeTab === '2.4' ? 'active' : ''}`}
              onClick={() => setActiveTab('2.4')}
            >
              <span className="tab-num">2.4</span>
              <span className="tab-label">Peran Katalis</span>
              {isSubchapterComplete('2.4') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '2.5'}
              className={`study-tab-btn ${activeTab === '2.5' ? 'active' : ''}`}
              onClick={() => setActiveTab('2.5')}
            >
              <span className="tab-num">2.5</span>
              <span className="tab-label">Simulator Partikel</span>
              {isSubchapterComplete('2.5') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '2.6'}
              className={`study-tab-btn ${activeTab === '2.6' ? 'active' : ''}`}
              onClick={() => setActiveTab('2.6')}
            >
              <span className="tab-num">2.6</span>
              <span className="tab-label">Lab Virtual</span>
              {isSubchapterComplete('2.6') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '2.7'}
              className={`study-tab-btn ${activeTab === '2.7' ? 'active' : ''}`}
              onClick={() => setActiveTab('2.7')}
            >
              <span className="tab-num">2.7</span>
              <span className="tab-label">Rangkuman Pembelajaran</span>
              {isSubchapterComplete('2.7') && <span className="tab-check">✓</span>}
            </button>
          </div>

          <div className="study-content-panel">
            {/* 2.1 TEORI TUMBUKAN */}
            {activeTab === '2.1' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 2.1 • Tingkat Mikroskopis</span>
                    <h3 className="section-heading">Teori Tumbukan & Syarat Tumbukan Efektif</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('2.1') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('2.1')}
                  >
                    {isSubchapterComplete('2.1') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Reaksi kimia hanya dapat terjadi jika partikel-partikel reaktan saling bertumbukan. 
                    Namun, <strong>tidak semua tumbukan menghasilkan reaksi kimia</strong>. Tumbukan yang berhasil 
                    menghasilkan zat produk disebut sebagai <strong>tumbukan efektif</strong>.
                  </p>

                  <div className="two-columns-comparison">
                    <div className="compare-box reactant-side">
                      <span className="compare-title">Syarat 1: Orientasi Molekul yang Tepat</span>
                      <p>
                        Partikel harus bertumbukan dengan posisi dan sudut ruang yang memungkinkan 
                        terjadinya pemutusan ikatan lama dan pembentukan ikatan baru.
                      </p>
                    </div>

                    <div className="compare-box product-side">
                      <span className="compare-title">Syarat 2: Energi Kinetik Cukup (E ≥ Eₐ)</span>
                      <p>
                        Partikel harus memiliki energi kinetik minimum yang sama atau lebih besar dari 
                        <strong> Energi Aktivasi (Eₐ)</strong> agar dapat melampaui kompleks teraktivasi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="primary" onClick={() => setActiveTab('2.2')}>
                    Lanjut ke Bagian 2.2: Pengaruh Konsentrasi & Luas Permukaan →
                  </Button>
                </div>
              </article>
            )}

            {/* 2.2 KONSENTRASI & LUAS PERMUKAAN */}
            {activeTab === '2.2' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 2.2 • Faktor Reaksi</span>
                    <h3 className="section-heading">Pengaruh Konsentrasi & Luas Permukaan Bidang Sentuh</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('2.2') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('2.2')}
                  >
                    {isSubchapterComplete('2.2') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <div className="rate-types-grid">
                    <div className="rate-card">
                      <h4>A. Pengaruh Konsentrasi Pereaksi</h4>
                      <p>
                        Semakin tinggi konsentrasi reaktan, jumlah partikel per satuan volume semakin banyak. 
                        Hal ini menyebabkan partikel saling berdekatan sehingga <strong>frekuensi tumbukan antarpartikel per detik meningkat</strong>, 
                        yang berujung pada meningkatnya laju reaksi (r).
                      </p>
                    </div>

                    <div className="rate-card">
                      <h4>B. Pengaruh Luas Permukaan Bidang Sentuh</h4>
                      <p>
                        Pada zat padat, reaksi hanya berlangsung pada permukaan partikel yang bersentuhan dengan zat lain. 
                        Jika padatan dihaluskan menjadi <strong>serbuk</strong>, luas bidang sentuh total menjadi jauh lebih besar 
                        daripada bentuk <strong>kepingan</strong>, sehingga frekuensi tumbukan jauh lebih tinggi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('2.1')}>
                    ← Kembali ke Bagian 2.1
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('2.3')}>
                    Lanjut ke Bagian 2.3: Pengaruh Suhu →
                  </Button>
                </div>
              </article>
            )}

            {/* 2.3 PENGARUH SUHU */}
            {activeTab === '2.3' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 2.3 • Termodinamika & Kinetika</span>
                    <h3 className="section-heading">Pengaruh Suhu & Distribusi Energi Kinetik</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('2.3') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('2.3')}
                  >
                    {isSubchapterComplete('2.3') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Ketika suhu suatu sistem dinaikkan, energi kinetik rata-rata seluruh partikel meningkat 
                    dan partikel bergerak lebih cepat.
                  </p>
                  <div className="concept-callout info">
                    <h4>Prinsip Distribusi Maxwell-Boltzmann:</h4>
                    <p>
                      Kenaikan suhu tidak hanya mempercepat gerak partikel, tetapi yang paling utama adalah 
                      <strong> melipatgandakan fraksi partikel yang energinya mampu melampaui energi aktivasi (E ≥ Eₐ)</strong>.
                      Secara empiris, kenaikan suhu sebesar 10 °C umumnya melipatgandakan laju reaksi sebesar 2 hingga 3 kali lipat.
                    </p>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('2.2')}>
                    ← Kembali ke Bagian 2.2
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('2.4')}>
                    Lanjut ke Bagian 2.4: Peran Katalis →
                  </Button>
                </div>
              </article>
            )}

            {/* 2.4 PERAN KATALIS */}
            {activeTab === '2.4' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 2.4 • Katalisis Kimia</span>
                    <h3 className="section-heading">Peran Katalis & Penurunan Energi Aktivasi (Eₐ)</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('2.4') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('2.4')}
                  >
                    {isSubchapterComplete('2.4') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    <strong>Katalis</strong> adalah zat yang mampu mempercepat laju reaksi kimia tanpa 
                    mengalami perubahan kimia permanen di akhir reaksi.
                  </p>
                  <div className="concept-callout success">
                    <h4>Mekanisme Kerja Katalis:</h4>
                    <p>
                      Katalis bekerja dengan cara <strong>menyediakan rute reaksi alternatif</strong> yang memiliki 
                      <strong> energi aktivasi (Eₐ) lebih rendah</strong> dibandingkan reaksi tanpa katalis.
                      Dengan ambang batas energi yang lebih rendah, semakin banyak partikel yang mampu bertumbukan secara efektif.
                    </p>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('2.3')}>
                    ← Kembali ke Bagian 2.3
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('2.5')}>
                    Lanjut ke Bagian 2.5: Simulator Partikel →
                  </Button>
                </div>
              </article>
            )}

            {/* 2.5 SIMULATOR PARTIKEL 2D */}
            {activeTab === '2.5' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 2.5 • Simulator Interaktif</span>
                    <h3 className="section-heading">Laboratorium Tumbukan Partikel 2D</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('2.5') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('2.5')}
                  >
                    {isSubchapterComplete('2.5') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <div className="next-chapter-teaser">
                    <div className="teaser-badge">FITUR SIMULASI TAHAP MILESTONE 3 (PRD)</div>
                    <h4>Mesin Simulator Canvas 2D Partikel Kinetika</h4>
                    <p>
                      Simulator ini dirancang untuk menampilkan gerak partikel gas acak secara dinamis:
                      partikel saling memantul jika energinya tidak cukup (tumbukan tidak efektif) 
                      dan membentuk produk berwarna emerald saat melampaui \(E_a\) (tumbukan efektif).
                    </p>
                    <div className="teaser-status">
                      <Badge variant="cyan">Sedang Disiapkan untuk Integrasi Penuh</Badge>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('2.4')}>
                    ← Kembali ke Bagian 2.4
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('2.6')}>
                    Lanjut ke Bagian 2.6: Lab Virtual →
                  </Button>
                </div>
              </article>
            )}

            {/* 2.6 LAB VIRTUAL */}
            {activeTab === '2.6' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 2.6 • Praktikum Laboratorium Digital</span>
                    <h3 className="section-heading">Lab Virtual Eksperimen Faktor Laju Reaksi</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('2.6') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('2.6')}
                  >
                    {isSubchapterComplete('2.6') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <div className="next-chapter-teaser">
                    <div className="teaser-badge">LABORATORIUM PRAKTIKUM VIRTUAL</div>
                    <h4>3 Eksperimen Interaktif Laju Reaksi</h4>
                    <ul className="locked-feat-list" style={{ marginTop: '0.5rem' }}>
                      <li><strong>Eksperimen A:</strong> Pengaruh Suhu & Bentuk Tablet Effervescent (Utuh vs Serbuk) dengan Stopwatch.</li>
                      <li><strong>Eksperimen B:</strong> Reaksi Natrium Tiosulfat (Na₂S₂O₃) dengan HCl (Uji Tanda Silang & Kekeruhan Belerang).</li>
                      <li><strong>Eksperimen C:</strong> Penguraian H₂O₂ dengan Katalis MnO₂ dan KI.</li>
                    </ul>
                    <div className="teaser-status" style={{ marginTop: '0.75rem' }}>
                      <Badge variant="primary">Disiapkan sesuai Panduan PRD</Badge>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('2.5')}>
                    ← Kembali ke Bagian 2.5
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('2.7')}>
                    Lanjut ke Bagian 2.7: Rangkuman Pembelajaran →
                  </Button>
                </div>
              </article>
            )}

            {/* 2.7 RANGKUMAN */}
            {activeTab === '2.7' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 2.7 • Cek Pemahaman</span>
                    <h3 className="section-heading">Rangkuman Pembelajaran</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('2.7') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('2.7')}
                  >
                    {isSubchapterComplete('2.7') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <div className="summary-checklist">
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Tumbukan Efektif:</strong> Memerlukan orientasi ruang yang tepat serta energi kinetik partikel \(E \ge E_a\).
                      </div>
                    </div>
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Konsentrasi & Luas Permukaan:</strong> Meningkatkan frekuensi tumbukan per detik antarpartikel pereaksi.
                      </div>
                    </div>
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Suhu:</strong> Menambah energi kinetik dan melipatgandakan fraksi partikel dengan energi melampaui \(E_a\).
                      </div>
                    </div>
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Katalis:</strong> Menyediakan lintasan reaksi alternatif dengan energi aktivasi yang lebih rendah.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('2.6')}>
                    ← Kembali ke Bagian 2.6
                  </Button>
                  <Button variant="primary" onClick={() => onNavigate('home')}>
                    Selesai & Kembali ke Beranda
                  </Button>
                </div>
              </article>
            )}
          </div>
        </div>
      </main>

      {/* Navigasi Bawah Halaman */}
      <footer className="page-bottom-nav">
        <Button variant="secondary" size="lg" onClick={() => onNavigate('modul-1')}>
          ← Kembali ke Modul 1
        </Button>
        <Button variant="primary" size="lg" onClick={() => onNavigate('home')}>
          🏠 Kembali ke Beranda ChemVerse
        </Button>
      </footer>
    </div>
  );
}

