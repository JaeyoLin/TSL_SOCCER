const fs = require('fs');
const request = require("request");
const cheerio = require("cheerio");
const moment = require('moment-timezone');

const Constant = require("./common/Constant");

request({
  url: Constant.SOCCER_GAMES_JSON,
  method: 'GET',
  timeout: Constant.TIMEOUT,
  gzip: true,
  headers: Constant.HEADERS,
}, (error, response, body) => {
  if (error) {
    console.log('Error:', error);
  } else {
    console.log('statusCode:', response && response.statusCode);
    
    const data = JSON.parse(body);

    if (data.length) {
      data.forEach((item, index) => {

        const fileName = `./json/${item.kdt}.json`;

        // 判斷是否已有賠率檔案
        let isExist = false;
        if (fs.existsSync(fileName)) {
          isExist = true;
        }

        let obj = {
          code: '',
          date: '',
          teams: {
            hi: '',
            ai: '',
          },
          rates: [],
        };

        // 賽事編號
        obj.code = item.code;

        // 日期
        const gameTime = moment.tz(item.kdt, 'Asia/Taipei');
        obj.date = gameTime.format('YYYY-MM-DD HH:mm');

        // 查詢時間
        const searchTime = moment.tz(item.markets.edt, 'Asia/Taipei');

        // 隊伍名稱
        obj.teams.hi = item.lexicon.resources[item.hi];
        obj.teams.ai = item.lexicon.resources[item.ai];

        // 賠率
        let rate = {
          hi: 0,
          draw: 0,
          ai: 0,
          time: searchTime.format('YYYY-MM-DD HH:mm'),
        };

        const tmpArray = item.markets[0].codes;
        if (tmpArray) {
          tmpArray.forEach((tmp) => {
            const c = tmp.c;

            switch (c) {

              // 客勝
              case 402:
                rate.hi = tmp.oddPerSet[1];
                break;

              // 合局
              case 401:
                rate.draw = tmp.oddPerSet[1];
                break;
              
              // 主勝
              case 400:
                rate.ai = tmp.oddPerSet[1];
                break;
            }
          });
        }

        obj.rates.push(rate);

        if (!isExist) {
          fs.writeFile(fileName, JSON.stringify(obj), 'utf8', (err) => {
            if (err) {
              console.log('err', err);
            }
          });
        } else {
          console.log('File is existed.');
        }
      });
    }
  }
});