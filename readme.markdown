# Asynchronous patterns in JavaScript

One of the best features of JavaScript is it's asynchrounous nature. This
allows you to write efficient code but it is also the source of a lot of nasty
bugs. These bugs are often very hard to find and often seem to popup at random.

If you are going to be a JavaScript developer you have to understand it's
asynchronous patterns completely in order to write quality code. This blog will
help you with that!

# Three patterns
In this article we talk about describe three patterns, the Synchronous pattern,
the Callback pattern and the Promise pattern.

##  Syncronous
// TODO

## Callback
// TODO

## Promise
// TODO

# Chuck Norris
Imaging we are building an API that will that wil return a Chuck Norris joke
from a webservice (chucknorris.io) based on a category that we provide. The API
has only one function, but comes in three flavors:
 - one synchronous (suffixed with Sync)
 - one that expects a node-style callback (suffixed with Callback)
 - one that returns a promise (suffixed with Promise)

With this API we can make a very simple program that will display a Chuck Norris
joke in a category. The program is implemented as a webpage.

Let's build that program!

## The page
First, we need a webpage with a dropdown for selecting the joke category, a
button to do the actual retrieving of the joke and a place to put the joke
we fetched.

```html
<div>
    <p>
        <select id="joke-type">
            <option value="none"></option>
            <option value="explicit">explicit</option>
            <option value="dev">dev</option>
            <option value="movie">movie</option>
            <option value="food">food</option>
            <option value="celebrity">celebrity</option>
            <option value="science">science</option>
            <option value="political">political</option>
            <option value="sport">sport</option>
            <option value="religion">religion</option>
            <option value="animal">animal</option>
            <option value="music">music</option>
            <option value="history">history</option>
            <option value="travel">travel</option>
            <option value="career">career</option>
            <option value="money">money</option>
            <option value="fashion">fashion</option>
        </select>
        <button id="get-joke">Get joke!</button>
    </p>
    <p id="joke-display">
    </p>
</div>
```

## Display a joke

To display a joke we call our webservice when we click the `#get-joke` button.
To do this we need to fetch the category from the `#joke-type` dropdown and,
when the joke is fetched, then put it in the `#joke-display` element.

So we attach an event handler to `#get-joke` and call the `getJoke` function
in that handler.

This wil look something like this:
```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", function (e) {
    /*
    This is where things het interesting!
    */
}, false);
```

### Synchronous

In the synchronous version we call the `getJokeSync` function. The actual joke
is the return value of that function, so we can simply use that value directly.

```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", function (e) {
    var jokeText = getJokeSync(jokeTypeElement.value);
    displayJokeElement.innerText = jokeText;
}, false);
```

### Callback

Things get a little more complicated when we use a callback. We have to provide
a function that will execute when the joke is fetched.
In a nodejs style callback function the first argument is the error, if there
was any. The second argument is the result of the function, in our
case this is the joke.

If an error occurs in the synchronous version, that error is thrown
automatically, we don't have to do this ourselves, but in this (the callback)
version we just get the error back as a result, we have to do something with it
ourselves. So if we want the same behaviour as the synchronous version we have
to throw it.

If there is no error, the joke will put in an element, just as in the
synchronous version.

```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", function (e) {
    getJokeCallback(jokeTypeElement.value, function (err, jokeText) {
        if (err) throw err;

        displayJokeElement.innerText = jokeText;
    });
}, false);
```

### Promise
In the promise version, the first argument of the then method is the success
callback. It has only one arguments, that is the result of the function. In our
case, the joke.

We can put the joke in the right element just as we did with the synchronous version.

```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", function (e) {
    getJoke(jokeTypeElement.value).then(function (jokeText) {
        displayJokeElement.innerText = jokeText;
    });
}, false);
```

## User-friendly errors
If we fetch a joke from the internet, all sorts of things could go wrong!
We might nog have an internet connection or maybe chucknorris.io is offline!
Maybe the entire internet is not working, or maybe we made a mistake in
the code.

This will naturallt cause an error, but our non technical users won't know
what to do with the error. That is why we need to display a friendly error
message to tell them that something went wrong and they should try again
later.

### Synchronous
Simply put the call to the `getJokeSync` function in try / catch blocks and
handle the error in the catch block.

```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", function (e) {
    try {
        var jokeText = getJokeSync(jokeTypeElement.value);
        displayJokeElement.innerText = jokeText;
    }
    catch (err) {
        alert("Something went wrong! Please try again later!");
    }
}, false);
```

