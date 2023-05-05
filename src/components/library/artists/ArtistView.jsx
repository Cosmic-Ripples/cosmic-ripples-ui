/**
 * @file ArtistView.jsx
 */

import React, { useEffect } from 'react';

import { Box, Stack, IconButton, Typography } from '@mui/material';

import Soren from '../../../api_interface/API_Interface';

import { PlayCircle } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AlbumsGrid from '../albums/AlbumsGrid';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import {
    setAlbums,
    setArtists,
    revisit_artists_view,
    get_albums_by_artist,
} from '../../../actions';

import TychoImage from '../../../sample_images/tycho.png';
import { getArtistArt } from '../../../config/album_art_paths';

import styled from '@mui/material/styles/styled';


// const ArtistHeader = styled(Stack)(({ theme }) => ({
//     height: '30%',
//     width: '100%',
//     overflow: 'scroll',
//     borderRadius: 5,
//     backgroundColor: SECONDARY_COLOR,
//     display: 'flex',
//     alignItems: 'flex-start',
//     justifyContent: 'flex-end',
//     p: 1,
//     mb: 2,
// }));


const ArtistImage = styled(Box)(({ artistid, theme }) => ({
    width: '20%',
    height: '100%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundImage: `url(${getArtistArt(artistid)})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
}));


function ArtistHeader(props) {
    const { artistID, artistName, dispatch } = props;

    return (
        <Stack direction='row'
            // todo: ArtistHeader = styled(Stack)
            sx={{
                height: '30%',
                width: '100%',
                borderRadius: 5,
                backgroundColor: SECONDARY_COLOR,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-start',
                p: 1,
                mb: 2,
            }}
        >
            <ArtistImage artistid={artistID} />
            <Stack
                sx={{
                    height: '100%',
                    width: '50%',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                }}
            >
                <Stack aria-label='previous/next view buttons'
                    direction='row'
                    sx={{
                        width: '35%',
                        height: '20%',
                        // opacity: 0.9,
                        // borderRadius: 3,
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        backgroundColor: SECONDARY_COLOR,
                    }}
                >
                    <IconButton aria-label='previous view'
                        onClick={() => { dispatch(revisit_artists_view()); }}
                    >
                        <ChevronLeftIcon
                            sx={{ color: TERTIARY_COLOR, fontSize: 40 }}
                        />
                    </IconButton>
                    <IconButton aria-label='next view'
                        onClick={() => { console.log('TODO: go to album view ?'); }}
                    >
                        <ChevronRightIcon
                            sx={{ color: TERTIARY_COLOR, fontSize: 40, }}
                        />
                    </IconButton>
                </Stack>

                <Typography variant='h4'
                    sx={{
                        textAlign: 'left',
                        fontWeight: 'bold',
                        color: QUATERNARY_COLOR,
                    }}
                >
                    {artistName}
                </Typography>

                <IconButton aria-label='play album'
                    onClick={() => { console.log('TODO: play album'); }}
                >
                    <PlayCircle
                        sx={{ color: QUATERNARY_COLOR, fontSize: 40, }}
                    />
                </IconButton>
            </Stack>
        </Stack>
    );
}


export default function ArtistView(props) {
    const { artistID, artistName, artists, dispatch } = props;


    useEffect(() => {
        const checkSanity = false;
        checkSanity && console.log('called useEffect');

        async function getArtists() {
            checkSanity && console.log('called async getAlbums()');

            const api = new Soren();
            const artistsJSONString = await api.allArtists();
            dispatch(setArtists(artistsJSONString.data));
        }

        if (!artists) {
            getArtists();
        }
    }, [artists, dispatch]);

    function getAlbumsByArtist(artistID) { // :(
        // console.log('getAlbumsByArtist');
        const albumsByArtist = artists.find(a => a['ID'] === artistID)['Albums'];
        // albumsByArtist.forEach(album => {
        //     console.log(`album: ${album['Title']}`);
        //     console.table(album);
        // });
        return albumsByArtist;
    }

    return (
        <Box
            sx={{
                height: '95%',
                width: '100%',
                overflow: 'scroll',
                pb: 2,
            }}
        >
            <ArtistHeader
                artistID={artistID}
                artistName={artistName}
                dispatch={dispatch}
            />
            <Box
                sx={{
                    height: '70%',
                    width: '100%',
                    overflow: 'scroll',
                    backgroundColor: PRIMARY_COLOR,
                }}
            >
                <AlbumsGrid
                    artistName={artistName}
                    albums={getAlbumsByArtist(artistID)}
                    dispatch={dispatch}
                />
            </Box>
        </Box>
    );
}
