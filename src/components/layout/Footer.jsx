/**
 * Footer Component - ChemVerse
 * Penutup halaman yang memuat informasi pedagogis, privasi lokal, dan ketentuan non-komersial.
 */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3 className="footer-title">ChemVerse — Kinetika Kimia SMA</h3>
            <p className="footer-description">
              Platform pembelajaran kimia digital berbasis alur terstruktur (*guided learning journey*) 
              untuk topik Laju Reaksi Kelas 11 SMA. Didesain sesuai Capaian Pembelajaran Fase F Kurikulum Merdeka.
            </p>
          </div>
          <div className="footer-badges">
            <div className="footer-badge-item">
              <span className="badge-dot green"></span>
              <span>100% Client-Side (Data tersimpan di peramban Anda)</span>
            </div>
            <div className="footer-badge-item">
              <span className="badge-dot blue"></span>
              <span>Bebas Akses • Tidak Meminta Identitas Pribadi Siswa</span>
            </div>
            <div className="footer-badge-item">
              <span className="badge-dot purple"></span>
              <span>Bebas Biaya • Tanpa Layanan Berbayar</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 ChemVerse (KinetiLab 11) • Bahan Ajar Digital Pembelajaran Kimia</p>
          <p className="footer-note">
            Tahapan Pengembangan: Beranda Modul 1 Aktif. Kuis/local-first menyusul Bab 3, login/database hasil dan panel satu guru Bab 4–5.
          </p>
        </div>
      </div>
    </footer>
  );
}

