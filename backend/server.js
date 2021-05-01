const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');

require('dotenv').config();

const port = process.env.PORT || 5000;
const mongoURI = process.env.ATLAS_URI;

const app = express();
const mongoDBConnection = mongoose.connection;

app.use(cors());
app.use(express.json());

mongoose.connect(mongoURI, {useNewUrlParser: true, useCreateIndex: true});
mongoDBConnection.once('open', () => {
    console.log(`MongoDB connection established seccessfully`);
})

app.use('/users', usersRouter);
app.use('/exercises', exercisesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})