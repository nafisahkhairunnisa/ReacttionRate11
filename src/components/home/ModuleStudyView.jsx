import { useState } from 'react';
import { useCourseProgress } from '../../hooks/useCourseProgress';
import { FormulaRenderer } from '../chemistry/FormulaRenderer';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

/**
 * ModuleStudyView Component - ChemVerse
 * Lembar Belajar Interaktif Modul 1: Konsep Laju Reaksi & Cara Menyatakannya.
 * Memuat kartu bagian belajar (1.1, 1.2, 1.3, 1.4) dengan penjelasan kimia spesifik.
 * Menggunakan simbol laju reaksi: "r" (tanpa simbol "v").
 * Memuat visualisasi persamaan perbandingan koefisien dengan tanda (+/-).
 */
export function ModuleStudyView({ onClose }) {
  const { isSubchapterComplete, toggleSubchapter } = useCourseProgress();
  const [activeTab, setActiveTab] = useState('1.1');

  // State untuk kalkulator interaktif koefisien di bagian 1.3
  const [inputRateN2O5, setInputRateN2O5] = useState(0.04);

  return (
    <div className="module-study-view" id="lembar-modul-1">
      {/* Header Lembar Modul */}
      <div className="study-header-banner">
        <div className="study-header-info">
          <Badge variant="cyan" className="study-tag">MODUL 1 • AKTIF</Badge>
          <h2 className="study-module-title">Konsep Laju Reaksi & Cara Menyatakannya</h2>
          <p className="study-module-subtitle">
            Pelajari konsep kinetika kimia secara berurutan dari pengertian laju reaksi (r), grafik kurva waktu, 
            hingga hubungan matematis koefisien reaksi bertanda (+/−).
          </p>
        </div>
        {onClose && (
          <div className="study-header-actions">
            <Button variant="secondary" onClick={onClose} className="btn-close-view">
              ← Kembali ke Beranda
            </Button>
          </div>
        )}
      </div>

      {/* Navigasi Tab Bagian Belajar */}
      <div className="study-tabs-nav" role="tablist" aria-label="Bagian Belajar Modul 1">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === '1.1'}
          className={`study-tab-btn ${activeTab === '1.1' ? 'active' : ''}`}
          onClick={() => setActiveTab('1.1')}
        >
          <span className="tab-num">1.1</span>
          <span className="tab-label">Pengertian Laju Reaksi</span>
          {isSubchapterComplete('1.1') && <span className="tab-check">✓</span>}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === '1.2'}
          className={`study-tab-btn ${activeTab === '1.2' ? 'active' : ''}`}
          onClick={() => setActiveTab('1.2')}
        >
          <span className="tab-num">1.2</span>
          <span className="tab-label">Laju Rata-rata vs Sesaat</span>
          {isSubchapterComplete('1.2') && <span className="tab-check">✓</span>}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === '1.3'}
          className={`study-tab-btn ${activeTab === '1.3' ? 'active' : ''}`}
          onClick={() => setActiveTab('1.3')}
        >
          <span className="tab-num">1.3</span>
          <span className="tab-label">Hubungan Koefisien (+/−)</span>
          {isSubchapterComplete('1.3') && <span className="tab-check">✓</span>}
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === '1.4'}
          className={`study-tab-btn ${activeTab === '1.4' ? 'active' : ''}`}
          onClick={() => setActiveTab('1.4')}
        >
          <span className="tab-num">1.4</span>
          <span className="tab-label">Rangkuman Pembelajaran</span>
          {isSubchapterComplete('1.4') && <span className="tab-check">✓</span>}
        </button>
      </div>

      {/* Konten Bagian Belajar */}
      <div className="study-content-panel">
        {/* BAGIAN 1.1 */}
        {activeTab === '1.1' && (
          <article className="subchapter-card">
            <div className="subchapter-header">
              <div>
                <span className="section-label">Bagian 1.1 • Konsep Dasar</span>
                <h3 className="section-heading">Pengertian Laju Reaksi Kimia (r = Δ[Zat] / Δt)</h3>
              </div>
              <button
                type="button"
                className={`check-completion-btn ${isSubchapterComplete('1.1') ? 'completed' : ''}`}
                onClick={() => toggleSubchapter('1.1')}
              >
                {isSubchapterComplete('1.1') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
              </button>
            </div>

            <div className="subchapter-body">
              <p>
                Dalam kehidupan sehari-hari, kita mengamati reaksi yang berlangsung sangat cepat (seperti kembang api atau 
                reaksi pita magnesium dalam asam klorida), dan reaksi yang berlangsung sangat lambat (seperti proses perkaratan besi).
              </p>

              <div className="concept-callout info">
                <h4>Definisi Kimia Laju Reaksi (r):</h4>
                <p>
                  <strong>Laju reaksi (r)</strong> didefinisikan sebagai <em>berkurangnya konsentrasi molar reaktan per satuan waktu</em>, 
                  atau <em>bertambahnya konsentrasi molar produk per satuan waktu</em>.
                </p>
              </div>

              <div className="two-columns-comparison">
                <div className="compare-box reactant-side">
                  <span className="compare-title">Zat Pereaksi (Reaktan)</span>
                  <div className="compare-badge minus">(−) Tanda Negatif</div>
                  <p>
                    Partikel reaktan saling bertumbukan membentuk produk, sehingga konsentrasinya selalu 
                    <strong> berkurang</strong> seiring berjalannya waktu.
                  </p>
                  <code className="formula-inline">r(Reaktan) = − Δ[Reaktan] / Δt</code>
                </div>

                <div className="compare-box product-side">
                  <span className="compare-title">Hasil Reaksi (Produk)</span>
                  <div className="compare-badge plus">(+) Tanda Positif</div>
                  <p>
                    Pada awal reaksi konsentrasi produk nol, lalu terus <strong>bertambah</strong> 
                    seiring berlangsungnya reaksi.
                  </p>
                  <code className="formula-inline">r(Produk) = + Δ[Produk] / Δt</code>
                </div>
              </div>

              <div className="unit-explanation">
                <strong>Catatan Satuan:</strong> Konsentrasi dinyatakan dalam Molaritas (M = mol/L) dan waktu dalam detik (s), 
                sehingga satuan laju reaksi adalah <strong>M/s</strong> (atau <code>M · s⁻¹</code>).
              </div>
            </div>

            <div className="subchapter-footer">
              <Button variant="primary" onClick={() => setActiveTab('1.2')}>
                Lanjut ke Bagian 1.2: Laju Rata-rata vs Sesaat →
              </Button>
            </div>
          </article>
        )}

        {/* BAGIAN 1.2 */}
        {activeTab === '1.2' && (
          <article className="subchapter-card">
            <div className="subchapter-header">
              <div>
                <span className="section-label">Bagian 1.2 • Kurva & Grafik Kinetika</span>
                <h3 className="section-heading">Laju Reaksi Rata-rata vs Laju Sesaat</h3>
              </div>
              <button
                type="button"
                className={`check-completion-btn ${isSubchapterComplete('1.2') ? 'completed' : ''}`}
                onClick={() => toggleSubchapter('1.2')}
              >
                {isSubchapterComplete('1.2') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
              </button>
            </div>

            <div className="subchapter-body">
              <p>
                Laju reaksi umumnya <strong>tidak konstan</strong> sepanjang waktu. Pada awal reaksi, konsentrasi reaktan 
                masih tinggi sehingga frekuensi tumbukan partikel besar dan reaksi berlangsung cepat. 
                Semakin lama, reaktan semakin menipis sehingga laju reaksi semakin melambat hingga akhirnya berhenti.
              </p>

              <div className="rate-types-grid">
                <div className="rate-card">
                  <h4>1. Laju Reaksi Rata-rata (r̄)</h4>
                  <p>
                    Laju perubahan konsentrasi yang diukur dalam suatu <em>selang waktu tertentu</em> (Δt = t₂ − t₁).
                  </p>
                  <div className="mini-equation-card">
                    <span className="mini-var">r̄</span> = 
                    <span className="mini-frac">Δ[Zat] / Δt = ([Zat]₂ − [Zat]₁) / (t₂ − t₁)</span>
                  </div>
                  <p className="card-hint">
                    Menghubungkan dua titik berbeda pada kurva konsentrasi terhadap waktu (garis tali busur/sekan).
                  </p>
                </div>

                <div className="rate-card">
                  <h4>2. Laju Reaksi Sesaat (r)</h4>
                  <p>
                    Laju reaksi pada <em>satu titik waktu tertentu</em> yang sangat spesifik (misal tepat pada detik ke-30).
                  </p>
                  <div className="mini-equation-card">
                    <span className="mini-var">r</span> = 
                    <span className="mini-frac">d[Zat] / dt (kemiringan garis singgung / tangen)</span>
                  </div>
                  <p className="card-hint">
                    Dihitung dari gradien garis singgung (tangen) yang menyentuh kurva pada titik waktu yang ditentukan.
                  </p>
                </div>
              </div>

              {/* Karakteristik Kurva */}
              <div className="curve-illustration-card">
                <div className="curve-badge">KARAKTERISTIK KURVA KINETIKA REAKSI</div>
                <div className="curve-summary-points">
                  <div className="point-item">
                    <span className="point-dot reaktan-dot">●</span>
                    <span><strong>Kurva Reaktan:</strong> Melengkung turun curam di awal, lalu melandai seiring zat reaktan habis.</span>
                  </div>
                  <div className="point-item">
                    <span className="point-dot product-dot">●</span>
                    <span><strong>Kurva Produk:</strong> Melengkung naik dari nol, lalu mendatar ketika reaksi telah selesai.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="subchapter-footer">
              <Button variant="secondary" onClick={() => setActiveTab('1.1')}>
                ← Kembali ke Bagian 1.1
              </Button>
              <Button variant="primary" onClick={() => setActiveTab('1.3')}>
                Lanjut ke Bagian 1.3: Hubungan Koefisien (+/−) →
              </Button>
            </div>
          </article>
        )}

        {/* BAGIAN 1.3 */}
        {activeTab === '1.3' && (
          <article className="subchapter-card">
            <div className="subchapter-header">
              <div>
                <span className="section-label">Bagian 1.3 • Stoikiometri Kinetika</span>
                <h3 className="section-heading">Hubungan Laju Reaksi dengan Koefisien Reaksi</h3>
              </div>
              <button
                type="button"
                className={`check-completion-btn ${isSubchapterComplete('1.3') ? 'completed' : ''}`}
                onClick={() => toggleSubchapter('1.3')}
              >
                {isSubchapterComplete('1.3') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
              </button>
            </div>

            <div className="subchapter-body">
              <p>
                Dalam persamaan reaksi kimia yang setara, koefisien reaksi menunjukkan perbandingan mol zat-zat yang bereaksi. 
                Oleh karena itu, <strong>perbandingan laju reaksi antarzat sebanding dengan perbandingan koefisien reaksinya</strong>.
              </p>

              {/* TAMPILAN PERSAMAAN MATEMATIS VISUAL YANG SESUAI DENGAN TANDA (+/-) */}
              <div className="concept-callout success">
                <h4>Prinsip Perbandingan Koefisien Bertanda (+/−):</h4>
                <p>
                  Untuk reaksi setara umum: <code>aA + bB → cC + dD</code>
                </p>

                <div className="stoichiometry-visual-box">
                  <div className="visual-equation-row">
                    <div className="term-block reactant">
                      <span className="sign-badge minus">(−)</span>
                      <div className="frac-inline">
                        <span className="frac-num">r<sub>A</sub></span>
                        <span className="frac-bar"></span>
                        <span className="frac-den">a</span>
                      </div>
                    </div>

                    <span className="eq-sep">=</span>

                    <div className="term-block reactant">
                      <span className="sign-badge minus">(−)</span>
                      <div className="frac-inline">
                        <span className="frac-num">r<sub>B</sub></span>
                        <span className="frac-bar"></span>
                        <span className="frac-den">b</span>
                      </div>
                    </div>

                    <span className="eq-sep">=</span>

                    <div className="term-block product">
                      <span className="sign-badge plus">(+)</span>
                      <div className="frac-inline">
                        <span className="frac-num">r<sub>C</sub></span>
                        <span className="frac-bar"></span>
                        <span className="frac-den">c</span>
                      </div>
                    </div>

                    <span className="eq-sep">=</span>

                    <div className="term-block product">
                      <span className="sign-badge plus">(+)</span>
                      <div className="frac-inline">
                        <span className="frac-num">r<sub>D</sub></span>
                        <span className="frac-bar"></span>
                        <span className="frac-den">d</span>
                      </div>
                    </div>
                  </div>

                  <div className="sign-meaning-row">
                    <span className="meaning-tag minus">
                      <strong>(−) Tanda Minus:</strong> Menyatakan laju berkurangnya reaktan per koefisien
                    </span>
                    <span className="meaning-tag plus">
                      <strong>(+) Tanda Plus:</strong> Menyatakan laju bertambahnya produk per koefisien
                    </span>
                  </div>
                </div>
              </div>

              {/* Latihan Interaktif Perhitungan Koefisien */}
              <div className="interactive-calc-module">
                <div className="calc-header">
                  <span className="calc-title">Eksplorasi Interaktif Laju Reaksi:</span>
                  <span className="calc-reaction"><FormulaRenderer formula="2N2O5(g) -> 4NO2(g) + O2(g)" /></span>
                </div>

                <div className="calc-slider-group">
                  <label htmlFor="n2o5-slider" className="calc-label">
                    <span>Ubah Laju Pengurangan <FormulaRenderer formula="N2O5" />:</span>
                    <strong className="calc-val-display">(−) {inputRateN2O5.toFixed(3)} M · s⁻¹</strong>
                  </label>
                  <input
                    id="n2o5-slider"
                    type="range"
                    min="0.01"
                    max="0.10"
                    step="0.005"
                    value={inputRateN2O5}
                    onChange={(e) => setInputRateN2O5(parseFloat(e.target.value))}
                    className="input-slider"
                  />
                  <div className="slider-hints">
                    <span>0,010 M/s (Lambat)</span>
                    <span>0,100 M/s (Cepat)</span>
                  </div>
                </div>

                <div className="calc-results-grid">
                  <div className="calc-result-box reactant">
                    <span className="res-badge">Reaktan (Koefisien 2)</span>
                    <span className="res-name"><FormulaRenderer formula="N2O5" /></span>
                    <span className="res-val">(−) {inputRateN2O5.toFixed(3)} M/s</span>
                    <span className="res-note">Laju pengurangan reaktan</span>
                  </div>

                  <div className="calc-result-box product">
                    <span className="res-badge">Produk (Koefisien 4)</span>
                    <span className="res-name"><FormulaRenderer formula="NO2" /></span>
                    <span className="res-val">(+) {(inputRateN2O5 * (4 / 2)).toFixed(3)} M/s</span>
                    <span className="res-note">2× lebih cepat dari reaktan</span>
                  </div>

                  <div className="calc-result-box product">
                    <span className="res-badge">Produk (Koefisien 1)</span>
                    <span className="res-name"><FormulaRenderer formula="O2" /></span>
                    <span className="res-val">(+) {(inputRateN2O5 * (1 / 2)).toFixed(3)} M/s</span>
                    <span className="res-note">½ dari laju reaktan</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="subchapter-footer">
              <Button variant="secondary" onClick={() => setActiveTab('1.2')}>
                ← Kembali ke Bagian 1.2
              </Button>
              <Button variant="primary" onClick={() => setActiveTab('1.4')}>
                Lanjut ke Bagian 1.4: Rangkuman Pembelajaran →
              </Button>
            </div>
          </article>
        )}

        {/* BAGIAN 1.4 */}
        {activeTab === '1.4' && (
          <article className="subchapter-card">
            <div className="subchapter-header">
              <div>
                <span className="section-label">Bagian 1.4 • Cek Pemahaman</span>
                <h3 className="section-heading">Rangkuman Pembelajaran</h3>
              </div>
              <button
                type="button"
                className={`check-completion-btn ${isSubchapterComplete('1.4') ? 'completed' : ''}`}
                onClick={() => toggleSubchapter('1.4')}
              >
                {isSubchapterComplete('1.4') ? '✓ Selesai Dipelajari' : 'Tandai Selesai'}
              </button>
            </div>

            <div className="subchapter-body">
              <div className="summary-checklist">
                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Simbol & Definisi Laju (r):</strong> Laju reaksi dilambangkan dengan huruf <strong>r</strong>, 
                    bernilai positif, dan menyatakan berkurangnya konsentrasi reaktan per satuan waktu (−Δ[R]/Δt) 
                    atau bertambahnya produk per satuan waktu (+Δ[P]/Δt).
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Satuan Standar Laju:</strong> Satuan umum adalah Molar per detik (M/s atau mol · L⁻¹ · s⁻¹).
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Perbandingan Koefisien Bertanda (+/−):</strong> Rasio laju reaksi zat sebanding dengan koefisien reaksi setara:
                    <code>(−) r_A / a = (−) r_B / b = (+) r_C / c = (+) r_D / d</code>.
                  </div>
                </div>

                <div className="check-item">
                  <span className="check-icon">✓</span>
                  <div>
                    <strong>Laju Rata-rata (r̄) vs Sesaat (r):</strong> Laju rata-rata mengukur rentang waktu tertentu (Δt), 
                    sedangkan laju sesaat adalah gradien garis singgung (tangen) pada satu waktu spesifik.
                  </div>
                </div>
              </div>

              <div className="next-chapter-teaser">
                <div className="teaser-badge">MODUL SELANJUTNYA TELAH TERSEDIA DI HALAMAN 2</div>
                <h4>Menuju Modul 2: Teori Tumbukan & Faktor Laju Reaksi</h4>
                <p>
                  Setelah menguasai konsep dasar laju reaksi, langkah berikutnya adalah mempelajari 
                  <strong>mengapa dan bagaimana</strong> reaksi kimia berlangsung pada tingkat partikel 
                  melalui Teori Tumbukan dan 4 faktor laju (Konsentrasi, Luas Permukaan, Suhu, Katalis).
                </p>
                <div className="teaser-status">
                  <Badge variant="cyan">Modul 2 Dapat Dibuka di Halaman Modul 2</Badge>
                </div>
              </div>
            </div>

            <div className="subchapter-footer">
              <Button variant="secondary" onClick={() => setActiveTab('1.3')}>
                ← Kembali ke Bagian 1.3
              </Button>
              {onClose ? (
                <Button variant="primary" onClick={onClose}>
                  Selesai & Kembali ke Beranda
                </Button>
              ) : (
                <span className="footer-done-badge">✓ Modul 1 Siap Dipelajari Ulang Kapan Saja</span>
              )}
            </div>
          </article>
        )}
      </div>
    </div>
  );
}
