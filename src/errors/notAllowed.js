function notAllowed(request, response, next){
    next({
        status: 405,
        message: `${request.method} is not allowed for ${request.originalURL}`
    })
}

module.exports = notAllowed;