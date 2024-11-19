# **Jammming Project Documentation**

Jammming is a React-based web application that allows users to search for songs, create playlists, and save them directly to their Spotify accounts using the Spotify Web API. The app focuses on user interaction and provides functionalities such as previewing tracks, managing playlists, and dynamically updating user-created playlists.

---

## **Features**
1. **Search for Songs**:
   - Users can search for tracks using the Spotify API.
   - Displays search results including song name, artist, album, and a preview option.

2. **Create Playlists**:
   - Users can add tracks to a custom playlist.
   - Playlists can be renamed dynamically.

3. **Save Playlists to Spotify**:
   - Allows users to save playlists directly to their Spotify account.

4. **Preview Songs**:
   - Tracks have a preview option, enabling users to listen to a snippet of the song.

5. **Manage Existing Playlists**:
   - Fetches and displays the user's existing playlists.
   - Supports editing existing playlists by adding or removing tracks.

---

## **Technologies Used**
- **Frontend Framework**: React
- **Backend Integration**: Spotify Web API
- **State Management**: React Hooks (`useState`, `useEffect`, `useCallback`, `useRef`)
- **CSS**: Custom styling for user interface design

---

## **File Structure**

### **App.js**
The main component managing:
- Application state.
- Integration with subcomponents like `SearchBar`, `SearchResults`, `Playlist`, and `UserPlaylists`.
- Spotify API interactions.
  
### **Components**
- **SearchBar**:
  - Handles user input for searching songs.
  - Triggers the `search` method from Spotify API.
  
- **SearchResults**:
  - Displays the results of a search query.
  - Integrates with `Tracklist` for individual track actions (add, preview).

- **Playlist**:
  - Allows users to create and manage playlists.
  - Provides functionality to rename playlists and save them to Spotify.

- **Tracklist**:
  - A reusable component for displaying lists of tracks.
  - Includes "add" or "remove" actions and a preview feature.

- **Track**:
  - Represents a single track item.
  - Includes metadata (song name, artist, album, preview).
  - Provides "add to playlist" or "remove from playlist" actions.

- **UserPlaylists**:
  - Displays the user's existing playlists.
  - Allows selection of a playlist for editing.

### **Utilities**
- **Spotify.js**:
  - Handles all interactions with the Spotify Web API.
  - Functions include:
    - Authentication via Spotify OAuth.
    - Searching for tracks.
    - Saving new playlists.
    - Fetching user playlists and playlist items.

---

## **Key Functionalities**

### **Search Songs**
1. **Input**:
   - User inputs a search term in the `SearchBar`.
2. **Process**:
   - `Spotify.search(term)` fetches track data.
   - Results are displayed in `SearchResults`.
3. **Output**:
   - A list of tracks with metadata and actions (add to playlist, preview).

---

### **Create and Save Playlist**
1. **Add Tracks**:
   - Users select tracks from `SearchResults` to add to the `Playlist`.
   - Tracks are stored in the `playlistTracks` state.
   
2. **Rename Playlist**:
   - Users can rename the playlist dynamically.
   
3. **Save to Spotify**:
   - `Spotify.savePlaylist(playlistName, trackUris)` saves the playlist.
   - New playlists or updates to existing playlists are reflected in the user's Spotify account.

---

### **Preview Tracks**
1. **Play/Pause**:
   - Clicking on a track preview button (`onPlay`) toggles playback.
   - Uses an `<audio>` element with a `previewRef` for handling audio.

---

### **Manage User Playlists**
1. **Fetch Playlists**:
   - Fetches existing playlists using `Spotify.getUserPlaylists()`.
2. **Edit Playlist**:
   - Select a playlist to view its tracks.
   - Add or remove tracks, or rename the playlist.

---

## **How It Works**

### **Authentication**
1. When the app loads, it checks for an access token.
2. If no token is present, the app redirects users to Spotify's authorization URL.
3. Spotify redirects back with an access token appended to the URL.

### **Spotify API Calls**
- **Search Tracks**: Fetch tracks based on user input.
- **Save Playlist**: Create or update a playlist in the user’s Spotify account.
- **Fetch Playlists**: Retrieve a list of the user’s existing playlists.
- **Fetch Playlist Items**: Retrieve tracks within a specific playlist.

---

## **Installation and Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/Austintatengkeng/jammming.git
   ```
2. Navigate to the project directory:
   ```bash
   cd jammming
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
5. Open the app in your browser at:
   ```
   http://localhost:3000
   ```

---

## **Configuration**
1. Replace the placeholder `clientId` in `Spotify.js` with your Spotify API Client ID.
2. Update the `redirectUri` with your hosted app URL (e.g., `https://your-app-domain.netlify.app`).

---

## **Known Issues**
- **Rate Limit**:
  - Spotify API imposes rate limits. The app handles retries with exponential backoff for certain endpoints.
- **Preview Unavailability**:
  - Some tracks may not have preview URLs.

---

## **Future Improvements**
- Add support for collaborative playlists.
- Enhance error handling for API failures.
- Implement pagination for search results and playlists.

---

## **Acknowledgments**
This project is based on the Codecademy Jammming project. It was extended with additional features like managing existing playlists and audio previews.
