// track how fast our script executes
let startInfo = performance.now();

//////////////////////////////////
//   PAGE CONTENT INFORMATION   //
//////////////////////////////////

const actorInfoList = [
    { name: 'Jim Carrey', birthYear: 'January 17 1962', moviesPlayed: ['The Mask', 'Ace Ventura', 'Yes Man', 'Liar Liar'], wikiArticle: 'Jim_Carrey', photoLink: 'img\\cast\\jim_carrey.jpg' },
    { name: 'Laura Linney', birthYear: 'February 5 1964', moviesPlayed: ['Blind Spot', 'Love Actually', 'Nocturnal Animals', 'Mystic River'], wikiArticle: 'Laura_Linney', photoLink: 'img\\cast\\laura_linney.jpg' },
    { name: 'Noah Emmerich', birthYear: 'February 27 1965', moviesPlayed: ['Last Action Hero', 'Life', 'Super 8', 'Jane Got A Gun'], wikiArticle: 'Noah_Emmerich', photoLink: 'img\\cast\\noah_emmerich.jpg' },
    { name: 'Holland Taylor', birthYear: 'Jannuary 14 1943', moviesPlayed: ['Fame', 'To Die For', 'Legally Blond', 'The Wedding Date'], wikiArticle: 'Holland_Taylor', photoLink: 'img\\cast\\holland_taylor.jpg' },
    { name: 'Ed Harris', birthYear: 'November 28 1950', moviesPlayed: ['Alamo Bay', 'The Rock', 'Snowpiercer', 'Top Gun: Maverick'], wikiArticle: 'Jim_Carrey', photoLink: 'img\\cast\\ed_harris.jpg' },
    { name: 'Natascha McElhone', birthYear: 'December 14 1971', moviesPlayed: ['The Devils Own', 'Killing me Softly', 'Carmen', 'London Town'], wikiArticle: 'Jim_Carrey', photoLink: 'img\\cast\\natascha_mcelhone.jpg' },
    { name: 'Brian Delate', birthYear: 'April 8 1949', moviesPlayed: ['Jacknife', 'The Shawshank Redemption', 'The Brave One', 'The Orphan Killer'], wikiArticle: 'Jim_Carrey', photoLink: 'img\\cast\\brian_delate.jpg' },
    { name: 'Paul Giamatti', birthYear: 'June 6 1967', moviesPlayed: ['Man on the Moon', 'Win Win', 'The Amazing Spider-Man 2', 'Love & Mercy', 'San Andreas'], wikiArticle: 'Jim_Carrey', photoLink: 'img\\cast\\paul_giammati.jpg' },
];

const writerInfoList = [
    { name: 'Andrew Niccol', wikiArticle: 'Andrew_Niccol', birthYear: 'June 10 1964', moviesWritten: ['Gattica', 'Simone', 'in Time'], photoLink: 'img\\cast\\andrew_niccol.jpg' },
];

const directorInfoList = [
    { name: 'Peter Weir', wikiArticle: 'Peter_Weir', birthYear: 'August 21 1944', moviesDirected: ['Dead Poets Society', 'The Last Wave', 'The Way Back '], photoLink: 'img\\cast\\peter_weir.jpg' },
];

const movieInfo = {
    movieTitle: 'The Truman Show',
    movieGenre: ['satirical', 'social science-fiction', 'comedy', 'drama'],
    movieRelease: '1998',
    moviePosterLink: 'img\\the-truman-show-movie-poster-md.jpg',
    movieTrailerLink: 'https://www.youtube.com/watch?v=LfXTASYB14M',
    moviePlotSummary: '"The Truman Show" is a satirical drama film released in 1998, directed by Peter Weir and starring Jim Carrey as Truman Burbank. The film is about a man named Truman who lives in a seemingly idyllic town called Seahaven, which is actually a giant, elaborately designed set filled with actors portraying his friends and family, and even his wife Meryl.',
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

// create an array of Writer instances from tempWriterInfoList
const writers = [];
for (let i = 0; i < writerInfoList.length; i++) {
    const writerInfo = writerInfoList[i];
    writerInfo.id = `writer-${i}`;
    writers.push(new Writer(writerInfo));
}

// create an array of Director instances from tempDirectorInfoList
const directors = [];
for (let i = 0; i < directorInfoList.length; i++) {
    const directorInfo = directorInfoList[i];
    directorInfo.id = `director-${i}`;
    directors.push(new Director(directorInfo));
}

// create our movie instance
const movie = new Movie({
    ...movieInfo,
    actors: actors,
    writers: writers,
    directors: directors,
});

// log our finished Movie instance because we're proud of it
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
console.log(`Initial content generated in ${Math.round((performance.now() - startInfo) * 10) / 10}ms!`);
startInfo = performance.now();


// use our movie Class's addExtraInfo() method to try to add information from wikipedia to the DOM
movie.addExtraInfo().then(() => {
    // log how long it took our script to finish executing completely when the promise resolves
    console.log(`Extra content from Wikipedia generated in ${Math.round((performance.now() - startInfo) * 10) / 10}ms!`);
});
