const { Thought } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v');

            if (!thought) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            res.json(dbThoughtData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //written, not tested
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id!' });
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //  written, not tested
    async removeThought(req, res) {
        try {
            const thought = await Thought.findByIdAndDelete({ _id: req.params.thoughtId })

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //written not tested
    async addReaction(req, res) {
        try {
            const reaction = await thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { responses: req.body } },
            { runValidators: true, new: true }
            );

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //written not tested
    async removeReaction(req, res) {
        try {
            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
                )

            if (!reaction) {
                return res.status(404).json({ message: 'No reaction with that ID' });
            }

            res.json(reaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};