import React from 'react';

import {
    Box, Stack, Grid, Typography,
} from '@mui/material';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import { handleSelectedArtist } from '../../../actions';

import TychoImage from '../../../sample_images/tycho.png';


const ALBUM_TILE_SIZE = 250; /* tmp */


/**
 * Renders a tile for an artist.
 * @param {string} props.artistName The name of the artist.
 * @param {function} props.dispatch The dispatch function from the useReducer
 * hook.
 * @returns {JSX.Element} A tile for an artist.
 */
function ArtistTile(props) {
    const { artistName, dispatch } = props;

    return (
        <Stack aria-label='artist tile'
            onClick={() => dispatch(handleSelectedArtist(artistName))}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: 5,
                backgroundColor: SECONDARY_COLOR,
                cursor: 'pointer',
            }}
        >
            <Box
                sx={{
                    width: '200px',
                    height: '200px',
                    // width: '70%',
                    // height: '70%',
                    overflow: 'hidden',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 2,
                }}
            >
                <img
                    src='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
                    alt='green iguana'
                />
                {/* <img
                    src={TychoImage}
                    alt="Tycho"
                    width='100%'
                    height='auto'
                /> */}
            </Box>
            <Typography component='div' variant='h4' noWrap
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 'bold',
                    width: '100%',
                    color: QUATERNARY_COLOR
                }}
            >
                {artistName}
            </Typography>
        </Stack>
    );
}


/**
 * Renders a grid of the input artists.
 * @param {object} props.artists The artists state from the reducer.
 * @param {function} props.dispatch The dispatch function from the useReducer hook.
 * @returns {JSX.Element} A grid of artist tiles.
 */
export default function ArtistsGrid(props) {
    const { artists, dispatch } = props;

    return (
        <Box
            sx={{
                height: '95%',
                width: '100%',
                overflow: 'scroll',
                pb: 2,
            }}
        >
            <Grid container columns={6} spacing={2} >
                {artists?.map((artist, idx) => (
                    <Grid item
                        key={idx}
                        xs={8} sm={4} md={2} lg={2} xl={1}
                        sx={{
                            width: ALBUM_TILE_SIZE,
                            height: ALBUM_TILE_SIZE + 50,
                            mb: 2,
                        }}
                    >
                        <ArtistTile
                            artistName={artist.name}
                            dispatch={dispatch}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
