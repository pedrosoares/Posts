import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: {
        type: String,
        required: 'Title of the post is required'
    },
    content: {
        type: String,
        required: 'Content of the post is required'
    },
    user_id: {
        type: Number,
        required: 'User is required'
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'posted']
        }],
        default: ['pending']
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    deleted_at: {
        type: Date,
        default: null
    }
});

PostSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', PostSchema);