/**
 * @notes
 * Audio Element:
 * --> https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio
 */

import React from 'react';

import { Box, Stack, Slider, IconButton, Typography } from '@mui/material';

import VolumeUp from '@mui/icons-material/VolumeUp';
import OpenInFullIcon from '@mui/icons-material/OpenInFull';

import {
    PlayOrPauseButton,
    SkipBackButton,
    SkipForwardButton,
    RewindButton,
    FastForwardButton,
    playerButtonStyle,
} from './PlayBackButtons';

import {
    SECONDARY_COLOR, QUATERNARY_COLOR,
} from '../../config/color_palette';

import { getAlbumArt } from '../../config/album_art_paths';


const DEBUG = false;


/* LHS of PlayBar */


/**
 * A component that displays the current track's title, artist, and album cover
 * art.
 * @param {object} props.title the title of the currently playing track.
 * @param {object} props.artist the artist of the currently playing track.
 * @param {object} props.image the album cover art of the currently playing
 * track.
 * @param {function} props.dispatch a function to potentially dispatch a
 * CLICK_ON_ARTIST action to render the Artist View.
 * @returns {JSX.Element}
 * A Stack Component that horizontally displays the cover art
 * followed by a vertical Stack of the track's title and artist.
 */
function CurrentTrackInfo(props) {
    const { title, artist, albumID } = props;

    /* console.log here prevents other views from utilizing console.log */
    // console.log("title: ", title);
    // console.log("artist: ", artist);
    // console.log("albumID: ", albumID);
    // console.log(getAlbumArt(albumID));

    return (
        <Stack aria-label='playbar track info'
            direction='row'
            sx={{
                width: '30%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',

                border: DEBUG ? 1 : 0,
                borderColor: 'yellow',
            }}
        >
            <img
                src={getAlbumArt(albumID)}
                alt='Tycho'
                loading='lazy'
                width='15%'
            />
            <Stack sx={{ ml: 2 }} >
                <Typography aria-label='track title'
                    variant='h7'
                    component='div'
                    noWrap
                    sx={{
                        flexGrow: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: QUATERNARY_COLOR,
                    }}
                >
                    {title}
                </Typography>
                <Typography aria-label='track artist'
                    component='div'
                    variant='h7'
                    noWrap
                    onClick={() => { console.log('TODO: DISPATCH SELECTED ARTIST'); }}
                    sx={{
                        flexGrow: 1,
                        color: QUATERNARY_COLOR,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        '&:hover': { textDecoration: 'underline' },
                    }}
                >
                    {artist}
                </Typography>
            </Stack>
        </Stack>
    );
}


/* MIDDLE of PlayBar */


/**
 * A horizontal Stack of playback control buttons to skip and play/pause audio.
 * @param {function} props.skipBack callback function to skip to the previous
 * track.
 * @param {function} props.skipForward callback function to skip to the next
 * track.
 * @param {function} props.playOrPauseAudio callback function to play or
 * pause the audio.
 * @param {boolean} props.paused whether the audio is paused or not.
 * @param {function} props.skipPlayback callback function that skips the
 * playback of the current track by a given number of seconds.
 * @returns {JSX.Element} A Stack of playback control buttons.
 */
function PlayBackControlButtons(props) {
    const {
        paused,
        playOrPauseAudio,
        skipBack,
        skipForward,
        skipPlayback
    } = props;

    return (
        <Stack aria-label='playback control buttons'
            direction='row' align='auto'
            sx={{
                height: '80%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: DEBUG ? 1 : 0,
                borderColor: 'green',
            }}
        >
            <RewindButton skipPlayback={skipPlayback} />
            <SkipBackButton skipBack={skipBack} />
            <PlayOrPauseButton
                paused={paused}
                playOrPauseAudio={playOrPauseAudio}
            />
            <SkipForwardButton skipForward={skipForward} />
            <FastForwardButton skipPlayback={skipPlayback} />
        </Stack>
    );
}


/**
 * A slider that allows the user to change the current time of the audio.
 * @param {function} props.movePlayPosition callback function to change the
 * current time of the audio.
 * @param {number} props.currentTime the current time of the audio.
 * @param {number} props.duration the duration of the audio.
 */
function PlayHead(props) {
    const { movePlayPosition, currentTime, duration } = props;

    const convertSecondsToTimeString = (timeInSeconds) => {
        return `${Math.floor(timeInSeconds / 60)}:${(timeInSeconds % 60) < 10 ? "0" + (timeInSeconds % 60).toString() : (timeInSeconds % 60).toString()}`;
    }

    return (
        <Stack direction='row' aria-label='playbar playhead container'
            sx={{
                width: '60%',
                height: '20%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

                border: DEBUG ? 1 : 0,
                borderColor: 'green',
            }}
        >
            <Typography variant='h7' component='div'
                sx={{ color: QUATERNARY_COLOR }}
            >
                {convertSecondsToTimeString(Math.floor(currentTime))}
            </Typography>
            <Slider aria-label='playbar playhead scrubber'
                value={currentTime / duration * 100}
                step={0.0000000001}
                min={0}
                max={100}
                onChange={(event) => movePlayPosition(event.target.value)}
                sx={{ width: '100%', color: QUATERNARY_COLOR, margin: 2 }}
            />
            <Typography variant='h7' component='div'
                sx={{ color: QUATERNARY_COLOR }}
            >
                {convertSecondsToTimeString(Math.floor(duration))}
            </Typography>
        </Stack>
    );
}


