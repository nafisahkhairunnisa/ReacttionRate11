import { FormulaRenderer } from '../chemistry/FormulaRenderer';

/**
 * FormulaLabSheet Component - ChemVerse
 * Lembar Belajar Laboratorium: Ruang Rumus & Hubungan Matematis Laju Reaksi.
 * Dibuat dengan hierarki yang jelas, spasi rumus yang lega, dan teks kimia spesifik.
 * Menggunakan simbol laju reaksi tunggal: "r" (tanpa simbol "v").
 * Memuat tanda (+/-) pada perbandingan koefisien untuk menunjukkan reaktan berkurang atau produk bertambah.
 */
export function FormulaLabSheet() {
  return (
    <section className="lab-sheet-section" aria-labelledby="lab-sheet-title">
      {/* Header Lembar Kerja Laboratorium */}
      <div className="lab-sheet-header">
        <div className="lab-sheet-tag">
          <span className="lab-icon">🔬</span>
          <span>LEMBAR KERJA KINETIKA KIMIA • RUANG RUMUS DASAR</span>
        </div>
        <div className="lab-doc-id">DOKUMEN: LKPD-MODUL-01</div>
      </div>

      <div className="lab-sheet-body">
        <div className="lab-sheet-intro">
          <h3 id="lab-sheet-title" className="lab-title">
            1. Ruang Rumus & Notasi Laju Reaksi (<span className="formula-symbol">r</span>)
          </h3>
          <p className="lab-lead-text">
            Dalam kinetika kimia, laju reaksi (<strong className="formula-symbol">r</strong>) menyatakan seberapa cepat konsentrasi reaktan berkurang 
            atau seberapa cepat konsentrasi produk bertambah dalam satu satuan waktu (detik atau menit).
          </p>
        </div>

        {/* Kotak Rumus Utama (Lega & Responsif) */}
        <div className="formula-display-card">
          <div className="formula-card-badge">PERSAMAAN UTAMA LAJU REAKSI</div>
          
          <div className="formula-main-equation">
            <div className="equation-block">
              <span className="equation-var">r</span>
              <span className="equation-equal">=</span>
              <div className="fraction-display">
                <span className="fraction-num">− Δ[Reaktan]</span>
                <span className="fraction-line"></span>
                <span className="fraction-den">Δt</span>
              </div>
              <span className="equation-equal">=</span>
              <div className="fraction-display">
                <span className="fraction-num">+ Δ[Produk]</span>
                <span className="fraction-line"></span>
                <span className="fraction-den">Δt</span>
              </div>
            </div>
          </div>

          <div className="formula-unit-badge">
            <span className="unit-label">Satuan Internasional (SI):</span>
            <code className="unit-code">M · s⁻¹ (mol · L⁻¹ · detik⁻¹)</code>
          </div>

          {/* Penjelasan Makna Fisis Tanda Minus dan Plus */}
          <div className="formula-legend-grid">
            <div className="legend-item reaktan">
              <div className="legend-indicator minus">−</div>
              <div className="legend-text">
                <strong>Tanda Minus (−) pada Reaktan:</strong>
                <p>Menunjukkan bahwa konsentrasi reaktan selalu <em>berkurang</em> seiring bertambahnya waktu reaksi.</p>
              </div>
            </div>

            <div className="legend-item produk">
              <div className="legend-indicator plus">+</div>
              <div className="legend-text">
                <strong>Tanda Plus (+) pada Produk:</strong>
                <p>Menunjukkan bahwa konsentrasi zat hasil reaksi selalu <em>bertambah</em> seiring berjalannya reaksi.</p>
              </div>
            </div>

            <div className="legend-item konsentrasi">
              <div className="legend-indicator symbol">[ ]</div>
              <div className="legend-text">
                <strong>Kurung Siku [X]:</strong>
                <p>Menyatakan konsentrasi molaritas zat X dalam satuan Molaritas (M = mol/Liter larutan atau gas).</p>
              </div>
            </div>

            <div className="legend-item waktu">
              <div className="legend-indicator symbol">Δt</div>
              <div className="legend-text">
                <strong>Selang Waktu (Δt):</strong>
                <p>Selisih waktu pengamatan (t₂ − t₁) dalam satuan detik (sekon) atau menit.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hubungan Laju Reaksi dengan Koefisien Reaksi (+/-) */}
        <div className="stoichiometry-section">
          <div className="section-subheading">
            <span className="step-circle">2</span>
            <h4>Hubungan Perbandingan Laju dengan Koefisien Reaksi Menggunakan Tanda (+/−)</h4>
          </div>

          <p className="section-note">
            Untuk reaksi umum yang telah setara:
          </p>

          <div className="reaction-box">
            <span className="reaction-text">
              <span className="coef">a</span>A + <span className="coef">b</span>B → <span className="coef">c</span>C + <span className="coef">d</span>D
            </span>
          </div>

          <div className="stoichiometry-equation-box">
            <p className="stoichiometry-rule-text">
              Perbandingan laju zat sebanding dengan koefisien reaksi, dengan tanda <strong>(+/−)</strong> untuk menandakan laju berkurangnya reaktan atau bertambahnya produk:
            </p>
            
            <div className="equation-flow">
              <div className="equation-term-box reactant">
                <span className="sign-symbol minus">(−)</span>
                <div className="equation-fraction">
                  <span className="frac-top">r<sub>A</sub></span>
                  <span className="frac-bar"></span>
                  <span className="frac-bot">a</span>
                </div>
              </div>
              <span className="op">=</span>
              <div className="equation-term-box reactant">
                <span className="sign-symbol minus">(−)</span>
                <div className="equation-fraction">
                  <span className="frac-top">r<sub>B</sub></span>
                  <span className="frac-bar"></span>
                  <span className="frac-bot">b</span>
                </div>
              </div>
              <span className="op">=</span>
              <div className="equation-term-box product">
                <span className="sign-symbol plus">(+)</span>
                <div className="equation-fraction">
                  <span className="frac-top">r<sub>C</sub></span>
                  <span className="frac-bar"></span>
                  <span className="frac-bot">c</span>
                </div>
              </div>
              <span className="op">=</span>
              <div className="equation-term-box product">
                <span className="sign-symbol plus">(+)</span>
                <div className="equation-fraction">
                  <span className="frac-top">r<sub>D</sub></span>
                  <span className="frac-bar"></span>
                  <span className="frac-bot">d</span>
                </div>
              </div>
            </div>

            <div className="sign-explainer-row">
              <span className="sign-chip minus">
                <strong>(−)</strong> Laju berkurangnya reaktan per koefisien
              </span>
              <span className="sign-chip plus">
                <strong>(+)</strong> Laju bertambahnya produk per koefisien
              </span>
            </div>
          </div>

          {/* Contoh Reaksi Nyata Kimia */}
          <div className="example-case-card">
            <div className="example-badge">CONTOH DATA KIMIA SPESIFIK DENGAN TANDA (+/−)</div>
            <div className="example-equation">
              <FormulaRenderer formula="2N2O5(g) -> 4NO2(g) + O2(g)" />
            </div>

            <div className="example-breakdown">
              <p>
                Persamaan perbandingan laju terhadap koefisien untuk penguraian dinitrogen pentaoksida gas:
              </p>
              <div className="ratio-chips">
                <span className="chip chip-reactant">(−) r(N₂O₅) / 2</span>
                <span className="chip-sep">=</span>
                <span className="chip chip-product">(+) r(NO₂) / 4</span>
                <span className="chip-sep">=</span>
                <span className="chip chip-product">(+) r(O₂) / 1</span>
              </div>

              <div className="calculation-box">
                <div className="calc-scenario">
                  <strong>Jika laju pengurangan reaktan N₂O₅ diketahui:</strong>
                  <span className="calc-value">r(N₂O₅) = 0,040 M · s⁻¹</span>
                </div>
                <div className="calc-results">
                  <div className="calc-row">
                    <span className="calc-desc">• Laju pengurangan N₂O₅:</span>
                    <span className="calc-formula">(−) 0,040 M · s⁻¹</span>
                    <span className="calc-note">(tanda minus karena zat berkurang)</span>
                  </div>
                  <div className="calc-row">
                    <span className="calc-desc">• Laju pembentukan NO₂:</span>
                    <span className="calc-formula">(+) (4 / 2) × 0,040 M/s =</span>
                    <strong className="calc-highlight">(+) 0,080 M · s⁻¹ (2× lebih cepat)</strong>
                  </div>
                  <div className="calc-row">
                    <span className="calc-desc">• Laju pembentukan O₂:</span>
                    <span className="calc-formula">(+) (1 / 2) × 0,040 M/s =</span>
                    <strong className="calc-highlight">(+) 0,020 M · s⁻¹ (setengah dari laju reaktan)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
