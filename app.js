const express = require("express");
const connectDb = require("./config/dbConnection")
require('dotenv').config();
const logger = require("./logger");

connectDb();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/v1/tasks', require("./routes/tasks.routes"));

app.listen(port, () => {
    logger.info(`Server runnning on port ${port}`);
});