/**
 * @file TracksTable.jsx
 * @description A table of tracks that will be displayed in the TracksView
 * component.
 */

import React, { useState, useEffect } from 'react';

import {
    Typography, Paper, IconButton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box,
} from '@mui/material';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import { PlayCircle } from '@mui/icons-material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

import { setTracks, get_tracks_by_album } from '../../../actions';


/**
 * Styles to be applied to the buttons in the audio player.
 * @param {string} buttonContent The content to be displayed in the tooltip.
 * @returns A style object to be applied to the button.
 * @todo This should be achieved via style and theme ?
 * MyIconButton = styled(IconButton)(...); ?
 */
const playerButtonStyle = (buttonContent) => ({
    '&:hover::after': {
        content: buttonContent,
        display: 'block',
        position: 'absolute',
        bottom: '100%',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '1px',
        backgroundColor: SECONDARY_COLOR,
        color: QUATERNARY_COLOR,
        borderRadius: 10,
        fontSize: '14px',
        fontWeight: 'bold',
    },
    '&::after': {
        content: '""',
        display: 'none',
    },
});


/**
 * A play button that will play the audio when clicked.
 * @param {function} props.playAudio callback function to play audio.
 * @returns A Play IconButton Component with an onClick handler to play audio.
 */
function PlayButton(props) {
    const { playAudio } = props;

    return (
        <IconButton aria-label='play button'
            onClick={playAudio}
            sx={{ ...playerButtonStyle(`"play"`) }}
            size='med'
        >
            <PlayCircle
                fontSize='inherit'
                sx={{
                    color: QUATERNARY_COLOR,
                    '&:hover': {
                        color: TERTIARY_COLOR,
                        content: `"pause"`,
                    },
                }}
            />
        </IconButton>
    );
}


/**
 * A pause button that will pause the audio when clicked.
 * @param {function} props.pauseAudio callback function to pause audio.
 * @returns A Pause IconButton Component with an onClick handler to pause audio.
 */
function PauseButton(props) {
    const { pauseAudio } = props;

    return (
        <IconButton aria-label='pause button'
            onClick={pauseAudio}
            sx={{ ...playerButtonStyle(`"pause"`) }}
            size='large'
        >
            <PauseCircleIcon
                fontSize='inherit'
                sx={{ color: QUATERNARY_COLOR }}
            />
        </IconButton>
    );
}


/**
 * A play button that will either play or pause the audio when clicked.
 * @param {function} props.playOrPauseAudio callback function to play or
 * pause the audio.
 * @param {boolean} props.paused whether the audio is paused or not.
 * @returns A Play IconButton or Pause IconButton Component with an 
 * onClick handler to play or pause the audio
 */
function PlayOrPauseButton(props) {
    const { playOrPauseAudio, paused } = props;

    return (
        paused ? (
            <IconButton aria-label='play button'
                onClick={playOrPauseAudio}
                sx={{ ...playerButtonStyle(`"play"`) }
                }
                size='large'
            >
                <PlayCircle
                    fontSize='inherit'
                    sx={{
                        color: QUATERNARY_COLOR,
                        '&:hover': {
                            color: TERTIARY_COLOR,
                            content: `"pause"`,
                        },
                    }}
                />
            </IconButton >
        ) : (
            <IconButton aria-label='pause button'
                onClick={playOrPauseAudio}
                sx={{ ...playerButtonStyle(`"pause"`) }}
                size='large'
            >
                <PauseCircleIcon
                    fontSize='inherit'
                    sx={{ color: QUATERNARY_COLOR }}
                />
            </IconButton>
        )
    );
}

/**
 * A component that will display the index of the track in the table
 * or a play or pause button if hovered over.
 * @param {Number} props.idx The index of the track in the table.
 * @returns {JSX.Element} Button (play/pause) or index of the track.
 */
