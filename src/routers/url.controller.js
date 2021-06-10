//Imports
const urls = require('../data/urls-data');
const uses = require('../data/uses-data')

//Access of ID of the last item in the data arrays. 
//(Used to add an item with a new ID)
let lastID = urls[urls.length-1].id
let lastUseId = uses[uses.length-1].id

//MIDDLEWARE
//---------------------

//Checks if the incoming request has an HREF key in its body.
function hasHref(request, response, next){
    const {data: {href} = {} } = request.body
    
    if (!href){
        return next({
            status: 400,
            message: `No href in ${request.body.data}`
        })
    } else{
    response.locals.href = href 
    next();
    }
}

//Checks if the requested URL ID is present in data
function requestedUrlExists(request, response, next){
    const {urlId} = request.params
    let urlExists = urls.find(url => url.id === Number(urlId))
    if (urlExists){
        response.locals.urlId = urlId
        response.locals.urlExists = urlExists
        return next();
    }
    next({
        status: 404,
        message: `The URL ID ${urlId} is not in our records.`
    })
}


//Methods for root path ('/'), "list" and "create".
//---------------------

//Lists all data in "urls"
function list(request, response){
    response.json({data: urls})
}

//Creates a new URL and adds it to "urls"
function create(request, response, next){
    let href = response.locals.href
    
    const newURL={
        href: href,
        id: ++lastID
    }
    urls.push(newURL)
    console.log(`A new URL was successfully added`)
    response.status(201).json({data: newURL})
}

//Methods for path ('/:urlId'), "read", "update", "destroy"
//---------------------

//Reads a requested URL from the server. Adds a record of access to "uses."
function read(request, response, next){
    let urlId = response.locals.urlId
    let timeAccessed = Date.now();
    let foundURL = response.locals.urlExists

    let newUse = {
        id: ++lastUseId,
        urlId: Number(urlId),
        time: timeAccessed
    }

    uses.push(newUse)
    response.status(200).json({data: foundURL})
}

//Updates the HREF of an existing URL
function update(request, response, next){
    let newHref = response.locals.href
    let url = response.locals.urlExists
    url.href = newHref
    
    response.json({data: url})
}

module.exports={
    list,
    create: [hasHref, create],
    read: [requestedUrlExists, read],
    update: [hasHref, requestedUrlExists, update]
}