

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
            },
            {
                title: 'Physical Graffiti',
                year: '1975',
                playtime: '77:00',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Custard Pie',
                        length: '4:35'
                    },
                    {
                        title: 'The Rover',
                        length: '6:59'
                    }, // more Tracks ...
                ]
            },
            {
                title: 'Presence',
                year: '1976',
                playtime: '45:00',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Achilles Last Stand',
                        length: '8:51'
                    },
                    {
                        title: 'For Your Life',
                        length: '4:59'
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
                    },
                    {
                        title: 'Another Brick in the Wall, Part 1',
                        length: '3:35'
                    }, // more Tracks ...
                ]
            },
            {
                title: 'Wish You Were Here',
                year: '1975',
                playtime: '43:00',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Shine On You Crazy Diamond (Parts I-V)',
                        length: '26:20'
                    },
                    {
                        title: 'Welcome to the Machine',
                        length: '6:48'
                    },
                    {
                        title: 'Have a Cigar',
                        length: '6:08'
                    },
                    {
                        title: 'Wish You Were Here',
                        length: '4:49'
                    }, // more Tracks ...
                ]
            }, // more Albums ...
        ]
    },
    {
        name: 'The Beatles',
        country: 'UK',
        image: '<some file>',
        albums: [ // list of Album objects
            {
                title: 'Abbey Road',
                year: '1969',
                playtime: '49:00',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Come Together',
                        length: '3:35'
                    },
                    {
                        title: 'Something',
                        length: '2:59'
                    },
                    {
                        title: 'Maxwell\'s Silver Hammer',
                        length: '2:59'
                    }, // more Tracks ...
                ]
            },
            {
                title: 'Revolver',
                year: '1966',
                playtime: '34:00',
                image: '<some file>',
                tracks: [ // list of Track objects

                    {
                        title: 'Eleanor Rigby',
                        length: '2:58'
                    },
                    {
                        title: 'Yellow Submarine',
                        length: '2:59'
                    }, // more Tracks ...
                ]
            },
            {
                title: 'Sgt. Pepper\'s Lonely Hearts Club Band',
                year: '1967',
                playtime: '43:00',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Sgt. Pepper\'s Lonely Hearts Club Band',
                        length: '2:58'
                    },
                    {
                        title: 'With a Little Help from My Friends',
                        length: '2:59'
                    }, // more Tracks ...
                ]
            }, // more Albums ...
        ]
    },
    {
        name: 'The Rolling Stones',
        country: 'UK',
        image: '<some file>',
        albums: [ // list of Album objects
            {
                title: 'Exile on Main St.',
                year: '1972',
                playtime: '43:00',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Rocks Off',
                        length: '3:35'
                    },
                    {
                        title: 'Tumbling Dice',
                        length: '4:59'
                    }, // more Tracks ...
                ]
            },
            {
                title: 'Let It Bleed',
                year: '1969',
                playtime: '43:00',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Gimme Shelter',
                        length: '3:35'
                    },
                    {
                        title: 'Midnight Rambler',
                        length: '4:59'
                    }, // more Tracks ...
                ]
            },
            {
                title: 'Sticky Fingers',
                year: '1971',
                playtime: '43:00',
                image: '<some file>',
                tracks: [ // list of Track objects
                    {
                        title: 'Brown Sugar',
                        length: '3:35'
                    },
                    {
                        title: 'Sway',
                        length: '4:59'
                    }, // more Tracks ...
                ]
            }, // more Albums ...
        ]
    },
    // more Artists ...
]

export { artists }
