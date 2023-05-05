/**
 * One way or another, I think this should live in the API interface.
 */


function getAlbumArt(albumID) {
  return `http://localhost:8065/api/v1/metadata/album/cover/${albumID}`;
}

function getArtistArt(artistID) {
  return `http://localhost:8065/api/v1/metadata/artist/image/${artistID}`;
}

export { getAlbumArt, getArtistArt };
