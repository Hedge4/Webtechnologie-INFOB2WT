// track how fast our script executes
const startInfo = performance.now();

//////////////////////////////////
//   PAGE CONTENT INFORMATION   //
//////////////////////////////////

const actorInfoList = [
    { name: 'Jim Carrey', birthYear: 'January 17 1962', moviesPlayed: ['The Mask', 'Ace Ventura: When Nature calls', 'Yes Man', 'Liar Liar'], wikiArticle: 'wiki/Jim_Carrey'},
    { name: 'Laura Linney', birthYear: 'February 5 1964', moviesPlayed: ['Blind Spot', 'Love Actually', 'Nocturnal Animals', 'Mystic River'], wikiArticle: 'wiki/Laura_Linney' },
    { name: 'Noah Emmerich', birthYear: 'February 27 1965', moviesPlayed: ['Last Action Hero', 'Life', 'Super 8', 'Jane Got A Gun'], wikiArticle: 'wiki/Noah_Emmerich' },
    { name: 'Holland Taylor', birthYear: 'Jannuary 14 1943', moviesPlayed: ['Fame', 'To Die For', 'Legally Blond', 'The Wedding Date'], wikiArticle: 'wiki/Holland_Taylor' },
    { name: 'Ed Harris', birthYear: 'November 28 1950', moviesPlayed: ['Alamo Bay', 'The Rock', 'Snowpiercer', 'Top Gun: Maverick'], wikiArticle: 'wiki/Jim_Carrey' },
    { name: 'Natascha McElhone', birthYear: 'December 14 1971', moviesPlayed: ['The Devils Own', 'Killing me Softly', 'Carmen', 'London Town'], wikiArticle: 'wiki/Jim_Carrey' },
    { name: 'Brian Delate', birthYear: 'April 8 1949', moviesPlayed: ['Jacknife', 'The Shawshank Redemption', 'The Brave One', 'The Orphan Killer'], wikiArticle: 'wiki/Jim_Carrey' },
    { name: 'Paul Giamatti', birthYear: 'June 6 1967', moviesPlayed: ['Man on the Moon', 'Win Win', 'The Amazing Spider-Man 2', 'Love & Mercy', 'San Andreas'], wikiArticle: 'wiki/Jim_Carrey' },
];

////////////////////////////////////
// MAIN CONTENT GENERATING SCRIPT //
////////////////////////////////////

// create an array of Actor instances from tempActorInfoList
const actors = [];
for (let i = 0; i < actorInfoList.length; i++) {
    const actorInfo = actorInfoList[i];
    actorInfo.id = `actor-${i}`;
    actors.push(new Actor(actorInfo));
}

const tempWriterInfoList = [
    { name: 'Andrew Niccol', birthYear: 'June 10 1964', moviesPlayed: ['Gattica', 'Simone', 'in Time'], wikiArticle: wiki/Peter_Weir },
];

// create an array of Writer instances from tempWriterInfoList
const writers = [];
for (let i = 0; i < tempWriterInfoList.length; i++) {
    const writerInfo = tempWriterInfoList[i];
    writerInfo.id = `writer-${i}`;
    writers.push(new Actor(writerInfo));
}

const tempDirectorInfoList = [
    { name: 'Peter Weir', birthYear: 'August 21 1944', moviesDirected: ['Dead Poets Society', 'The Last Wave', 'The Way Back '], wikiArticle: 'wiki/Jim_Carrey' },
];

// create an array of Director instances from tempDirectorInfoList
const directors = [];
for (let i = 0; i < tempDirectorInfoList.length; i++) {
    const directorInfo = tempDirectorInfoList[i];
    directorInfo.id = `director-${i}`;
    directors.push(new Director(directorInfo));
}

const movie = new Movie({
    actors: actors,
    writers: writers,
    directors: directors,
});

console.log(movie);

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
