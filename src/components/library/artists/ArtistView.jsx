/**
 * @file ArtistView.jsx
 */

import React, { useEffect } from 'react';

import { Box, Stack, IconButton, Typography } from '@mui/material';

import { PlayCircle } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import AlbumsGrid from '../albums/AlbumsGrid';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import {
    revisit_artists_view,
    get_albums_by_artist,
} from '../../../actions';

import TychoImage from '../../../sample_images/tycho.png';


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


function ArtistHeader(props) {
    const { artistName, dispatch } = props;

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
    const { artistName, artistID, artists, albums, dispatch } = props;

    useEffect(() => {
        async function getAlbums() {
            dispatch(get_albums_by_artist(artistID, artists));
        }

        getAlbums();
    }, [artistID, artists, dispatch]);

    return (
        <Box
            sx={{
                height: '95%',
                width: '100%',
                overflow: 'scroll',
                pb: 2,
            }}
        >
            <ArtistHeader artistName={artistName} dispatch={dispatch} />
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
                    albums={albums}
                    dispatch={dispatch}
                />
            </Box>
        </Box>
    );
}
