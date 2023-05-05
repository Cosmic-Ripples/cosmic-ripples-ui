/**
 * @file TracksTable.jsx
 * @description A table of tracks that will be displayed in the TracksView
 * component.
 */

import React, { useState } from 'react';

import {
    Box, Paper, Typography, IconButton,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
} from '@mui/material';

import { PlayCircle } from '@mui/icons-material';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';

import {
    SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';


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
    const { onClickCallBack, paused } = props;

    return (
        paused ? (
            <IconButton aria-label='play button'
                onClick={() => onClickCallBack()}
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
                onClick={() => console.log('PAUSE')}
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
    // const { hovered } = props;
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
                    onClickCallBack={onClickCallBack}
                    paused={true} // TODO
                />
            ) : (
                <Typography component='div' variant='h7'
                    sx={{ color: TERTIARY_COLOR }}
                >
                    {idx + 1}
                    {/* cool people start from zero */}
                    {/* {idx} */}
                </Typography>
            )}
        </Box>
    );
}


/**
 * Returns a table of tracks of the form:
 * | TrackIndicator | track title | artist | album | Duration | options |
 * @param {Object} props.tracks The tracks to be displayed.
 * @returns {JSX.Element} A table of tracks.
 */
export default function TracksTable(props) {
    // const { tracks, setNewQueueAndPlayCallBack } = props;
    const { tracks, setNewQueueAndPlay } = props;


    const quickDirtyStyle = { fontWeight: 'bold', color: TERTIARY_COLOR };


    function setNewQueueAndPlayCallBack(track_idx) {
        setNewQueueAndPlay(tracks.slice(track_idx), 0);
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
                                    <PauseButton
                                        pauseAudio={() => console.log('PAUSE')} />
                                ) : (
                                    <TrackIndicator
                                        idx={idx}
                                        onClickCallBack={() => setNewQueueAndPlayCallBack(idx)}
                                    // hovered={hovered}
                                    />
                                )}
                            </TableCell>
                            <TableCell>
                                <Typography component='div' variant='h7'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    {track['Title']}
                                </Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Typography component='div' variant='h7'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    {/* TODO: change with new structure from DB
                                    'artist' attribute set in actions.js
                                    within the 'get_tracks_by_album' method
                                    */}
                                    {track.artist}
                                </Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Typography component='div' variant='h7'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    {/* TODO: change with new structure from DB
                                    'album' attribute set in actions.js
                                    within the 'get_tracks_by_album' method
                                    */}
                                    {track.album}
                                </Typography>
                            </TableCell>
                            <TableCell align='right'>
                                <Typography component='div' variant='h7'
                                    sx={{ ...quickDirtyStyle }}
                                >
                                    {track['Length']}
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
