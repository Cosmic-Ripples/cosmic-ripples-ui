/**
 * Yes
 */

import React from 'react';

import { IconButton } from '@mui/material';

import PlayCircle from '@mui/icons-material/PlayCircle';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Replay10Icon from '@mui/icons-material/Replay10';
import Forward10Icon from '@mui/icons-material/Forward10';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../config/color_palette';




/**
 * Styles to be applied to the buttons in the audio player.
 * @param {string} buttonContent The content to be displayed in the tooltip.
 * @returns A style object to be applied to the button.
 * @todo This should be achieved via style and theme ?
 * MyIconButton = styled(IconButton)(...); ?
 */
const playerButtonStyle = (textToShow) => ({
    '&:hover::after': {
        content: textToShow,
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
 * A rewind button that provides a rewind function when clicked.
 * @param {function} props.rewindAudio callback function to rewind audio.
 * @returns A Rewind IconButton Component with an onClick handler to rewind the
 * audio by 10 seconds.
 */
function RewindButton(props) {
    const { skipPlayback } = props;
    return (
        <IconButton aria-label='rewind 10 seconds'
            onClick={() => skipPlayback(-10)} size='large' sx={{ ...playerButtonStyle(`"rewind"`) }}
        >
            <Replay10Icon fontSize='inherit' sx={{ color: QUATERNARY_COLOR }} />
        </IconButton>
    );
}


/**
 * A fast forward button that provides a fastForward function when clicked.
 * @param {function} props.fastForward callback function to fast forward audio.
 * @returns A FastForward IconButton Component with an onClick handler to fast
 * forward the audio by 10 seconds.
 */
function FastForwardButton(props) {
    const { skipPlayback } = props;
    return (
        <IconButton aria-label='fast-forward 10 seconds'
            onClick={() => skipPlayback(10)} size='large' sx={{ ...playerButtonStyle(`"ff"`) }}
        >
            <Forward10Icon fontSize='inherit' sx={{ color: QUATERNARY_COLOR }} />
        </IconButton>
    );
}


/**
 * A button to play or pause the audio.
 * @param {function} props.playOrPauseAudio callback function to play or
 * pause the audio.
 * @param {boolean} props.paused whether the audio is paused or not.
 * @returns {JSX.Element} PlayButton if audio is paused, PauseButton else.
 */
function PlayOrPauseButton(props) {
    const { playOrPauseAudio, paused } = props;

    return (
        paused ? (
            <PlayButton playAudio={playOrPauseAudio} />
        ) : (
            <PauseButton pauseAudio={playOrPauseAudio} />
        )
    );
}


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
 * A skip back button that provides a skipBack function when clicked.
 * @param {function} props.skipBack callback function to skip to the previous
 * track.
 * @returns A SkipBack IconButton Component with an onClick handler to skip
 * to the previous track.
 */
function SkipBackButton(props) {
    const { skipBack } = props;
    return (
        <IconButton aria-label='skip back'
            onClick={skipBack} size='large' sx={{ ...playerButtonStyle(`"skip back"`) }}
        >
            <SkipPreviousIcon
                fontSize='inherit'
                sx={{ color: QUATERNARY_COLOR }}
            />
        </IconButton>
    );
}


/**
 * A skip forward button that provides a skipForward function when clicked.
 * @param {function} props.skipForward callback function to skip to the next
 * track.
 * @returns A SkipForward IconButton Component with an onClick handler to skip
 * to the next track.
 */
function SkipForwardButton(props) {
    const { skipForward } = props;
    return (
        <IconButton aria-label='skip forward'
            onClick={skipForward} size='large' sx={{ ...playerButtonStyle(`"skip forward"`) }}
        >
            <SkipNextIcon
                fontSize='inherit'
                sx={{ color: QUATERNARY_COLOR }}
            />
        </IconButton>
    );
}

export {
    playerButtonStyle,

    PlayOrPauseButton,
    PlayButton,
    PauseButton,
    SkipBackButton,
    SkipForwardButton,
    RewindButton,
    FastForwardButton
};
