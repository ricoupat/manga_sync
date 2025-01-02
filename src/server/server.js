const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dataBaseEndpoints = require('./routes/dataBaseEndpoints');
require('dotenv').config();

const PORT = process.env.PORT || 5050;
const URL = process.env.MONGO_URI
const app = express();

app.use(cors());
app.use(express.json());
app.use("/members", dataBaseEndpoints);

mongoose
    .connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('MongoDB database connected...'))
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1);
    });

// start the Express server
app.listen(PORT, () => {
    console.log(`Server listening on at http://localhost:${PORT}`);
});