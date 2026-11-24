import { useState, useEffect, useRef } from 'react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

/**
 * VirtualLab Component - ChemVerse Kinetika Kimia
 * Menyediakan 3 Eksperimen Interaktif Laju Reaksi:
 * - Eksperimen A: Pengaruh Suhu & Bentuk Tablet Effervescent (Utuh vs Serbuk) dengan Stopwatch.
 * - Eksperimen B: Reaksi Natrium Tiosulfat (Na₂S₂O₃) dengan HCl (Uji Tanda Silang & Kekeruhan Belerang).
 * - Eksperimen C: Penguraian H₂O₂ dengan Katalis MnO₂ dan KI (Uji Lidi Membara O₂).
 */
export function VirtualLab() {
  const [activeExp, setActiveExp] = useState('expA'); // 'expA' | 'expB' | 'expC'

  return (
    <div className="virtual-lab-wrapper">
      <div className="virtual-lab-header">
        <div className="lab-title-group">
          <span className="lab-badge">LABORATORIUM VIRTUAL INTERAKTIF</span>
          <h3 className="lab-main-heading">Praktikum Digital Kinetika Kimia</h3>
          <p className="lab-sub-desc">
            Uji variabel bebas laju reaksi secara langsung: manipulasi luas permukaan, suhu, konsentrasi, 
            dan katalis, lalu amati perubahan waktu reaksi (t) dan laju relatif (r = 1/t).
          </p>
        </div>

        {/* Tab Pemilihan Eksperimen */}
        <div className="exp-nav-tabs" role="tablist" aria-label="Pilih Praktikum">
          <button
            type="button"
            role="tab"
            aria-selected={activeExp === 'expA'}
            className={`exp-tab-btn ${activeExp === 'expA' ? 'active' : ''}`}
            onClick={() => setActiveExp('expA')}
          >
            <span className="exp-tab-icon">🫧</span>
            <div>
              <strong>Eksperimen A</strong>
              <span>Tablet Effervescent (Suhu & Luas)</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeExp === 'expB'}
            className={`exp-tab-btn ${activeExp === 'expB' ? 'active' : ''}`}
            onClick={() => setActiveExp('expB')}
          >
            <span className="exp-tab-icon">❌</span>
            <div>
              <strong>Eksperimen B</strong>
              <span>Uji Tanda Silang (Na₂S₂O₃ + HCl)</span>
            </div>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeExp === 'expC'}
            className={`exp-tab-btn ${activeExp === 'expC' ? 'active' : ''}`}
            onClick={() => setActiveExp('expC')}
          >
            <span className="exp-tab-icon">🔥</span>
            <div>
              <strong>Eksperimen C</strong>
              <span>Penguraian H₂O₂ & Katalis</span>
            </div>
          </button>
        </div>
      </div>

      <div className="virtual-lab-stage">
        {activeExp === 'expA' && <ExperimentA />}
        {activeExp === 'expB' && <ExperimentB />}
        {activeExp === 'expC' && <ExperimentC />}
      </div>
    </div>
  );
}

/** =========================================================================
 * EKSPERIMEN A: TABLET EFFERVESCENT (SUHU & LUAS PERMUKAAN)
 * ========================================================================= */
