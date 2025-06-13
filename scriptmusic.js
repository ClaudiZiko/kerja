// Music Player Logic
let audioPlayer = document.getElementById("audioPlayer");
let isPlaying = false;
let currentSongIndex = -1; // Untuk melacak lagu yang sedang diputar

// Playlist lagu
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

// Fungsi untuk toggle play/pause
function togglePause() {
  const playPauseBtn = document.getElementById("playPauseBtn");
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    playPauseBtn.textContent = "▶️ Play";
  } else {
    // Jika belum ada lagu yang dipilih, putar lagu pertama
    if (currentSongIndex === -1) {
      playSong(0);
    } else {
      audioPlayer.play().then(() => {
        isPlaying = true;
        playPauseBtn.textContent = "⏸ Pause";
      }).catch(error => {
        console.log("Autoplay Blocked or other error: ", error);
        // Mungkin tampilkan pesan ke pengguna jika autoplay diblokir
        alert("Pemutaran otomatis diblokir oleh browser. Silakan klik 'Play' untuk memulai.");
      });
    }
  }
}

// Memuat playlist ke DOM
function loadPlaylist() {
  const playlistContainer = document.getElementById("playlist");
  playlistContainer.innerHTML = ""; // Bersihkan daftar sebelum menambah
  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.dataset.index = index; // Simpan indeks sebagai data attribute
    li.addEventListener("click", () => playSong(index)); // Gunakan addEventListener
    playlistContainer.appendChild(li);
  });
}

// Fungsi untuk memainkan lagu
function playSong(index) {
  const playPauseBtn = document.getElementById("playPauseBtn");

  // Hapus kelas 'active-song' dari semua item playlist sebelumnya
  const playlistItems = document.querySelectorAll(".playlist li");
  playlistItems.forEach(item => {
    item.classList.remove("active-song");
  });

  if (currentSongIndex === index && isPlaying) {
    // Jika lagu yang sama sudah dimainkan dan sedang aktif, cukup toggle pause
    togglePause();
    return; // Keluar dari fungsi
  } else if (currentSongIndex === index && !isPlaying) {
    // Jika lagu yang sama dipilih tapi sedang dijeda, lanjutkan putar
    audioPlayer.play().then(() => {
      isPlaying = true;
      playPauseBtn.textContent = "⏸ Pause";
      playlistItems[index].classList.add("active-song"); // Tandai sebagai aktif
    }).catch(error => {
      console.log("Autoplay Blocked or other error: ", error);
      alert("Pemutaran otomatis diblokir oleh browser. Silakan klik 'Play' untuk memulai.");
    });
    return; // Keluar dari fungsi
  }

  // Jika lagu yang berbeda atau lagu yang sama tetapi belum dimainkan/baru dipilih
  currentSongIndex = index;
  audioPlayer.src = playlist[currentSongIndex].src;

  // Pastikan audio dimuat ulang sebelum dimainkan
  audioPlayer.load();

  // Mulai pemutaran lagu
  audioPlayer.play().then(() => {
    isPlaying = true;
    playPauseBtn.textContent = "⏸ Pause";
    playlistItems[currentSongIndex].classList.add("active-song"); // Tandai sebagai aktif
  }).catch(error => {
    console.log("Autoplay Blocked or other error: ", error);
    alert("Pemutaran otomatis diblokir oleh browser. Silakan klik 'Play' untuk memulai.");
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
    // Atau jika ingin berhenti setelah playlist selesai:
    // isPlaying = false;
    // document.getElementById("playPauseBtn").textContent = "▶️ Play";
    // currentSongIndex = -1; // Reset index
  }
});

// Panggil fungsi loadPlaylist saat halaman dimuat
document.addEventListener("DOMContentLoaded", loadPlaylist);
document.getElementById("playPauseBtn").addEventListener("click", togglePause); // Event listener untuk tombol

// Slideshow Logic
let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1} // Kembali ke slide pertama jika sudah mencapai akhir
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Ganti gambar setiap 5 detik
}

// Jalankan slideshow saat halaman dimuat
showSlides();
