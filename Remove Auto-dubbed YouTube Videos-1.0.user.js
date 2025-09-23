// ==UserScript==
// @name         Remove Auto-dubbed YouTube Videos
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove YouTube video items with "Auto-dubbed" badges
// @author       https://github.com/rpfilomeno/YouTube-Auto-dubbed-Video-Remover
// @match        https://www.youtube.com/*
// @grant        none
// ==/UserScript==

(function() {

    'use strict';
    function removeAutoDubbedVideos() {

        // Find all div elements with the target class
        const videoItems = document.querySelectorAll('div.style-scope.ytd-rich-item-renderer');

        videoItems.forEach(item => {
            // Look for badge elements within this item
            const badges = item.querySelectorAll('.yt-badge-shape__text');

            badges.forEach(badge => {
                // Check if the badge text is "Auto-dubbed"
                if (badge.textContent.trim() === 'Auto-dubbed') {
                    // Remove the entire video item
                    item.remove();
                    console.log("Detected Auto-dubbed video and removed it!!!");
                }
            });
        });
    }

    // Run the function when the page loads
    removeAutoDubbedVideos();

    // Create a MutationObserver to watch for dynamically loaded content
    const observer = new MutationObserver(function(mutations) {
        let shouldCheck = false;

        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if any added nodes contain video items
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) { // Element node
                        if (node.classList && node.classList.contains('ytd-rich-item-renderer') ||
                            node.querySelector && node.querySelector('.style-scope.ytd-rich-item-renderer')) {
                            shouldCheck = true;
                        }
                    }
                });
            }
        });

        if (shouldCheck) {
            // Small delay to ensure content is fully loaded
            setTimeout(removeAutoDubbedVideos, 100);
        }
    });

    // Start observing the document for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Also run periodically as a fallback for any missed content
    setInterval(removeAutoDubbedVideos, 2000);

})();