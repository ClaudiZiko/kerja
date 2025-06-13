// Music Player Logic
let audioPlayer = document.getElementById("audioPlayer");
// Variabel isPlaying tidak lagi se-krusial seperti sebelumnya,
// kita akan lebih banyak mengandalkan audioPlayer.paused
let currentSongIndex = -1;

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

// Helper function untuk memperbarui teks tombol play/pause dan status visual
function updatePlayPauseButton() {
  const playPauseBtn = document.getElementById("playPauseBtn");
  if (audioPlayer.paused) {
    playPauseBtn.textContent = "▶️ Play";
  } else {
    playPauseBtn.textContent = "⏸ Pause";
  }
}

// Fungsi untuk toggle play/pause
function togglePause() {
  if (audioPlayer.paused) { // Jika sedang dijeda, mainkan
    // Jika belum ada lagu yang dipilih, putar lagu pertama
    if (currentSongIndex === -1) {
      playSong(0);
    } else {
      audioPlayer.play().catch(error => {
        console.log("Autoplay Blocked or other error: ", error);
        alert("Pemutaran otomatis diblokir oleh browser. Silakan klik 'Play' pada lagu di daftar.");
      });
    }
  } else { // Jika sedang dimainkan, jeda
    audioPlayer.pause();
  }
  // Panggil fungsi pembaruan tombol setelah aksi
  updatePlayPauseButton();
}

// Memuat playlist ke DOM (tetap sama)
function loadPlaylist() {
  const playlistContainer = document.getElementById("playlist");
  playlistContainer.innerHTML = "";
  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.dataset.index = index;
    li.addEventListener("click", () => playSong(index));
    playlistContainer.appendChild(li);
  });
}

// Fungsi untuk memainkan lagu
function playSong(index) {
  // Hapus kelas 'active-song' dari semua item playlist sebelumnya
  const playlistItems = document.querySelectorAll(".playlist li");
  playlistItems.forEach(item => {
    item.classList.remove("active-song");
  });

  // Jika lagu yang sama diklik DAN sedang dimainkan, toggle pause
  if (currentSongIndex === index && !audioPlayer.paused) {
      audioPlayer.pause();
      updatePlayPauseButton();
      // Tambahkan kelas aktif meskipun dijeda, menunjukkan lagu ini yang aktif
      playlistItems[index].classList.add("active-song");
      return; // Keluar
  }
  // Jika lagu yang sama diklik DAN sedang dijeda, lanjutkan play
  else if (currentSongIndex === index && audioPlayer.paused) {
      audioPlayer.play().catch(error => {
          console.log("Autoplay Blocked or other error: ", error);
          alert("Pemutaran otomatis diblokir oleh browser. Silakan klik 'Play' pada lagu di daftar.");
      });
      updatePlayPauseButton();
      playlistItems[index].classList.add("active-song"); // Tandai sebagai aktif
      return; // Keluar
  }

  // Jika lagu berbeda atau belum dimainkan sama sekali
  currentSongIndex = index;
  audioPlayer.src = playlist[currentSongIndex].src;

  audioPlayer.load(); // Pastikan audio dimuat ulang sebelum dimainkan

  audioPlayer.play().then(() => {
    updatePlayPauseButton(); // Perbarui tombol setelah berhasil play
    playlistItems[currentSongIndex].classList.add("active-song"); // Tandai sebagai aktif
  }).catch(error => {
    console.log("Autoplay Blocked or other error: ", error);
    alert("Pemutaran otomatis diblokir oleh browser. Silakan klik 'Play' pada lagu di daftar.");
    updatePlayPauseButton(); // Pastikan tombol diperbarui bahkan jika ada error
  });
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
    // Jika ingin berhenti setelah playlist selesai:
    // audioPlayer.pause();
    // updatePlayPauseButton();
    // currentSongIndex = -1; // Reset index
    // Hapus kelas active-song dari semua
    // const playlistItems = document.querySelectorAll(".playlist li");
    // playlistItems.forEach(item => item.classList.remove("active-song"));
  }
});

// Event listeners untuk memperbarui tombol secara otomatis jika status audioPlayer berubah
audioPlayer.addEventListener('play', updatePlayPauseButton);
audioPlayer.addEventListener('pause', updatePlayPauseButton);

// Panggil fungsi loadPlaylist saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    loadPlaylist();
    // Inisialisasi teks tombol saat pertama kali dimuat
    updatePlayPauseButton();
});
document.getElementById("playPauseBtn").addEventListener("click", togglePause); // Event listener untuk tombol

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
