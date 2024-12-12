// script.js
const video = document.getElementById('video-player');
const infoBox = document.getElementById('info-box');
const infoImage = document.getElementById('info-image');
const background = document.getElementById('background');
const link = document.getElementById('description-box');

video.addEventListener('timeupdate', () => {
  const currentTime = video.currentTime;

  // Display info box at 5 seconds
  if (currentTime > 5 && currentTime < 6) {
    infoBox.classList.add('visible');
  }

  // Show image at 10 seconds
  if (currentTime > 10 && currentTime < 11) {
    infoImage.classList.add('visible');
  }

  // Change background color at 15 seconds
  if (currentTime > 15 && currentTime < 16) {
    background.style.backgroundColor = '#ff9999';
  }
  if (currentTime > 20 && currentTime < 21) {
    openPageInIframe('https://ru.wikipedia.org/wiki/%D0%97%D0%B2%D1%91%D0%B7%D0%B4%D0%BD%D0%B0%D1%8F_%D0%B2%D0%B5%D0%BB%D0%B8%D1%87%D0%B8%D0%BD%D0%B0');
  }
});

// Reset background and UI on video end
video.addEventListener('ended', () => {
  infoBox.classList.remove('visible');
  infoImage.classList.remove('visible');
  background.style.backgroundColor = 'lightblue';
});

function openPageInIframe(url) {
  const iframe = document.getElementById("contentIframe");
  iframe.src = url;
}
