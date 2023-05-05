/**
 * @file Summary.js
 */

import React, { Fragment } from 'react';

import Typography from '@mui/material/Typography';

import { TERTIARY_COLOR } from '../../config/color_palette';


export default function DefaultView(props) {
    const { selectedMenuItem } = props;

    return (
        <Fragment>
            <Typography component="div" variant='h5' sx={{ color: TERTIARY_COLOR }} >
                Welcome to Lossless Spotify! Default View?
            </Typography>
            <Typography component="div" variant='h5' sx={{ color: TERTIARY_COLOR }} >
                {selectedMenuItem}.
            </Typography>
        </Fragment>
    );
}
