// track how fast our script executes
const startClasses = performance.now();


////////////////////////////////
// FUNCTIONS OUR CLASSES CALL //
////////////////////////////////

/**
 * Function called by the classes defined in this file upon generation, which creates a HTML DOM element and its children with classes, attributes, and event listeners based on the given input object, ready to be added to the DOM.
 * @param {Object} options Provides the type, content, classes, attributes, event listeners, and children for the element.
 * @param {string} options.tagName The tag name of the element used in document.createElement().
 * @param {string} [options.text] Content for a textNode inside this DOM element.
 * @param {string[]} [options.classes] A class or classes of this element. Also accepts a single string instead of an array.
 * @param {[string, string][]} [options.attributes] A pair or pairs of attribute names and values. Also accepts a single name/value pair instead of an array of them.
 * @param {[string, *, *][]} [options.eventListeners] A pair or pairs of event types and callback functions when they're detected, and (optionally) an options object. Also accepts a single type/callback/option array instead of an array of them.
 * @param {Object[]} [options.children] Options objects to recursively generate the DOM elements of this element's children. Also accepts a single child option object instead of an array.
 *
 * @returns {Object} The generated HTML DOM element.
 */
// eslint-disable-next-line
function generateDomElement(options) {
    // tagName is the only required option
    if (!options.tagName) {
        throw ('Error creating HTML DOM element node as it didn\'t get a tagName!');
    }

    // this function makes sure undefined inputs become an empty array and solitary inputs an array with size one
    // it doesn't change inputs that are already in an array
    // containsArray is for arrays of arrays, and checks one level deeper
    function ensureInputIsArray(input, containsArray = false) {
        if (!input) return []; // immediately filter out falsy inputs

        if (!containsArray) {
            // if input isn't an array we return it as the sole member of an array
            if (!Array.isArray(input)) return [input];
        } else {
            // this type of input should have at least a one-layered array
            if (!Array.isArray(input)) { throw ('Attributes or event listener options should be an array!'); }

            // check if we have two layers of arrays, otherwise return input as an array of length one
            if (input.length && !Array.isArray(input[0])) return [input];
        }

        // if content was already an array, return original input
        return input;
    }

    let elem;

    try {
        // create empty element node
        elem = document.createElement(options.tagName);
        if (options.text) {
            elem.appendChild(document.createTextNode(options.text));
        }

        // add classes
        options.classes = ensureInputIsArray(options.classes);
        options.classes.forEach(e => {
            elem.classList.add(e);
        });

        // add attributes
        options.attributes = ensureInputIsArray(options.attributes, true);
        options.attributes.forEach(attributePair => {
            elem.setAttribute(attributePair[0], attributePair[1]);
        });

        // add event listeners
        options.eventListeners = ensureInputIsArray(options.eventListeners, true);
        options.eventListeners.forEach(eventListener => {
            if (eventListener[2]) elem.addEventListener(eventListener[0], eventListener[1], eventListener[2]);
            else elem.addEventListener(eventListener[0], eventListener[1]);
        });
    } catch (error) {
        // add some custom information to the error before throwing it again
        error.message = `generateDomElement: Error generating ${options.tagName} element! — ` + error.message;
        throw (error);
    }

    // add any children — this happens after adding a textNode child, so if you want such a child but
    // not as the first child, it should be sent as a child instead. Throws its own errors.
    options.children = ensureInputIsArray(options.children);
    if (options.children && options.children.length > 0) {
        options.children.forEach(child => {
            elem.appendChild(generateDomElement(child));
        });
    }

    // return our finished DOM element
    return elem;
}

/**
 * Function called with .call() by fetchWikipediaData() with this as an instance 'artist' class.
 * Adds fetched information to the DOM
 */
function addWikipediaData(fetchResult) {
    // return another promise so we know when the function is done adding the information to the DOM
    return new Promise((resolve) => {
        const artistElement = document.getElementById(this.id); // ids are generated upon element generation

        // if we didn't find an extract, we instead link to a Wikipedia search
        if (!fetchResult.foundExtract) {
            //
            resolve();
            return;
        }

        resolve();
    });
}

