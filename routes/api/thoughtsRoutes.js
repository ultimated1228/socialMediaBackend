const router = require('express').Router();
const {
    getThoughts,
    createThought,
    getSingleThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtsController');

// /api/thoughts
router.route('/')
    .get(getThoughts)
    .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(removeThought);


// /api/thoughts/:thoughtId/reactions/
router.route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionsId
router.route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;