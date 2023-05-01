class CustomStorage {
  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key) {
    const value = localStorage.getItem(key);
    return value && JSON.parse(value);
  }

  removeItem(key) {
    localStorage.removeItem(key);
  }
}

/* OR */

const myStorage = {
  artists: [],
  albums: [],
  tracks: [],
  addArtist: function (artist) {
    console.assert(artist.name, 'Artist name is required');
    this.artists.push(artist);
  },
  // save: function () {
  //   localStorage.setItem('myStorage', JSON.stringify(this));
  // },
  // load: function () {
  //   const data = localStorage.getItem('myStorage');
  //   if (data) {
  //     const storage = JSON.parse(data);
  //     this.artists = storage.artists || [];
  //     this.albums = storage.albums || [];
  //     this.tracks = storage.tracks || [];
  //   }
  // }
};

// myStorage.artists.push({ name: 'John Doe', genre: 'Rock' });
myStorage.addArtist({ name: 'John Doe', genre: 'Rock' });

// Remove an album
myStorage.albums.splice(0, 1);

console.log(myStorage);

// Get all artists
const artists = myStorage.artists;

console.log(artists);
