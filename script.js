document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playButton = document.getElementById('play-button');
    const pauseButton = document.getElementById('pause-button');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');
    const volumeSlider = document.getElementById('volume-slider');
    const progressBar = document.getElementById('progress-bar');
    const progress = document.getElementById('progress');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');
    const trackTitle = document.getElementById('track-title');
    const trackArtist = document.getElementById('track-artist');
    const albumArt = document.getElementById('album-art');

    const playlist = [
        {
            title: "Let it rain",
            artist: "skylark",
            url: "let it rain by skylark.mp3",
            albumArt: "alberm.jpg"
        },
        {
            title: "GUNTUUSE",
            artist: "Skylark & Artin",
            url: "GUNTUUSE.mp3",
            albumArt: "alberm.jpg"
        },
        {
            title: "Ringtone",
            artist: "Skylark & Artin",
            url: "ringtone.mp4",
            albumArt: "alberm.jpg"
        }
    ];

    let currentTrackIndex = 0;

    function loadTrack(index) {
        const track = playlist[index];
        audioPlayer.src = track.url;
        trackTitle.textContent = track.title;
        trackArtist.textContent = track.artist;
        albumArt.src = track.albumArt;
        audioPlayer.load();
    }

    function playTrack() {
        audioPlayer.play();
    }

    function pauseTrack() {
        audioPlayer.pause();
    }

    function nextTrack() {
        currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    function prevTrack() {
        currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        loadTrack(currentTrackIndex);
        playTrack();
    }

    function updateProgress() {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        currentTimeElement.textContent = formatTime(currentTime);
        durationElement.textContent = formatTime(duration);
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }

    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;

        audioPlayer.currentTime = (clickX / width) * duration;
    }

    function adjustVolume() {
        audioPlayer.volume = volumeSlider.value;
    }

    playButton.addEventListener('click', playTrack);
    pauseButton.addEventListener('click', pauseTrack);
    nextButton.addEventListener('click', nextTrack);
    prevButton.addEventListener('click', prevTrack);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', adjustVolume);

    loadTrack(currentTrackIndex);
});
