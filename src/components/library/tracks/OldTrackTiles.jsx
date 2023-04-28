/**
 * @file OldTrackTiles.jsx
 * @description Old track tiles that were used in the TracksView component.
 * This approach has been replaced by the MUI Table of tracks.
 */

import React from 'react';

import {
    Box,
    AppBar, Toolbar,
    Typography, IconButton,
} from '@mui/material';

import {
    PlayCircle
} from '@mui/icons-material';

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

function TrackTileContent(props) {
    const {
        title, artist, image,
        album, dateAdded, playtime,
    } = props;

    return (
        <>
            <IconButton aria-label='play track'
                size='large'
                edge='start'
                color='inherit'
                sx={{
                    mr: 2,
                    '&:hover::after': {
                        content: `"play"`,
                        display: 'block',
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '8px',
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
                }}
            >
                <PlayCircle sx={{ color: QUATERNARY_COLOR }} />
            </IconButton>

            <img src={image} alt='TrackTile' loading='lazy' width='8%' />

            <Box sx={{ ml: 1, mr: 5 }} >
                <Typography variant='h7' component='div' noWrap
                    sx={{
                        flexGrow: 1,
                        color: QUATERNARY_COLOR,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </Typography>
                <Typography aria-label='artist' variant='h7' component='div'
                    noWrap
                    onClick={() => { console.log(`clicked ${artist}.`); }}
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
            </Box>

            {/* underline on hover */}
            <Typography aria-label='album' variant='h7' component='div' noWrap
                onClick={() => { console.log(`clicked ${album}.`); }}
                sx={{
                    flexGrow: 1,
                    color: QUATERNARY_COLOR,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    '&:hover': { textDecoration: 'underline' },
                }}
            >
                {album}
            </Typography>
            <Typography variant='h7' component='div' noWrap
                sx={{
                    flexGrow: 1,
                    color: QUATERNARY_COLOR,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {dateAdded}
            </Typography>
            <Typography variant='h7' component='div' noWrap
                sx={{
                    flexGrow: 1,
                    color: QUATERNARY_COLOR,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
            >
                {playtime}
            </Typography>
            <IconButton
                size='large'
                edge='start'
                color='inherit'
                aria-label='options'
                sx={{
                    '&:hover::after': {
                        content: `"options"`,
                        display: 'block',
                        position: 'absolute',
                        bottom: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        padding: '8px',
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
                }}
            >
                <MoreHorizIcon sx={{ color: QUATERNARY_COLOR }} />
            </IconButton >
        </>
    );
}

function TrackTile(props) {
    return (
        <Box
            sx={{
                flexGrow: 1,
                width: '50%',
                height: '7%',
                backgroundColor: SECONDARY_COLOR,
                borderRadius: 10,
                margin: 0.5,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <AppBar position='static'
                sx={{ borderRadius: 10, backgroundColor: PRIMARY_COLOR }}
            >
                <Toolbar
                    sx={{ borderRadius: 10, backgroundColor: SECONDARY_COLOR }}
                >
                    <TrackTileContent {...props} />
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default TrackTile;
