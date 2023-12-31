const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const { User, Thought } = require('./models');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});

//need the following routes to complete this assignment:
// /api/users

// GET all users

// GET a single user by its _id and populated thought and friend data

// POST a new user:

// // example data
// {
//   "username": "lernantino",
//   "email": "lernantino@gmail.com"
// }
// PUT to update a user by its _id

// DELETE to remove user by its _id

// BONUS: Remove a user's associated thoughts when deleted.



// /api/users/:userId/friends/:friendId

// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list


// /api/thoughts

// GET to get all thoughts

// GET to get a single thought by its _id

// POST to create a new thought (don't forget to push the created thought's _id to the associated user's thoughts array field)

// // example data
// {
//   "thoughtText": "Here's a cool thought...",
//   "username": "lernantino",
//   "userId": "5edff358a0fcb779aa7b118b"
// }
// PUT to update a thought by its _id

// DELETE to remove a thought by its _id


// /api/thoughts/:thoughtId/reactions

// POST to create a reaction stored in a single thought's reactions array field

// DELETE to pull and remove a reaction by the reaction's reactionId value




// in class route examples
// app.get('/all-books', async (req, res) => {
//   try {
//     const result = await Book.find({});
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.get('/sum-price', async (req, res) => {
//   try {
//     const result = await Book
//       .aggregate([
//         { $match: { inStock: true } },
//         {
//           $group: {
//             _id: null,
//             sum_price: { $sum: '$price' },
//             avg_price: { $avg: '$price' },
//             max_price: { $max: '$price' },
//             min_price: { $min: '$price' },
//           },
//         },
//       ]);
//     res.status(200).json(result);
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// db.once('open', () => {
//   app.listen(PORT, () => {
//     console.log(`API server running on port ${PORT}!`);
//   });
// });
