// track how fast our script executes
const startInfo = performance.now();

//////////////////////////////////
//   PAGE CONTENT INFORMATION   //
//////////////////////////////////

const actorInfoList = [
    { name: 'Jim Carrey', birthYear: 'January 17 1962', moviesPlayed: ['The Mask', 'Ace Ventura: When Nature calls', 'Yes Man', 'Liar Liar'], wikiArticle: 'wiki/Jim_Carrey' },
    { name: 'Laura Linney', birthYear: 'February 5 1964', moviesPlayed: ['Blind Spot', 'Love Actually', 'Nocturnal Animals', 'Mystic River'], wikiArticle: 'wiki/Laura_Linney' },
    { name: 'Noah Emmerich', birthYear: 'February 27 1965', moviesPlayed: ['Last Action Hero', 'Life', 'Super 8', 'Jane Got A Gun'], wikiArticle: 'wiki/Noah_Emmerich' },
    { name: 'Holland Taylor', birthYear: 'Jannuary 14 1943', moviesPlayed: ['Fame', 'To Die For', 'Legally Blond', 'The Wedding Date'], wikiArticle: 'wiki/Holland_Taylor' },
    { name: 'Ed Harris', birthYear: 'November 28 1950', moviesPlayed: ['Alamo Bay', 'The Rock', 'Snowpiercer', 'Top Gun: Maverick'], wikiArticle: 'wiki/Jim_Carrey' },
    { name: 'Natascha McElhone', birthYear: 'December 14 1971', moviesPlayed: ['The Devils Own', 'Killing me Softly', 'Carmen', 'London Town'], wikiArticle: 'wiki/Jim_Carrey' },
    { name: 'Brian Delate', birthYear: 'April 8 1949', moviesPlayed: ['Jacknife', 'The Shawshank Redemption', 'The Brave One', 'The Orphan Killer'], wikiArticle: 'wiki/Jim_Carrey' },
    { name: 'Paul Giamatti', birthYear: 'June 6 1967', moviesPlayed: ['Man on the Moon', 'Win Win', 'The Amazing Spider-Man 2', 'Love & Mercy', 'San Andreas'], wikiArticle: 'wiki/Jim_Carrey' },
];

const writerInfoList = [
    { name: 'Andrew Niccol', wikipediaArticle: 'wiki/Andrew_Niccol', birthYear: 'June 10 1964', moviesWritten: ['Gattica', 'Simone', 'in Time'] }
];

const directorInfoList = [
    { name: 'Peter Weir', wikipediaArticle: 'wiki/Peter_Weir', birthYear: 'August 21 1944', moviesWritten: ['Dead Poets Society', 'The Last Wave', 'The Way Back '] }
];

const movieInfo = {
    title: 'The Truman Show',
    genre: 'satirical, social science-fiction, comedy, drama',
    releaseYear: '1998',
    poster: 'img\the-truman-show-movie-poster-md.jpg',
    trailer: 'https://www.youtube.com/watch?v=LfXTASYB14M&ab_channel=HDRetroTrailers',
    plot: '"The Truman Show" is a movie about a man named Truman who discovers that his entire life has been a television show, with him as the unwitting star.',
};

//////////////////////////////////
//  CLASS INSTANCES GENERATION  //
//////////////////////////////////

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

// create our movie instance
const movie = new Movie({
    actors: actors,
    writers: writers,
    directors: directors,
});

console.log(movie);


///////////////////////////////////////
// MAIN PAGE GENERATION FROM CLASSES //
///////////////////////////////////////

// get the main content div and add generate all of our movie's page content elements
const contentDiv = document.getElementById('content');
const movieElements = movie.generate(); // this method generates all of the content

// add all of the generated elements to the DOM
movieElements.forEach(movieElement => {
    contentDiv.appendChild(movieElement);
});


// checkpoint after which initial page content generation is done
console.log(`Initial content loaded! ${Math.round((performance.now() - startInfo) * 10) / 10}ms`);


// use our movie Class's addExtraInfo() method to try to add information from wikipedia to the DOM
movie.addExtraInfo()
    // log how long it took our script to finish executing completely
    .then(console.log(`Extra info from Wikipedia loaded! ${Math.round((performance.now() - startInfo) * 10) / 10}ms`));