/**
 * Function called with .call() for an instance of our classes, that fetches general information from wikipedia.
 * Doesn't return anything, and will call the function to add fetched information to the DOM.
 *
 * We realise downloading information from another web address while the page is loading is
 * not good for performance or SEO, but wanted to demonstrate it anyway.
 */
function fetchWikipediaData() {
    // we return a promise so we can check when everything is done
    // we don't need reject() since we just log it here if we run into any problems
    return new Promise((resolve) => {
        // use Artist name if no wikipediaPage is defined
        const wikiSearch = this.wikiArticle || this.name;
        const query = encodeURI(wikiSearch);

        // generate and store a Wikipedia search link
        this.wikipediaLink = `https://en.wikipedia.org/w/index.php?search=${query}`;
        // and also a Wikipedia API call
        const dataURL = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${query}&origin=*&format=json`;

        // fetch our data, then add it to the DOM
        fetch(dataURL).then(res => {
            res.json().then(resData => {

                // log the data we received (debugging)
                // console.log(resData);

                // generic error logging (can't really call it handling)
                if (!resData || !resData.query || !resData.query.pages) {
                    console.log(!resData);
                    console.log(!resData.query);
                    console.log(!resData.query.pages);
                    console.log(`Couldn't get a Wikipedia result for ${this.constructor.name} ${this.name}!`);
                    console.log(resData);
                    // on error, we only add wikiLink to the DOM
                    addWikipediaData.call(this, { foundExtract: false })
                        .then(resolve());
                    return;
                }

                const keys = Object.keys(resData.query.pages);

                // if no results were found
                if (!keys.length || keys[0] == '-1') {
                    console.log(`Couldn't find a Wikipedia page for ${this.constructor.name} ${this.name}!`);
                    // on error, we only add wikiLink to the DOM
                    addWikipediaData.call(this, { foundExtract: false })
                        .then(resolve());
                    return;
                }

                // get introduction of wikipedia article
                const extract = resData.query.pages[keys[0]].extract;

                // after adding the data to the DOM resolve our promise
                addWikipediaData.call(this, { foundExtract: true, info: extract })
                    .then(resolve());

            }).catch(error => {
                console.log(`Couldn't convert to JSON for ${this.constructor.name} ${this.name}!`);
                console.log(res);
                console.error(error);
                // on error, we only add wikiLink to the DOM
                addWikipediaData.call(this, { foundExtract: false })
                    .then(resolve());
            });
        }).catch(error => {
            console.log(`Couldn't complete fetch for ${this.constructor.name} ${this.name}! URL: ${dataURL}`);
            console.error(error);
            // on error, we only add wikiLink to the DOM
            addWikipediaData.call(this, { foundExtract: false })
                .then(resolve());
        });
    });
}


////////////////////////////////////
// CLASSES AND GENERATION METHODS //
////////////////////////////////////

// the Artist class only defines basic properties and doesn't have a generate() method
class Artist {
    constructor(options) {
        this.id = options.id;
        this.name = options.name;
        this.birthYear = options.birthYear;
        this.photoLink = options.photoLink || ''; // optional
        this.wikiArticle = options.wikiArticle || undefined; // optional

        if (!this.id) throw (`ConstructorError: ${this.constructor.name} must have an id!`);
        if (!this.name) throw (`ConstructorError: ${this.constructor.name} must have a name!`);
        if (!this.birthYear) throw (`ConstructorError: ${this.constructor.name} must have a year of birth!`);

    }
}

// eslint-disable-next-line
class Director extends Artist {
    constructor(options) {
        super(options);
        this.moviesDirected = options.moviesDirected || []; // optional
    }

