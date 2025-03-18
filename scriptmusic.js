// Music Player Logic
let audioPlayer = document.getElementById("audioPlayer");
let isPlaying = false;
let currentSongIndex = -1; // Untuk melacak lagu yang sedang diputar

// Fungsi untuk toggle play/pause
function togglePause() {
  if (isPlaying) {
    audioPlayer.pause();
    isPlaying = false;
    document.getElementById("playPauseBtn").textContent = "▶️ Play"; // Tombol berubah menjadi Play
  } else {
    // Jika tidak ada lagu yang sedang diputar, pilih lagu pertama atau yang aktif
    if (currentSongIndex === -1) {
      playSong(0);
    } else {
      audioPlayer.play().catch(error => console.log("Autoplay Blocked: ", error));
      isPlaying = true;
      document.getElementById("playPauseBtn").textContent = "⏸ Pause"; // Tombol berubah menjadi Pause
    }
  }
}

// Playlist lagu
const playlist = [
  { title: "Imagination - Shawn Mendes", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Imagination%20-Shawn%20Mendes%20(lyrics).mp3" },
  { title: "Dandelions - Ruth B.", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Ruth%20B.%20-%20Dandelions%20(Lyrics).mp3" },
  { title: "Billie Eilish - BIRDS OF A FEATHER", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Billie%20Eilish%20-%20BIRDS%20OF%20A%20FEATHER.mp3" },
  { title: "Katy Perry - Unconditionally", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Katy%20Perry%20-%20Unconditionally%20(Lyrics).mp3" },
  { title: "Taylor Swift - Enchanted", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Taylor%20Swift%20-%20Enchanted.mp3" },
  { title: "Etham - 12_45 Stripped", src: "https://raw.githubusercontent.com/ClaudiZiko/OnlyMee/ClaudiZikoMyne/Media/Music/Etham%20-%2012_45%20(Stripped%20_%20Lyric%20Video)(MP3_160K).mp3"}
];

// Memuat playlist
function loadPlaylist() {
  const playlistContainer = document.getElementById("playlist");
  playlistContainer.innerHTML = ""; // Bersihkan daftar sebelum menambah
  playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = song.title;
    li.onclick = function() {
      playSong(index);
    };
    playlistContainer.appendChild(li);
  });
}

// Fungsi untuk memainkan lagu
function playSong(index) {
  if (currentSongIndex === index) {
    // Jika lagu yang sama dipilih, toggle play/pause
    togglePause();
  } else {
    // Set source audio dari playlist
    audioPlayer.src = playlist[index].src;

    // Pastikan audio dimuat ulang sebelum dimainkan
    audioPlayer.load();

    // Mulai pemutaran lagu
    audioPlayer.play().catch(error => {
      console.log("Autoplay Blocked: ", error); // Log error jika autoplay diblokir
    });

    // Perbarui status pemutaran
    isPlaying = true;
    currentSongIndex = index;
    document.getElementById("playPauseBtn").textContent = "⏸ Pause"; // Tombol Pause
  }
}

// Memanggil fungsi loadPlaylist saat halaman dimuat
loadPlaylist();

// Cache query unik
playlist.forEach(song => {
  song.src += "?nocache=" + new Date().getTime();
});

// MUAT PLAYLIST SETELAH URL DIPERBAHARUI
loadPlaylist();

// Slideshow Logic
let slideIndex = 0;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 5000); // Ganti gambar setiap 5 detik
}

showSlides(); // Jalankan slideshow saat halaman dimuat