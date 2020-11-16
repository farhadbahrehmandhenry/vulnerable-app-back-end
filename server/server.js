const express = require('express');
const apiRouter = require('./routes');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/vulnerable', apiRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server is running on port ${port}`));