function TrackIndicator(props) {
    const { idx, onClickCallBack } = props;
    // const { idx, hovered } = props;

    const [hovered, setHovered] = useState(false);

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                width: 40,
                height: 40,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {hovered ? (
                <PlayOrPauseButton
                    playOrPauseAudio={onClickCallBack}
                    paused={true}
                />
            ) : (
                <Typography component='div' variant='h7'
                    sx={{ color: TERTIARY_COLOR }}
                >
                    {idx + 1}
                </Typography>
            )}
        </Box>
    );
}


/**
 * Returns a table of tracks of the form:
 * | TrackIndicator | track title | artist | album | Duration | options |
 * @param {Object} props.tracks The tracks to be displayed.
 * @param {Function} props.dispatch The dispatch function to be used
 * to set the tracks.
 * @returns {JSX.Element} A table of tracks.
 */
export default function TracksTable(props) {
    const {
        tracks, dispatch,
        albumID, artists,
    } = props;

    useEffect(() => {
        async function getAllTracks() {
            dispatch(setTracks());
        }

        async function getTracksByAlbum() {
            dispatch(get_tracks_by_album(albumID, artists));
        }

        albumID ? getTracksByAlbum() : getAllTracks();
    }, [albumID, artists, dispatch]);

    // useEffect(() => {
    //     async function getTracksByAlbum() {
    //         dispatch(get_tracks_by_album(albumID, artists));
    //     }

    //     getTracksByAlbum();
    // }, [albumID, artists, dispatch]);

    const quickDirtyStyle = { fontWeight: 'bold', color: TERTIARY_COLOR };

    const setQueueHead = (trackID) => {
        console.log('This function can set the head of the queue ?');
    }

    return (
        <TableContainer component={Paper} sx={{ borderRadius: 5 }} >
            <Table aria-label='track table'
                sx={{ width: '100%', height: '100%' }} >
                <TableHead>
                    <TableRow sx={{ backgroundColor: SECONDARY_COLOR }}>
                        <TableCell>
                            {/* <Typography component='div' variant='h6'
                                sx={{ color: TERTIARY_COLOR }} align='center'
                            >
                                #
                            </Typography> */}
                        </TableCell>
                        <TableCell>
                            <Typography component='div' variant='h6'
                                sx={{ color: TERTIARY_COLOR }}
                            >
                                Title
                            </Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography component='div' variant='h6'
                                sx={{ color: TERTIARY_COLOR }}
                            >
                                Artist
                            </Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography component='div' variant='h6'
                                sx={{ color: TERTIARY_COLOR }}
                            >
                                Album
                            </Typography>
                        </TableCell>
                        <TableCell align='right'>
                            <Typography component='div' variant='h6'
                                sx={{ color: TERTIARY_COLOR }}
                            >
                                Duration
                            </Typography>
                        </TableCell>
                        <TableCell align='right' />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tracks?.map((track, idx) => (
                        <TableRow key={idx}
                            // onMouseEnter={() => setHovered(true)}
                            // onMouseLeave={() => setHovered(false)}
                            sx={{ backgroundColor: SECONDARY_COLOR }}
                        >
                            <TableCell>
                                {track.isPlaying ? (
                                    <PauseButton pauseAudio={() => console.log('PAUSE')} />
                                ) : (
                                    // <TrackIndicator idx={idx} onClickCallBack={() => console.log('SET QUEUE HEAD IDX ?')} />
                                    <TrackIndicator idx={idx} onClickCallBack={() => setQueueHead('trackID')} />
                                    // <TrackIndicator idx={idx} hovered={hovered} />
                                )}
                            </TableCell>
                            <TableCell>
                                <Typography component='div' variant='h7'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    {track.title}
                                </Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Typography component='div' variant='h7'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    {track.artist}
                                </Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Typography component='div' variant='h7'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    {track.album}
                                </Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Typography component='div' variant='h7'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    {track.duration}
                                </Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Typography component='div' variant='h6'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    ...
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}
