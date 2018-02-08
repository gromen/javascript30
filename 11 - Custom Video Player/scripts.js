const player = document.querySelector('.player');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const toggleScreen = player.querySelector('.js-toggleScreen');
const video = player.querySelector('.viewer');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function togglePlay() {
    if (video.paused) {
        video.play();
        // toggle.innerHTML = "&#10074; &#10074;"
    } else {
        video.pause();
        // toggle.innerHTML = "►"
    }
}

function updateButton() {
    const button = this.paused ? '►' : '❚ ❚';
    toggle.textContent = button;
}

function skip() {
    let skip = this.dataset.skip;
    video.currentTime += parseFloat(skip)
}

function handleRange() {
    // Wes Bos way
    // video[this.name] = this.value;

    // My way https://open.spotify.com/track/6lryP8CIvVrxajqk6gTj4R?si=tXAN1BcsRA6_suDw0JGGSQ 😜
    let slider = this.value;

    if (this.name === 'volume') {
        video.volume = parseFloat(slider);
    }

    if (this.name === 'playbackRate') {
        video.playbackRate = parseFloat(slider)
    }
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function progressClick(e) {
    const timeLasts = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = `${timeLasts}`
}

function handleFullScreen(e) {
    if(video.requestFullscreen) {
        video.requestFullscreen();

    }
}

toggleScreen.addEventListener('click', handleFullScreen);
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
// progress.addEventListener('change', handleProgress);

skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRange));
ranges.forEach(range => range.addEventListener('mousemove', handleRange));

let mousedown = false;
progress.addEventListener('click', progressClick);
progress.addEventListener('mousemove', (e) => mousedown && progressClick(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
