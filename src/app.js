const express = require("express");
const app = express();
//Import routers here: 
const urlsRouter = require('./routers/url.router');
const rootUsesRouter = require('./routers/rootUses.router')

app.use(express.json());

// TODO: Add code to meet the requirements and make the tests pass.
app.use('/urls', urlsRouter);
app.use('/uses', rootUsesRouter);

//Not Found Handler: 
app.use((request, response, next)=>{
    next({status: 404, message: `Not found: ${request.originalUrl}`})
});

//Error Handler
app.use((error, request, response, next)=>{
    const {status = 500, message = 'Something went wrong'} = error;
    response.status(status).json({error: message});
})
module.exports = app;
