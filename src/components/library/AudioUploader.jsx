/**
 * @file AudioUploader.jsx
 * @notes
 * - https://react-dropzone.js.org/
 */

import React, {
    Fragment,
    useState, useCallback,
    ChangeEvent,
} from 'react';

import {
    Box, Typography
} from '@mui/material';

import Dropzone from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

import {
    PRIMARY_COLOR, SECONDARY_COLOR, TERTIARY_COLOR, QUATERNARY_COLOR
} from '../../config/color_palette';


const DEBUG = false;

export default function AudioUploader(props) {

    const handleAudioFile = (file) => {
        const audio = new Audio(URL.createObjectURL(file));
        audio.play();
    }

    const handleAudioFiles = (files) => {
        files.forEach((file) => {
            handleAudioFile(file);
        });
    }

    const handleDrop = (acceptedFiles) => {
        handleAudioFiles(acceptedFiles);
    }

    return (
        <Fragment>
            <Typography component='div' variant='h5'
                sx={{ color: TERTIARY_COLOR }}
            >
                TODO: Drag and Drop Audio Uploader
            </Typography>
            <Dropzone onDrop={handleDrop}
            >
                {({ getRootProps, getInputProps }) => (
                    <Box
                        sx={{
                            height: '20%',
                            width: '50%',
                            overflow: 'scroll',
                            border: DEBUG ? 5 : 0,
                            borderColor: 'pink',
                            borderRadius: 5,
                            backgroundColor: SECONDARY_COLOR,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <section>
                            <div {...getRootProps()}>
                                <input {...getInputProps()} />
                                <Typography component='div' variant='h5'
                                    sx={{ color: TERTIARY_COLOR }}
                                >
                                    Drag n' Drop Audio Files Here
                                </Typography>
                            </div>
                        </section>
                    </Box>
                )}
            </Dropzone>
        </Fragment>
    );
}