function ExperimentA() {
  const [tabletForm, setTabletForm] = useState('utuh'); // 'utuh' | 'keping' | 'serbuk'
  const [temperature, setTemperature] = useState(25); // 10 | 25 | 50
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0); // in seconds
  const [dissolvedPct, setDissolvedPct] = useState(0);
  const [observations, setObservations] = useState([
    { id: 1, form: 'Tablet Utuh', temp: 25, time: 38.4, rate: (1 / 38.4).toFixed(4) }
  ]);

  const timerRef = useRef(null);

  // Perhitungan durasi teoritis berdasarkan variabel
  const calculateTotalDuration = (form, temp) => {
    let baseTime = 36; // detik pada suhu 25°C untuk tablet utuh
    if (form === 'keping') baseTime = 20;
    if (form === 'serbuk') baseTime = 8;

    // Pengaruh suhu: kenaikan per 10°C melipatgandakan laju (waktu berkurang 1/2)
    let tempFactor = 1.0;
    if (temp === 10) tempFactor = 2.1;
    if (temp === 50) tempFactor = 0.38;

    return Number((baseTime * tempFactor).toFixed(1));
  };

  const expectedDuration = calculateTotalDuration(tabletForm, temperature);

  // Logika stopwatch dan pelarutan
  useEffect(() => {
    if (isRunning) {
      const interval = 100; // ms
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => {
          const nextTime = Number((prev + 0.1).toFixed(1));
          const pct = Math.min(100, Math.round((nextTime / expectedDuration) * 100));
          setDissolvedPct(pct);

          if (nextTime >= expectedDuration) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setDissolvedPct(100);

            // Simpan otomatis ke tabel data pengamatan
            const formLabel = tabletForm === 'utuh' ? 'Tablet Utuh' : tabletForm === 'keping' ? 'Kepingan (4 Bagian)' : 'Serbuk Halus';
            const rateVal = (1 / nextTime).toFixed(4);
            setObservations((prevObs) => [
              ...prevObs,
              {
                id: Date.now(),
                form: formLabel,
                temp: temperature,
                time: nextTime,
                rate: rateVal
              }
            ]);
            return expectedDuration;
          }
          return nextTime;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, expectedDuration, tabletForm, temperature]);

  const handleStart = () => {
    setTimeElapsed(0);
    setDissolvedPct(0);
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeElapsed(0);
    setDissolvedPct(0);
  };

  return (
    <div className="experiment-container">
      <div className="exp-intro-banner">
        <div>
          <h4>Eksperimen A: Pengaruh Luas Permukaan Bidang Sentuh & Suhu Pelarutan</h4>
          <p>
            Reaksi effervescent menghasilkan gas CO₂: 
            <code> H₃Cit(aq) + 3NaHCO₃(aq) → Na₃Cit(aq) + 3H₂O(l) + 3CO₂(g)↑</code>.
            Amati bagaimana bentuk tablet (luas permukaan) dan suhu air memengaruhi waktu pelarutan (t).
          </p>
        </div>
        <Badge variant="cyan">Variabel Bebas: Bentuk & Suhu</Badge>
      </div>

      <div className="exp-workspace-grid">
        {/* PANEL KONTROL VARIABEL */}
        <div className="exp-control-panel">
          <div className="control-group">
            <label className="control-label">1. Pilih Bentuk Fisik Tablet:</label>
            <div className="control-pill-group">
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${tabletForm === 'utuh' ? 'active' : ''}`}
                onClick={() => setTabletForm('utuh')}
              >
                ⚪ Tablet Utuh
              </button>
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${tabletForm === 'keping' ? 'active' : ''}`}
                onClick={() => setTabletForm('keping')}
              >
                🧩 Kepingan (Pecah 4)
              </button>
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${tabletForm === 'serbuk' ? 'active' : ''}`}
                onClick={() => setTabletForm('serbuk')}
              >
                ✨ Serbuk Halus
              </button>
            </div>
            <span className="control-hint">
              {tabletForm === 'utuh' && 'Luas bidang sentuh paling kecil, kontak tumbukan terbatas.'}
              {tabletForm === 'keping' && 'Luas bidang sentuh sedang, tumbukan partikel meningkat.'}
              {tabletForm === 'serbuk' && 'Luas bidang sentuh maksimal, frekuensi tumbukan efektif sangat tinggi!'}
            </span>
          </div>

          <div className="control-group">
            <label className="control-label">2. Pilih Suhu Air Pelarut:</label>
            <div className="control-pill-group">
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${temperature === 10 ? 'active' : ''}`}
                onClick={() => setTemperature(10)}
              >
                ❄️ Air Dingin (10 °C)
              </button>
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${temperature === 25 ? 'active' : ''}`}
                onClick={() => setTemperature(25)}
              >
                🌡️ Suhu Ruang (25 °C)
              </button>
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${temperature === 50 ? 'active' : ''}`}
                onClick={() => setTemperature(50)}
              >
                🔥 Air Hangat (50 °C)
              </button>
            </div>
          </div>

          {/* STOPWATCH DISPLAY */}
          <div className="stopwatch-display-card">
            <span className="stopwatch-label">STOPWATCH LABORATORIUM</span>
            <div className="stopwatch-digits">
              {String(Math.floor(timeElapsed)).padStart(2, '0')}:
              {String(Math.round((timeElapsed % 1) * 10)).padEnd(1, '0')} s
            </div>
            <div className="dissolve-progress-bar">
              <div
                className="dissolve-progress-fill"
                style={{ width: `${dissolvedPct}%` }}
              />
            </div>
            <span className="dissolve-status-text">
              Status Tablet: {dissolvedPct === 0 ? 'Belum dimasukkan' : dissolvedPct >= 100 ? '✅ Larut Sempurna 100%' : `Melarut ${dissolvedPct}%`}
            </span>
          </div>

          <div className="control-actions-row">
            {!isRunning ? (
              <Button
                variant="primary"
                size="lg"
                className="btn-full-width"
                onClick={handleStart}
              >
                ▶️ Masukkan Tablet & Mulai
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                className="btn-full-width"
                onClick={() => setIsRunning(false)}
              >
                ⏸️ Hentikan Stopwatch
              </Button>
            )}
            <Button
              variant="secondary"
              size="md"
              disabled={isRunning && dissolvedPct < 100}
              onClick={handleReset}
            >
              🔄 Reset
            </Button>
          </div>
        </div>

        {/* VISUALISASI GELAS BEKER & GELEMBUNG */}
        <div className="exp-visual-stage">
          <div className="beaker-container">
            <div className="beaker-scale">
              <span>250 mL</span>
              <span>200 mL</span>
              <span>150 mL</span>
              <span>100 mL</span>
              <span>50 mL</span>
            </div>

            {/* Cairan Dalam Beker */}
            <div
              className="beaker-liquid"
              style={{
                background:
                  temperature === 50
                    ? 'linear-gradient(180deg, rgba(254, 215, 170, 0.4) 0%, rgba(251, 146, 60, 0.6) 100%)'
                    : temperature === 10
                    ? 'linear-gradient(180deg, rgba(186, 230, 253, 0.4) 0%, rgba(56, 189, 248, 0.6) 100%)'
                    : 'linear-gradient(180deg, rgba(165, 243, 252, 0.35) 0%, rgba(34, 211, 238, 0.55) 100%)'
              }}
            >
              {/* Gelembung Gas CO2 jika sedang bereaksi */}
              {isRunning && (
                <div
                  className={`bubble-emission ${
                    tabletForm === 'serbuk' || temperature === 50 ? 'furious' : 'moderate'
                  }`}
                >
                  <span className="bubble b1">o</span>
                  <span className="bubble b2">O</span>
                  <span className="bubble b3">°</span>
                  <span className="bubble b4">O</span>
                  <span className="bubble b5">o</span>
                  <span className="bubble b6">°</span>
                </div>
              )}

              {/* Posisi Tablet di dasar beker */}
              <div
                className={`tablet-specimen ${tabletForm} ${dissolvedPct >= 100 ? 'dissolved' : ''}`}
                style={{
                  opacity: Math.max(0.1, (100 - dissolvedPct) / 100),
                  transform: `scale(${Math.max(0.2, (100 - dissolvedPct) / 100)})`
                }}
              >
                {tabletForm === 'utuh' && <span className="tablet-disc">⚪ Tablet</span>}
                {tabletForm === 'keping' && <span className="tablet-pieces">🧩 4 Keping</span>}
                {tabletForm === 'serbuk' && <span className="tablet-powder">✨ Serbuk</span>}
              </div>
            </div>

            <div className="beaker-base" />
          </div>

          <div className="beaker-info-strip">
            <span>Air: 150 mL</span>
            <span>Suhu: {temperature} °C</span>
            <span>Wadah: Beker Borosilikat 250 mL</span>
          </div>
        </div>
      </div>

      {/* TABEL PENGAMATAN OTOMATIS */}
      <div className="exp-data-section">
        <div className="table-header-row">
          <div>
            <h5>📊 Tabel Hasil Pengamatan Praktikum A</h5>
            <p>Data waktu pelarutan otomatis dicatat saat reaksi selesai:</p>
          </div>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setObservations([])}
          >
            Bersihkan Tabel
          </Button>
        </div>

        <div className="table-responsive">
          <table className="chem-data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Bentuk Tablet Effervescent</th>
                <th>Suhu Pelarut (°C)</th>
                <th>Waktu Pelarutan (t detik)</th>
                <th>Laju Reaksi Relatif (r = 1/t s⁻¹)</th>
                <th>Analisis Kecepatan</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs, idx) => (
                <tr key={obs.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{obs.form}</strong></td>
                  <td>{obs.temp} °C</td>
                  <td className="data-time">{obs.time} s</td>
                  <td className="data-rate"><strong>{obs.rate}</strong> s⁻¹</td>
                  <td>
                    {obs.time < 12 ? (
                      <span className="badge-fast">⚡ Sangat Cepat</span>
                    ) : obs.time < 30 ? (
                      <span className="badge-med">✓ Sedang</span>
                    ) : (
                      <span className="badge-slow">⏱ Lambat</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="exp-conclusion-box">
          <h6>💡 Kesimpulan Ilmiah Praktikum A:</h6>
          <p>
            1. <strong>Pengaruh Luas Permukaan:</strong> Bentuk serbuk memiliki luas bidang sentuh yang jauh lebih besar
            dibandingkan tablet utuh, sehingga frekuensi tumbukan efektif antara reaktan meningkat tajam dan waktu reaksi (t) menjadi jauh lebih singkat (laju r = 1/t lebih tinggi).
          </p>
          <p>
            2. <strong>Pengaruh Suhu:</strong> Semakin tinggi suhu air, energi kinetik molekul meningkat sehingga semakin banyak
            partikel melampaui energi aktivasi (Eₐ), mempercepat laju pelarutan tablet effervescent.
          </p>
        </div>
      </div>
    </div>
  );
}

/** =========================================================================
 * EKSPERIMEN B: UJI TANDA SILANG Na₂S₂O₃ + HCl (KONSENTRASI)
 * ========================================================================= */
function ExperimentB() {
  const [conc, setConc] = useState(0.10); // 0.05 | 0.10 | 0.20 M
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [turbidity, setTurbidity] = useState(0); // 0 to 1
  const [observations, setObservations] = useState([
    { id: 1, conc: '0.10 M', volHcl: '5 mL (2 M)', time: 18.0, rate: (1 / 18.0).toFixed(4) }
  ]);

  const timerRef = useRef(null);

  // Waktu teoritis kekeruhan tanda silang tertutup
  // r sebanding dengan [Na2S2O3]: jika konsentrasi 2x lipat, waktu menjadi 1/2 kali
  const getExpectedDuration = (molarity) => {
    if (molarity === 0.05) return 36.0;
    if (molarity === 0.10) return 18.0;
    if (molarity === 0.20) return 9.0;
    return 18.0;
  };

  const expectedDuration = getExpectedDuration(conc);

  useEffect(() => {
    if (isRunning) {
      const interval = 100;
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => {
          const nextTime = Number((prev + 0.1).toFixed(1));
          const op = Math.min(1.0, nextTime / expectedDuration);
          setTurbidity(op);

          if (nextTime >= expectedDuration) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setTurbidity(1.0);

            // Simpan ke tabel
            const rateVal = (1 / nextTime).toFixed(4);
            setObservations((prevObs) => [
              ...prevObs,
              {
                id: Date.now(),
                conc: `${conc.toFixed(2)} M`,
                volHcl: '5 mL (2 M)',
                time: nextTime,
                rate: rateVal
              }
            ]);
            return expectedDuration;
          }
          return nextTime;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, expectedDuration, conc]);

  const handleStart = () => {
    setTimeElapsed(0);
    setTurbidity(0);
    setIsRunning(true);
  };

  const handleStopManual = () => {
    setIsRunning(false);
    if (timeElapsed > 0) {
      const rateVal = (1 / timeElapsed).toFixed(4);
      setObservations((prevObs) => [
        ...prevObs,
        {
          id: Date.now(),
          conc: `${conc.toFixed(2)} M`,
          volHcl: '5 mL (2 M)',
          time: timeElapsed,
          rate: rateVal
        }
      ]);
    }
  };

  return (
    <div className="experiment-container">
      <div className="exp-intro-banner">
        <div>
          <h4>Eksperimen B: Reaksi Natrium Tiosulfat (Na₂S₂O₃) dengan HCl (Uji Tanda Silang)</h4>
          <p>
            Persamaan reaksi: 
            <code> Na₂S₂O₃(aq) + 2HCl(aq) → 2NaCl(aq) + H₂O(l) + SO₂(g) + S(s)↓ (belerang kuning)</code>.
            Endapan belerang (S) yang terbentuk perlahan membuat larutan keruh. Stopwatch dicatat tepat saat tanda silang 
            (<strong>X</strong>) di dasar gelas beker tidak tampak lagi saat dilihat dari arah atas.
          </p>
        </div>
        <Badge variant="primary">Variabel Bebas: Konsentrasi [Na₂S₂O₃]</Badge>
      </div>

      <div className="exp-workspace-grid">
        {/* PANEL KONTROL */}
        <div className="exp-control-panel">
          <div className="control-group">
            <label className="control-label">Pilih Konsentrasi Na₂S₂O₃:</label>
            <div className="control-pill-group">
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${conc === 0.05 ? 'active' : ''}`}
                onClick={() => setConc(0.05)}
              >
                🧪 0.05 M (Encer)
              </button>
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${conc === 0.10 ? 'active' : ''}`}
                onClick={() => setConc(0.10)}
              >
                🧪 0.10 M (Sedang)
              </button>
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${conc === 0.20 ? 'active' : ''}`}
                onClick={() => setConc(0.20)}
              >
                🧪 0.20 M (Pekat)
              </button>
            </div>
            <span className="control-hint">
              Volume Na₂S₂O₃: 50 mL | Volume HCl 2 M: 5 mL (konstan).
            </span>
          </div>

          <div className="stopwatch-display-card">
            <span className="stopwatch-label">WAKTU REAKSI SAMPAI TANDA X HILANG (t)</span>
            <div className="stopwatch-digits">
              {String(Math.floor(timeElapsed)).padStart(2, '0')}:
              {String(Math.round((timeElapsed % 1) * 10)).padEnd(1, '0')} s
            </div>
            <span className="dissolve-status-text">
              Tingkat Kekeruhan Belerang: {Math.round(turbidity * 100)}%
            </span>
          </div>

          <div className="control-actions-row">
            {!isRunning ? (
              <Button
                variant="primary"
                size="lg"
                className="btn-full-width"
                onClick={handleStart}
              >
                ▶️ Tuangkan HCl & Mulai Pengamatan
              </Button>
            ) : (
              <Button
                variant="effective"
                size="lg"
                className="btn-full-width"
                onClick={handleStopManual}
              >
                🛑 Tanda Silang Sudah Hilang!
              </Button>
            )}
            <Button
              variant="secondary"
              size="md"
              onClick={() => {
                setIsRunning(false);
                setTimeElapsed(0);
                setTurbidity(0);
              }}
            >
              🔄 Bersihkan Beker
            </Button>
          </div>
        </div>

        {/* TAMPILAN PANDANGAN ATAS GELAS BEKER (CROSS MARK VIEW) */}
        <div className="exp-visual-stage topdown-stage">
          <div className="topdown-card">
            <span className="topdown-title">👁️ Sudut Pandang Pengamat dari Atas Gelas Beker:</span>
            <div className="topdown-beaker-circle">
              {/* Tanda silang hitam di dasar */}
              <div className="cross-mark-x">✖</div>

              {/* Lapisan larutan yang semakin keruh belerang kuning */}
              <div
                className="sulfur-turbidity-layer"
                style={{
                  opacity: turbidity,
                  backgroundColor: `rgba(245, 230, 110, ${0.4 + turbidity * 0.58})`
                }}
              />
            </div>
            <span className="topdown-caption">
              {turbidity === 0 && 'Kondisi Awal: Larutan jernih, tanda silang (✖) tampak sangat jelas.'}
              {turbidity > 0 && turbidity < 0.85 && 'Reaksi berjalan: Endapan koloid S(s) kuning mulai terbentuk, tanda silang mulai memudar.'}
              {turbidity >= 0.85 && '🛑 Tanda silang (✖) tertutup total oleh kekeruhan endapan belerang!'}
            </span>
          </div>
        </div>
      </div>

      {/* TABEL DATA PENGAMATAN */}
      <div className="exp-data-section">
        <div className="table-header-row">
          <div>
            <h5>📊 Tabel Hasil Pengamatan Uji Tanda Silang</h5>
            <p>Data keterkaitan antara konsentrasi Na₂S₂O₃ terhadap waktu (t) dan laju relatif (r = 1/t):</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setObservations([])}>
            Bersihkan Tabel
          </Button>
        </div>

        <div className="table-responsive">
          <table className="chem-data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Konsentrasi [Na₂S₂O₃]</th>
                <th>Volume HCl 2 M</th>
                <th>Waktu Reaksi (t detik)</th>
                <th>Laju Relatif (r = 1/t s⁻¹)</th>
                <th>Perbandingan Laju</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs, idx) => (
                <tr key={obs.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{obs.conc}</strong></td>
                  <td>{obs.volHcl}</td>
                  <td className="data-time">{obs.time} s</td>
                  <td className="data-rate"><strong>{obs.rate}</strong> s⁻¹</td>
                  <td>
                    {obs.time <= 10 ? '🚀 4× lebih cepat dari 0.05 M' : obs.time <= 20 ? '⚡ 2× lebih cepat dari 0.05 M' : 'Acuan Dasar (1×)'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="exp-conclusion-box">
          <h6>💡 Kesimpulan Ilmiah Praktikum B:</h6>
          <p>
            Semakin pekat konsentrasi reaktan Na₂S₂O₃, kerapatan partikel per satuan volume meningkat sehingga
            frekuensi tumbukan antarmolekul per detik bertambah. Hal ini menyebabkan laju pembentukan endapan belerang S(s) meningkat secara linier (orde 1 terhadap Na₂S₂O₃), sehingga waktu yang diperlukan untuk menutupi tanda silang menjadi berbanding terbalik: <code>r ∝ 1/t</code>.
          </p>
        </div>
      </div>
    </div>
  );
}

/** =========================================================================
 * EKSPERIMEN C: PENGURAIAN H₂O₂ DENGAN KATALIS MnO₂ DAN KI
 * ========================================================================= */
function ExperimentC() {
  const [catalyst, setCatalyst] = useState('none'); // 'none' | 'ki' | 'mno2'
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [o2Volume, setO2Volume] = useState(0); // mL (0 to 60)
  const [splintTested, setSplintTested] = useState(false);
  const [observations, setObservations] = useState([
    { id: 1, catLabel: 'Tanpa Katalis (Kontrol)', time: 30.0, vol: '2 mL', rate: 'Sangat Lambat', splint: 'Meredup (Tidak Menyala)' }
  ]);

  const timerRef = useRef(null);

  // Karakteristik laju penguraian H2O2
  const getReactionParams = (cat) => {
    if (cat === 'none') {
      return { maxVol: 3, duration: 30, rateLabel: 'Sangat Lambat (Hampir Diam)', splintResult: 'Tidak Menyala' };
    }
    if (cat === 'ki') {
      return { maxVol: 38, duration: 18, rateLabel: 'Cepat (Katalis Homogen KI)', splintResult: 'Menyala Sedang' };
    }
    if (cat === 'mno2') {
      return { maxVol: 60, duration: 8, rateLabel: 'Sangat Cepat & Berbusa (Katalis Heterogen MnO₂)', splintResult: 'Menyala Membara Terang Berkobar! 🔥' };
    }
    return { maxVol: 3, duration: 30, rateLabel: 'Lambat', splintResult: 'Tidak Menyala' };
  };

  const currentParams = getReactionParams(catalyst);

  useEffect(() => {
    if (isRunning) {
      const interval = 100;
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => {
          const nextTime = Number((prev + 0.1).toFixed(1));
          const fraction = Math.min(1.0, nextTime / currentParams.duration);
          const vol = Math.round(fraction * currentParams.maxVol);
          setO2Volume(vol);

          if (nextTime >= currentParams.duration) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            setO2Volume(currentParams.maxVol);

            const catLabel = catalyst === 'none' ? 'Tanpa Katalis (Kontrol)' : catalyst === 'ki' ? 'Ditambah KI 0.1 M' : 'Ditambah Serbuk MnO₂';
            setObservations((prevObs) => [
              ...prevObs,
              {
                id: Date.now(),
                catLabel,
                time: nextTime,
                vol: `${currentParams.maxVol} mL`,
                rate: currentParams.rateLabel,
                splint: currentParams.splintResult
              }
            ]);
            return currentParams.duration;
          }
          return nextTime;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRunning, currentParams, catalyst]);

  const handleStart = () => {
    setTimeElapsed(0);
    setO2Volume(0);
    setSplintTested(false);
    setIsRunning(true);
  };

  const handleTestSplint = () => {
    setSplintTested(true);
  };

  return (
    <div className="experiment-container">
      <div className="exp-intro-banner">
        <div>
          <h4>Eksperimen C: Penguraian Hidrogen Peroksida (H₂O₂) dengan Katalis MnO₂ dan KI</h4>
          <p>
            Persamaan reaksi: 
            <code> 2H₂O₂(aq) ──[Katalis]──→ 2H₂O(l) + O₂(g)↑</code>.
            Tanpa katalis, penguraian H₂O₂ berlangsung luar biasa lambat. Penambahan katalis menyediakan rute reaksi 
            dengan energi aktivasi (Eₐ) yang lebih rendah sehingga volume gas O₂ melonjak cepat. 
            Gas O₂ dibuktikan melalui uji nyala lidi membara (<em>glowing splint test</em>).
          </p>
        </div>
        <Badge variant="effective">Variabel Bebas: Jenis Katalis</Badge>
      </div>

      <div className="exp-workspace-grid">
        {/* PANEL KONTROL */}
        <div className="exp-control-panel">
          <div className="control-group">
            <label className="control-label">Pilih Perlakuan Katalis:</label>
            <div className="control-pill-group">
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${catalyst === 'none' ? 'active' : ''}`}
                onClick={() => setCatalyst('none')}
              >
                🚫 Tanpa Katalis (Kontrol)
              </button>
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${catalyst === 'ki' ? 'active' : ''}`}
                onClick={() => setCatalyst('ki')}
              >
                💧 Larutan KI 0.1 M (Homogen)
              </button>
              <button
                type="button"
                disabled={isRunning}
                className={`control-pill ${catalyst === 'mno2' ? 'active' : ''}`}
                onClick={() => setCatalyst('mno2')}
              >
                ⬛ Serbuk MnO₂ (Heterogen)
              </button>
            </div>
            <span className="control-hint">
              {catalyst === 'none' && 'Reaksi berjalan sangat lambat karena energi aktivasi (Eₐ) tinggi.'}
              {catalyst === 'ki' && 'Ion I⁻ bereaksi secara homogen membentuk intermediet IO⁻, gelembung O₂ terbentuk cepat.'}
              {catalyst === 'mno2' && 'MnO₂ padat menyediakan situs aktif heterogen, memicu penguraian H₂O₂ sangat cepat!'}
            </span>
          </div>

          <div className="stopwatch-display-card">
            <span className="stopwatch-label">GAS O₂ TERKUMPUL (SILINDER UKUR)</span>
            <div className="stopwatch-digits">
              {o2Volume} <span style={{ fontSize: '1.25rem' }}>mL</span>
            </div>
            <span className="dissolve-status-text">
              Waktu Reaksi: {timeElapsed.toFixed(1)} detik | Laju: {currentParams.rateLabel}
            </span>
          </div>

          <div className="control-actions-row">
            {!isRunning ? (
              <Button
                variant="primary"
                size="lg"
                className="btn-full-width"
                onClick={handleStart}
              >
                ▶️ Campurkan Zat & Mulai Reaksi
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="lg"
                className="btn-full-width"
                onClick={() => setIsRunning(false)}
              >
                ⏸️ Hentikan Pengamatan
              </Button>
            )}
            <Button
              variant="effective"
              size="md"
              disabled={o2Volume < 5}
              onClick={handleTestSplint}
            >
              🔥 Uji Lidi Membara
            </Button>
          </div>
        </div>

        {/* VISUALISASI APARATUS LAB KIMIA */}
        <div className="exp-visual-stage apparatus-stage">
          <div className="apparatus-wrapper">
            {/* Tabung Reaksi H2O2 */}
            <div className="test-tube-rig">
              <span className="rig-label">Tabung Reaksi H₂O₂</span>
              <div className="test-tube">
                {/* Cairan H2O2 & Katalis */}
                <div
                  className={`tube-liquid ${catalyst}`}
                  style={{
                    height: isRunning && catalyst === 'mno2' ? '85%' : '45%'
                  }}
                >
                  {isRunning && (
                    <div className="tube-bubbles">
                      <span>•</span>
                      <span>o</span>
                      <span>O</span>
                      <span>o</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Selang Penghubung Gas */}
            <div className="delivery-tube-line">
              <span className="gas-arrow">O₂ →</span>
            </div>

            {/* Silinder Ukur Terbalik dalam Bak Air */}
            <div className="measuring-cylinder-rig">
              <span className="rig-label">Silinder Gas O₂ Terbalik</span>
              <div className="inverted-cylinder">
                <div
                  className="gas-pocket"
                  style={{ height: `${(o2Volume / 60) * 100}%` }}
                >
                  <span className="gas-label">{o2Volume} mL O₂</span>
                </div>
                <div className="water-remaining" />
              </div>
            </div>

            {/* Uji Lidi Membara Pop-up */}
            {splintTested && (
              <div className="splint-visual-box">
                <div className="splint-stick">
                  <span className={`splint-tip ${o2Volume >= 15 ? 'flaming' : 'glowing'}`}>
                    {o2Volume >= 15 ? '🔥' : '💥'}
                  </span>
                </div>
                <p className="splint-result-text">
                  <strong>Hasil Uji Lidi Membara:</strong> {currentParams.splintResult}
                </p>
              </div>
            )}
          </div>

          <div className="beaker-info-strip">
            <span>Reaktan: 10 mL H₂O₂ 3%</span>
            <span>Katalis: {catalyst === 'none' ? 'Tidak Ada' : catalyst === 'ki' ? 'KI 0.1 M' : 'MnO₂ 0.1 g'}</span>
            <span>Gas Dihasilkan: O₂ (Oksigen)</span>
          </div>
        </div>
      </div>

      {/* TABEL HASIL */}
      <div className="exp-data-section">
        <div className="table-header-row">
          <div>
            <h5>📊 Tabel Hasil Pengamatan Praktikum C</h5>
            <p>Data volume gas O₂ yang dihasilkan dan hasil uji identifikasi gas oksigen:</p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => setObservations([])}>
            Bersihkan Tabel
          </Button>
        </div>

        <div className="table-responsive">
          <table className="chem-data-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Perlakuan Campuran</th>
                <th>Waktu (t detik)</th>
                <th>Volume Gas O₂ Terkumpul</th>
                <th>Laju Penguraian</th>
                <th>Uji Lidi Membara</th>
              </tr>
            </thead>
            <tbody>
              {observations.map((obs, idx) => (
                <tr key={obs.id}>
                  <td>{idx + 1}</td>
                  <td><strong>{obs.catLabel}</strong></td>
                  <td>{obs.time} s</td>
                  <td className="data-time">{obs.vol}</td>
                  <td><strong>{obs.rate}</strong></td>
                  <td><span className="badge-fast">{obs.splint}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="exp-conclusion-box">
          <h6>💡 Kesimpulan Ilmiah Praktikum C:</h6>
          <p>
            1. Katalis seperti MnO₂ dan KI bekerja dengan cara menurunkan energi aktivasi reaksi penguraian H₂O₂,
            sehingga pada suhu kamar reaksi berlangsung ribuan kali lebih cepat daripada reaksi tanpa katalis.
          </p>
          <p>
            2. Katalis memfasilitasi mekanisme alternatif, dan di akhir reaksi zat katalis dapat diperoleh kembali 
            dengan massa dan sifat kimia yang tidak berubah.
          </p>
        </div>
      </div>
    </div>
  );
}

