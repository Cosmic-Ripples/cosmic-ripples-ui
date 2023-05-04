/**
 * @file reducers.js
 * @description there's a lot going on in here...
 */


function initialState() {
    return {
        open: false,

        audio: null,
        isPlaying: false,

        artists: null,
        albums: null,
        albumsByArtist: null,
        tracks: null,

        selectedMenuItem: 'Default View',
        selectedAlbum: null,
        selectedArtist: null,
    };
}

function reducers(state, action) {
    switch (action.type) {

        /* Drawer actions */

        case 'TOGGLE_DRAWER':
            return {
                ...state,
                open: !action.payload.open,
            };

        /* metadata endpoint data storing / filtering actions */

        case 'SET_TRACKS':
            return {
                ...state,
                tracks: action.payload.tracks,
            };
        case 'SET_ALBUMS':
            return {
                ...state,
                albums: action.payload.albums,
            };
        case 'ARTISTS/SET_ALL':
            return {
                ...state,
                artists: action.payload.artists,
            };
        case 'GET_TRACKS_BY_ALBUM_ID':
            return {
                ...state,
                tracks: action.payload.tracks,
            };
        case 'GET_ALBUMS_BY_ARTIST_ID':
            return {
                ...state,
                // albums: action.payload.albums,
                albumsByArtist: action.payload.albumsByArtist,
            };

        /* LibraryView actions */

        case 'CLICK_ON_MENU_ITEM':
            return {
                ...state,
                selectedMenuItem: action.payload.selectedMenuItem,
                selectedAlbum: null,
                selectedArtist: null,
            };
        case 'CLICK_ON_ALBUM_GRID_ITEM':
            return {
                ...state,
                selectedAlbum: action.payload.selectedAlbumID,
            };
        case 'CLICK_ON_ARTIST_GRID_ITEM':
            return {
                ...state,
                selectedArtist: action.payload.selectedArtistID,
            };
        case 'ALBUM_VIEW/CLICK_ON_BACK_BUTTON':
            return {
                ...state,
                selectedAlbum: action.payload.selectedAlbumID,
            };
        case 'ARTIST_VIEW/CLICK_ON_BACK_BUTTON':
            return {
                ...state,
                selectedArtist: action.payload.selectedArtistID,
            };

        default:
            return state;
    }
}

export { initialState, reducers };
