const mongoose = require('mongoose'); 
const { Schema, model, Types } = require('mongoose');


const reactionSchema = new mongoose.Schema({
    reactionId: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toISOString().split("T")[0];
        },
    }
});

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: 'Username is required', minlength: 1, maxlength: 128 },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => {
                if (date) return date.toISOString().split("T")[0];
            },
        },
        username: { type: String, required: true },
        reactions: [reactionSchema]
    },
    {
        toJSON: { getters: true, virtuals: true },
    }
);

thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length
    });

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;