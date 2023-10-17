const { Schema, model, Types } = require('mongoose');
import { isLength } from 'validator';
import { schema } from '../../../program-files/18-NoSQL/01-Activities/17-Ins_Subdocuments/models/Department';

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
        thoughtText: { type: String, required: 'Username is required', validate: [isLength, { min: 1, max: 128 }] },
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