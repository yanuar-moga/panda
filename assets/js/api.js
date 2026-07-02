/**
 * PANDA (Pemetaan Anak melalui Diagnostik Awal) v1.0
 * File: /assets/js/api.js
 * Deskripsi: Centralized REST API Bridge handler untuk komunikasi frontend ke Google Apps Script backend.
 * Developer: MB
 * Build: 02 Juli 2026
 */

// Konfigurasi Endpoint Tunggal Backend GAS Anda
const PANDA_API_URL = "https://script.google.com/macros/s/AKfycbyxBb9TWQWRLCLCtzYWVdppXO02M8k0jtlkkByjTZI2vai4gxIrb3IXE6-dqCYLFXgRBg/exec";

/**
 * Fungsi Global untuk mengirim data ke Backend Google Apps Script (GAS)
 * @param {string} action Nama tindakan/endpoint (e.g., 'submit_diagnostik', 'get_dashboard_stat')
 * @param {Object} payload Data struktural yang akan dikirim (opsional)
 * @param {string} customPin PIN otentikasi untuk role tertentu (opsional)
 * @param {string} roleKey Nama properti pin backend ('admin_pin', 'guru_pin', 'wk_pin') (opsional)
 * @return {Promise<Object>} Response JSON ter-parsing dari server
 */
async function sendToPandaBackend(action, payload = {}, customPin = "", roleKey = "") {
  // 1. Tampilkan loading spinner modern ala Material Design menggunakan SweetAlert2
  Swal.fire({
    title: 'Memproses Data...',
    text: 'Mohon tunggu sebentar, sistem sedang mengamankan data Anda.',
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  try {
    // 2. Susun struktur data payload standar REST API PANDA
    const requestBody = {
      action: action,
      payload: payload
    };

    // Jika membutuhkan verifikasi PIN (Admin/Guru/Wali Kelas), sisipkan ke objek utama
    if (customPin && roleKey) {
      requestBody[roleKey] = customPin;
    }

    // 3. Eksekusi request menggunakan Fetch API dengan mode CORS 'cors'
    // Catat: Google Apps Script akan merespons dengan HTTP Redirect (302), Fetch API akan mengikutinya secara otomatis.
    const response = await fetch(PANDA_API_URL, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8" 
        // Menggunakan text/plain mencegah browser melakukan preflight OPTIONS request yang sering diblokir GAS
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    // 4. Parsing data JSON hasil respons server
    const responseData = await response.json();

    // 5. Tutup loading spinner setelah data sukses didapatkan
    Swal.close();

    // Berikan peringatan jika status dari internal script bernilai error
    if (responseData.status === "error") {
      Swal.fire({
        icon: 'error',
        title: 'Operasi Gagal',
        text: responseData.message || 'Terjadi kendala pada sistem backend.',
        confirmButtonColor: '#00539C', // Warna Biru SMP
        borderRadius: '16px'
      });
    }

    return responseData;

  } catch (error) {
    console.error("Panda API Bridge Error:", error);
    
    // Tampilkan pesan error jaringan yang ramah pengguna jika server mati/gagal terkoneksi
    Swal.fire({
      icon: 'error',
      title: 'Koneksi Terputus',
      text: 'Gagal terhubung ke server PANDA. Pastikan perangkat Anda online dan silakan coba kembali.',
      confirmButtonColor: '#D32F2F', // Warna Danger
      borderRadius: '16px'
    });

    return { status: "error", message: error.toString() };
  }
}
