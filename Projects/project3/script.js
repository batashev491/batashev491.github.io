const video = document.getElementById('video-player');
const infoBox = document.getElementById('info-box');
const infoImage = document.getElementById('info-image');
const background = document.getElementById('background');
const descriptionBox = document.getElementById('description-box');
const playPauseButton = document.querySelector('.play-pause');
const muteButton = document.querySelector('.mute');
const volumeSlider = document.querySelector('.volume-slider');
const progressContainer = document.querySelector('.progress-container');
const progressBar = document.querySelector('.progress-bar');

// State flags
let infoBoxShown = false;
let infoImageShown = false;
let colorChangeInProgress = false;
let colorChangeDone = false;
let iframeOpened = false;

// Scene descriptions
const sceneDescriptions = {
    0: "Author of the music: Eve",
    5: "Animation: Yoneyama Mai",
    10: "YOKU",
    15: "Compositor / VFX : tyao",
    20: "Background Art : Ozaki Imari",
    25: "YOKU effect Animation : Inaba Hideki",
    30: "Please enjoy the video"
};

// API Functions
async function getRandomColor() {
    try {
        const response = await fetch('https://www.colr.org/json/color/random');
        const data = await response.json();
        return '#' + data.colors[0].hex;
    } catch (error) {
        console.error('Error fetching color:', error);
        // Fallback to local random color generation
        return `hsl(${Math.random() * 360}, 70%, 50%)`;
    }
}

async function getRandomDescription() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        return data.content;
    } catch (error) {
        console.error('Error fetching description:', error);
        return 'Default video description';
    }
}

// Video Controls
playPauseButton.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playPauseButton.textContent = 'Pause';
    } else {
        video.pause();
        playPauseButton.textContent = 'Play';
    }
});

muteButton.addEventListener('click', () => {
    if (video.muted) {
        video.muted = false;
        muteButton.textContent = 'Mute';
        volumeSlider.value = video.volume;
    } else {
        video.muted = true;
        muteButton.textContent = 'Unmute';
        volumeSlider.value = 0;
    }
});

volumeSlider.addEventListener('input', (e) => {
    const volume = e.target.value;
    video.volume = volume;
    video.muted = volume === 0;
    muteButton.textContent = volume === 0 ? 'Unmute' : 'Mute';
});

// Progress Bar
progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / progressContainer.offsetWidth;
    video.currentTime = pos * video.duration;
});

progressContainer.addEventListener('mousedown', function(e) {
    const scrub = (e) => {
        const rect = progressContainer.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / progressContainer.offsetWidth;
        video.currentTime = pos * video.duration;
    }
    
    window.addEventListener('mousemove', scrub);
    window.addEventListener('mouseup', () => {
        window.removeEventListener('mousemove', scrub);
    });
});

// Video Event Listeners
video.addEventListener('play', () => {
    playPauseButton.textContent = 'Pause';
    background.classList.add('playing');
});

video.addEventListener('pause', () => {
    playPauseButton.textContent = 'Play';
    background.classList.remove('playing');
});

video.addEventListener('timeupdate', async () => {
    const currentTime = Math.floor(video.currentTime);
    updateProgress(currentTime);

    // Update scene description
    if (sceneDescriptions[currentTime]) {
        updateSceneDescription(sceneDescriptions[currentTime]);
    }

    // Time-based triggers with exact second matching
    if (currentTime === 5 && !infoBoxShown) {
        const description = await getRandomDescription();
        infoBox.innerHTML = `<h3>Video Description</h3><p>${description}</p>`;
        infoBox.classList.add('visible');
        addAnimation(infoBox, 'fade-in');
        infoBoxShown = true;
    }

    if (currentTime === 10 && !infoImageShown) {
        infoImage.classList.add('visible');
        addAnimation(infoImage, 'slide-in');
        infoImageShown = true;
    }

    // Color change at exactly 15 seconds
    if (currentTime === 15 && !colorChangeDone && !colorChangeInProgress) {
        colorChangeInProgress = true;
        try {
            const newColor = await getRandomColor();
            animateBackgroundColor(background, newColor);
            colorChangeDone = true;
        } finally {
            colorChangeInProgress = false;
        }
    }

    if (currentTime === 20 && !iframeOpened) {
        openPageInIframe('https://en.wikipedia.org/wiki/Monochrome');
        iframeOpened = true;
    }
});

video.addEventListener('seeking', () => {
    const currentTime = Math.floor(video.currentTime);
    
    if (currentTime < 5) {
        infoBoxShown = false;
        infoBox.classList.remove('visible');
    }
    if (currentTime < 10) {
        infoImageShown = false;
        infoImage.classList.remove('visible');
    }
    if (currentTime < 15) {
        colorChangeDone = false;
        colorChangeInProgress = false;
        background.style.backgroundColor = 'lightblue';
    }
    if (currentTime < 20) {
        iframeOpened = false;
    }
});

// Helper Functions
function updateProgress(currentTime) {
    const progress = (currentTime / video.duration) * 100;
    progressBar.style.width = `${progress}%`;
    
    const currentMinutes = Math.floor(currentTime / 60);
    const currentSeconds = Math.floor(currentTime % 60);
    const totalMinutes = Math.floor(video.duration / 60);
    const totalSeconds = Math.floor(video.duration % 60);
    
    const timeDisplay = document.querySelector('.time-display');
    timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
}

function updateSceneDescription(sceneText) {
    descriptionBox.innerHTML = `
        <h3>Current Scene</h3>
        <p>${sceneText}</p>
    `;
    descriptionBox.classList.add('visible');
}

function addAnimation(element, animationClass) {
    element.classList.remove(animationClass);
    void element.offsetWidth;
    element.classList.add(animationClass);
}

function animateBackgroundColor(element, color) {
    element.style.transition = 'background-color 0.5s ease';
    element.style.backgroundColor = color;
}

function openPageInIframe(url) {
    const iframe = document.getElementById("contentIframe");
    iframe.src = url;
}

function resetUI() {
    infoBox.classList.remove('visible');
    infoImage.classList.remove('visible');
    descriptionBox.classList.remove('visible');
    background.style.backgroundColor = 'lightblue';
    progressBar.style.width = '0%';
    
    infoBoxShown = false;
    infoImageShown = false;
    colorChangeDone = false;
    colorChangeInProgress = false;
    iframeOpened = false;
}

// Mobile Support
function isMobile() {
    return window.innerWidth <= 768;
}

if (isMobile()) {
    setupMobileUI();
}

function setupMobileUI() {
    video.addEventListener('touchstart', handleMobileTouch);
}

function handleMobileTouch(event) {
    event.preventDefault();
}

// Reset UI when video ends
video.addEventListener('ended', resetUI);