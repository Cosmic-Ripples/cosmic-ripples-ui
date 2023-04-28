/**
 * @file AlbumsView.jsx
 * @description This file contains the AlbumsView component which will
 * draw a grid of album tiles from the Albums component or, if an album
 * is selected, will draw the selected album's songs from the AlbumView
 * component.
 */

import React, { useEffect } from 'react';

import Soren from '../../../api_interface/API_Interface';

import Albums from './AlbumsGrid';
import AlbumView from './AlbumView'

import { setAlbums, setArtists } from '../../../actions';


/**
 * Renders a grid of all albums or a selected album's AlbumView.
 * @param {String} props.selectedAlbum The name of the selected album.
 * @param {Array} props.albums An array of all albums.
 * @param {Array} props.tracks An array of all tracks.
 * @param {Function} props.dispatch The dispatch function.
 * @returns {JSX.Element} A grid of all albums if no album is selected or,
 * if an album is selected, the selected album's AlbumView.
 */
export default function AlbumsView(props) {
    const { selectedAlbum, artists, albums, tracks, dispatch } = props;

    useEffect(() => {

        async function getAlbums() {
            const api = new Soren();

            const artistsJSONString = await api.allArtists();

            // console.log(`artists from the DB ${JSON.stringify(artistsJSONString)}`);
            // console.log(`artistsJSONString.data ${JSON.stringify(artistsJSONString.data)}`);

            dispatch(setArtists(artistsJSONString.data));

            dispatch(setAlbums(artists));
        }

        getAlbums();
    }, [artists, dispatch]);

    const getAlbumName = (albumID) => {
        // console.log(`looking for album: ${albumID} in...`);
        // albums?.forEach((album) => {
        //     console.log(`album: ${album['ID']} ${album['Name']}`);
        // });
        const album = albums?.find((album) => album['ID'] === albumID);
        // console.log(`found album: ${album['Title']}`);
        return album['Title'];
    };

    return (
        selectedAlbum ? (
            <AlbumView albumID={selectedAlbum}
                albumName={getAlbumName(selectedAlbum)}
                artists={artists}
                tracks={tracks}
                dispatch={dispatch}
            />
        ) : (
            <Albums albums={albums} dispatch={dispatch} />
        )
    );
}
