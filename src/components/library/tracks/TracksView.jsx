/**
 * @file TracksView.jsx
 */

import React, { useEffect, useReducer } from 'react';

import Soren from '../../../api_interface/API_Interface';

import { Box, Stack, IconButton, Typography } from '@mui/material';

import { PlayCircle } from '@mui/icons-material';

import TracksTable from './TracksTable';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import { setArtists, setTracks } from '../../../actions';

import TychoImage from '../../../sample_images/tycho.png';



/**
 * Returns a header for the TracksView.
 * @returns {JSX.Element} A horizontal Stack containing information to be
 * displayed at the top of the TracksView.
 */
function TracksHeader(props) {
    const { setNewQueueAndPlayCallBack } = props;

    return (
        <Stack direction='row'
            // todo: TracksHeader = styled(Stack)
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
                        borderRadius: 5,
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
                    ml: 1,
                }}
            >
                <Typography variant='h4' noWrap
                    sx={{
                        textAlign: 'left',
                        fontWeight: 'bold',
                        color: QUATERNARY_COLOR,
                    }}
                >
                    Yes, these are your tracks.
                </Typography>

                <IconButton aria-label='play album'
                    // onClick={() => { console.log('TODO: play album'); }}
                    onClick={() => { setNewQueueAndPlayCallBack(); }}
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
 * Returns a header and scrollable table of all tracks.
 * @param {Array} props.tracks - array of track objects
 * @param {Function} props.dispatch - dispatch function to update tracks and
 * provide actions to play tracks.
 * @returns {JSX.Element} A box containing a TracksHeader and a TracksTable.
 * 
 * */
export default function TracksView(props) {
    console.log('TracksView');

    const {
        tracks,
        artists,
        dispatch,

        setNewQueueAndPlay,
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
            dispatch(setTracks(artists));
        }

        getTracks();
    }, [artists, dispatch]);

    return (
        <Box sx={{ height: '95%', width: '100%', pb: 2 }} >
            <TracksHeader
                setNewQueueAndPlayCallBack={() => setNewQueueAndPlay(tracks, 0)}
            />
            <Box
                sx={{
                    height: '70%',
                    width: '100%',
                    overflow: 'scroll',
                    borderRadius: 5,
                    backgroundColor: SECONDARY_COLOR,
                }}
            >
                <TracksTable tracks={tracks} dispatch={dispatch} />
            </Box>
        </Box>
    );
}
