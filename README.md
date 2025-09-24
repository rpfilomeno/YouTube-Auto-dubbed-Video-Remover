
<img width="940" height="783" alt="Auto-Dubbed" src="https://github.com/user-attachments/assets/c3d1945d-1b95-4cdd-8315-bc52c822bf0f" />

# YouTube Auto-dubbed Video Remover

A userscript that automatically removes YouTube videos with "Auto-dubbed" badges from your feed, providing a cleaner viewing experience by filtering out auto-generated dubbed content.

## Features

- 🎯 **Precise Targeting**: Removes videos specifically marked with "Auto-dubbed" badges
- 🔄 **Dynamic Content Support**: Works with YouTube's infinite scroll and AJAX-loaded content
- ⚡ **Real-time Filtering**: Automatically removes videos as they appear on the page
- 🌐 **Universal Coverage**: Works on all YouTube pages (home, search, subscriptions, etc.)
- 🔧 **Zero Configuration**: Install and forget - no setup required

## Installation

### Prerequisites
You'll need a userscript manager browser extension installed:

- **Chrome/Edge**: [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo)
- **Firefox**: [Greasemonkey](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) or [Tampermonkey](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/)
- **Safari**: [Userscripts](https://apps.apple.com/app/userscripts/id1463298887)

### Quick Installation Steps
1. Install a userscript manager from the links above
2. Click the RAW link to auto install: [![Install v1.0](https://img.shields.io/badge/version-1.0-blue)](https://github.com/rpfilomeno/YouTube-Auto-dubbed-Video-Remover/raw/refs/heads/main/Remove%20Auto-dubbed%20YouTube%20Videos-1.0.user.js)
3. Open your userscript manager dashboard and enable the script
4. Visit YouTube - auto-dubbed videos will now be automatically filtered out!

### Manual Installation Steps

1. Install a userscript manager from the links above
2. Copy the userscript code from `Remove Auto-dubbed YouTube Videos-1.0.user.js`
3. Open your userscript manager dashboard
4. Create a new userscript and paste the code
5. Save and enable the script
6. Visit YouTube - auto-dubbed videos will now be automatically filtered out!

## How It Works

The script uses several techniques to ensure comprehensive filtering:

### Core Functionality
- **Element Detection**: Scans for YouTube video containers (`div.style-scope.ytd-rich-item-renderer`)
- **Badge Analysis**: Examines child elements with class `yt-badge-shape__text`
- **Content Matching**: Removes videos where badge text exactly matches "Auto-dubbed"

### Dynamic Content Handling
- **MutationObserver**: Monitors DOM changes to catch dynamically loaded videos
- **Smart Triggering**: Only processes changes when relevant video elements are added
- **Fallback Timer**: Periodic scanning every 2 seconds as a safety net

## Compatibility

- ✅ **YouTube Home Feed**
- ✅ **Search Results**
- ✅ **Subscriptions Page**
- ✅ **Trending Page**
- ✅ **Channel Pages**
- ✅ **Playlist Pages**
- ✅ **Mobile YouTube (desktop browser)**

## Browser Support

- ✅ Chrome/Chromium-based browsers
- ✅ Firefox
- ✅ Safari (with Userscripts extension)
- ✅ Edge

## Performance

The script is designed to be lightweight and efficient:

- **Minimal CPU Usage**: Only activates when new content is detected
- **Memory Efficient**: No persistent storage or large data structures
- **Non-blocking**: Doesn't interfere with YouTube's normal functionality

## Troubleshooting

### Script Not Working?

1. **Check Userscript Manager**: Ensure the script is enabled in your userscript manager
2. **Verify URL Matching**: The script should activate on `https://www.youtube.com/*`
3. **Clear Cache**: Try refreshing YouTube or clearing your browser cache
4. **Console Errors**: Check browser developer tools for any JavaScript errors

### Auto-dubbed Videos Still Showing?

1. **Badge Text Variation**: YouTube may use different text for different languages
2. **New Badge Classes**: YouTube occasionally updates their CSS classes
3. **Timing Issues**: Try refreshing the page if videos appear briefly before being removed

### Performance Issues?

1. **Reduce Scan Frequency**: Increase the interval timer from 2000ms to 5000ms
2. **Browser Resources**: Close unnecessary tabs to free up memory
3. **Extension Conflicts**: Temporarily disable other YouTube-related extensions

## Customization

### Modify Badge Text
To remove videos with different badge text, change line 25:
```javascript
if (badge.textContent.trim() === 'Your Custom Text') {
```

### Adjust Scan Frequency
To change how often the script checks for new videos, modify the last line:
```javascript
setInterval(removeAutoDubbedVideos, 5000); // 5 seconds instead of 2
```

### Target Additional Classes
To remove videos with other CSS classes, modify the selector on line 11:
```javascript
const videoItems = document.querySelectorAll('div.your-custom-class');
```

## Contributing

Found a bug or want to contribute improvements?

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes
4. Test thoroughly on different YouTube pages
5. Submit a pull request

## License

This project is licensed under the CC0 1.0 Universal

## Disclaimer

This userscript is not affiliated with YouTube or Google. It's an independent tool created to enhance user experience. Please feel free to use it at your own discretion.

## Version History

- **v1.0** - Initial release with basic auto-dubbed video filtering
  - DOM scanning functionality
  - MutationObserver for dynamic content
  - Cross-page compatibility

---

**Note**: YouTube frequently updates its interface. If the script stops working, it may need updates to match new CSS classes or page structures.
