"use strict";
const musicTitleEl = document.getElementById("music_title");
const playerProgressEl = document.getElementById("player_progress");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current_time");
const durationEl = document.getElementById("duration");
const prevBtnEl = document.getElementById("prev");
const playvBtnEl = document.getElementById("play");
const nextvBtnEl = document.getElementById("next");
const songs = [
  {
    path: "music/Pugkakvse.mp3",
    displayName: "Как все",
  },
  {
    path: "music/Netuteti.mp3",
    displayName: "Если у Вас",
  },
  {
    path: "music/EkipazhSemya.mp3",
    displayName: "Экипаж",
  },
  {
    path: "music/Belpusha.mp3",
    displayName: "Беловежская пуща",
  },
  {
    path: "music/HappyNation.mp3",
    displayName: "Happy Nation",
  },
  {
    path: "music/TheSign.mp3",
    displayName: "The Sign",
  },
  {
    path: "music/AquaBarbie.mp3",
    displayName: "Barbie",
  },
  {
    path: "music/YakiDa.mp3",
    displayName: "Yaki Da",
  },
  {
    path: "music/LoDevoSolo.mp3",
    displayName: "Lo devo solo a te",
  },
  {
    path: "music/Vershina.mp3",
    displayName: "Вершина",
  },
  {
    path: "music/Spasibo.mp3",
    displayName: "Спасибо",
  },
  {
    path: "music/Vseproydet.mp3",
    displayName: "Всё пройдёт",
  },
];
const music = new Audio();
let musicIndex = 0;
let isPlaying = false;
function togglePlay() {
  if (isPlaying) {
    pauseMusic();
  } else {
    playMusic();
  }
}
function playMusic() {
  isPlaying = true;
  playvBtnEl.classList.replace("fa-play", "fa-pause");
  playvBtnEl.setAttribute("title", "pause");
  music.play();
}
function pauseMusic() {
  isPlaying = false;
  playvBtnEl.classList.replace("fa-pause", "fa-play");
  playvBtnEl.setAttribute("pause", "title");
  music.pause();
}
function loadMusic(songs) {
  music.src = songs.path;
  musicTitleEl.textContent = songs.displayName;
}
function changeMusic(direction) {
  musicIndex = musicIndex + direction + (songs.length % songs.length);
  loadMusic(songs[musicIndex]);
  playMusic();
}
function setProgressBar(e) {
  const width = playerProgressEl.clientWidth;
  const xValue = e.offsetX;
  music.currentTime = (xValue / width) * music.duration;
}
function updateProgressBar() {
  const { duration, currentTime } = music;
  const ProgressPercent = (currentTime / duration) * 100;
  progressEl.style.width = `${ProgressPercent}%`;
  const formattime = (timeRanges) =>
    String(Math.floor(timeRanges)).padStart(2, "0");
  durationEl.textContent = `${formattime(duration / 60)} : ${formattime(
    duration % 60,
  )}`;
  currentTimeEl.textContent = `${formattime(currentTime / 60)} : ${formattime(
    currentTime % 60,
  )}`;
}
const btnEvents = () => {
  playvBtnEl.addEventListener("click", togglePlay);
  nextvBtnEl.addEventListener("click", () => changeMusic(1));
  prevBtnEl.addEventListener("click", () => changeMusic(-1));
  music.addEventListener("ended", () => changeMusic(1));
  music.addEventListener("timeupdate", updateProgressBar);
  playerProgressEl.addEventListener("click", setProgressBar);
};
document.addEventListener("DOMContentLoaded", btnEvents);
loadMusic(songs[musicIndex]);

