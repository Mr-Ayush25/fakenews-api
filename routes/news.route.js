import { Router } from "express";
import {
    fetchAllNews,
    handleInteraction,
} from "../controllers/news.controller.js";

export const newsRouter = Router();

newsRouter.route("/").get(fetchAllNews);
newsRouter.route("/interaction").patch(handleInteraction);
