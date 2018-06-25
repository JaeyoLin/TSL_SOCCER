const request = require("request");

const Constant = require("./common/Constant");

request({
  url: Constant.SOCCER_GAMES_JSON,
  method: 'GET',
  timeout: Constant.TIMEOUT,
}, (error, response, body) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
  }
});