    // DOM element generation method for a Director instance
    generate() {
        // we define our movieList beforehand to reduce clutter
        const movieList = {
            tagName: 'ol',
            children: [],
        };

        // add a list element for each movie
        this.moviesDirected.forEach(movieTitle => {
            movieList.children.push({
                tagName: 'li',
                text: movieTitle,
            });
        });

        return generateDomElement({
            tagName: 'div',
            eventListeners: ['click', () => alert(`${this.constructor.name} ${this.name} was clicked!`)],
            attributes: [['id', this.id]],
            classes: ['director-box'],
            children: [
                {
                    tagName: 'div',
                    classes: ['director-info'],
                    children: [
                        {
                            tagName: 'h3',
                            text: this.name,
                        }, {
                            tagName: 'p',
                            classes: ['birth-year'],
                            text: this.birthYear,
                        }, {
                            tagName: 'p',
                            text: 'Couldn\'t find information.',
                        },
                    ],
                },
                {
                    tagName: 'img',
                    classes: ['director-img'],
                    attributes: [['src', this.photoLink]],
                },
                {
                    tagName: 'div',
                    classes: ['movies-list'],
                    children: [
                        {
                            tagName: 'h4',
                            text: 'Other movies are...',
                        },
                        movieList,
                    ],
                },
            ],
        });
    }
}

// eslint-disable-next-line
class Writer extends Artist {
    constructor(options) {
        super(options);
        this.moviesWritten = options.moviesWritten || []; // optional
    }

    // DOM element generation method for a Writer instance
    generate() {
        // we define our movieList beforehand to reduce clutter
        const movieList = {
            tagName: 'ol',
            children: [],
        };

        // add a list element for each movie
        this.moviesWritten.forEach(movieTitle => {
            movieList.children.push({
                tagName: 'li',
                text: movieTitle,
            });
        });

        return generateDomElement({
            tagName: 'div',
            eventListeners: ['click', () => alert(`${this.constructor.name} ${this.name} was clicked!`)],
            attributes: [['id', this.id]],
            classes: ['writer-box'],
            children: [
                {
                    tagName: 'div',
                    classes: ['writer-info'],
                    children: [
                        {
                            tagName: 'h3',
                            text: this.name,
                        }, {
                            tagName: 'p',
                            classes: ['birth-year'],
                            text: this.birthYear,
                        }, {
                            tagName: 'p',
                            text: 'Couldn\'t find information.',
                        },
                    ],
                },
                {
                    tagName: 'img',
                    classes: ['writer-img'],
                    attributes: [['src', this.photoLink]],
                },
                {
                    tagName: 'div',
                    classes: ['movies-list'],
                    children: [
                        {
                            tagName: 'h4',
                            text: 'Also wrote for...',
                        },
                        movieList,
                    ],
                },
            ],
        });
    }
}

// eslint-disable-next-line
class Actor extends Artist {
    constructor(options) {
        super(options);
        this.moviesPlayed = options.moviesPlayed || []; // optional

        // optional for Artist instances, but not for Actor instances of Artist
        if (!this.photoLink) throw (`ConstructorError: ${this.constructor.name} ${this.name} must have a link to a photo!`);
    }

    // DOM element generation method for an Actor instance
    generate() {
        // we define our movieList beforehand to reduce clutter
        const movieList = {
            tagName: 'ol',
            children: [],
        };

        // add a list element for each movie
        this.moviesPlayed.forEach(movieTitle => {
            movieList.children.push({
                tagName: 'li',
                text: movieTitle,
            });
        });

        return generateDomElement({
            tagName: 'div',
            eventListeners: ['click', () => alert(`${this.constructor.name} ${this.name} was clicked!`)],
            attributes: [['id', [this.id]]],
            classes: ['actor-box'],
            children: [
                {
                    tagName: 'div',
                    classes: ['actor-info'],
                    children: [
                        {
                            tagName: 'h3',
                            text: this.name,
                        }, {
                            tagName: 'p',
                            classes: ['birth-year'],
                            text: this.birthYear,
                        }, {
                            tagName: 'p',
                            text: 'Couldn\'t find information.',
                        },
                    ],
                },
                {
                    tagName: 'img',
                    classes: ['actor-img'],
                    attributes: [['src', this.photoLink]],
                },
                {
                    tagName: 'div',
                    classes: ['actor-movies'],
                    children: [
                        {
                            tagName: 'h4',
                            text: 'Starred in...',
                        },
                        movieList,
                    ],
                },
            ],
        });
    }
}

