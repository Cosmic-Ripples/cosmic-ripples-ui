/**
 * @file MenuPresentationComponents.jsx
 */


import DefaultView from '../library/DefaultView';

import Tracks from '../library/tracks/TracksView';

import Albums from '../library/albums/AlbumsView';

import Artists from '../library/artists/ArtistsView';

import AudioUploader from '../library/AudioUploader.jsx';

import Search from '../library/search/SearchView';


const presentationComponents = (props) => {

    return [
        {
            title: 'Default View',
            component: <DefaultView {...props} />,
        },
        {
            title: 'Tracks',
            component: <Tracks {...props} />,
        },
        {
            title: 'Albums',
            component: <Albums {...props} />,
        },
        {
            title: 'Artists',
            component: <Artists {...props} />,
        },
        {
            title: 'Search',
            component: <Search {...props} />,
        },
    ];
};

const containerComponents = (props) => {
    return [
        {
            title: 'Audio Uploader',
            component: <AudioUploader {...props} />,
        }
    ];
};

export { presentationComponents, containerComponents };
