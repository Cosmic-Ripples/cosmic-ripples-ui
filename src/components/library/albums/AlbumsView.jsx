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
    const { setNewQueueAndPlay } = props;

    useEffect(() => {
        const checkSanity = false;
        checkSanity && console.log('called useEffect');

        async function getAlbums() {
            checkSanity && console.log('called async getAlbums()');

            const api = new Soren();
            const artistsJSONString = await api.allArtists();
            dispatch(setArtists(artistsJSONString.data));
            dispatch(setAlbums(artistsJSONString.data));
        }

        if (!artists || !albums) {
            getAlbums();
        }
    }, [artists, albums, dispatch]);

    const getAlbumName = (albumID) => {
        const album = albums?.find((album) => album['ID'] === albumID);
        return album.Title;
    };

    return (
        selectedAlbum ? (
            <AlbumView
                albumID={selectedAlbum}
                albumName={getAlbumName(selectedAlbum)}
                artists={artists}
                tracks={tracks}
                dispatch={dispatch}
                setNewQueueAndPlay={setNewQueueAndPlay}
            />
        ) : (
            <Albums albums={albums} dispatch={dispatch} />
        )
    );
}
