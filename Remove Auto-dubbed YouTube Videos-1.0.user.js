// ==UserScript==
// @name         Remove Auto-dubbed YouTube Videos
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove YouTube video items with "Auto-dubbed" badges
// @author       https://github.com/rpfilomeno/YouTube-Auto-dubbed-Video-Remover
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==



(function () {
  'use strict';

  // 1. Hide the "Auto-dubbed" visual badge on thumbnails/titles
  const style = document.createElement('style');
  style.textContent = `
        ytd-badge-supported-renderer:has(path[d*="M12 3"]),
        .badge-shape-wiz:has(path[d*="M12 3"]),
        ytd-badge-supported-renderer[aria-label*="Auto-dubbed"],
        .badge-shape-wiz[aria-label*="Auto-dubbed"] {
            display: none !important;
        }
    `;
  document.head.appendChild(style);

  // 2. Automatically select the Original audio track in the player
  function setOriginalAudio() {
    const moviePlayer = document.getElementById('movie_player');
    if (!moviePlayer || typeof moviePlayer.getAvailableAudioTracks !== 'function') return;

    const tracks = moviePlayer.getAvailableAudioTracks();
    if (!tracks || tracks.length === 0) return;

    // Find the original audio track
    const originalTrack = tracks.find(
      track => track.displayName.includes('original') || track.displayName.includes('Original') || track.isDefault
    );

    const currentTrack = moviePlayer.getAudioTrack();

    if (originalTrack && currentTrack && currentTrack.languageCode !== originalTrack.languageCode) {
      moviePlayer.setAudioTrack(originalTrack);
      console.log('[Userscript] Switched audio track to:', originalTrack.displayName);
    }
  }

  // Listen for video page changes & playback starts
  window.addEventListener('yt-navigate-finish', setOriginalAudio);
  document.addEventListener('timeupdate', setOriginalAudio, { once: true });
})();
