/**
 * @file ArtistsView.jsx
 * @description This file contains the ArtistsView component which will
 * draw a grid of artist tiles from the Artists component or, if an artist
 * is selected, will draw the selected artist's albums from the ArtistView
 * component.
 */

import React, { useEffect } from 'react';

import Soren from '../../../api_interface/API_Interface';

import ArtistView from './ArtistView';
import ArtistsGrid from './ArtistsGrid';
import AlbumView from '../albums/AlbumView';

import { setArtists, setTracks } from '../../../actions';


/**
 * Renders a grid of all artists or a selected artist's ArtistView.
 * @param {Array} props.artists An array of all artists.
 * @param {Array} props.albums An array of all albums.
 * @param {Array} props.tracks An array of all tracks.
 * @param {String} props.selectedArtist The name of the selected artist.
 * @param {String} props.selectedAlbum The name of the selected album.
 * @param {Function} props.dispatch The dispatch function.
 * @returns {JSX.Element} A grid of all artists if no artist is selected or,
 * if an artist is selected, the selected artist's ArtistView.
 */
export default function ArtistsView(props) {
    const {
        artists,
        albums,
        tracks,
        selectedArtist,
        selectedAlbum,
        dispatch,
    } = props;

    useEffect(() => {
        const api = new Soren();

        async function getArtists() {
            const artistsJSONString = await api.allArtists();

            // console.log(`artists from the DB ${JSON.stringify(artistsJSONString)}`);
            // console.log(`artistsJSONString.data ${JSON.stringify(artistsJSONString.data)}`);

            dispatch(setArtists(artistsJSONString.data));
        }

        getArtists();
    }, [dispatch]);

    useEffect(() => {

        async function getTracks() {
            dispatch(setTracks(artists, selectedArtist));
        }

        getTracks();
    }, [artists, selectedArtist, dispatch]);


    /* More readable? */
    // if (selectedArtist && selectedAlbum) {
    //     return (
    //         <AlbumView albumName={selectedAlbum}
    //             tracks={tracks}
    //             dispatch={dispatch}
    //         />
    //     );
    // }

    // if (selectedArtist) {
    //     return (
    //         <ArtistView artistName={selectedArtist}
    //             albums={albums}
    //             dispatch={dispatch}
    //         />
    //     );
    // } else {
    //     return (
    //         <ArtistsGrid artists={artists}
    //             dispatch={dispatch}
    //         />
    //     );
    // }

    const getArtistName = (artistID) => {
        const artist = artists?.find((artist) => artist['ID'] === artistID);
        return artist['Name'];
    };

    const getAlbumName = (albumID) => {
        const album = albums?.find((album) => album['ID'] === albumID);
        return album['Title'];
    }

    /* Useless RVO? Hip? */
    return (
        selectedArtist ? (
            selectedAlbum ? (
                <AlbumView albumID={selectedAlbum}
                    albumName={getAlbumName(selectedAlbum)}
                    artists={artists}
                    tracks={tracks}
                    dispatch={dispatch}
                />
            ) : (
                <ArtistView
                    artistID={selectedArtist}
                    artistName={getArtistName(selectedArtist)}
                    artists={artists} // idk how I feel about this...
                    albums={albums}
                    dispatch={dispatch}
                />
            )
        ) : (
            <ArtistsGrid
                artists={artists}
                dispatch={dispatch}
            />
        )
    );
}
