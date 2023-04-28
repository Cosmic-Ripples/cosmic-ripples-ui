/**
 * @file ArtistsView.jsx
 */

import React, {
    Fragment
} from 'react';

import {
    AppBar, Toolbar,
    Box, Button, Slide, Grid,
    Card, CardActions, CardMedia, CardContent, CardActionArea,
    Typography, Divider, CssBaseline,
    Container, useScrollTrigger,

} from '@mui/material';

import PropTypes from 'prop-types';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR,
} from '../../../config/color_palette';

import { artists } from '../../../config/db';

import TychoImage from '../../../sample_images/tycho.png';


const DEBUG = false;
const ALBUM_TILE_SIZE = 250; /* tmp */

/*
function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

HideOnScroll.propTypes = {
    children: PropTypes.element.isRequired,
    window: PropTypes.func,
};
*/


function ArtistTile(props) {
    const {
        name, country, image, albums,
        aFunctionToChangeMainView,
    } = props;

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                border: DEBUG ? 5 : 0,
                borderColor: 'blue',
            }}
        >
            <Card
                sx={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: SECONDARY_COLOR,
                    borderRadius: 5,
                    boxShadow: 10,
                    position: 'relative',
                }}
            >
                <CardActionArea onClick={aFunctionToChangeMainView} >
                    <CardMedia component='img'
                        image={TychoImage}
                        // image={image}
                        alt='artist image'
                        sx={{
                            width: '50%',
                            height: '50%',
                            borderRadius: '50%',
                            boxShadow: 10,
                        }}
                    />
                    <CardContent>
                        <Typography
                            sx={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                color: QUATERNARY_COLOR,
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography gutterBottom
                            sx={{ fontSize: 14, color: QUATERNARY_COLOR }}
                        >
                            Artist
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box>
    );
}

const bullet = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

/*
const artists = [ // list of Artist objects
    {
        name: 'Led Zeppelin',
        country: 'UK',
        image: '<some file>',
        albums: [ // list of Album objects
            {
                title: 'Houses of the Holy',
                year: '1973',
                playtime: '40:57',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'The Song Remains the Same',
                        length: '5:32'
                    },
                    {
                        title: 'The Rain Song',
                        length: '7:39'
                    }, // more Tracks ...
                ]
            }, // more Albums ...
        ]
    },
    {
        name: 'Pink Floyd',
        country: 'UK',
        image: '<some file>',
        albums: [ // list of Album objects
            {
                title: 'The Dark Side of the Moon',
                year: '1973',
                playtime: '42:50',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Speak to Me',
                        length: '1:05'
                    },
                    {
                        title: 'Breathe (In the Air)',
                        length: '2:49'
                    }, // more Tracks ...
                ]
            },
            {
                title: 'The Wall',
                year: '1979',
                playtime: '80:42',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'In the Flesh?',
                        length: '3:16'
                    },
                    {
                        title: 'The Thin Ice',
                        length: '2:27'
                    }, // more Tracks ...
                ]
            }, // more Albums ...
        ]
    }, // more Artists ...
]
*/

export default function ArtistsView(props) {
    const testBlankArtists = new Array(100).fill(0);

    return (
        <Fragment>
            <Divider sx={{ height: 15 }} />
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    overflow: 'scroll',
                    border: DEBUG ? 5 : 0,
                    borderColor: 'pink',
                }}
            >
                {/* Header Here? */}
                <Grid container columns={8} spacing={2}
                    sx={{ border: DEBUG ? 5 : 0, borderColor: 'green' }}
                >
                    {artists.map((artist) => (
                        <Grid item xs={8} sm={4} md={2} lg={2} xl={1}
                            sx={{
                                width: ALBUM_TILE_SIZE,
                                height: ALBUM_TILE_SIZE,
                                border: DEBUG ? 5 : 0,
                                borderColor: 'red',
                                // ml: 5,
                                // mt: 5,
                                // display: 'flex',
                                // justifyContent: 'center',
                            }}
                        >
                            <ArtistTile name={artist.name} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Fragment >
    );
}