// eslint-disable-next-line
class Movie {
    constructor(options) {
        this.movieTitle = options.movieTitle;
        this.movieGenre = options.movieGenre;
        this.movieRelease = options.movieRelease;
        this.moviePosterLink = options.moviePosterLink;
        this.movieTrailerLink = options.movieTrailerLink;
        this.moviePlotSummary = options.moviePlotSummary;

        this.actors = options.actors;
        this.writers = options.writers;
        this.directors = options.directors;

        // reject missing constructor params
        if (!this.actors) throw (`${this.constructor.name} must have an actor list!`);
        if (!this.writers) throw (`${this.constructor.name} must have a writer list!`);
        if (!this.directors) throw (`${this.constructor.name} must have a director list!`);
    }

    generate() {
        // generate an DOM elements describing the movie with the year, title, genre, wikipedia information, etc.
        // also execute the generator() methods of all other class instances, and add those to given DOM element
        const generatedElements = [];

        // page title
        generatedElements.push(generateDomElement({ tagName: 'h1', text: this.movieTitle }));

        // general info box
        generatedElements.push(generateDomElement({
            tagName: 'div',
            attributes: [['id', 'movie-info']],
            children: [
                { tagName: 'p' },
            ],
        }));

        // use the actorInfoList to get a list of Actors. The constructor can throw an error, but since our
        // information doesn't change dynamically this is only for development and we don't bother catching it.
        const directorsDiv = document.createElement('div');
        directorsDiv.id = 'directors-box';
        this.directors.forEach(director => {
            try {
                // generate the html element node for each Actor
                directorsDiv.appendChild(director.generate());
            } catch (error) {
                // catch any errors so the page still loads, and log them for debugging
                console.error(error);
            }
        });
        // append our generated actor elements to the DOM
        generatedElements.push(directorsDiv);

        generatedElements.push(generateDomElement({ tagName: 'h2', text: 'Test!' }));

        // use the actorInfoList to get a list of Actors. The constructor can throw an error, but since our
        // information doesn't change dynamically this is only for development and we don't bother catching it.
        const writersDiv = document.createElement('div');
        writersDiv.id = 'writers-box';
        this.writers.forEach(writer => {
            try {
                // generate the html element node for each Actor
                writersDiv.appendChild(writer.generate());
            } catch (error) {
                // catch any errors so the page still loads, and log them for debugging
                console.error(error);
            }
        });
        // append our generated actor elements to the DOM
        generatedElements.push(writersDiv);

        // use the actorInfoList to get a list of Actors. The constructor can throw an error, but since our
        // information doesn't change dynamically this is only for development and we don't bother catching it.
        const actorsDiv = document.createElement('div');
        actorsDiv.id = 'actors-box';
        this.actors.forEach(actor => {
            try {
                // generate the html element node for each Actor
                actorsDiv.appendChild(actor.generate());
            } catch (error) {
                // catch any errors so the page still loads, and log them for debugging
                console.error(error);
            }
        });
        // append our generated actor elements to the DOM
        generatedElements.push(actorsDiv);

        // return all of the generated movie elements
        return generatedElements;
    }

    /**
     * Tries to get extra information for all of our Writer, Director and Actor instances from Wikipedia.
     * Should be executed after page generation is done, this adds to the DOM later.
     */
    addExtraInfo() {
        // we won't ever reject this promise since its only goal is telling us when it's done
        return new Promise(resolve => {

            // store the promises for all of the wikipedia API calls and DOM edits we'll make
            const wikipediaPromises = [];

            // get wikipedia information for our actors
            this.actors.forEach(actor => {
                // set actor as 'this' in fetchWikipediaData()'s function scope
                const receivedPromise = fetchWikipediaData.call(actor);
                wikipediaPromises.push(receivedPromise);
            });

            // when all Promises are resolved, the page is fully loaded and we can resolve this main promise as well
            Promise.all(wikipediaPromises)
                .then(() => { resolve(); console.log(wikipediaPromises); });
        });
    }
}


// TODO: If a class has a wikipedia link, set timeout of 0 to load more information from wikipedia API. This should happen after all hardcoded information is loaded (hence timeout 0, taking advantage of the event loop). If this doesn't work add these functions to some sort of schedule that is only executed when the main scripts are done loading.

// possible setting: choose how much text from wikipedia is displayed before it's cut off. "Read more..." link to wikipedia.


// log how long it took our script to finish executing
console.log(`Classes script executed in ${Math.round((performance.now() - startClasses) * 10) / 10}ms!`);
