import { config } from "../config/index.js";
import express from "express";
import cors from "cors";

import { newsRouter } from "../routes/news.route.js";

// Cors Config and express initialization
const app = express();

app.use(
    cors({
        origin: config.ORIGIN,
        credentials: true,
    })
);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// ------------------------------------------------ExpressApp----------------------------------

//Routes
app.get("/", (req, res) => {
    res.send("Site is up and running!");
});
app.use("/api/v1/news", newsRouter);

export default app;
