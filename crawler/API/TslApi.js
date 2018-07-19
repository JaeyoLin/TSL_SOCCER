const request = require('request');

const Constant = require('../utility/Constant');

/**
 * getGames
 * 取得所有足球賽事
 *
 */
const getGames = () => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: Constant.SOCCER_GAMES_JSON,
        method: 'GET',
        timeout: Constant.TIMEOUT,
        gzip: true,
        headers: Constant.HEADERS,
      },
      (error, response, body) => {
        if (error) {
          console.log('Error - Get games: ', error);

          reject({ error });
        } else {
          console.log(
            'StatusCode - Get games:',
            response && response.statusCode
          );

          let data = null;
          if (response && response.statusCode === 200) {
            data = JSON.parse(body);
          }
          resolve(data);
        }
      }
    );
  });
};

/**
 * getGameDetail
 * 取得賽事賠率明細
 *
 * @param {*} ni
 */
const getGameDetail = ni => {
  return new Promise((resolve, reject) => {
    request(
      {
        url: Constant.SOCCER_GAME.format(ni),
        method: 'GET',
        timeout: Constant.TIMEOUT,
        gzip: true,
        headers: Constant.HEADERS,
      },
      (error, response, body) => {
        if (error) {
          console.log('Error - Get details: ', error);

          reject({ error });
        } else {
          let detailData = null;
          if (response && response.statusCode === 200) {
            detailData = JSON.parse(body);
          }

          resolve(detailData);
        }
      }
    );
  });
};

const TslApi = {
  getGames,
  getGameDetail,
};

module.exports = TslApi;
