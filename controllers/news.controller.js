import { asyncHandler } from "../utils/asynHandle.js";
import { News } from "../models/news.model.js";

const fetchAllNews = asyncHandler(async (req, res) => {
    console.log("Got here", req.query?.page);
    const page = parseInt(req.query?.page) || 1;
    const limit = 5;

    const news = await News.find()
        .skip((page - 1) * limit)
        .limit(limit);

    const totalNews = await News.countDocuments();
    const totalPages = Math.ceil(totalNews / limit);

    console.log("data here", totalNews, totalPages);

    return res.status(200).json({
        news,
        totalPages,
        currentPage: page,
    });
});

const handleInteraction = asyncHandler(async (req, res) => {
    const { id, interaction, userId } = req.body;

    if (!id || !interaction || !userId) {
        return res
            .status(400)
            .json({ message: "Id, interaction, and userId are required" });
    }

    let update;

    if (interaction === "up") {
        const newsItem = await News.findById(id);
        if (newsItem.upvotes.includes(userId)) {
            update = {
                $pull: { upvotes: userId },
            };
        } else {
            update = {
                $pull: { downvotes: userId },
                $addToSet: { upvotes: userId },
            };
        }
    } else {
        const newsItem = await News.findById(id);
        if (newsItem.downvotes.includes(userId)) {
            update = {
                $pull: { downvotes: userId },
            };
        } else {
            update = {
                $pull: { upvotes: userId },
                $addToSet: { downvotes: userId },
            };
        }
    }

    const result = await News.findOneAndUpdate({ _id: id }, update, {
        new: true,
    });

    if (!result) {
        return res.status(404).json({ message: "News not found" });
    }

    result.voteCount = result.upvotes.length + result.downvotes.length;
    await result.save();

    return res.status(200).json(result);
});

export { fetchAllNews, handleInteraction };
