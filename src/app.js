require('dotenv').config();
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const dayRouter = require('./routes/days');

app.use(dayRouter);

app.listen(PORT, () => {
  console.info(`App listening on port ${PORT}`)
});