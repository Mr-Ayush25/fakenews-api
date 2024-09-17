import app from "./src/app.js";
import cron from "./cron/cron.js";

import { config } from "./config/index.js";
import { connectToMongo } from "./utils/db.js";

connectToMongo()
    .then(() => {
        cron();
        app.listen(config.EXPRESS_PORT, () => {
            console.log(`Listening on ${config.BASE_URL}`);
        });
    })
    .catch((error) => {
        console.log("Connection Failed due to :", error);
        return process.exit(1);
    });

export default app;