/**
 * A vertical Stack of Playback Control Buttons and the PlayHead.
 * @param {function} props.playOrPauseAudio callback function to play or pause
 * the audio.
 * @param {boolean} props.paused whether or not the audio is paused.
 * @param {function} props.skipBack callback function to skip the audio
 * backwards.
 * @param {function} props.skipForward callback function to skip the audio
 * forwards.
 * @param {function} props.movePlayPosition callback function to move the
 * position of the playhead.
 * @param {number} props.currentTime the current time of the audio player.
 * @param {number} props.duration the duration of the audio player.
 * @param {function} props.skipPlayback callback function that skips the
 * playback of the current track by a given number of seconds.
 * @returns {JSX.Element}
 * A vertical Stack of Playback Control Buttons and the PlayHead.
 */
function PlayBackControls(props) {
    const {
        paused,
        playOrPauseAudio,
        skipBack,
        skipForward,
        movePlayPosition,
        currentTime,
        duration,
        skipPlayback
    } = props;

    return (
        <Stack aria-label='playback controls'
            sx={{
                width: '40%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                padding: 1,

                border: DEBUG ? 1 : 0,
                borderColor: 'yellow',
            }}
        >
            <PlayBackControlButtons
                playOrPauseAudio={playOrPauseAudio}
                paused={paused}
                skipBack={skipBack}
                skipForward={skipForward}
                skipPlayback={skipPlayback}
            />
            <PlayHead
                movePlayPosition={movePlayPosition}
                currentTime={currentTime}
                duration={duration}
            />
        </Stack>
    );
}


/* RHS of PlayBar */


/**
 * A volume slider that provides a changeVolume function when the slider is
 * moved.
 * @param {number} props.volume the current volume of the audio player.
 * @param {function} props.changeVolume callback function to change the volume
 * of the audio player.
 * @returns {JSX.Element} A Volume Slider Component with an onChange handler
 * to change the volume of the audio player.
 */
function VolumeSlider(props) {
    const { volume, changeVolume } = props;

    return (
        <Stack aria-label='volume slider container'
            direction='row'
            sx={{
                width: '40%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',

                border: DEBUG ? 1 : 0,
                borderColor: 'green',
            }}
        >
            <IconButton aria-label='volume icon'
                sx={{
                    width: '20%',
                    ...playerButtonStyle(`"volume"`),

                    border: DEBUG ? 1 : 0,
                    borderColor: 'green',
                }}
            >
                <VolumeUp sx={{ color: QUATERNARY_COLOR }} />
            </IconButton>
            {/* make it so that the dot only appears when the user is dragging the slider */}
            <Slider aria-label='volume slider'
                onChange={(event) => changeVolume(event.target.value)}
                value={volume}
                size='small'
                sx={{
                    width: '80%',
                    color: QUATERNARY_COLOR,
                    margin: 0.5,
                    '& .MuiSlider-thumb': {
                        visibility: 'hidden',
                    },
                    '&:hover .MuiSlider-thumb': {
                        visibility: 'visible',
                    },

                    border: DEBUG ? 1 : 0,
                    borderColor: 'pink',
                }}
            />
        </Stack>
    );
}


/**
 * The RHS element in the PlayBar, containing the volume slider and the full
 * screen button.
 * @param {number} props.volume the current volume of the audio player.
 * @param {function} props.changeVolume callback function to change the volume
 * of the audio player.
 * @returns {JSX.Element} A horizontal Stack containing the volume slider and
 * the full screen button.
 */
function RightHandSide(props) {
    const { volume, changeVolume } = props;

    return (
        <Stack aria-label='Right Hand Side Element'
            direction='row'
            sx={{
                width: '30%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: 1,

                border: DEBUG ? 1 : 0,
                borderColor: 'yellow',
            }}
        >
            <VolumeSlider changeVolume={changeVolume} volume={volume} />
            <Box
                sx={{
                    width: '10%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    ml: 2,

                    border: DEBUG ? 1 : 0,
                    borderColor: 'green',
                }}
            >
                <IconButton aria-label='full screen'
                    onClick={() => { console.log('enter full screen'); }}
                    sx={{ ...playerButtonStyle(`"full screen"`) }}
                >
                    <OpenInFullIcon fontSize='inherit' sx={{ color: QUATERNARY_COLOR }} />
                </IconButton>
            </Box>
        </Stack>
    );
}


/* PlayBar */


/**
 * Returns the currently player track (image title, artist), playback controls,
 * and the playhead.
 * @param {function} props.playOrPauseAudio callback function to play or
 * pause the audio.
 * @param {function} props.paused whether the audio is paused or not.
 * @param {function} props.changeVolume callback function to change the
 * volume of the audio.
 */
export default function PlayBar(props) {
    const {
        playOrPauseAudio,
        paused,
        changeVolume,
        volume,
        skipBack,
        skipForward,
        movePlayPosition,
        currentTime,
        duration,
        skipPlayback,
        currentTrackInfo
    } = props;

    const title = currentTrackInfo.Title;
    const artist = currentTrackInfo.artist;
    const albumID = currentTrackInfo["Album_ID"];

    return (
        <Stack aria-label='playbar'
            direction='row'
            position={'fixed'}
            bottom={0}
            sx={{
                width: '100%',
                height: '10%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: SECONDARY_COLOR,
                padding: 1,

                border: DEBUG ? 1 : 0,
                borderColor: 'orange',
            }}
        >

            <CurrentTrackInfo title={title} artist={artist} albumID={albumID} />
            <PlayBackControls
                playOrPauseAudio={playOrPauseAudio}
                paused={paused}
                skipBack={skipBack}
                skipForward={skipForward}
                skipPlayback={skipPlayback}
                movePlayPosition={movePlayPosition}
                currentTime={currentTime}
                duration={duration}
            />
            <RightHandSide changeVolume={changeVolume} volume={volume} />
        </Stack >
    );
}