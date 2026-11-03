import { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { setStorageItem, STORAGE_KEYS } from '../utils/storage';
import { useGamification } from '../hooks/useGamification';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

/**
 * QuizPage Component - ChemVerse
 * Halaman Kuis Interaktif 10 Soal Pilihan Ganda Kinetika Kimia Kelas 11 SMA.
 * Dilengkapi navigasi nomor soal, petunjuk rumus, umpan balik instan,
 * pembahasan kimia mendalam, penyimpanan skor lokal, dan integrasi poin XP.
 */
export function QuizPage({ onNavigate }) {
  const { addXP } = useGamification();

  // State kuis
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [questionId]: 'A' | 'B' | 'C' | 'D' | 'E' }
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState({});

  const currentQ = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;

  // Tangani pemilihan opsi
  const handleSelectOption = (optionId) => {
    if (isSubmitted) return; // Kunci jawaban setelah disubmit
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionId
    }));
  };

  // Toggle petunjuk rumus
  const toggleHintForCurrent = () => {
    setShowHint((prev) => ({
      ...prev,
      [currentQ.id]: !prev[currentQ.id]
    }));
  };

  // Hitung skor saat disubmit
  const handleSubmitQuiz = () => {
    let correctCount = 0;
    QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const finalScore = Math.round((correctCount / totalQuestions) * 100);

    // Simpan ke localStorage secara aman
    setStorageItem(STORAGE_KEYS.QUIZ, {
      score: finalScore,
      correctCount,
      total: totalQuestions,
      completedAt: new Date().toISOString()
    });

    // Tambah XP gamifikasi
    addXP(finalScore);

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Ulangi kuis
  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIdx(0);
    setShowHint({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Hitung statistik jika sudah submit
  const correctCount = isSubmitted
    ? QUIZ_QUESTIONS.filter((q) => selectedAnswers[q.id] === q.correctAnswer).length
    : 0;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <div className="quiz-page-container">
      {/* Breadcrumb Navigasi */}
      <nav className="page-breadcrumb-bar" aria-label="Navigasi Halaman Kuis">
        <div className="breadcrumb-links">
          <button type="button" className="breadcrumb-btn" onClick={() => onNavigate('home')}>
            Beranda
          </button>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">Kuis Interaktif (10 Soal Pilihan Ganda)</span>
        </div>
        <div className="page-nav-actions">
          <Button variant="secondary" size="sm" onClick={() => onNavigate('home')}>
            ← Ke Beranda
          </Button>
          <Button variant="secondary" size="sm" onClick={() => onNavigate('modul-5')}>
            Ke Modul 5 →
          </Button>
        </div>
      </nav>

      {/* Header Kuis */}
      <header className="quiz-page-hero">
        <div className="hero-badge-row">
          <Badge variant="primary">EVALUASI KOMPREHENSIF</Badge>
          <Badge variant="cyan">10 Soal Pilihan Ganda</Badge>
          <span className="hero-time-estimate">⏱ Tanpa Batas Waktu • Umpan Balik Instan</span>
        </div>
        <h1 className="quiz-page-title">
          Kuis Interaktif: Laju Reaksi Kimia Kelas 11 SMA
        </h1>
        <p className="quiz-page-desc">
          Uji pemahaman Anda mengenai konsep laju reaksi (r), stoikiometri laju, teori tumbukan, 
          faktor-faktor penentu, penentuan orde reaksi, dan diagram profil energi.
        </p>
      </header>

      {/* TAMPILAN JIKA SUDAH DISUBMIT: KARTU HASIL & PEMBAHASAN */}
      {isSubmitted ? (
        <section className="quiz-results-section" aria-labelledby="results-title">
          <div className="results-summary-card">
            <div className="results-badge-strip">
              <Badge variant={scorePercent >= 70 ? 'effective' : 'warning'}>
                {scorePercent >= 70 ? '🎉 LULUS STANDAR KKM' : '📚 BUTUH LATIHAN LAGI'}
              </Badge>
            </div>

            <h2 id="results-title" className="results-main-title">
              Skor Akhir Anda: <span className="highlight-score">{scorePercent} / 100</span>
            </h2>

            <p className="results-desc-text">
              Anda menjawab dengan benar <strong>{correctCount} dari {totalQuestions} soal</strong>. 
              {scorePercent >= 70
                ? ' Selamat! Pemahaman kinetika kimia Anda telah sangat solid. Anda berhak mengklaim sertifikat kelulusan digital!'
                : ' Jangan berkecil hati! Silakan pelajari kembali pembahasan di bawah ini dan ulangi kuis untuk hasil maksimal.'}
            </p>

            <div className="results-action-buttons">
              <Button variant="secondary" size="lg" onClick={handleResetQuiz}>
                🔄 Ulangi Pengerjaan Kuis
              </Button>
              <Button variant="primary" size="lg" onClick={() => onNavigate('modul-5')}>
                🎓 Klaim Sertifikat di Modul 5 →
              </Button>
            </div>
          </div>

          {/* PEMBAHASAN LENGKAP TIAP SOAL (1-10) */}
          <div className="quiz-review-wrapper">
            <h3 className="review-title">Pembahasan Mendalam Langkah demi Langkah (10 Soal)</h3>
            <div className="review-list">
              {QUIZ_QUESTIONS.map((q, index) => {
                const userAns = selectedAnswers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                return (
                  <article key={q.id} className={`review-item-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <div className="review-item-header">
                      <div className="review-num-badge">
                        <span className="q-badge">Soal #{index + 1}</span>
                        <span className="q-cat">{q.category}</span>
                      </div>
                      <Badge variant={isCorrect ? 'effective' : 'ineffective'}>
                        {isCorrect ? '✓ Jawaban Benar (+10)' : '✗ Jawaban Salah (0)'}
                      </Badge>
                    </div>

                    <p className="review-question-text">{q.question}</p>

                    <div className="review-answer-status">
                      <div className="status-row">
                        <span className="status-label">Pilihan Jawaban Anda:</span>
                        <strong className={`status-val ${isCorrect ? 'text-green' : 'text-red'}`}>
                          {userAns ? `${userAns}. ${q.options.find(o => o.id === userAns)?.text}` : 'Tidak dijawab'}
                        </strong>
                      </div>
                      {!isCorrect && (
                        <div className="status-row">
                          <span className="status-label">Kunci Jawaban yang Benar:</span>
                          <strong className="status-val text-green">
                            {q.correctAnswer}. {q.options.find(o => o.id === q.correctAnswer)?.text}
                          </strong>
                        </div>
                      )}
                    </div>

                    <div className="review-explanation-box">
                      <strong>💡 Pembahasan Kimia:</strong>
                      <p>{q.explanation}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        /* TAMPILAN PENGERJAAN SOAL (AKTIF) */
        <section className="quiz-working-section">
          {/* Baris Navigasi Nomor Soal (1 - 10) */}
          <div className="question-nav-strip" aria-label="Daftar Nomor Soal">
            <span className="nav-strip-label">Nomor Soal:</span>
            <div className="bubbles-row">
              {QUIZ_QUESTIONS.map((q, idx) => {
                const isAnswered = !!selectedAnswers[q.id];
                const isCurrent = idx === currentIdx;
                return (
                  <button
                    key={q.id}
                    type="button"
                    className={`q-bubble-btn ${isCurrent ? 'current' : ''} ${isAnswered ? 'answered' : ''}`}
                    onClick={() => setCurrentIdx(idx)}
                    title={`Lompat ke Soal ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
            <span className="nav-strip-progress">
              Terjawab: <strong>{answeredCount} / {totalQuestions}</strong>
            </span>
          </div>

          {/* Kartu Pertanyaan Aktif */}
          <article className="question-main-card">
            <div className="q-card-header">
              <div className="q-header-meta">
                <span className="q-sequence">SOAL {currentIdx + 1} DARI {totalQuestions}</span>
                <Badge variant="cyan">{currentQ.category}</Badge>
              </div>
              <button
                type="button"
                className="btn-toggle-hint"
                onClick={toggleHintForCurrent}
              >
                {showHint[currentQ.id] ? 'Tutup Petunjuk' : '💡 Butuh Petunjuk Rumus?'}
              </button>
            </div>

            {/* Kotak Petunjuk jika dibuka */}
            {showHint[currentQ.id] && (
              <div className="hint-callout-box">
                <span className="hint-tag">PETUNJUK KIMIA:</span>
                <p>{currentQ.hint}</p>
              </div>
            )}

            <div className="q-card-body">
              <h3 className="q-text">{currentQ.question}</h3>

              {/* Opsi Pilihan Ganda (A, B, C, D, E) */}
              <div className="options-list" role="radiogroup" aria-label={`Pilihan Jawaban Soal ${currentIdx + 1}`}>
                {currentQ.options.map((opt) => {
                  const isSelected = selectedAnswers[currentQ.id] === opt.id;
                  return (
                    <div
                      key={opt.id}
                      role="radio"
                      aria-checked={isSelected}
                      tabIndex={0}
                      className={`option-choice-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(opt.id)}
                      onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === 'Enter') handleSelectOption(opt.id);
                      }}
                    >
                      <div className="option-letter">{opt.id}</div>
                      <div className="option-text">{opt.text}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Navigasi Bawah Kartu Soal */}
            <div className="q-card-footer">
              <Button
                variant="secondary"
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
              >
                ← Soal Sebelumnya
              </Button>

              {currentIdx < totalQuestions - 1 ? (
                <Button
                  variant="primary"
                  onClick={() => setCurrentIdx((prev) => Math.min(totalQuestions - 1, prev + 1))}
                >
                  Soal Selanjutnya →
                </Button>
              ) : (
                <Button
                  variant="primary"
                  className="btn-submit-quiz"
                  onClick={handleSubmitQuiz}
                >
                  🚀 Kumpulkan & Periksa Hasil Evaluasi
                </Button>
              )}
            </div>
          </article>
        </section>
      )}

      {/* Navigasi Kembali Bawah */}
      <footer className="page-bottom-nav">
        <Button variant="secondary" size="lg" onClick={() => onNavigate('home')}>
          🏠 Kembali ke Beranda
        </Button>
        <Button variant="primary" size="lg" onClick={() => onNavigate('modul-5')}>
          Klaim Sertifikat di Modul 5 →
        </Button>
      </footer>
    </div>
  );
}

