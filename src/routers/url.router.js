const router = require('express').Router({mergeParams: true});
const usesRouter = require('./uses.router');
const rootUsesRouter = require('./rootUses.router');
const controller = require('./url.controller');
const notAllowed = require('../errors/notAllowed');

router.use('/:urlId/uses', usesRouter)

router
    .route('/:urlId')
    .get(controller.read)
    .put(controller.update)
    .all(notAllowed)


router
    .route('/')
    .get(controller.list)
    .post(controller.create)
    .all(notAllowed);

module.exports = router;