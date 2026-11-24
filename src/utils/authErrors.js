/**
 * Menerjemahkan kode galat Firebase ke pesan Bahasa Indonesia yang ramah pengguna
 * @param {any} error
 * @returns {string}
 */
export function getFriendlyErrorMessage(error) {
  if (!error) return '';
  const code = error.code || '';

  switch (code) {
    case 'auth/invalid-email':
      return 'Format alamat email tidak valid. Pastikan penulisan email sudah benar (contoh: siswa@sekolah.sch.id).';
    case 'auth/user-not-found':
      return 'Akun dengan email ini tidak ditemukan. Silakan klik "Daftar Akun Baru" terlebih dahulu.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Kombinasi email atau kata sandi tidak cocok. Silakan periksa kembali.';
    case 'auth/email-already-in-use':
      return 'Alamat email ini sudah terdaftar. Silakan gunakan menu "Masuk" atau reset kata sandi Anda.';
    case 'auth/weak-password':
      return 'Kata sandi terlalu pendek. Gunakan minimal 6 karakter.';
    case 'auth/popup-closed-by-user':
      return 'Jendela masuk Google ditutup sebelum selesai. Silakan coba lagi.';
    case 'auth/popup-blocked':
      return 'Jendela pop-up masuk diblokir oleh peramban. Izinkan pop-up untuk situs ini.';
    case 'auth/operation-not-allowed':
      return 'Layanan autentikasi belum diaktifkan di Firebase Console. Pastikan Sign-in Method (Email/Password & Google) telah diaktifkan.';
    case 'auth/network-request-failed':
      return 'Koneksi internet bermasalah. Periksa jaringan Anda dan coba lagi.';
    default:
      return error.message || 'Terjadi kendala saat proses autentikasi. Silakan coba kembali.';
  }
}

