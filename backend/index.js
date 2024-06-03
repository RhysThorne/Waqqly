const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('./routes/routes');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const port = process.env.PORT || 5000;
const app = express();

morgan.token('req-body', function (req, res) {
  return JSON.stringify(req.body);
});

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(cors());


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :req-body'));

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

app.use(routes);

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port ${port}`);
});
