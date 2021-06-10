//Imports
const urls = require('../data/urls-data');
const uses = require('../data/uses-data');

//MIDDLEWARE
//---------------

//"URL is used" checks if a given URL id is in the "uses" data
function urlIsUsed(request, response, next){
    let {urlId} = request.params
    let foundURL = uses.find(use => use.urlId === Number(urlId))
    if (foundURL){
        response.locals.urlId = urlId
        return next()
    }
    next({
        status: 404,
        message: `The url with an ID of ${urlId} doesn't exist.`
    })

}

//Checks if the requested use log exists.
function useExists(request, response, next){
    const {useId} = request.params
    let foundUse = uses.find(use => use.id === Number(useId))
    if(foundUse){
        response.locals.useId = useId
        return next()
    }
    next({
         status: 404, 
         message: `The use with ID of ${useId} doesn't exist.`
    })
}

//Methods for root ('/urls/:urlId/uses) path
//----------------

//"List" returns a list of all use logs of a given URL
function list(request, response, next){
    let urlId = response.locals.urlId
    let URLuses = uses.filter(use => use.urlId === Number(urlId))

    response.status(200).json({data: URLuses})
}

//Returns all uses that match useID and urlID given
function read(request, response, next){
    let urlId = response.locals.urlId
    let useId = response.locals.useId
    let foundUse = uses.find(use => use.id === Number(useId) && use.urlId === Number(urlId))
    response.status(200).json({data: foundUse})
}

//Returns a 204
function destroy(request, response, next){
    return response.sendStatus(204)
}

//Exports
module.exports={
    list: [urlIsUsed, list],
    read: [useExists, urlIsUsed, read],
    destroy: [useExists, destroy]
}