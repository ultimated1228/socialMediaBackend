const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find()
            .populate('thoughts')
            .populate('friends')
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .populate('thoughts')
            .populate('friends');

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create a new user
    async createUser(req, res) {
        try {
            const dbUserData = await User.create(req.body);
            res.json(dbUserData);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //written, not tested
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //  written, not tested
    async removeUser(req, res) {
        try {
            const user = await User.findById(req.params.userId)
            const deleteThoughts = await Thought.deleteMany({ username: user.username })
            const deleteUser = await User.deleteOne({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json({ message: 'User and associated thoughts deleted', user });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
    //written not tested
    async addFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: 'No user with that ID' });
            }

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //written not tested
    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
                )

            if (!friend) {
                return res.status(404).json({ message: 'No friend with that ID' });friend}

            res.json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};