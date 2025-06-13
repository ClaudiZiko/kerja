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

// Helper function untuk memperbarui teks tombol play/pause
function updatePlayPauseButton() {
  const playPauseBtn = document.getElementById("playPauseBtn");
  if (audioPlayer.paused) {
    playPauseBtn.textContent = "▶️ Play";
  } else {
    playPauseBtn.textContent = "⏸ Pause";
  }
}

// Memuat playlist ke DOM (tetap sama)
function loadPlaylist() {
  const playlistContainer = document.getElementById("playlist");
  playlistContainer.innerHTML = "";
  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.dataset.index = index;
    li.addEventListener("click", () => {
      // Jika lagu yang sama diklik dan sedang diputar, jeda.
      // Jika lagu yang sama diklik dan dijeda, lanjutkan.
      // Jika lagu berbeda diklik, putar lagu baru.
      if (currentSongIndex === index) {
        togglePause(); // Gunakan togglePause untuk lagu yang sama
      } else {
        playSong(index); // Putar lagu baru jika berbeda
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

  // Hapus kelas 'active-song' dari semua item playlist sebelumnya
  const playlistItems = document.querySelectorAll(".playlist li");
  playlistItems.forEach(item => {
    item.classList.remove("active-song");
  });
  // Tambahkan kelas 'active-song' ke lagu yang sedang diputar/dimainkan
  if (currentSongIndex !== -1) {
    playlistItems[currentSongIndex].classList.add("active-song");
  }

  // Coba putar audio
  audioPlayer.play().then(() => {
    updatePlayPauseButton(); // Perbarui tombol setelah berhasil play
  }).catch(error => {
    console.log("Autoplay Blocked or other error:", error);
    alert("Pemutaran otomatis diblokir oleh browser. Silakan klik tombol 'Play' utama atau pilih lagu lagi.");
    updatePlayPauseButton(); // Pastikan tombol diperbarui bahkan jika ada error
  });
}

// Fungsi untuk toggle play/pause (hanya jeda/lanjutkan lagu yang sedang diputar)
function togglePause() {
  // Jika belum ada lagu yang dipilih, putar lagu pertama
  if (currentSongIndex === -1 && playlist.length > 0) {
    playSong(0);
    return; // Keluar setelah memanggil playSong
  } else if (currentSongIndex === -1 && playlist.length === 0) {
    console.warn("Tidak ada lagu di playlist untuk diputar.");
    return;
  }

  if (audioPlayer.paused) { // Jika sedang dijeda, mainkan
    audioPlayer.play().catch(error => {
      console.log("Autoplay Blocked or other error:", error);
      alert("Pemutaran otomatis diblokir oleh browser. Silakan klik tombol 'Play' utama atau pilih lagu lagi.");
    });
  } else { // Jika sedang dimainkan, jeda
    audioPlayer.pause();
  }
  updatePlayPauseButton(); // Selalu perbarui tombol setelah aksi
}


// Event listener untuk saat lagu selesai diputar (putar lagu berikutnya)
audioPlayer.addEventListener("ended", () => {
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
audioPlayer.addEventListener('play', updatePlayPauseButton);
audioPlayer.addEventListener('pause', updatePlayPauseButton);
audioPlayer.addEventListener('timeupdate', updatePlayPauseButton); // Optional: Untuk lebih reaktif

// Panggil fungsi loadPlaylist saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    loadPlaylist();
    updatePlayPauseButton(); // Inisialisasi teks tombol saat pertama kali dimuat
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