### Callback

If we use a node-style callback, the first argument of the callback is the
error. If there is an error, we can handle it nicely, if there is no error
we display the joke.

Please note that we are heading for a [pyramid of doom](http://www.pyramidofdoom.com)
here! One of the pitfalls of javascript.

```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", function (e) {
    getJoke(jokeTypeElement.value, function (err, jokeText) {
        if (err) {
            alert("Something went wrong! Please try again later");
        }
        else {
            displayJokeElement.innerText = jokeText;
        }
    });
}, false);
```

Alternatively you can stop the execution of the function if an error occures by
returning from the function if there is an error. This might make your code a
little more clean and less pyramid-ish.

```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", function (e) {
    getJoke(jokeTypeElement.value, function (err, jokeText) {
        if (err) {
            alert("Something went wrong! Please try again later...");
            return;
        }
        
        displayJokeElement.innerText = jokeText;
    });
}, false);
```

### Promise
The second argument of the promise's then method is the error handler, we can use it to
present our user-friendly error message.

```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", function (e) {
    getJoke(jokeTypeElement.value).then(function (jokeText) {
        displayJokeElement.innerText = jokeText;
    }, function (err) {
        alert("Something went wrong! Please try again later...");
    });
}, false);
```

In ECMAScript 2017 (es2017) you can also achieve this with an async
function using the async / await syntax! Compare this code to the asynchronous
version, it almost looks the same! 

```javascript
var jokeTypeElement = document.getElementById("joke-type")
var getJokeElement = document.getElementById("get-joke");
var displayJokeElement = document.getElementById("joke-display");

getJokeElement.addEventListener("click", async function (e) {
    try {
        var jokeText = await getJokePromise(jokeTypeElement.value);
        displayJokeElement.innerText = jokeText;
    }
    catch (err) {
        alert("Something went wrong!");
    }
}, false);
```

### Modern
Next to async / await, es2017 offerst a lot more improvements, so let's upgrade
our code to make is modern!

First we replace the `var`s by `const`s, you should always use `const` if a value
does nog change, if a value does change, use `let`.

Next, we can use an arrow function (`=>`) instead of a `function` 

```javascript
// use const!
const jokeTypeElement = document.getElementById("joke-type")
const getJokeElement = document.getElementById("get-joke");
const displayJokeElement = document.getElementById("joke-display");

// use an arrow function
getJokeElement.addEventListener("click", async e => {
    try {
        const jokeText = await getJokePromise(jokeTypeElement.value);
        displayJokeElement.innerText = jokeText;
    }
    catch (err) {
        alert("Something went wrong!");
    }
}, false);
```


## Implementing the getJoke function
Let's take a look under the hood of the `getJoke` function! This function will
use another function, calles `getJson`. Just like the `getJoke` function, it
comes n a couple of flavors (Sync, Callback and Promise). This function
will perform a http GET request and return the response as JSON.

In every version of the `getJoke` function we will first construct the url,
and pass that url to the `getJson` function. This function will return an
object, in the value property of that object is the joke.

So the `getJoke` function will always look something like this:
```javascript
function getJoke(category) {
    var endpoint = "https://api.chucknorris.io/jokes/random";
    var url = endpoint + "?category=" + encodeURIComponent(category) + "";
    /*
    interesting stuff right here!
    */
}
```

### Synchronous
The `getJokeSync` function will call the synchronous version of the
`getJsonSync` function to fetch the data. The value property of the returned
data object will contain the actual joke, so we simply return that.

```javascript
function getJokeSync(category) {
    var endpoint = "https://api.chucknorris.io/jokes/random";
    var url = endpoint + "?category=" + encodeURIComponent(category) + "";
    var data = getJsonSync(url);
    return data.value;
}
```

The `getJsonSync` function uses the `XMLHttpRequest` object in synchronous
mode. Then it will parse the response text as a JSON string and return the
parsed object.

```javascript
function getJsonSync(url) {
    var xhr = new XMLHttpRequest();
    // Set the third argument to false for synchronous behaviour
    xhr.open("GET", url, false);
    xhr.send();

    if (xhr.status !== 200) {
        throw new Error("unexpected response " + xhr.status + "");
    }

    const data = JSON.parse(xhr.responseText);
    return data;
}
```

### Callback
The `getJokeCallback` function will call the `getJsonCallback` and return the
value field of the data it returns to the callback. If there is an error,
it will call the callback with that error.

It is very important that the callback is called exactly once in any case
(error or no error). This is the biggest source of bugs in asynchronous code.
If you never invoke the callback or invoke it more then once strange and 
unpredictable things can happen in your code. If you experience random bugs
you should first check your callbacks involved! They are probably the cause.  

```javascript
function getJokeCallback(category, cb) {
    var endpoint = "https://api.chucknorris.io/jokes/random";
    var url = endpoint + "?category=" + encodeURIComponent(category) + "";
    getJsonCallback(url, function (err, data) {
        // if there is an error, invoke the callback with that error
        if (err) return cb(err);
        
        const value = data.value;

        // we are done here, so let's invoke the callback with the value
        cb(null, value);
    });
}
```

In `getJsonCallback`, we make sure that the callback (`cb`) is always
executed exactly once. We wrap the onload code in try / catch blocks and call
the callback in the catch block and at the end of the try block so that the
callback is executed even when something goees wrong. If something goes wrong
we pass the error as the first argument of the callback.

If the `onerror` handler is fired we call the callback with the error argument
that `onerror` provides.

There is a try / catch block with a callback in the catch handler. This is done
so that any error is passed to the callback. This is important because the
response text might not be JSON at all, if we try to parse it, we get an error
and that would stop our code execution. Now we absolutely need to invoke the
callback exactly once, even in case of an error, that is why we wrap it in a
try / catch block.

You might feel that it is quite hard to determine if the callback is invoked
exactly once in this code. Well, mee too. This code right here should be
tested thourughly before used in production, or, even better just take a
differnt approach with fetch (we will implement that later in this article).

```javascript
function getJsonCallback(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = function (e) {
        try {
            if (xhr.readyState !== 4) return;

            if (xhr.status !== 200) {
                throw new Error("unexpected response " + xhr.status + "");
            }

            const data = JSON.parse(xhr.responseText);
            cb(null, data);
        }
        catch (err) {
            cb(err);
        }
    };
    xhr.onerror = function (e) {
        cb(new Error("XHR error"));
    };
    xhr.send();
}
```

### Promise
We create a new `Promise` and provide a function that will handle our async
code. This function has two arguments, `resolve` and `reject`. They are both
callbacks, the `resolve` handler will be called with the result when the async
action is complete, if there is an error we call the `reject` callback with the
action.

```javascript
function getJokePromise(category) {
    var endpoint = "https://api.chucknorris.io/jokes/random";
    var url = endpoint + "?category=" + encodeURIComponent(category) + "";
    return getJsonPromise(url).then(function (data) {
        var value = data.value;
        return value;
    });
}
```

```javascript
function getJsonPromise(url) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url);
        xhr.onload = function (e) {
            try {
                if (xhr.readyState !== 4) return;

                if (xhr.status !== 200) {
                    throw new Error("unexpected response " + xhr.status + "");
                }

                const data = JSON.parse(xhr.responseText);
                resolve(data);
            }
            catch (err) {
                reject(err);
            }
        };
        xhr.onerror = function (err) {
            reject(new Error("XHR error"));
        };
        xhr.send();
    });
}
```

### Async / await
Now that we have a function that returns a promise we could also use the
async / await syntax to make the code more readable.

Not that this code looks almost exactly the same as the synchronous version. 

```javascript
async function getJokePromise(category) {
    var endpoint = "https://api.chucknorris.io/jokes/random";
    var url = endpoint + "?category=" + encodeURIComponent(category) + "";
    var data = await getJsonPromise(url);
    var value = data.value;
    return value;
}
```

### Modern
Next to async / await we can use some more modern JavaScript features, like
template strings, destructuring and the fetch API. This will make the code
even pretier.

```javascript
async function getJokeModern(category) {
    const endpoint = "https://api.chucknorris.io/jokes/random";
    // template strings happening right here!
    const url = `${endpoint}?category=${encodeURIComponent(category)}`;
    // destructuring is nice!
    const {value} = await getJsonModern(url);
    return value;
}
```

We can (and should) use the newer fetch API, this works much easier then the
ancient `XMLHttpRequest` object.

```javascript
async function getJsonModern(url) {
    // fetch simply return a promise!
    const response = await fetch(url);

    if (response.status !== 200) {
        throw new Error(`unexpected response ${response.status}`);
    }

    // this will read the response as json
    const data = await response.json();
    return data;
}
```

