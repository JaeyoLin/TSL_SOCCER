const request = require('request');

const LINE_CONFIG = require('./config');

const sendMessage = message => {
  if (LINE_CONFIG.CHANNEL_ACCESS_TOKEN !== '' && LINE_CONFIG.TO !== '') {
    request(
      {
        url: 'https://api.line.me/v2/bot/message/push',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
          Authorization: 'Bearer ' + LINE_CONFIG.CHANNEL_ACCESS_TOKEN,
        },
        body: JSON.stringify({
          to: LINE_CONFIG.TO,
          messages: [
            {
              type: 'text',
              text: message,
            },
          ],
        }),
      },
      (error, response, body) => {
        if (error) {
          console.log('Line Error: ', error);
        }
      }
    );
  }
};

const Line = {
  sendMessage,
};

module.exports = Line;
