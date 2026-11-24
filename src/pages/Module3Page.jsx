import { useState } from 'react';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

/**
 * Module3Page Component - ChemVerse
 * Halaman Khusus Mandiri untuk Modul 3: Persamaan Laju & Orde Reaksi.
 * Dilengkapi Alat Cerdas Solver Orde Reaksi dan Prediktor Laju Kinetika.
 */
export function Module3Page({ onNavigate }) {
  const { isSubchapterComplete, toggleSubchapter } = useCourseProgress();
  const [activeTab, setActiveTab] = useState('3.1');

  // State untuk Solver Kinetika di Bagian 3.4
  const [solverStep, setSolverStep] = useState(1);
  const [customA, setCustomA] = useState(0.25);
  const [customB, setCustomB] = useState(0.20);
  // S2-05-06: pesan error jika input konsentrasi tidak valid
  const [predictorError, setPredictorError] = useState('');

  // Data kinetika contoh
  // r = k [A]^2 [B]^1
  // Dari perc 1: 0.02 = k * (0.1)^2 * (0.1)^1 = k * 0.001 -> k = 20 M^-2 s^-1
  const kVal = 20;

  // S2-05-06: Validasi konsentrasi sebelum menghitung — konsentrasi molar tidak boleh negatif
  const isValidConcentration = (val) => typeof val === 'number' && isFinite(val) && val > 0;
  const predictedRate = (isValidConcentration(customA) && isValidConcentration(customB))
    ? (kVal * Math.pow(customA, 2) * Math.pow(customB, 1)).toFixed(4)
    : null;

  const handleSetCustomA = (e) => {
    const val = parseFloat(e.target.value);
    setCustomA(isNaN(val) ? '' : val);
    if (!isNaN(val) && val <= 0) {
      setPredictorError('[A] harus bernilai positif. Konsentrasi molar tidak dapat nol atau negatif.');
    } else {
      setPredictorError('');
    }
  };

  const handleSetCustomB = (e) => {
    const val = parseFloat(e.target.value);
    setCustomB(isNaN(val) ? '' : val);
    if (!isNaN(val) && val <= 0) {
      setPredictorError('[B] harus bernilai positif. Konsentrasi molar tidak dapat nol atau negatif.');
    } else {
      setPredictorError('');
    }
  };

  return (
    <div className="module-page-container">
      {/* Navigasi Breadcrumb */}
      <nav className="page-breadcrumb-bar" aria-label="Navigasi Halaman Modul 3">
        <div className="breadcrumb-links">
          <button type="button" className="breadcrumb-btn" onClick={() => onNavigate('home')}>
            Beranda
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Modul 3: Persamaan Laju & Orde Reaksi</span>
        </div>
        <div className="page-nav-actions">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-2')}>
            ← Ke Modul 2
          </Button>
          <Button variant="primary" size="sm" onClick={() => onNavigate('modul-4')}>
            Lanjut ke Modul 4 →
          </Button>
        </div>
      </nav>

      {/* Hero Header Modul 3 */}
      <header className="module-page-hero">
        <div className="hero-badge-row">
          <Badge variant="primary">LKPD DIGITAL #03</Badge>
          <Badge variant="cyan">Materi Inti Kinetika</Badge>
          <span className="hero-time-estimate">⏱ Estimasi Belajar: 30 Menit</span>
        </div>
        <h1 className="module-page-title">
          Modul 3: Persamaan Laju & Orde Reaksi Kimia
        </h1>
        <p className="module-page-desc">
          Pelajari cara merumuskan persamaan laju reaksi r = k[A]ᵐ[B]ⁿ, menganalisis data percobaan tabel, 
          menghitung nilai serta satuan tetapan laju (k), dan menggunakan kalkulator solver orde reaksi.
        </p>
      </header>

      {/* Konten Tab Modul 3 */}
      <main className="module-page-content">
        <div className="module-study-view">
          <div className="study-tabs-nav" role="tablist" aria-label="Bagian Belajar Modul 3">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '3.1'}
              className={`study-tab-btn ${activeTab === '3.1' ? 'active' : ''}`}
              onClick={() => setActiveTab('3.1')}
            >
              <span className="tab-num">3.1</span>
              <span className="tab-label">Bentuk Persamaan Laju</span>
              {isSubchapterComplete('3.1') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '3.2'}
              className={`study-tab-btn ${activeTab === '3.2' ? 'active' : ''}`}
              onClick={() => setActiveTab('3.2')}
            >
              <span className="tab-num">3.2</span>
              <span className="tab-label">Menentukan Orde</span>
              {isSubchapterComplete('3.2') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '3.3'}
              className={`study-tab-btn ${activeTab === '3.3' ? 'active' : ''}`}
              onClick={() => setActiveTab('3.3')}
            >
              <span className="tab-num">3.3</span>
              <span className="tab-label">Grafik Orde 0, 1, 2</span>
              {isSubchapterComplete('3.3') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '3.4'}
              className={`study-tab-btn ${activeTab === '3.4' ? 'active' : ''}`}
              onClick={() => setActiveTab('3.4')}
            >
              <span className="tab-num">3.4</span>
              <span className="tab-label">Solver Orde Kinetika</span>
              {isSubchapterComplete('3.4') && <span className="tab-check">✓</span>}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === '3.5'}
              className={`study-tab-btn ${activeTab === '3.5' ? 'active' : ''}`}
              onClick={() => setActiveTab('3.5')}
            >
              <span className="tab-num">3.5</span>
              <span className="tab-label">Rangkuman Pembelajaran</span>
              {isSubchapterComplete('3.5') && <span className="tab-check">✓</span>}
            </button>
          </div>

          <div className="study-content-panel">
            {/* SUBBAB 3.1 */}
            {activeTab === '3.1' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 3.1 • Teori Persamaan Laju</span>
                    <h3 className="section-heading">Bentuk Umum Persamaan Laju & Tetapan Laju (k)</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('3.1') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('3.1')}
                  >
                    {isSubchapterComplete('3.1') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Hubungan kuantitatif antara konsentrasi reaktan dan laju reaksi kimia dinyatakan dalam 
                    <strong> Persamaan Laju Reaksi</strong> (Hukum Laju):
                  </p>

                  <div className="formula-display-card">
                    <div className="formula-card-badge">PERSAMAAN LAJU REAKSI</div>
                    <div className="formula-main-equation">
                      <div className="equation-block">
                        <span className="equation-var">r</span>
                        <span className="equation-equal">=</span>
                        <span className="k-symbol">k</span>
                        <span>[A]<sup>m</sup></span>
                        <span>[B]<sup>n</sup></span>
                      </div>
                    </div>

                    <div className="formula-legend-grid">
                      <div className="legend-item reaktan">
                        <div className="legend-indicator symbol">r</div>
                        <div className="legend-text">
                          <strong>Laju Reaksi (r):</strong>
                          <p>Dinyatakan dalam satuan konsentrasi per waktu (M · s⁻¹).</p>
                        </div>
                      </div>

                      <div className="legend-item reaktan">
                        <div className="legend-indicator symbol">k</div>
                        <div className="legend-text">
                          <strong>Tetapan Laju Reaksi (k):</strong>
                          <p>Konstanta khas untuk setiap reaksi pada suhu tertentu (berubah jika suhu berubah).</p>
                        </div>
                      </div>

                      <div className="legend-item konsentrasi">
                        <div className="legend-indicator symbol">m & n</div>
                        <div className="legend-text">
                          <strong>Orde Reaksi (Tingkat Reaksi):</strong>
                          <p>Eksponen pengaruh konsentrasi zat A dan B terhadap laju reaksi. Diperoleh dari <em>eksperimen</em>, bukan koefisien reaksi!</p>
                        </div>
                      </div>

                      <div className="legend-item waktu">
                        <div className="legend-indicator symbol">m + n</div>
                        <div className="legend-text">
                          <strong>Orde Reaksi Total:</strong>
                          <p>Jumlah seluruh pangkat konsentrasi pereaksi dalam persamaan laju.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabel Satuan k */}
                  <div className="unit-table-box">
                    <h4>Tabel Satuan Tetapan Laju (k) Berdasarkan Orde Total:</h4>
                    <div className="table-responsive">
                      <table className="chem-data-table">
                        <thead>
                          <tr>
                            <th>Orde Total</th>
                            <th>Bentuk Persamaan</th>
                            <th>Satuan Tetapan k</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><strong>0</strong> (Nol)</td>
                            <td><code>r = k</code></td>
                            <td><code>M · s⁻¹</code> (atau mol · L⁻¹ · s⁻¹)</td>
                          </tr>
                          <tr>
                            <td><strong>1</strong> (Satu)</td>
                            <td><code>r = k [A]</code></td>
                            <td><code>s⁻¹</code> (atau detik⁻¹)</td>
                          </tr>
                          <tr>
                            <td><strong>2</strong> (Dua)</td>
                            <td><code>r = k [A]²</code> atau <code>k [A][B]</code></td>
                            <td><code>M⁻¹ · s⁻¹</code> (atau L · mol⁻¹ · s⁻¹)</td>
                          </tr>
                          <tr>
                            <td><strong>3</strong> (Tiga)</td>
                            <td><code>r = k [A]²[B]</code></td>
                            <td><code>M⁻² · s⁻¹</code> (atau L² · mol⁻² · s⁻¹)</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="primary" onClick={() => setActiveTab('3.2')}>
                    Lanjut ke Bagian 3.2: Menentukan Orde dari Percobaan →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 3.2 */}
            {activeTab === '3.2' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 3.2 • Analisis Eksperimen</span>
                    <h3 className="section-heading">Menentukan Orde Reaksi dari Data Tabel Percobaan</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('3.2') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('3.2')}
                  >
                    {isSubchapterComplete('3.2') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Orde reaksi tidak dapat ditentukan secara teoritis dari koefisien reaksi setara, 
                    melainkan <strong>wajib ditentukan dari data pengukuran laju eksperimen di laboratorium</strong>.
                  </p>

                  <div className="concept-callout info">
                    <h4>Strategi 3 Langkah Menentukan Orde:</h4>
                    <ol className="ordered-strategy-list">
                      <li>
                        <strong>Menentukan orde A (m):</strong> Pilih dua percobaan di mana konsentrasi <em>[B] bernilai tetap (sama)</em>. Bandingkan perubahan laju reaksi terhadap perubahan konsentrasi A:
                        <code>([A]₂ / [A]₁)ᵐ = r₂ / r₁</code>.
                      </li>
                      <li>
                        <strong>Menentukan orde B (n):</strong> Pilih dua percobaan di mana konsentrasi <em>[A] bernilai tetap (sama)</em>. Bandingkan perubahan laju reaksi terhadap perubahan konsentrasi B:
                        <code>([B]₃ / [B]₁)ⁿ = r₃ / r₁</code>.
                      </li>
                      <li>
                        <strong>Menghitung nilai tetapan k:</strong> Masukkan nilai orde m dan n yang telah didapat ke dalam salah satu baris data percobaan untuk menghitung nilai numerik k beserta satuannya.
                      </li>
                    </ol>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('3.1')}>
                    ← Kembali ke Bagian 3.1
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('3.3')}>
                    Lanjut ke Bagian 3.3: Grafik Orde 0, 1, 2 →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 3.3 */}
            {activeTab === '3.3' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 3.3 • Representasi Visual</span>
                    <h3 className="section-heading">Karakteristik Kurva Kinetika Orde 0, 1, dan 2</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('3.3') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('3.3')}
                  >
                    {isSubchapterComplete('3.3') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p className="section-subtext">
                    Karakteristik hubungan antara konsentrasi reaktan [A], waktu reaksi (t), dan laju reaksi (r) 
                    dapat diidentifikasi secara visual melalui kurva grafik kinetika berikut:
                  </p>

                  <div className="order-cards-grid">
                    {/* KARTU ORDE 0 */}
                    <div className="order-curve-card">
                      <div className="order-badge">ORDE 0 (NOL)</div>
                      <h4>Laju Independen terhadap Konsentrasi</h4>
                      <p>Perubahan konsentrasi reaktan <em>tidak memengaruhi</em> laju reaksi sama sekali (r = k).</p>
                      
                      {/* DUA GRAFIK ORDE 0 */}
                      <div className="order-charts-container">
                        <div className="order-chart-box">
                          <span className="order-chart-title">Grafik r vs [A]</span>
                          <svg viewBox="0 0 200 130" className="order-svg-chart" aria-label="Grafik r vs [A] Orde 0">
                            <line x1="30" y1="105" x2="190" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="190,102 196,105 190,108" fill="#94a3b8" />
                            <line x1="30" y1="105" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="27,15 30,9 33,15" fill="#94a3b8" />
                            <text x="185" y="122" fontSize="10" fill="#64748b" textAnchor="end">[A]</text>
                            <text x="16" y="20" fontSize="10" fill="#64748b">r</text>
                            {/* Garis mendatar */}
                            <line x1="30" y1="55" x2="180" y2="55" stroke="#0284c7" strokeWidth="2.5" />
                            <circle cx="105" cy="55" r="3.5" fill="#0284c7" />
                            <text x="110" y="50" fontSize="10" fontWeight="bold" fill="#0284c7">r = k (tetap)</text>
                          </svg>
                          <span className="chart-legend">Garis mendatar (konstan)</span>
                        </div>

                        <div className="order-chart-box">
                          <span className="order-chart-title">Grafik [A] vs t</span>
                          <svg viewBox="0 0 200 130" className="order-svg-chart" aria-label="Grafik [A] vs t Orde 0">
                            <line x1="30" y1="105" x2="190" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="190,102 196,105 190,108" fill="#94a3b8" />
                            <line x1="30" y1="105" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="27,15 30,9 33,15" fill="#94a3b8" />
                            <text x="185" y="122" fontSize="10" fill="#64748b" textAnchor="end">t</text>
                            <text x="12" y="20" fontSize="10" fill="#64748b">[A]</text>
                            {/* Garis lurus menurun */}
                            <line x1="30" y1="28" x2="175" y2="98" stroke="#0284c7" strokeWidth="2.5" />
                            <text x="12" y="32" fontSize="9" fill="#0284c7">[A]₀</text>
                            <text x="82" y="55" fontSize="10" fontWeight="bold" fill="#0284c7">gradien = −k</text>
                          </svg>
                          <span className="chart-legend">Linier menurun teratur</span>
                        </div>
                      </div>

                      <div className="curve-property-box">
                        <span>• Persamaan laju: r = k[A]⁰ = k</span>
                        <span>• Persamaan terintegrasi: [A] = [A]₀ − kt</span>
                      </div>
                    </div>

                    {/* KARTU ORDE 1 */}
                    <div className="order-curve-card">
                      <div className="order-badge">ORDE 1 (SATU)</div>
                      <h4>Laju Sebanding Lurus dengan Konsentrasi</h4>
                      <p>Jika konsentrasi reaktan berlipat ganda 2×, maka laju reaksi ikut melonjak 2× (r = k[A]).</p>

                      {/* DUA GRAFIK ORDE 1 */}
                      <div className="order-charts-container">
                        <div className="order-chart-box">
                          <span className="order-chart-title">Grafik r vs [A]</span>
                          <svg viewBox="0 0 200 130" className="order-svg-chart" aria-label="Grafik r vs [A] Orde 1">
                            <line x1="30" y1="105" x2="190" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="190,102 196,105 190,108" fill="#94a3b8" />
                            <line x1="30" y1="105" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="27,15 30,9 33,15" fill="#94a3b8" />
                            <text x="185" y="122" fontSize="10" fill="#64748b" textAnchor="end">[A]</text>
                            <text x="16" y="20" fontSize="10" fill="#64748b">r</text>
                            {/* Garis linier miring ke atas */}
                            <line x1="30" y1="105" x2="175" y2="28" stroke="#10b981" strokeWidth="2.5" />
                            <text x="95" y="60" fontSize="10" fontWeight="bold" fill="#10b981">gradien = k</text>
                          </svg>
                          <span className="chart-legend">Linier melalui titik (0,0)</span>
                        </div>

                        <div className="order-chart-box">
                          <span className="order-chart-title">Grafik [A] vs t</span>
                          <svg viewBox="0 0 200 130" className="order-svg-chart" aria-label="Grafik [A] vs t Orde 1">
                            <line x1="30" y1="105" x2="190" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="190,102 196,105 190,108" fill="#94a3b8" />
                            <line x1="30" y1="105" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="27,15 30,9 33,15" fill="#94a3b8" />
                            <text x="185" y="122" fontSize="10" fill="#64748b" textAnchor="end">t</text>
                            <text x="12" y="20" fontSize="10" fill="#64748b">[A]</text>
                            {/* Kurva peluruhan eksponensial */}
                            <path d="M 30,28 Q 75,80 180,98" fill="none" stroke="#10b981" strokeWidth="2.5" />
                            <text x="12" y="32" fontSize="9" fill="#10b981">[A]₀</text>
                            <text x="88" y="58" fontSize="10" fontWeight="bold" fill="#10b981">peluruhan eksponensial</text>
                          </svg>
                          <span className="chart-legend">Waktu paruh t₁/₂ konstan</span>
                        </div>
                      </div>

                      <div className="curve-property-box">
                        <span>• Persamaan laju: r = k[A]¹</span>
                        <span>• Waktu paruh: t₁/₂ = 0,693 / k</span>
                      </div>
                    </div>

                    {/* KARTU ORDE 2 */}
                    <div className="order-curve-card">
                      <div className="order-badge">ORDE 2 (DUA)</div>
                      <h4>Laju Kuadratik terhadap Konsentrasi</h4>
                      <p>Jika konsentrasi reaktan berlipat ganda 2×, maka laju reaksi melonjak 4× lipat (r = k[A]²).</p>

                      {/* DUA GRAFIK ORDE 2 */}
                      <div className="order-charts-container">
                        <div className="order-chart-box">
                          <span className="order-chart-title">Grafik r vs [A]</span>
                          <svg viewBox="0 0 200 130" className="order-svg-chart" aria-label="Grafik r vs [A] Orde 2">
                            <line x1="30" y1="105" x2="190" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="190,102 196,105 190,108" fill="#94a3b8" />
                            <line x1="30" y1="105" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="27,15 30,9 33,15" fill="#94a3b8" />
                            <text x="185" y="122" fontSize="10" fill="#64748b" textAnchor="end">[A]</text>
                            <text x="16" y="20" fontSize="10" fill="#64748b">r</text>
                            {/* Kurva parabola kuadratik ke atas */}
                            <path d="M 30,105 Q 120,100 178,25" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
                            <text x="75" y="55" fontSize="10" fontWeight="bold" fill="#8b5cf6">r = k[A]² (parabola)</text>
                          </svg>
                          <span className="chart-legend">Kurva melengkung ke atas</span>
                        </div>

                        <div className="order-chart-box">
                          <span className="order-chart-title">Grafik 1/[A] vs t</span>
                          <svg viewBox="0 0 200 130" className="order-svg-chart" aria-label="Grafik 1/[A] vs t Orde 2">
                            <line x1="30" y1="105" x2="190" y2="105" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="190,102 196,105 190,108" fill="#94a3b8" />
                            <line x1="30" y1="105" x2="30" y2="15" stroke="#94a3b8" strokeWidth="1.5" />
                            <polygon points="27,15 30,9 33,15" fill="#94a3b8" />
                            <text x="185" y="122" fontSize="10" fill="#64748b" textAnchor="end">t</text>
                            <text x="8" y="20" fontSize="9" fill="#64748b">1/[A]</text>
                            {/* Garis linier mendaki ke atas */}
                            <line x1="30" y1="95" x2="175" y2="28" stroke="#8b5cf6" strokeWidth="2.5" />
                            <text x="8" y="99" fontSize="8" fill="#8b5cf6">1/[A]₀</text>
                            <text x="75" y="55" fontSize="10" fontWeight="bold" fill="#8b5cf6">gradien = +k</text>
                          </svg>
                          <span className="chart-legend">Linier positif mendaki</span>
                        </div>
                      </div>

                      <div className="curve-property-box">
                        <span>• Persamaan laju: r = k[A]²</span>
                        <span>• Persamaan terintegrasi: 1/[A] = 1/[A]₀ + kt</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('3.2')}>
                    ← Kembali ke Bagian 3.2
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('3.4')}>
                    Lanjut ke Bagian 3.4: Solver Orde Reaksi →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 3.4 SOLVER ORDE */}
            {activeTab === '3.4' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 3.4 • Laboratorium Virtual Cerdas</span>
                    <h3 className="section-heading">Alat Cerdas: Solver & Prediktor Orde Reaksi Kinetika</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('3.4') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('3.4')}
                  >
                    {isSubchapterComplete('3.4') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <p>
                    Gunakan tabel data percobaan di bawah ini untuk melihat penyelesaian langkah demi langkah 
                    secara transparan:
                  </p>

                  {/* Tabel Data Percobaan */}
                  <div className="table-responsive">
                    <table className="chem-data-table highlight-table">
                      <thead>
                        <tr>
                          <th>Percobaan</th>
                          <th>Konsentrasi [A] (M)</th>
                          <th>Konsentrasi [B] (M)</th>
                          <th>Laju Reaksi r (M · s⁻¹)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className={solverStep === 1 ? 'row-active' : ''}>
                          <td><strong>1</strong></td>
                          <td>0,10</td>
                          <td>0,10</td>
                          <td><strong>0,020</strong></td>
                        </tr>
                        <tr className={solverStep === 1 ? 'row-active' : ''}>
                          <td><strong>2</strong></td>
                          <td>0,20</td>
                          <td>0,10</td>
                          <td><strong>0,080</strong></td>
                        </tr>
                        <tr className={solverStep === 2 ? 'row-active' : ''}>
                          <td><strong>3</strong></td>
                          <td>0,10</td>
                          <td>0,30</td>
                          <td><strong>0,060</strong></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Kontrol Langkah Solver */}
                  <div className="solver-step-controllers">
                    <button
                      type="button"
                      className={`solver-step-btn ${solverStep === 1 ? 'active' : ''}`}
                      onClick={() => setSolverStep(1)}
                    >
                      Langkah 1: Orde A (m)
                    </button>
                    <button
                      type="button"
                      className={`solver-step-btn ${solverStep === 2 ? 'active' : ''}`}
                      onClick={() => setSolverStep(2)}
                    >
                      Langkah 2: Orde B (n)
                    </button>
                    <button
                      type="button"
                      className={`solver-step-btn ${solverStep === 3 ? 'active' : ''}`}
                      onClick={() => setSolverStep(3)}
                    >
                      Langkah 3: Hitung k & Rumus
                    </button>
                    <button
                      type="button"
                      className={`solver-step-btn ${solverStep === 4 ? 'active' : ''}`}
                      onClick={() => setSolverStep(4)}
                    >
                      Langkah 4: Prediktor Laju
                    </button>
                  </div>

                  {/* Penjelasan Langkah Terpilih */}
                  <div className="solver-step-display">
                    {solverStep === 1 && (
                      <div className="step-box">
                        <Badge variant="primary">LANGKAH 1 DARI 4</Badge>
                        <h4>Menentukan Orde Reaksi terhadap Zat A (m)</h4>
                        <p>
                          Pilih <strong>Percobaan 1 dan 2</strong> karena konsentrasi [B] bernilai tetap (0,10 M):
                        </p>
                        <div className="calc-callout">
                          <code>([A]₂ / [A]₁)ᵐ = r₂ / r₁</code>
                          <code>(0,20 / 0,10)ᵐ = 0,080 / 0,020</code>
                          <code>(2)ᵐ = 4 → m = 2</code>
                        </div>
                        <p className="step-conclusion">
                          Kesimpulan: <strong>Reaksi berorde 2 terhadap pereaksi A.</strong>
                        </p>
                      </div>
                    )}

                    {solverStep === 2 && (
                      <div className="step-box">
                        <Badge variant="primary">LANGKAH 2 DARI 4</Badge>
                        <h4>Menentukan Orde Reaksi terhadap Zat B (n)</h4>
                        <p>
                          Pilih <strong>Percobaan 1 dan 3</strong> karena konsentrasi [A] bernilai tetap (0,10 M):
                        </p>
                        <div className="calc-callout">
                          <code>([B]₃ / [B]₁)ⁿ = r₃ / r₁</code>
                          <code>(0,30 / 0,10)ⁿ = 0,060 / 0,020</code>
                          <code>(3)ⁿ = 3 → n = 1</code>
                        </div>
                        <p className="step-conclusion">
                          Kesimpulan: <strong>Reaksi berorde 1 terhadap pereaksi B.</strong>
                        </p>
                      </div>
                    )}

                    {solverStep === 3 && (
                      <div className="step-box">
                        <Badge variant="cyan">LANGKAH 3 DARI 4</Badge>
                        <h4>Menyusun Persamaan Laju & Menghitung Nilai Tetapan k</h4>
                        <div className="calc-callout">
                          <p><strong>Bentuk Persamaan Laju:</strong> <code>r = k [A]² [B]</code> (Orde Total = 2 + 1 = 3)</p>
                          <p>Masukkan data Percobaan 1 ([A] = 0,10 M; [B] = 0,10 M; r = 0,020 M/s):</p>
                          <code>0,020 = k × (0,10)² × (0,10)¹</code>
                          <code>0,020 = k × 0,001</code>
                          <code>k = 0,020 / 0,001 = 20 M⁻² · s⁻¹</code>
                        </div>
                        <p className="step-conclusion">
                          Persamaan laju lengkap: <strong>r = 20 [A]² [B] M · s⁻¹</strong>.
                        </p>
                      </div>
                    )}

                    {solverStep === 4 && (
                      <div className="step-box predictor-box">
                        <Badge variant="effective">LANGKAH 4 DARI 4 • PREDIKTOR INTERAKTIF</Badge>
                        <h4>Prediksi Laju Reaksi untuk Konsentrasi Baru</h4>
                        <p>
                          Uji nilai konsentrasi [A] dan [B] di bawah ini untuk menghitung laju reaksi (r) secara otomatis:
                        </p>

                        <div className="predictor-inputs-grid">
                          <div className="input-group">
                            <label className="input-label" htmlFor="pred-a">
                              Konsentrasi [A] baru (M):
                            </label>
                            <input
                              id="pred-a"
                              type="number"
                              min="0.01"
                              max="1.00"
                              step="0.05"
                              value={customA}
                              onChange={handleSetCustomA}
                              className={`chem-number-input${predictorError && predictorError.includes('[A]') ? ' input-error' : ''}`}
                              aria-describedby="predictor-error-msg"
                            />
                          </div>

                          <div className="input-group">
                            <label className="input-label" htmlFor="pred-b">
                              Konsentrasi [B] baru (M):
                            </label>
                            <input
                              id="pred-b"
                              type="number"
                              min="0.01"
                              max="1.00"
                              step="0.05"
                              value={customB}
                              onChange={handleSetCustomB}
                              className={`chem-number-input${predictorError && predictorError.includes('[B]') ? ' input-error' : ''}`}
                              aria-describedby="predictor-error-msg"
                            />
                          </div>
                        </div>

                        {/* S2-05-06: Tampilkan pesan error jika konsentrasi tidak valid */}
                        {predictorError && (
                          <div id="predictor-error-msg" className="predictor-error-banner" role="alert">
                            ⚠️ {predictorError}
                          </div>
                        )}

                        <div className="prediction-result-banner">
                          <span className="pred-label">Hasil Prediksi Laju Reaksi:</span>
                          {predictedRate !== null ? (
                            <>
                              <span className="pred-val">r = {predictedRate} M · s⁻¹</span>
                              <span className="pred-formula">
                                Hitungan: 20 × ({customA})² × ({customB})¹ = {predictedRate} M/s
                              </span>
                            </>
                          ) : (
                            <span className="pred-val pred-val--invalid">
                              — Masukkan konsentrasi positif untuk melihat hasil —
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('3.3')}>
                    ← Kembali ke Bagian 3.3
                  </Button>
                  <Button variant="primary" onClick={() => setActiveTab('3.5')}>
                    Lanjut ke Bagian 3.5: Rangkuman Pembelajaran →
                  </Button>
                </div>
              </article>
            )}

            {/* SUBBAB 3.5 RANGKUMAN */}
            {activeTab === '3.5' && (
              <article className="subchapter-card">
                <div className="subchapter-header">
                  <div>
                    <span className="section-label">Bagian 3.5 • Cek Pemahaman</span>
                    <h3 className="section-heading">Rangkuman Pembelajaran</h3>
                  </div>
                  <button
                    type="button"
                    className={`check-completion-btn ${isSubchapterComplete('3.5') ? 'completed' : ''}`}
                    onClick={() => toggleSubchapter('3.5')}
                  >
                    {isSubchapterComplete('3.5') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
                  </button>
                </div>

                <div className="subchapter-body">
                  <div className="summary-checklist">
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Persamaan Laju (r):</strong> Dirumuskan sebagai <code>r = k[A]ᵐ[B]ⁿ</code>, di mana m dan n adalah orde reaksi.
                      </div>
                    </div>
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Orde Diperoleh dari Eksperimen:</strong> Bukan dari koefisien reaksi setara.
                      </div>
                    </div>
                    <div className="check-item">
                      <span className="check-icon">✓</span>
                      <div>
                        <strong>Tetapan k:</strong> Bernilai khas untuk setiap reaksi pada suhu tertentu. Satuan k bergantung pada orde total reaksi.
                      </div>
                    </div>
                  </div>

                  <div className="next-chapter-teaser">
                    <div className="teaser-badge">MODUL BERIKUTNYA</div>
                    <h4>Menuju Modul 4: Energi Aktivasi & Aplikasi Kinetika</h4>
                    <p>
                      Pelajari diagram profil energi reaksi, kompleks teraktivasi, 
                      peran katalis dalam menurunkan energi aktivasi (\(E_a\)), serta penerapan laju reaksi di industri.
                    </p>
                    <div className="teaser-status">
                      <Button variant="primary" size="sm" onClick={() => onNavigate('modul-4')}>
                        Buka Halaman Modul 4 Sekarang →
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="subchapter-footer">
                  <Button variant="secondary" onClick={() => setActiveTab('3.4')}>
                    ← Kembali ke Bagian 3.4
                  </Button>
                  <Button variant="primary" onClick={() => onNavigate('modul-4')}>
                    Lanjut ke Halaman Modul 4 →
                  </Button>
                </div>
              </article>
            )}
          </div>
        </div>
      </main>

      {/* Navigasi Bawah */}
      <footer className="page-bottom-nav">
        <Button variant="secondary" size="lg" onClick={() => onNavigate('modul-2')}>
          ← Kembali ke Modul 2
        </Button>
        <Button variant="primary" size="lg" onClick={() => onNavigate('modul-4')}>
          Lanjut ke Modul 4: Energi Aktivasi →
        </Button>
      </footer>
    </div>
  );
}

