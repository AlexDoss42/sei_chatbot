require('dotenv').config({ path: 'variables.env' });

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var processMessage = require('./process-message');
var Pusher = require('pusher');

const { PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_SECRET, PUSHER_APP_CLUSTER, PORT } = process.env

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var channels_client = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_APP_KEY,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  encrypted: true
});

channels_client.trigger('my-channel', 'my-event', {
  "message": "hello world"
});

app.post('http://localhost:4242/chat', (req, res) => {
  const { message } = req.body;
  console.log(message)
  processMessage(message);
});

const server = app.listen(PORT, () => {
  console.log(`IT'S OVER ANAKIN! I have the ${PORT}`);
})