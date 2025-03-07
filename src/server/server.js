const express = require('express');
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const cors = require('cors');
const apiBddRoutes = require('./routes/apiBddRoutes');
const apiMangaRoutes = require('./routes/apiMangaRoutes');
const apiAuthRoutes = require('./routes/apiAuthRoutes');
require('dotenv').config();


const PORT = process.env.PORT || 5050;
const URL = process.env.MONGO_URI
const app = express();
const baseUrlBdd = '/members';
const baseUrlManga = '/manga';
const baseUrlAuth = '/auth';

app.disable('x-powered-by');
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(baseUrlBdd, apiBddRoutes);
app.use(baseUrlManga, apiMangaRoutes);
app.use(baseUrlAuth, apiAuthRoutes)

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
    console.log(`Server listening on at http://localhost:${PORT}${baseUrlManga}`);
});