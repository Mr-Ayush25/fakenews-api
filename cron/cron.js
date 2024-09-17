import axios from "axios";

import { config } from "../config/index.js";
import { News } from "../models/news.model.js";

const cron = () => {
    fetchNews();
    setInterval(fetchNews, 1 * 60 * 60 * 1000);
};

const fetchNews = async () => {
    let options = {
        method: "get",
        url: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${config.NEWS_API_KEY}`,
    };

    try {
        let news = await axios.request(options);
        console.log(news.data);
        if (news.status == 200 && news.data?.totalResults) {
            let dataUpdated = await News.insertMany(news.data.articles);
            console.log("Data updated in db", dataUpdated);
        }
    } catch (error) {
        console.log("Error occured at crons.js ::", error);
    }
};

export default cron;
