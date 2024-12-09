document.addEventListener("DOMContentLoaded", () => {

  const audioPlayer = document.getElementById("audio-player");
  const videoPlayer = document.getElementById("video-player");

  const audioSource = document.getElementById("audio-source");
  const videoSource = document.getElementById("video-source");
  
  const videoTrack = document.getElementById("video-track");

  const switchAudioBtn = document.getElementById("switch-audio");
  let isAudio1 = true; 
  switchAudioBtn.addEventListener("click", () => {
    if (isAudio1) 
    {
      audioSource.src = "audio/audio2.mp3"; 
      isAudio1 = false;
    }

    else 
    {
      audioSource.src = "audio/audio1.mp3"; 
      isAudio1 = true;
    }
    audioPlayer.load(); 
    audioPlayer.play(); 
  });

  const switchVideoBtn = document.getElementById("switch-video");
  let isVideo1 = true;
  switchVideoBtn.addEventListener("click", () => {
    if (isVideo1) {
      videoSource.src = "video/video2.mp4";
      videoTrack.src = "https://batashev491.github.io/Lab/lab5/video/captions2.vtt";
      isVideo1 = false;
    } 

    else 
    {
      videoSource.src = "video/video1.mp4"; 
      videoTrack.src = "https://batashev491.github.io/Lab/lab5/video/captions1.vtt";
      isVideo1 = true;
    }
    
    videoPlayer.load(); 
    videoPlayer.play(); 
  });

  const playPauseBtn = document.getElementById("play-pause-btn");
  playPauseBtn.addEventListener("click", () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playPauseBtn.innerText = "Pause";
    }

    else 
    {
      videoPlayer.pause();
      playPauseBtn.innerText = "Play";
    }
  });

  const slowSpeedBtn = document.getElementById("slow-speed-btn");
  slowSpeedBtn.addEventListener("click", () => {
    videoPlayer.playbackRate = 0.5; 
  });

  const normalSpeedBtn = document.getElementById("normal-speed-btn");
  normalSpeedBtn.addEventListener("click", () => {
    videoPlayer.playbackRate = 1;
  });

  const fastSpeedBtn = document.getElementById("fast-speed-btn");
  fastSpeedBtn.addEventListener("click", () => {
    videoPlayer.playbackRate = 2;
  });

  const fastForwardBtn = document.getElementById("fast-forward-btn");
  fastForwardBtn.addEventListener("click", () => {
    videoPlayer.currentTime += 10;

  const seekBar = document.getElementById("seek-bar");
  videoPlayer.addEventListener("timeupdate", () => {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    seekBar.value = progress;
  });

  seekBar.addEventListener("input", () => {
    const seekTime = (seekBar.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = seekTime;
  });
  })
});
