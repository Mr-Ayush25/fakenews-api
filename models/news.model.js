import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    source: {
        id: {
            type: String,
            default: null,
        },
        name: {
            type: String,
        },
    },
    author: {
        type: String,
        default: "Unknown",
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    url: {
        type: String,
    },
    urlToImage: {
        type: String,
    },
    publishedAt: {
        type: Date,
    },
    content: {
        type: String,
    },
    upvotes: {
        type: [String],
        default: [],
    },
    downvotes: {
        type: [String],
        default: [],
    },
    voteCount: {
        type: Number,
        default: 0,
    },
});

const News = mongoose.model("News", articleSchema);

export { News };
