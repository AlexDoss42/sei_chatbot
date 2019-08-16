require('dotenv').config({ path: 'variables.env' });

    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');
    var Pusher = require('pusher');

    const app = express();

    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    var channels_client = new Pusher({
      appId: '843700',
      key: 'd149510c78a9199279a5',
      secret: '7b7f39303a0551681578',
      cluster: 'us3',
      encrypted: true
    });

    channels_client.trigger('my-channel', 'my-event', {
      "message": "hello world"
    });

    app.post('/chat', (req, res) => {
      const { message } = req.body;
      console.log(message);
    });

    app.set('port', process.env.PORT || 4242);
    const server = app.listen(app.get('port'), () => {
      console.log(`Express running → PORT ${server.address().port}`);
    });