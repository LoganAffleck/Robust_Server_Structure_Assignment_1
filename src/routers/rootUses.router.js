const router = require('express').Router({mergeParams: true});
const controller = require('./rootUses.controller');
const notAllowed = require('../errors/notAllowed');

router
    .route('/:useId')
    .get(controller.read)
    .delete(controller.remove)
    .all(notAllowed)
router
    .route('/')
    .get(controller.list)
    .all(notAllowed)

module.exports = router