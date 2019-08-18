const Dialogflow = require('dialogflow');
const Pusher = require('pusher');

const { DIALOGFLOW_PRIVATE_KEY, DIALOGFLOW_CLIENT_EMAIL, PUSHER_APP_CLUSTER, PUSHER_APP_ID, PUSHER_APP_KEY, PUSHER_APP_SECRET } = process.env

const projectId = 'apa-citation-bot-wcnoxf'; 
const sessionId = '123456';
const languageCode = 'en-US';

const config = {
  credentials: {
    private_key: DIALOGFLOW_PRIVATE_KEY,
    client_email: DIALOGFLOW_CLIENT_EMAIL,
  },
};

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_APP_KEY,
  secret: PUSHER_APP_SECRET,
  cluster: PUSHER_APP_CLUSTER,
  encrypted: true,
});

const sessionClient = new Dialogflow.SessionsClient(config);

const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const processMessage = message => {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode,
      },
    },
  };

  sessionClient
    .detectIntent(request)
    .then(responses => {
      const result = responses[0].queryResult;
      return pusher.trigger('bot', 'bot-response', {
        message: result.fulfillmentText,
      });
    })
    .catch(err => {
      console.error('ERROR:', err);
    });
}

module.exports = processMessage;