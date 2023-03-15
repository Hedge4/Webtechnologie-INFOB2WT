// track how fast our script executes
const startInfo = performance.now();

//////////////////////////////////
//   PAGE CONTENT INFORMATION   //
//////////////////////////////////

const actorInfoList = [
    { name: 'Actor1', birthYear: '1465', moviesPlayed: ['skediddle', 'skoobiedoo', 'corn wars'] },
    { name: 'Actor2', birthYear: '3643', moviesPlayed: ['corn wars', 'meth investigators'] },
    { name: 'Actor3', birthYear: '1999', moviesPlayed: ['skoobiedoo', 'meth investigators', 'operation theft'] },
];


////////////////////////////////////
// MAIN CONTENT GENERATING SCRIPT //
////////////////////////////////////

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
