import { React, useState } from 'react'
import TextField from "@mui/material/TextField";
import { Box, Typography } from '@mui/material';


function List(props) {
    const data = [
        { "id": 1, "text": "Devpulse" },
        { "id": 2, "text": "Linklinks" },
        { "id": 3, "text": "Centizu" },
        { "id": 4, "text": "Dynabox" },
        { "id": 5, "text": "Avaveo" },
        { "id": 6, "text": "Demivee" },
        { "id": 7, "text": "Jayo" },
        { "id": 8, "text": "Blognation" },
        { "id": 9, "text": "Podcat" },
        { "id": 10, "text": "Layo" }
    ];

    /* create a new array by filtering the original array */
    const filteredData = data.filter((el) => {
        /* if no input the return the original */
        if (props.input === '') {
            return el;
        }
        /* return the item which contains the user input */
        else {
            return el.text.toLowerCase().includes(props.input)
        }
    })
    return (
        <ul>
            {filteredData.map((item) => (
                <li key={item.id}>{item.text}</li>
            ))}
        </ul>
    )
}

export default function SearchView() {
    const [inputText, setInputText] = useState("");
    let inputHandler = (e) => {
        //convert input text to lower case
        var lowerCase = e.target.value.toLowerCase();
        setInputText(lowerCase);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                bgcolor: 'background.paper',
                overflow: 'hidden',
            }}
        >
            <Typography variant="h4" component="div">
                TODO: Search View...
            </Typography>
            <Typography variant="h5" gutterBottom component="div">
                - replace data with new data array of all
                tracks, albums, and artists (by name).
            </Typography>
            <TextField
                id="outlined-basic"
                onChange={inputHandler}
                variant="outlined"
                fullWidth
                label="Search"
            />
            <List input={inputText} />
        </Box>
    );
}
