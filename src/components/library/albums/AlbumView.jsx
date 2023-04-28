/**
 * @file AlbumView.jsx
 */

import React, { useEffect } from 'react';

import { Box, IconButton, Stack, Typography } from '@mui/material';

import Soren from '../../../api_interface/API_Interface';

import { PlayCircle } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TychoImage from '../../../sample_images/tycho.png';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import TracksTable from '../tracks/TracksTable';

import {
    setArtists, get_tracks_by_album, revisit_albums_view,
} from '../../../actions';


function AlbumHeader(props) {
    const { albumName, dispatch } = props;

    return (
        <Stack direction='row'
            // todo: AlbumHeader = styled(Stack)
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
            <Stack
                sx={{
                    height: '100%',
                    width: '20%',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        overflow: 'hidden',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        backgroundImage: `url(${TychoImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >

                    {/* <img
                        src={TychoImage}
                        alt='album cover'
                        display='inline-block'
                        height='150'
                        width='150'
                    /> */}
                </Box>
            </Stack>
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
                        onClick={() => { dispatch(revisit_albums_view()); }}
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
                    {albumName}
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


/**
 * Returns an AlbumHeader and a TracksTable of tracks in the album.
 * @param {String} props.albumName - name of the album
 * @param {Array} props.tracks - array of tracks in the album
 * @param {Function} props.dispatch - dispatch function to...
 * @returns {JSX.Element} - Box containing AlbumHeader and TracksTable.
 */
export default function AlbumView(props) {
    const { albumName, albumID, artists, tracks, dispatch } = props;

    // useEffect(() => {
    //     const api = new Soren();

    //     async function getArtists() {
    //         const artistsJSONString = await api.allArtists();

    //         dispatch(setArtists(artistsJSONString.data));
    //     }

    //     getArtists();
    // }, [artists, dispatch]);

    // useEffect(() => {
    //     async function getTracks() {
    //         dispatch(get_tracks_by_album(albumID, artists));
    //     }

    //     getTracks();
    // }, [albumID, artists, dispatch]);

    return (
        <Box
            sx={{
                height: '95%',
                width: '100%',
                pb: 4,
            }}
        >
            <AlbumHeader albumName={albumName} dispatch={dispatch} />
            <Box
                sx={{
                    height: '70%',
                    width: '100%',
                    overflow: 'scroll',
                    borderRadius: 5,
                    backgroundColor: SECONDARY_COLOR,
                }}
            >
                <TracksTable tracks={tracks}
                    albumID={albumID}
                    artists={artists}
                    dispatch={dispatch}
                />
            </Box>
        </Box>
    );
}
