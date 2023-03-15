// track how fast our script executes
const startInfo = performance.now();

//////////////////////////////////
//   PAGE CONTENT INFORMATION   //
//////////////////////////////////

const actorInfoList = [
    { name: 'Jim Carrey', birthYear: 'January 17 1962', moviesPlayed: ['The Mask', 'Ace Ventura: When Nature calls', 'Yes Man', 'Liar Liar'] },
    { name: 'Laura Linney', birthYear: 'February 5 1964', moviesPlayed: ['Blind Spot', 'Love Actually', 'Nocturnal Animals', 'Mystic River'] },
    { name: 'Noah Emmerich', birthYear: 'February 27 1965', moviesPlayed: ['Last Action Hero', 'Life', 'Super 8', 'Jane Got A Gun'] },
    { name: 'Holland Taylor', birthYear: 'Jannuary 14 1943', moviesPlayed: ['Fame', 'To Die For', 'Legally Blond', 'The Wedding Date'] },
    { name: 'Ed Harris', birthYear: 'November 28 1950', moviesPlayed: ['Alamo Bay', 'The Rock', 'Snowpiercer', 'Top Gun: Maverick'] },
    { name: 'Natascha McElhone', birthYear: 'December 14 1971', moviesPlayed: ['The Devils Own', 'Killing me Softly', 'Carmen', 'London Town'] },
    { name: 'Brian Delate', birthYear: 'April 8 1949', moviesPlayed: ['Jacknife', 'The Shawshank Redemption', 'The Brave One', 'The Orphan Killer'] },
    { name: 'Paul Giamatti', birthYear: 'June 6 1967', moviesPlayed: ['Man on the Moon', 'Win Win', 'The Amazing Spider-Man 2', 'Love & Mercy', 'San Andreas'] },
];

const movieList = [
    {name: 'test'}
]

////////////////////////////////////
// MAIN CONTENT GENERATING SCRIPT //
////////////////////////////////////

const tempActorInfoList = [
    { name: 'Actor1', birthYear: '1465', moviesPlayed: ['skediddle', 'skoobiedoo', 'corn wars'] },
    { name: 'Actor2', birthYear: '3643', moviesPlayed: ['corn wars', 'meth investigators'] },
    { name: 'Actor3', birthYear: '1999', moviesPlayed: ['skoobiedoo', 'meth investigators', 'operation theft'] },
];

// create an array of Actor instances from tempActorInfoList
const actors = [];
for (let i = 0; i < tempActorInfoList.length; i++) {
    const actorInfo = tempActorInfoList[i];
    actorInfo.id = `actor-${i}`;
    actors.push(new Actor(actorInfo));
}

const tempWriterInfoList = [
    { name: 'Writer1', birthYear: '1465', moviesPlayed: ['skediddle', 'skoobiedoo', 'corn wars'] },
    { name: 'Writer2', birthYear: '3643', moviesPlayed: ['corn wars', 'meth investigators'] },
    { name: 'Writer3', birthYear: '1999', moviesPlayed: ['skoobiedoo', 'meth investigators', 'operation theft'] },
];

// create an array of Writer instances from tempWriterInfoList
const writers = [];
for (let i = 0; i < tempWriterInfoList.length; i++) {
    const writerInfo = tempWriterInfoList[i];
    writerInfo.id = `writer-${i}`;
    writers.push(new Actor(writerInfo));
}

const tempDirectorInfoList = [
    { name: 'Director1', birthYear: '1465', moviesDirected: ['skediddle', 'skoobiedoo', 'corn wars'] },
    { name: 'Director2', birthYear: '3643', moviesDirected: ['corn wars', 'meth investigators'] },
    { name: 'Director3', birthYear: '1999', moviesDirected: ['skoobiedoo', 'meth investigators', 'operation theft'] },
];

// create an array of Director instances from tempDirectorInfoList
const directors = [];
for (let i = 0; i < tempDirectorInfoList.length; i++) {
    const directorInfo = tempDirectorInfoList[i];
    directorInfo.id = `director-${i}`;
    directors.push(new Director(directorInfo));
}

const tempMovieObject = {
    actors: actors,
    writers: writers,
    directors: directors,
};

console.log(tempMovieObject);

// get the content div we need to add all of our generated elements to
const contentDiv = document.getElementById('content');

// use the actorInfoList to get a list of Actors. The constructor can throw an error, but since our
// information doesn't change dynamically this is only for development and we don't bother catching it.
const actorList = actorInfoList.map(actorInfo => new Actor(actorInfo));
const actorsDiv = document.createElement('div');
actorsDiv.id = 'actors-box';
actorList.forEach(actor => {
    try {
        // generate the html element node for each Actor
        actorsDiv.appendChild(actor.generate());
    } catch (error) {
        // catch any errors so the page still loads, and log them for debugging
        console.error(error);
    }
});
// append our generated actor elements to the DOM
contentDiv.appendChild(actorsDiv);


// log how long it took our script to finish executing
console.log(`Info loaded! ${Math.round((performance.now() - startInfo) * 10) / 10}ms`);
