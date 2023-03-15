const startInfo = performance.now();


const actorInfoList = [
    { name: 'Actor1', birthYear: '1465', moviesPlayed: ['skediddle', 'skoobiedoo', 'corn wars'] },
    { name: 'Actor2', birthYear: '3643', moviesPlayed: ['corn wars', 'meth investigators'] },
    { name: 'Actor3', birthYear: '1999', moviesPlayed: ['skoobiedoo', 'meth investigators', 'operation theft'] },
];

// use the actorInfoList to get a list of Actors. The constructor can throw an error, but since our
// information doesn't change dynamically this is only for development and we don't bother catching it.
const actorList = actorInfoList.map(actorInfo => new Actor(actorInfo));
const actorsDiv = document.getElementById('actors-box');
actorList.forEach(actor => {
    try {
        // generate the element node for each Actor, and add it to the DOM
        actorsDiv.appendChild(actor.generate());
    } catch (error) {
        console.error(error);
    }
});


console.log(`Info loaded! ${Math.round((performance.now() - startInfo) * 10) / 10}ms`);
