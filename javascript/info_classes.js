// track how fast our script executes
const startClasses = performance.now();


/////////////////////////////////
// DOM ELEMENT GENERATION CODE //
/////////////////////////////////

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

    return elem;
}


////////////////////////////////////
// CLASSES AND GENERATION METHODS //
////////////////////////////////////

// the Artist class only defines basic properties and doesn't have a generate() method
class Artist {
    constructor(options) {
        this.name = options.name;
        this.birthYear = options.birthYear;

        if (!this.name) throw (`ConstructorError: ${this.constructor.name} must have a name!`);
        if (!this.birthYear) throw (`ConstructorError: ${this.constructor.name} must have a year of birth!`);
    }
}

// eslint-disable-next-line
class Director extends Artist {
    constructor(options) {
        super(options);
        this.moviesDirected = options.moviesDirected || [];
    }
}

// eslint-disable-next-line
class Writer extends Artist {
    constructor(options) {
        super(options);
        this.booksWritten = options.booksWritten || [];
    }
}

// eslint-disable-next-line
class Actor extends Artist {
    constructor(options) {
        super(options);
        this.moviesPlayed = options.moviesPlayed || [];
    }

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
            attributes: ['style', 'border: 3px double blue; border-radius: 10px; padding: 1em; margin: 0.5em'],
            eventListeners: ['click', () => alert(`${this.name} was clicked!`)],
            children: [
                {
                    tagName: 'h3',
                    text: this.name,
                },
                movieList,
            ],
        });
    }
}

// eslint-disable-next-line
class Movie {
    constructor(options) {
        console.log(options); // temp
        this.paramName = options.paramName;

        // reject missing constructor params
        if (!this.paramName) throw (`${this.constructor.name} must have ...!`);
    }

    generateInfoCard() {
        // generate an info card about the movie with the year, title, genre, wikipedia information, etc.
    }
}


// TODO: If a class has a wikipedia link, set timeout of 0 to load more information from wikipedia API. This should happen after all hardcoded information is loaded (hence timeout 0, taking advantage of the event loop). If this doesn't work add these functions to some sort of schedule that is only executed when the main scripts are done loading.

// possible setting: choose how much text from wikipedia is displayed before it's cut off. "Read more..." link to wikipedia.


// log how long it took our script to finish executing
console.log(`Classes loaded! ${Math.round((performance.now() - startClasses) * 10) / 10}ms`);
