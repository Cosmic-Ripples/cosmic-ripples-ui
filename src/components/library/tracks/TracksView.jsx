/**
 * @file TracksView.jsx
 */

import React, { useEffect } from 'react';

import Soren from '../../../api_interface/API_Interface';

import { Box, Stack, IconButton, Typography } from '@mui/material';

import { PlayCircle } from '@mui/icons-material';

import TracksTable from './TracksTable';

import {
    SECONDARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import { setArtists, setTracks } from '../../../actions';

// import TychoImage from '../../../sample_images/tycho.png';



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
            {/* <Stack // Tycho Image
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
                />
            </Stack> */}
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
                    Library Tracks
                </Typography>

                <IconButton aria-label='play all tracks'
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
    const { tracks, setNewQueueAndPlay, dispatch, } = props;


    useEffect(() => {
        const api = new Soren();

        async function getArtists() {
            const artistsJSONString = await api.allArtists();
            dispatch(setArtists(artistsJSONString.data));
            dispatch(setTracks(artistsJSONString.data));
        }

        getArtists();
    }, [dispatch]);


    /**
     * Sets the tracks to all tracks after the selected track and plays the
     * selected track.
     * @param {Number} track_idx - index of the track to play
     * @returns {function} A function!
     */
    function setNewQueueAndPlayCallBack(track_idx) {
        return setNewQueueAndPlay(tracks.slice(track_idx), 0);
    }


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
                <TracksTable
                    tracks={tracks}
                    setNewQueueAndPlayCallBack={setNewQueueAndPlayCallBack}
                    dispatch={dispatch}
                />
            </Box>
        </Box>
    );
}
