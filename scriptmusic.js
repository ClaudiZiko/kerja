// Music Player Logic
let audioPlayer = document.getElementById("audioPlayer");
let currentSongIndex = -1; // Untuk melacak lagu yang sedang diputar

// Playlist lagu (tetap sama)
const playlist = [
  { title: "Imagination - Shawn Mendes", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Imagination%20-Shawn%20Mendes%20(lyrics).mp3" },
  { title: "Dandelions - Ruth B.", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Ruth%20B.%20-%20Dandelions%20(Lyrics).mp3" },
  { title: "Billie Eilish - BIRDS OF A FEATHER", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Billie%20Eilish%20-%20BIRDS%20OF%20A%20FEATHER.mp3" },
  { title: "Katy Perry - Unconditionally", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Katy%20Perry%20-%20Unconditionally%20(Lyrics).mp3" },
  { title: "Taylor Swift - Enchanted", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Taylor%20Swift%20-%20Enchanted.mp3" },
  { title: "Etham - 12_45 Stripped", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Etham%20-%2012_45%20(Stripped%20_%20Lyric%20Video)(MP3_160K).mp3"}
];

// Tambahkan parameter nocache ke URL lagu (lakukan sekali di awal)
playlist.forEach(song => {
  song.src += "?nocache=" + new Date().getTime();
});

// Helper function untuk memperbarui teks tombol play/pause dan kelas aktif
function updatePlayerUI() {
  const playPauseBtn = document.getElementById("playPauseBtn");
  const playlistItems = document.querySelectorAll(".playlist li");

  // Perbarui teks tombol Play/Pause
  if (audioPlayer.paused) {
    playPauseBtn.textContent = "▶️ Play";
  } else {
    playPauseBtn.textContent = "⏸ Pause";
  }

  // Perbarui kelas 'active-song' di playlist
  playlistItems.forEach((item, idx) => {
    if (idx === currentSongIndex && !audioPlayer.paused) { // Hanya aktif jika sedang diputar
      item.classList.add("active-song");
    } else {
      item.classList.remove("active-song");
    }
  });
}

// Memuat playlist ke DOM (tetap sama, tapi panggil updatePlayerUI di event click)
function loadPlaylist() {
  const playlistContainer = document.getElementById("playlist");
  playlistContainer.innerHTML = "";
  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.dataset.index = index;
    li.addEventListener("click", () => {
      if (currentSongIndex === index) {
        // Jika lagu yang sama diklik, toggle pause/play
        togglePause();
      } else {
        // Jika lagu berbeda diklik, putar lagu baru
        playSong(index);
      }
    });
    playlistContainer.appendChild(li);
  });
}

// Fungsi utama untuk memainkan lagu (memutar lagu baru atau melanjutkan yang dijeda)
function playSong(index) {
  // Hanya ganti sumber audio jika lagunya berbeda dari yang sedang diputar
  if (currentSongIndex !== index) {
    currentSongIndex = index;
    audioPlayer.src = playlist[currentSongIndex].src;
    audioPlayer.load(); // Memuat ulang audio jika sumber berubah
  }

  // Coba putar audio
  audioPlayer.play().then(() => {
    // Berhasil play
    console.log("Audio started playing.");
    updatePlayerUI(); // Perbarui UI setelah berhasil play
  }).catch(error => {
    // Gagal play (misalnya Autoplay Blocked)
    console.error("Autoplay Blocked or other error:", error);
    alert("Pemutaran otomatis diblokir oleh browser. Silakan klik tombol 'Play' utama atau pilih lagu lagi.");
    audioPlayer.pause(); // Pastikan dalam keadaan pause jika diblokir
    updatePlayerUI(); // Perbarui UI agar tombol menunjukkan Play
  });
}

// Fungsi untuk toggle play/pause (untuk tombol utama)
function togglePause() {
  // Jika belum ada lagu yang dipilih, putar lagu pertama dari playlist
  if (currentSongIndex === -1 && playlist.length > 0) {
    playSong(0);
    return; // Keluar dari fungsi setelah memanggil playSong
  } else if (playlist.length === 0) {
    console.warn("Tidak ada lagu di playlist.");
    alert("Tidak ada lagu di playlist untuk diputar.");
    return;
  }

  if (audioPlayer.paused) { // Jika sedang dijeda, coba mainkan
    audioPlayer.play().then(() => {
        console.log("Audio resumed playing.");
        updatePlayerUI();
    }).catch(error => {
        console.error("Failed to resume playback:", error);
        alert("Tidak dapat melanjutkan pemutaran. Coba klik lagu di daftar.");
        updatePlayerUI(); // Pastikan UI diupdate ke Play jika gagal
    });
  } else { // Jika sedang dimainkan, jeda
    audioPlayer.pause();
    console.log("Audio paused.");
    updatePlayerUI(); // Perbarui UI segera setelah pause
  }
}

// Event listener untuk saat lagu selesai diputar (putar lagu berikutnya)
audioPlayer.addEventListener("ended", () => {
  console.log("Song ended. Playing next...");
  currentSongIndex++;
  if (currentSongIndex < playlist.length) {
    playSong(currentSongIndex);
  } else {
    // Jika sudah di akhir playlist, kembali ke lagu pertama dan mulai lagi (loop)
    currentSongIndex = 0;
    playSong(currentSongIndex);
  }
});

// Event listeners untuk memperbarui tombol secara otomatis jika status audioPlayer berubah
// Ini penting untuk menangani perubahan status dari luar kendali kode (misal: OS, kontrol media)
audioPlayer.addEventListener('play', () => {
    console.log("Audio 'play' event triggered.");
    updatePlayerUI();
});
audioPlayer.addEventListener('pause', () => {
    console.log("Audio 'pause' event triggered.");
    updatePlayerUI();
});
audioPlayer.addEventListener('timeupdate', () => {
    // Ini bisa di uncomment jika updatePlayerUI() tidak memiliki operasi DOM berat
    // Atau bisa digunakan untuk update progress bar jika ada.
    // console.log("Audio 'timeupdate' event triggered.");
    // updatePlayerUI();
});


// Panggil fungsi loadPlaylist saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    loadPlaylist();
    updatePlayerUI(); // Inisialisasi UI saat pertama kali dimuat
});

// Pastikan tombol play/pause memiliki event listener
document.getElementById("playPauseBtn").addEventListener("click", togglePause);


// Slideshow Logic (tetap sama)
let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000);
}

showSlides();
