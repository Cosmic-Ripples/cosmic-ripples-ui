
import React from 'react';

import { Box, Stack, Grid, Typography } from '@mui/material';

import { click_on_album_grid_item } from '../../../actions';

import { getAlbumArt } from '../../../config/album_art_paths';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';


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
        albumName,
        albumID,
        artistID,
        artistName,
        year,
        playtime,
        dispatch,
    } = props;

    const bullet = (
        <Box component="span"
            sx={{ display: 'inline-block', mx: '10px', transform: 'scale(2)' }}
        >•</Box>
    );

    return (
        <Stack
            onClick={() => dispatch(click_on_album_grid_item(albumID))}
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                borderRadius: 5,
                backgroundColor: SECONDARY_COLOR,
                boxShadow: 10,
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    borderRadius: 5,
                    boxShadow: 10,
                    mt: 1,
                }}
            >
                <Box
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        backgroundImage: `url(${getAlbumArt(albumID)})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        overflow: 'hidden',
                        borderRadius: 5,
                    }}
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
                    {albumName}
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
                    {artistName}{bullet}{year}
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
    const { artistName, albums, dispatch } = props;

    return (
        <Box
            sx={{
                height: '95%',
                width: '100%',
                overflow: 'scroll',
                '&::-webkit-scrollbar': {
                    width: 0,
                },
                '&::-webkit-scrollbar-track': {
                    // backgroundColor: 'red',
                },
                '&::-webkit-scrollbar-thumb': {
                    // backgroundColor: 'blue',
                },
                pb: 2,
            }}
        >
            <Grid container columns={12} spacing={2} >
                {albums?.map((album, idx) => (
                    <Grid item
                        key={idx}
                        xs={6} sm={4} md={3} lg={3} xl={2}
                        sx={{
                            width: ALBUM_TILE_SIZE,
                            height: ALBUM_TILE_SIZE + 50,
                            mb: 2,
                        }}
                    >
                        <AlbumTile
                            albumName={album['Title']}
                            albumID={album['ID']}
                            artistID={album['Artist_ID']}
                            artistName={artistName ? artistName : album['Artist_Name']}
                            year={album['Year']}
                            playtime={album['Playtime']}
                            dispatch={dispatch}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
