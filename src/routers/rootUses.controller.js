//Imports
const urls = require('../data/urls-data');
const uses = require('../data/uses-data');

function useExists(request, response, next){
    const {useId} = request.params
    let foundUse = uses.find(use => use.id === Number(useId))
    if(foundUse){
        response.locals.foundUse = foundUse
        return next()
    }
    next({
        status: 404,
        message: `Use ${useId} not found`
    })
}

function list(request, response, next){
    response.status(200).json({data: uses})
}

function read(request, response, next){
    let foundUse = response.locals.foundUse
    response.status(200).json({data: foundUse})
}

function remove(request, response, next){
    response.sendStatus(204)
}

module.exports={
    list,
    read: [useExists, read],
    remove: [useExists, remove]
}