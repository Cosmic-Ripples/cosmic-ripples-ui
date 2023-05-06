/**
 * @file actions.js
 */




/* Drawer actions */


/**
 * Used to toggle the drawer open and closed.
 * @param {boolean} open whether the drawer should be open or closed.
 * @returns {object} the action to be dispatched.
 */
export function toggleDrawer(open) {
    return {
        type: 'TOGGLE_DRAWER',
        payload: {
            open: open,
        }
    };
}


/* metadata endpoint data storing / filtering actions */


/**
 * Sets the tracks state to include all tracks from the provided array of
 * artists.
 * @param {Object} artists An array of artist objects.
 * @returns {Object} An object with an array of tracks as the payload (after
 * adding the track's title, artist, album, and duration to each track object).
 */
export function setTracks(artists) {
    const allTracks = artists?.flatMap(artist =>
        artist['Albums'].flatMap(album =>
            album['Tracks'].map(track => ({
                ...track,
                artist: artist['Name'],
                album: album['Title'],
            }))
        )
    );

    return {
        type: 'SET_TRACKS',
        payload: {
            tracks: allTracks,
        }
    };
}


/**
 * Sets the albums state to include all albums from the provided array of
 * artists.
 * @param {Object} artists An array of artist objects.
 * @returns {Object} An object with an array of albums as the payload (after
 * adding the artist ID and name to each album object).
 */
export function setAlbums(artists) {
    const allAlbums = artists?.flatMap(artist =>
        artist['Albums'].map(album => ({
            ...album,
            'Artist_ID': artist['ID'],
            'Artist_Name': artist['Name'],
        }))
    );

    return {
        type: 'SET_ALBUMS',
        payload: {
            albums: allAlbums,
        }
    };
}


/**
 * Sets the artists state to the provided array of artists.
 * @param {Object} artists An array of artist objects.
 * @returns {Object} An object with the artists as the payload.
 */
export function setArtists(artists) {
    return {
        type: 'ARTISTS/SET_ALL',
        payload: {
            artists: artists,
        }
    };
}


/**
 * Sets the tracks state to include only the tracks from the provided array of
 * artists where the album ID matches the provided album ID.
 * @param {number} albumID The ID of the album whose tracks should be returned.
 * @param {Object} artists An array of artist objects.
 * @returns {Object} An object with an array of tracks as the payload (after
 * adding the track's title, artist, album, and duration to each track object).
 */
export function get_tracks_by_album(albumID, artists) {
    let tracks = [];

    artists?.forEach(artist => {
        artist['Albums'].forEach(album => {
            if (album['ID'] === albumID) {
                album['Tracks'].forEach(track => {
                    tracks.push({
                        ...track,
                        artist: artist['Name'],
                        album: album['Title'],
                    });
                });
            }
        });
    });

    return {
        type: 'GET_TRACKS_BY_ALBUM_ID',
        payload: {
            tracks: tracks,
        }
    };
}


/**
 * Sets the albums state to include only the albums from the provided array of
 * artists where the artist ID matches the provided artist ID.
 * @param {number} artistID The ID of the artist whose albums should be
 * returned.
 * @param {Object} artists An array of artist objects.
 * @returns {Object} An object with an array of albums as the payload.
 */
function get_albums_by_artist(artistID, artists) {
    // const albums = artists.find(a => a['ID'] === artistID)['Albums'];
    const albumsByArtist = artists.find(a => a['ID'] === artistID)['Albums'];

    return {
        type: 'GET_ALBUMS_BY_ARTIST_ID',
        payload: {
            // albums: albums,
            albumsByArtist: albumsByArtist,
        }
    };
}


/* LibraryView actions */


/**
 * Used to set the selected menu item (to display in Main Content).
 * @param {string} selectedMenuItem the name of the menu item that was clicked.
 * @returns {object} an action to be dispatched.
 */
export function click_on_menu_item(selectedMenuItem) {
    return {
        type: 'CLICK_ON_MENU_ITEM',
        payload: {
            selectedMenuItem: selectedMenuItem,
        }
    };
}


/**
 * Used to set the selected album (to display in Album View and Artist View).
 * @param {number} selectedAlbumID the ID of the album that was clicked.
 * @returns {object} the action to be dispatched.
 */
export function click_on_album_grid_item(selectedAlbumID) {
    return {
        type: 'CLICK_ON_ALBUM_GRID_ITEM',
        payload: {
            selectedAlbumID: selectedAlbumID,
        }
    };
}


/**
 * Used to set the selected artist (to display in Artist View).
 * @param {string} title the name of the artist that was clicked on.
 * @returns {object} the action to be dispatched.
 */
export function click_on_artist_grid_item(selectedArtistID) {
    return {
        type: 'CLICK_ON_ARTIST_GRID_ITEM',
        payload: {
            selectedArtistID: selectedArtistID,
        }
    };
}


/**
 * Used to set the selected album to null (to display / revisit Albums View).
 * @returns {object} the action to be dispatched.
 */
export function revisit_albums_view() {
    return {
        type: 'ALBUM_VIEW/CLICK_ON_BACK_BUTTON',
        payload: {
            selectedAlbumID: null,
        }
    };
}


/**
 * Used to set the selected artist to null (to display / revisit Artists View).
 * @returns {object} the action to be dispatched.
 */
export function revisit_artists_view() {
    return {
        type: 'ARTIST_VIEW/CLICK_ON_BACK_BUTTON',
        payload: {
            selectedArtistID: null,
        }
    };
}


/* NOT IMPLEMENTED */


/**
 * Used to set the audio player's audio.
 * @param {Object} audio the audio to be played.
 * @returns {object} the action to be dispatched.
 */
function setAudio(audio) {
    return {
        type: 'SET_AUDIO',
        payload: {
            audio: audio,
        }
    };
}


/** Yes */
function playAudioAction() {
    return {
        type: 'PLAY_AUDIO',
        payload: {
            isPlaying: true,
        }
    };
}


/** Yes */
function pauseAudioAction() {
    return {
        type: 'PAUSE_AUDIO',
        payload: {
            isPlaying: false,
        }
    };
}


/** Artist Name in playback bar track info */
function handleArtistNameClick() {
    return {
        type: 'CLICK_ON_ARTIST_NAME',
        payload: {
            title: null,
        }
    };
}
