<!-- PROJECT LOGO -->
[link-chrome]: https://chromewebstore.google.com/detail/linkedin-feed-cleaner/filpecgdlifajnphchanobkeealliaci "Chrome Web Store"
[link-firefox]: https://addons.mozilla.org/en-US/firefox/addon/youtube-disblock "Firefox Addons"

<br />
<p align="center">
  <a href="github.com/Olivier_Luethy/TackPad.git">
    <img src="logo.png" alt="Logo" width="200" height="200">
  </a>

  <h3 align="center">LinkedIn Distraction Blocker</h3>
  <h4 align="center">Google Chrome extension that removes all the distractions within LinkedIn so you can focus on you.</h4>

  <p align="center">
    Here I'll explain how I developed the application
    <br />
    <a href="github.com/olivierluethy/LinkedIn-Distraction-Blocker/blob/master/README.md"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/olivierluethy/LinkedIn-Distraction-Blocker/">View Demo</a>
    ·
    <a href="https://github.com/olivierluethy/LinkedIn-Distraction-Blocker/issues">Report Bug</a>
    ·
    <a href="https://github.com/olivierluethy/LinkedIn-Distraction-Blocker/issues">Request Feature</a>
  </p>
</p>

## Description

The LinkedIn Distraction Blocker is a Chrome extension designed to enhance your LinkedIn browsing experience by removing unwanted elements from the platform. This extension specifically targets and removes the feed, news section, and various modules, providing a cleaner interface for users who want to focus on essential content.

<div align="center">

[<img src="https://user-images.githubusercontent.com/574142/232173820-eea32262-2b0f-4ec6-8a38-b1c872981d75.png" height="67" alt="Chrome" valign="middle">][link-chrome]
[<img src="https://user-images.githubusercontent.com/574142/232173822-af2e660f-11df-4d6c-a71b-0e92e9be543f.png" height="67" alt="Firefox" valign="middle">][link-firefox]

</div>

## Features

- **Remove Main Feed**: Eliminates the main feed section on the LinkedIn feed page to reduce clutter.
- **Hide News Section**: Automatically removes the news module that can be distracting for users.
- **Clear My Network**: Clears out the "My Network" suggestions for a more streamlined view.
- **Profile Section Management**: Retains essential profile information while removing unnecessary elements from the profile page.

## How It Works

- The extension identifies the current URL and selectively removes specific elements based on the page context:
  - On the **Home Feed** page, it removes the main feed, news section, and footer.
  - On the **My Network** page, it removes suggestion modules.
  - On **Profile** pages, it keeps the essential profile information while removing other sections.

### Code Overview

- **Immediate Removal**: The extension removes unwanted elements as soon as it runs.
- **Dynamic Updates**: It continuously checks for elements every 100 milliseconds, ensuring that even dynamically loaded content is addressed.

## Installation

1. Download the latest version of the extension.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** in the top right corner.
4. Click on **Load unpacked** and select the extension's folder.
5. The extension will now appear in your list of installed extensions.

## Usage

After installation, the LinkedIn Feed Blocker will automatically remove the specified elements, providing you with a cleaner LinkedIn experience.

## Contributing

If you would like to contribute to this project, feel free to fork the repository and submit a pull request.

### Used Links

1. Custom Scrollbar Example
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_custom_scrollbar
<br>

2. CSS Object Overflow Example
https://www.w3schools.com/css/tryit.asp?filename=trycss_overflow_intro
<br>

3. Exmple Prototype Creation for Distraction Table Overview
https://codepen.io/Olibaba02/pen/raBOGwx

## License

This project is licensed under the MIT License. See the LICENSE file for details.