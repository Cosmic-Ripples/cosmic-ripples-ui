import React from 'react';

import {
    Box, Stack, Grid, Typography,
} from '@mui/material';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import { click_on_artist_grid_item } from '../../../actions';

import { getArtistArt } from '../../../config/album_art_paths';

// import TychoImage from '../../../sample_images/tycho.png';


const ALBUM_TILE_SIZE = 250; /* tmp */


/**
 * Renders a tile for an artist.
 * @param {string} props.artistName The name of the artist.
 * @param {function} props.dispatch The dispatch function from the useReducer
 * hook.
 * @returns {JSX.Element} A tile for an artist.
 */
function ArtistTile(props) {
    const { artistName, artistID, dispatch } = props;

    return (
        <Stack aria-label='artist tile'
            onClick={() => dispatch(click_on_artist_grid_item(artistID))}
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
                    width: '180px',
                    height: '180px',
                    // width: '70%',
                    // height: '70%',
                    overflow: 'hidden',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 2,
                    boxShadow: 10,
                }}
            >
                {/* <img
                    src='https://material-ui.com/static/images/cards/contemplative-reptile.jpg'
                    alt='green iguana'
                /> */}
                <img
                    // src={TychoImage}
                    src={getArtistArt(artistID)}
                    alt='artist'
                    width='120%'
                />
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

    // console.log('artists: ', artists);
    // artists?.forEach(artist => console.log(artist));

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
                            artistName={artist['Name']}
                            artistID={artist['ID']}
                            dispatch={dispatch}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
