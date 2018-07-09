const request = require('request');

const LINE_CONFIG = require('./config');

const send = message => {
  if (LINE_CONFIG.TOKEN !== '') {
    request(
      {
        url: 'https://notify-api.line.me/api/notify',
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + LINE_CONFIG.TOKEN,
        },
        formData: {
          message,
        },
      },
      (error, response, body) => {
        if (error) {
          console.log('Line Error: ', error);
        }
      }
    );
  }
};

const LineNotify = {
  send,
};

module.exports = LineNotify;
