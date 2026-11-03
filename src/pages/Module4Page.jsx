import { useState } from 'react';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

/**
 * Module4Page Component - ChemVerse
 * Halaman Khusus Mandiri untuk Modul 4: Energi Aktivasi, Mekanisme & Penerapan.
 * Dilengkapi Diagram Profil Energi Dinamis (SVG) dan Studi Kasus Industri.
 */
export function Module4Page({ onNavigate }) {
  const { isSubchapterComplete, toggleSubchapter } = useCourseProgress();
  const [activeTab, setActiveTab] = useState('4.1');

  // State untuk diagram profil energi
  const [reactionType, setReactionType] = useState('exothermic'); // 'exothermic' | 'endothermic'
  const [showCatalyst, setShowCatalyst] = useState(false);

  return (
    <div className="module-page-container">
      {/* Navigasi Breadcrumb */}
      <nav className="page-breadcrumb-bar" aria-label="Navigasi Halaman Modul 4">
        <div className="breadcrumb-links">
          <button type="button" className="breadcrumb-btn" onClick={() => onNavigate('home')}>
            Beranda
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Modul 4: Energi Aktivasi & Aplikasi</span>
        </div>
        <div className="page-nav-actions">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-3')}>
            ← Ke Modul 3
          </Button>
          <Button variant="primary" size="sm" onClick={() => onNavigate('modul-5')}>
            Lanjut ke Modul 5 →
          </Button>
        </div>
      </nav>

      {/* Hero Header Modul 4 */}
      <header className="module-page-hero">
        <div className="hero-badge-row">
          <Badge variant="primary">LKPD DIGITAL #04</Badge>
          <Badge variant="cyan">Materi Lanjutan</Badge>
          <span className="hero-time-estimate">⏱ Estimasi Belajar: 30 Menit</span>
        </div>
        <h1 className="module-page-title">
          Modul 4: Energi Aktivasi, Mekanisme & Penerapan Kinetika
        </h1>
        <p className="module-page-desc">
          Eksplorasi profil energi potensial reaksi kimia, keadaan kompleks teraktivasi, 
          peran katalis dalam menurunkan energi aktivasi (Eₐ), serta penerapan kinetika dalam industri nyata.
        </p>
      </header>

      {/* Konten Tab Modul 4 */}
      <main className="module-page-content">
        <div className="module-study-view">
          <div className="study-tabs-nav" role="tablist" aria-label="Bagian Belajar Modul 4">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '4.1'}
              className={`study-tab-btn ${activeTab === '4.1' ? 'active' : ''}`}
              onClick={() => setActiveTab('4.1')}
            >
              <span className="tab-num">4.1</span>
              <span className="tab-label">Diagram Profil Energi</span>
              {isSubchapterComplete('4.1') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '4.2'}
              className={`study-tab-btn ${activeTab === '4.2' ? 'active' : ''}`}
              onClick={() => setActiveTab('4.2')}
            >
              <span className="tab-num">4.2</span>
              <span className="tab-label">Jalur Katalis</span>
              {isSubchapterComplete('4.2') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '4.3'}
              className={`study-tab-btn ${activeTab === '4.3' ? 'active' : ''}`}
              onClick={() => setActiveTab('4.3')}
            >
              <span className="tab-num">4.3</span>
              <span className="tab-label">Mekanisme Reaksi</span>
              {isSubchapterComplete('4.3') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '4.4'}
              className={`study-tab-btn ${activeTab === '4.4' ? 'active' : ''}`}
              onClick={() => setActiveTab('4.4')}
            >
              <span className="tab-num">4.4</span>
              <span className="tab-label">Penerapan Industri</span>
              {isSubchapterComplete('4.4') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '4.5'}
              className={`study-tab-btn ${activeTab === '4.5' ? 'active' : ''}`}
              onClick={() => setActiveTab('4.5')}
            >
              <span className="tab-num">4.5</span>
              <span className="tab-label">Rangkuman Pembelajaran</span>
              {isSubchapterComplete('4.5') && <span className="tab-check">✓</span>}
            </button>
          </div>

          <div className="study-content-panel">
            {/* SUBBAB 4.1 DIAGRAM ENERGI */}
            {activeTab === '4.1' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 4.1 • Termokimia & Kinetika</span>
                    <h3 className="section-heading">Diagram Profil Energi & Kompleks Teraktivasi</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('4.1') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('4.1')}
                  >
                    {isSubchapterComplete('4.1') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Diagram profil energi menggambarkan perubahan energi potensial sistem kimia 
                    selama berlangsungnya reaksi dari reaktan menjadi produk.
                  </p>

                  {/* Kontrol Interaktif Diagram SVG */}
                  <div className="energy-diagram-card">
                    <div className="diagram-controls-bar">
                      <div className="btn-group-toggle">
                        <button
                          type="button"
                          className={`toggle-opt-btn ${reactionType === 'exothermic' ? 'active' : ''}`}
                          onClick={() => setReactionType('exothermic')}
                        >
                          Reaksi Eksoterm (ΔH &lt; 0)
                        </button>
                        <button
                          type="button"
                          className={`toggle-opt-btn ${reactionType === 'endothermic' ? 'active' : ''}`}
                          onClick={() => setReactionType('endothermic')}
                        >
                          Reaksi Endoterm (ΔH &gt; 0)
                        </button>
                      </div>

                      <label className="catalyst-toggle-label">
                        <input
                          type="checkbox"
                          checked={showCatalyst}
                          onChange={(e) => setShowCatalyst(e.target.checked)}
                        />
                        <span>Nyalakan Katalis (Jalur Ea Lebih Rendah)</span>
                      </label>
                    </div>

                    {/* Visualisasi Kurva Profil Energi Pure SVG */}
                    <div className="svg-diagram-wrapper">
                      <svg viewBox="0 0 540 280" className="energy-profile-svg" aria-label="Diagram Profil Energi">
                        {/* Garis Sumbu Koordinat */}
                        <line x1="50" y1="240" x2="500" y2="240" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                        <line x1="50" y1="240" x2="50" y2="20" stroke="#94a3b8" strokeWidth="2" markerEnd="url(#arrow)" />
                        <text x="50" y="15" fill="#475569" fontSize="12" fontWeight="600">Energi Potensial</text>
                        <text x="420" y="260" fill="#475569" fontSize="12" fontWeight="600">Koordinat Reaksi</text>

                        {reactionType === 'exothermic' ? (
                          <>
                            {/* Tingkat Energi Reaktan (Eksoterm) */}
                            <line x1="50" y1="150" x2="130" y2="150" stroke="#0284c7" strokeWidth="3" />
                            <text x="65" y="142" fill="#0284c7" fontWeight="700" fontSize="13">Reaktan (R)</text>

                            {/* Tingkat Energi Produk (Eksoterm - Lebih Rendah) */}
                            <line x1="390" y1="210" x2="480" y2="210" stroke="#059669" strokeWidth="3" />
                            <text x="405" y="202" fill="#059669" fontWeight="700" fontSize="13">Produk (P)</text>

                            {/* Kurva Energi Tanpa Katalis */}
                            <path
                              d="M 130 150 C 180 150, 210 50, 260 50 C 310 50, 340 210, 390 210"
                              fill="none"
                              stroke="#0284c7"
                              strokeWidth="3.5"
                            />
                            <text x="210" y="42" fill="#d97706" fontWeight="700" fontSize="12">Kompleks Teraktivasi</text>

                            {/* Kurva dengan Katalis jika aktif */}
                            {showCatalyst && (
                              <>
                                <path
                                  d="M 130 150 C 180 150, 210 95, 260 95 C 310 95, 340 210, 390 210"
                                  fill="none"
                                  stroke="#7c3aed"
                                  strokeWidth="3"
                                  strokeDasharray="6 4"
                                />
                                <text x="285" y="92" fill="#7c3aed" fontWeight="700" fontSize="11">Dengan Katalis (Ea turun)</text>
                              </>
                            )}

                            {/* Garis Pembantu Delta H */}
                            <line x1="130" y1="150" x2="430" y2="150" stroke="#cbd5e1" strokeDasharray="3 3" />
                            <line x1="390" y1="150" x2="390" y2="210" stroke="#ef4444" strokeWidth="2" />
                            <text x="400" y="180" fill="#ef4444" fontWeight="700" fontSize="12">ΔH &lt; 0 (Eksoterm)</text>
                          </>
                        ) : (
                          <>
                            {/* Tingkat Energi Reaktan (Endoterm) */}
                            <line x1="50" y1="190" x2="130" y2="190" stroke="#0284c7" strokeWidth="3" />
                            <text x="65" y="182" fill="#0284c7" fontWeight="700" fontSize="13">Reaktan (R)</text>

                            {/* Tingkat Energi Produk (Endoterm - Lebih Tinggi) */}
                            <line x1="390" y1="120" x2="480" y2="120" stroke="#059669" strokeWidth="3" />
                            <text x="405" y="112" fill="#059669" fontWeight="700" fontSize="13">Produk (P)</text>

                            {/* Kurva Energi Tanpa Katalis */}
                            <path
                              d="M 130 190 C 180 190, 210 40, 260 40 C 310 40, 340 120, 390 120"
                              fill="none"
                              stroke="#0284c7"
                              strokeWidth="3.5"
                            />
                            <text x="210" y="32" fill="#d97706" fontWeight="700" fontSize="12">Kompleks Teraktivasi</text>

                            {/* Kurva dengan Katalis jika aktif */}
                            {showCatalyst && (
                              <>
                                <path
                                  d="M 130 190 C 180 190, 210 85, 260 85 C 310 85, 340 120, 390 120"
                                  fill="none"
                                  stroke="#7c3aed"
                                  strokeWidth="3"
                                  strokeDasharray="6 4"
                                />
                                <text x="285" y="80" fill="#7c3aed" fontWeight="700" fontSize="11">Dengan Katalis (Ea turun)</text>
                              </>
                            )}

                            {/* Garis Pembantu Delta H */}
                            <line x1="130" y1="190" x2="430" y2="190" stroke="#cbd5e1" strokeDasharray="3 3" />
                            <line x1="390" y1="190" x2="390" y2="120" stroke="#0284c7" strokeWidth="2" />
                            <text x="400" y="155" fill="#0284c7" fontWeight="700" fontSize="12">ΔH &gt; 0 (Endoterm)</text>
                          </>
                        )}
                      </svg>
                    </div>

                    <div className="diagram-caption">
                      <strong>Keterangan Kunci:</strong> Puncak bukit energi adalah <em>Kompleks Teraktivasi</em> (kondisi transisi energi tertinggi). Jarak vertikal dari reaktan ke puncak adalah <strong>Energi Aktivasi (Eₐ)</strong>. Perhatikan bahwa kehadiran katalis menurunkan tinggi bukit Eₐ tanpa mengubah posisi energi awal maupun akhir (ΔH tetap!).
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="primary" onClick={() => setActiveTab('4.2')}>
                    Lanjut ke Bagian 4.2: Jalur Alternatif Katalis →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 4.2 KATALISIS */}
            {activeTab === '4.2' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 4.2 • Mekanisme Katalisis</span>
                    <h3 className="section-heading">Jalur Alternatif Katalis & Jenis-Jenis Katalis</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('4.2') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('4.2')}
                  >
                    {isSubchapterComplete('4.2') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Katalis tidak bekerja secara magis; katalis ikut berinteraksi sementara membentuk senyawa perantara 
                    lalu dilepaskan kembali dalam wujud aslinya.
                  </p>

                  <div className="two-columns-comparison">
                    <div className="compare-box reactant-side">
                      <span className="compare-title">1. Katalis Homogen</span>
                      <p>
                        Katalis yang berada dalam wujud (fasa) yang sama dengan pereaksi. 
                        Contoh: Ion Fe²⁺ atau asam sulfat cair (H₂SO₄) dalam larutan cairan homogen.
                      </p>
                    </div>

                    <div className="compare-box product-side">
                      <span className="compare-title">2. Katalis Heterogen</span>
                      <p>
                        Katalis yang berbeda wujud fisik dari pereaksi (biasanya berupa padatan serbuk logam 
                        yang mengikat reaktan gas di permukaannya). Contoh: Serbuk besi (Fe) pada sintesis gas amonia.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('4.1')}>
                    ← Kembali ke Bagian 4.1
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('4.3')}>
                    Lanjut ke Bagian 4.3: Mekanisme Reaksi →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 4.3 MEKANISME REAKSI */}
            {activeTab === '4.3' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 4.3 • Tahap Penentu Laju</span>
                    <h3 className="section-heading">Mekanisme Reaksi & Tahap Penentu Laju (RDS)</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('4.3') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('4.3')}
                  >
                    {isSubchapterComplete('4.3') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Sebagian besar reaksi kimia di alam tidak berlangsung dalam satu langkah serentak, 
                    melainkan melalui serangkaian tahapan elementer yang disebut <strong>Mekanisme Reaksi</strong>.
                  </p>

                  <div className="concept-callout info">
                    <h4>Tahap Penentu Laju (Rate Determining Step / RDS):</h4>
                    <p>
                      Di antara beberapa tahap reaksi, <strong>tahap yang berlangsung paling lambat</strong> bertindak sebagai 
                      penentu laju keseluruhan reaksi (analogi: laju iring-iringan konvoi kendaraan ditentukan oleh mobil yang paling lambat).
                    </p>
                    <p className="mt-2">
                      Persamaan laju reaksi eksperimen (r) mencerminkan koefisien dari molekul-molekul yang terlibat 
                      pada <em>tahap lambat</em> tersebut!
                    </p>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('4.2')}>
                    ← Kembali ke Bagian 4.2
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('4.4')}>
                    Lanjut ke Bagian 4.4: Penerapan Industri →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 4.4 PENERAPAN INDUSTRI */}
            {activeTab === '4.4' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 4.4 • Aplikasi Dunia Nyata</span>
                    <h3 className="section-heading">Penerapan Laju Reaksi dalam Kehidupan & Industri</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('4.4') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('4.4')}
                  >
                    {isSubchapterComplete('4.4') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <div className="industry-cases-grid">
                    <div className="industry-card">
                      <span className="ind-icon">❄️</span>
                      <h4>1. Lemari Pendingin Makanan</h4>
                      <p>
                        Suhu rendah di dalam kulkas (sekitar 4 °C) menurunkan energi kinetik partikel 
                        sehingga laju reaksi kimia pembusukan oleh enzim dan mikroba melambat drastis, 
                        membuat makanan awet lebih lama.
                      </p>
                    </div>

                    <div className="industry-card">
                      <span className="ind-icon">🚗</span>
                      <h4>2. Konverter Katalitik Mobil</h4>
                      <p>
                        Memakai katalis logam platina (Pt) dan rodium (Rh) pada knalpot kendaraan bermotor 
                        untuk mempercepat konversi gas beracun (CO dan NO) menjadi gas yang ramah lingkungan 
                        (CO₂ dan N₂) dalam hitungan milidetik.
                      </p>
                    </div>

                    <div className="industry-card">
                      <span className="ind-icon">🏭</span>
                      <h4>3. Sintesis Amonia (Haber-Bosch)</h4>
                      <p>
                        Reaksi pembentukan gas amonia (NH₃) membutuhkan kondisi optimum suhu 450 °C, 
                        tekanan 200 atm, dan katalis serbuk besi (Fe) yang dipromotori oksida kalium 
                        agar laju reaksi cepat dan efisien secara ekonomi.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('4.3')}>
                    ← Kembali ke Bagian 4.3
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('4.5')}>
                    Lanjut ke Bagian 4.5: Rangkuman Pembelajaran →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 4.5 RANGKUMAN */}
            {activeTab === '4.5' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 4.5 • Cek Pemahaman</span>
                    <h3 className="section-heading">Rangkuman Pembelajaran</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('4.5') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('4.5')}
                  >
                    {isSubchapterComplete('4.5') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <div className="summary-checklist">
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Energi Aktivasi (Eₐ):</strong> Energi kinetik minimal yang harus dimiliki partikel agar tumbukan menghasilkan reaksi.
                      </div>
                    </div>
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Fungsi Katalis:</strong> Menurunkan Eₐ tanpa mengubah ΔH dan tanpa habis terpakai di akhir reaksi.
                      </div>
                    </div>
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Tahap Penentu Laju (RDS):</strong> Tahap elementer paling lambat dalam mekanisme reaksi multi-tahap.
                      </div>
                    </div>
                  </div>

                  <div className="next-chapter-teaser">
                    <div className="teaser-badge">EVALUASI AKHIR & SERTIFIKAT</div>
                    <h4>Siap Uji Pemahaman di Arena Kuis?</h4>
                    <p>
                      Anda telah menyelesaikan materi inti dari Modul 1 hingga Modul 4! 
                      Sekarang Anda dapat menguji kemampuan melalui <strong>Kuis Interaktif 10 Soal</strong> 
                      dan mengklaim <strong>Sertifikat Digital</strong> di Modul 5.
                    </p>
                    <div className="teaser-status">
                      <Button variant="primary" size="sm" onClick={() => onNavigate('kuis')}>
                        Mulai Kuis Interaktif (10 Soal) 📝 →
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('4.4')}>
                    ← Kembali ke Bagian 4.4
                  </Button>
                  <Button variant="primary" onClick={() => onNavigate('modul-5')}>
                    Lanjut ke Halaman Modul 5 (Evaluasi Akhir) →
                  </Button>
                </div>
              </article>
            )}
          </div>
        </div>
      </main>

      {/* Navigasi Bawah */}
      <footer className="page-bottom-nav">
        <Button variant="secondary" size="lg" onClick={() => onNavigate('modul-3')}>
          ← Kembali ke Modul 3
        </Button>
        <Button variant="primary" size="lg" onClick={() => onNavigate('modul-5')}>
          Lanjut ke Modul 5: Evaluasi Akhir & Sertifikat →
        </Button>
      </footer>
    </div>
  );
}

