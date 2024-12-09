document.addEventListener("DOMContentLoaded", () => {
  // Get references to the audio and video players
  const audioPlayer = document.getElementById("audio-player");
  const videoPlayer = document.getElementById("video-player");

  // Get references to the source elements for audio and video
  const audioSource = document.getElementById("audio-source");
  const videoSource = document.getElementById("video-source");
  
  // Get reference to the track (captions) element
  const videoTrack = document.getElementById("video-track");

  // Button to switch audio tracks
  const switchAudioBtn = document.getElementById("switch-audio");
  let isAudio1 = true; // Variable to toggle between audio 1 and audio 2
  switchAudioBtn.addEventListener("click", () => {
    if (isAudio1) {
      audioSource.src = "audio/audio2.mp3"; // Switch to audio 2
      isAudio1 = false;
    } else {
      audioSource.src = "audio/audio1.mp3"; // Switch to audio 1
      isAudio1 = true;
    }
    audioPlayer.load(); // Reload the audio player with the new source
    audioPlayer.play(); // Optionally, play the new audio immediately
  });

  // Button to switch video tracks and captions
  const switchVideoBtn = document.getElementById("switch-video");
  let isVideo1 = true; // Variable to toggle between video 1 and video 2
  switchVideoBtn.addEventListener("click", () => {
    if (isVideo1) {
      // Switch to video 2 and captions
      videoSource.src = "video/video2.mp4"; // Switch to video 2
      videoTrack.src = "video/captions2.vtt"; // Switch to captions 2
      isVideo1 = false;
    } else {
      // Switch to video 1 and captions
      videoSource.src = "video/video1.mp4"; // Switch to video 1
      videoTrack.src = "video/captions1.vtt"; // Switch to captions 1
      isVideo1 = true;
    }
    
    // Reload the video player and captions
    videoPlayer.load(); // Reload the video player with the new source
    videoPlayer.play(); // Optionally, play the new video immediately
  });

  // Play/Pause toggle
  const playPauseBtn = document.getElementById("play-pause-btn");
  playPauseBtn.addEventListener("click", () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playPauseBtn.innerText = "Pause";
    } else {
      videoPlayer.pause();
      playPauseBtn.innerText = "Play";
    }
  });

  // Slow Speed
  const slowSpeedBtn = document.getElementById("slow-speed-btn");
  slowSpeedBtn.addEventListener("click", () => {
    videoPlayer.playbackRate = 0.5; // Half the normal speed
  });

  // Normal Speed
  const normalSpeedBtn = document.getElementById("normal-speed-btn");
  normalSpeedBtn.addEventListener("click", () => {
    videoPlayer.playbackRate = 1; // Reset to normal speed
  });

  // Fast Speed
  const fastSpeedBtn = document.getElementById("fast-speed-btn");
  fastSpeedBtn.addEventListener("click", () => {
    videoPlayer.playbackRate = 2; // Double the normal speed
  });

  // Fast Forward
  const fastForwardBtn = document.getElementById("fast-forward-btn");
  fastForwardBtn.addEventListener("click", () => {
    videoPlayer.currentTime += 10; // Skip 10 seconds
  });

  // Update the seek bar as the video plays
  const seekBar = document.getElementById("seek-bar");
  videoPlayer.addEventListener("timeupdate", () => {
    const progress = (videoPlayer.currentTime / videoPlayer.duration) * 100;
    seekBar.value = progress;
  });

  // Seek to a specific time in the video
  seekBar.addEventListener("input", () => {
    const seekTime = (seekBar.value / 100) * videoPlayer.duration;
    videoPlayer.currentTime = seekTime;
  });
});
