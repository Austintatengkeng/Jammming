# Jammming

Jammming is a React-based music playlist creation app that integrates with the Spotify API. Users can search for tracks, preview songs, manage playlists, and save their custom playlists directly to their Spotify account.

---

## Features

1. **Search Tracks**:  
   - Search for songs using the Spotify API.  
   - Filter out songs already added to the current playlist.

2. **Preview Songs**:  
   - Play 30-second previews of tracks (if available).  
   - Pause and play previews seamlessly.

3. **Create and Edit Playlists**:  
   - Add or remove tracks from the playlist.  
   - Rename playlists.  
   - Save playlists to Spotify or update existing ones.

4. **User Playlists**:  
   - Fetch and display the user's existing Spotify playlists.  
   - Edit existing playlists or create new ones.

---

## Prerequisites

- Node.js (version 14 or above)
- A Spotify Developer account and an application registered on the Spotify Developer Dashboard

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/jammming.git
   cd jammming
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up Spotify API credentials:
   - Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard/) and create an application.
   - Copy the Client ID and set up a Redirect URI (e.g., `http://localhost:3000`).
   - Create a `.env` file in the root of the project:
     ```bash
     REACT_APP_SPOTIFY_CLIENT_ID=your-client-id
     REACT_APP_SPOTIFY_REDIRECT_URI=http://localhost:3000
     ```

4. Start the development server:
   ```bash
   npm start
   ```

---

## File Structure

```plaintext
src/
├── App.js                  # Main application component
├── App.css                 # Styles for the app
├── components/             
│   ├── SearchBar/          # Search bar component
│   ├── SearchResults/      # Displays search results
│   ├── Playlist/           # Displays and manages a playlist
│   ├── UserPlaylists/      # Displays user's playlists
│   ├── Track/              # Individual track component
│   ├── Tracklist/          # List of tracks
├── util/
│   └── Spotify.js          # Handles Spotify API interactions
└── resources/
    └── img/                # Static assets for the app
```

---

## Components

### 1. **App**
   - Manages state for search results, playlists, and playback functionality.
   - Coordinates interactions between components.

### 2. **SearchBar**
   - Allows users to search for tracks via the Spotify API.

### 3. **SearchResults**
   - Displays the search results in a list.
   - Allows adding tracks to the playlist.

### 4. **Playlist**
   - Manages the current playlist (name, tracks, and saving to Spotify).

### 5. **UserPlaylist**
   - Fetches and displays the user's Spotify playlists.
   - Allows editing existing playlists.

### 6. **Track**
   - Displays an individual track with options to preview, add, or remove from a playlist.

### 7. **Tracklist**
   - Renders a list of tracks.

---

## Usage

1. **Search Tracks**  
   Enter a search term in the search bar to find songs. Click the "+" button to add a song to the playlist.

2. **Preview Tracks**  
   Click the play button next to a track to listen to a preview.

3. **Create or Edit a Playlist**  
   - Rename your playlist using the input box.  
   - Add or remove tracks as needed.

4. **Save Playlist**  
   Click "Save To Spotify" to save your playlist to your Spotify account.  
   If editing an existing playlist, changes will be applied.

---

## Scripts

- **Start**: Runs the app in development mode.
  ```bash
  npm start
  ```
- **Build**: Builds the app for production.
  ```bash
  npm run build
  ```
- **Test**: Runs unit tests.
  ```bash
  npm test
  ```

---

## API Integration

The app uses the following endpoints from the Spotify API:

1. **Search for Tracks**:  
   Endpoint: `/v1/search`  
   Example Usage:  
   ```javascript
   Spotify.search(term).then(tracks => { ... });
   ```

2. **Get User Playlists**:  
   Endpoint: `/v1/me/playlists`

3. **Get Playlist Items**:  
   Endpoint: `/v1/playlists/{playlist_id}/tracks`

4. **Save Playlist**:  
   Endpoint: `/v1/users/{user_id}/playlists`

5. **Update Playlist**:  
   Endpoint: `/v1/playlists/{playlist_id}`

---

## Contribution

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add new feature'`.
4. Push the branch: `git push origin feature-name`.
5. Submit a pull request.

---
