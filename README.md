# LinkedIn Feed Blocker

![Logo](logo.png)

## Description

The LinkedIn Feed Blocker is a Chrome extension designed to enhance your LinkedIn browsing experience by removing unwanted elements from the platform. This extension specifically targets and removes the feed, news section, and various modules, providing a cleaner interface for users who want to focus on essential content.

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

## License

This project is licensed under the MIT License. See the LICENSE file for details.
