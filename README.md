# BUGS !!!

- ## Unresolved:

  - INCOMING...

- ## Resolved:

  - ### Fixed X using Y:

    - **Fixed** lingering state for the following user navigation sequence:
      - User clicks on **Albums** within the side bar, rendering the **Albums View** which defaults to an **Albums Grid**.
      - User clicks on an **Album Grid Item** _Houses of the Holy_, rendering the **Album View**, to display a header for the album and a table of tracks for that album.
      - User clicks on **Artists** within the side bar, rendering the **Artists View** which defaults to an **Artists Grid**.
      - User clicks on an **Artist Grid Item** _Pink Floyd_, rendering... UH OH, you expected the **Artist View** for _Pink Floyd_ to be rendered, displaying the artist header followed by a grid of their albums but instead you found an **Album View** for _Houses of the Holy_ showing its album header followed by a table of tracks from the album!
    - **using** the CLICK_ON_MENU_ITEM action to set the selectedAlbum and selectedArtist to null.
    - **Fixed** long _Current Track Info_ track titles forcing the image off the left of the playback bar and screen...
    - **using** a new playbar container and elements layout, splitting the three clusters of interactable into three sections, calculating a better width percentage distribution between the three (30-40-30) and using flex properties of the three sections to maintain alignment.

# Concerns & Ideas

- Images from the database to be sent over with all the other metadata ?
- Client-side caching with `import cache from './cahce';` ?
- Playback bar being so far outside the main content area ?
- Don't restart audio on browser refresh ?

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
