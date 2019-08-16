require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var processMessage = require('./process-message');

const { PORT } = process.env

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/chat', (req, res) => {
  const { message } = req.body;
  console.log(message)
  processMessage(message);
});

const server = app.listen(PORT, () => {
  console.log(`IT'S OVER ANAKIN! I have the ${PORT}`);
})