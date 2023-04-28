
import React from 'react';

import { Box, Stack, Grid, Typography } from '@mui/material';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import { handleSelectedAlbum } from '../../../actions';

import TychoImage from '../../../sample_images/tycho.png';


const ALBUM_TILE_SIZE = 250; /* tmp */


/**
 * Returns an album tile with information about the given album.
 * @param {String} props.title The title of the album.
 * @param {String} props.artist The artist of the album.
 * @param {idk} props.year The year the album was released.
 * @param {idk} props.image The album's cover art.
 * @param {idk} props.playtime The total playtime of the album.
 * @param {function} props.dispatch The function used to dispatch actions
 * related to this component to the reducer.
 * @returns {JSX.Element} The album tile.
 */
function AlbumTile(props) {
    const {
        title, artist, year, image, playtime,
        dispatch,
    } = props;

    const bullet = (
        <Box component="span"
            sx={{ display: 'inline-block', mx: '10px', transform: 'scale(2)' }}
        >•</Box>
    );

    return (
        <Stack
            onClick={() => dispatch(handleSelectedAlbum(title))}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: 5,
                backgroundColor: SECONDARY_COLOR,
                cursor: 'pointer',
                p: 1,
            }}
        >
            <Box
                sx={{
                    // width: '200px',
                    // height: '200px',
                    width: '90%',
                    height: '70%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 1,
                }}
            >
                {/* <img
                    src="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
                    alt="green iguana"
                /> */}
                <img
                    src={TychoImage}
                    alt='Tycho'
                    width='100%'
                    height='auto'
                />
            </Box>
            <Stack
                sx={{
                    // width: '100%',
                    // height: '200px',
                    width: '90%',
                    height: '30%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >

                <Typography component='div' variant='h4' noWrap
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: QUATERNARY_COLOR,
                    }}
                >
                    {title}
                </Typography>
                <Typography component='div' variant='h4' noWrap
                    sx={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        fontSize: 14,
                        fontWeight: 'bold',
                        color: TERTIARY_COLOR,
                    }}
                >
                    {artist}{bullet}{year}
                </Typography>
            </Stack>
        </Stack>
    );
}


/**
 * Returns a grid of the input albums.
 * @param {Object} props.albums The albums state from the reducer.
 * @param {function} props.dispatch The function used to dispatch actions
 * related to this component to the reducer.
 * @returns {JSX.Element} The grid of album tiles.
 */
export default function AlbumsGrid(props) {
    const { albums, dispatch } = props;

    // print album artists
    albums?.forEach((album) => {
        console.log(album.artist);
    });

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
                {albums?.map((album, idx) => (
                    <Grid item
                        key={idx}
                        xs={8} sm={4} md={2} lg={2} xl={1}
                        sx={{
                            width: ALBUM_TILE_SIZE,
                            height: ALBUM_TILE_SIZE + 50,
                            mb: 2,
                        }}
                    >
                        <AlbumTile
                            title={album.title}
                            artist={album.artist}
                            year={album.year}
                            playtime={album.playtime}
                            image={TychoImage}
                            dispatch={dispatch}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
