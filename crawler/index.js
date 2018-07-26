const fs = require('fs');
const schedule = require('node-schedule');
const moment = require('moment-timezone');
const appRoot = require('app-root-path');

const TslApi = require('./API/TslApi');
const Rate = require('./Services/Rate/Rate');
const TotalOver25 = require('./Services/TotalOver25/TotalOver25');
const Point = require('./Services/Point/Point');
const Score = require('./Services/Score/Score');
const Line = require('./LineBot/Line');
const LineNotify = require('./LineNotify/LineNotify');

const Constant = require('./utility/Constant');

// json folder
const folderPath = `${appRoot}/json`;

// 建立 json 資料夾
if (!fs.existsSync(folderPath)) {
  fs.mkdirSync(folderPath);
}

/**
 * getRates
 * 取得主客合賠率
 *
 * @param {*} type 0: 不讓球, 1: 讓球
 * @param {*} detail
 */
const getRates = (type, detail) => Rate.getRates(type, detail);

/**
 * getTotalOver25
 * 取得 2.5 大小
 *
 * @param {*} detail
 */
const getTotalOver25 = detail => TotalOver25.getTotalOver25(detail);

/**
 * getPonit
 * 進球數
 *
 * @param {*} detail
 */
const getPonit = detail => Point.getPonit(detail);

/**
 * getScore
 * 正確比數
 *
 * @param {*} detail
 */
const getScore = detail => Score.getScore(detail);

/**
 * checkRates
 *
 * @param {*} type
 * @param {*} obj
 * @param {*} detail
 */
const checkRates = (type, obj, detail) => Rate.checkRates(type, obj, detail);

/**
 * checkTotalOver25
 *
 * @param {*} obj
 * @param {*} detail
 */
const checkTotalOver25 = (obj, detail) =>
  TotalOver25.checkTotalOver25(obj, detail);

/**
 * checkPonit
 *
 * @param {*} obj
 * @param {*} detail
 */
const checkPonit = (obj, detail) => Point.checkPonit(obj, detail);

/**
 * checkScore
 * 檢查比數賠率是否有變動
 *
 * @param {*} obj
 * @param {*} detail
 */
const checkScore = (obj, detail) => Score.checkScore(obj, detail);

/**
 * saveFile
 * 儲存檔案
 *
 * @param {*} fileName
 * @param {*} json
 */
const saveFile = (fileName, json) => {
  fs.writeFile(fileName, json, 'utf8', err => {
    if (err) {
      console.log('saveFile - err: ', err);
    }
  });
};

/**
 * sendMessage
 * 發送 line 通知
 *
 * @param {string} message
 */
const sendMessage = message => {
  Line.sendMessage(message);
  // LineNotify.send(`\n${message}`);
};

/**
 * compareData
 * 比較賠率及更新檔案
 *
 * @param {*} detailData
 */
const compareData = detailData => {
  const gameDate = moment(detailData.kdt).format('YYYYMMDD');
  const fileName = `${appRoot}/json/${detailData.code}_${gameDate}.json`;

  // 判斷是否已有賠率檔案
  let isExist = false;
  if (fs.existsSync(fileName)) {
    isExist = true;
  }

  let obj = {
    code: '', // 賽事編號
    date: '', // 比賽日期時間
    league: '', // 聯賽名稱
    teams: {
      hi: '', // 主隊名稱
      ai: '', // 客隊名稱
    },
    mins: 0, // 過關數
    rates_single: [], // 不讓球
    rates_handicap: [], // 讓球
    rates_total_over_25: [], // 2.5 大小
    rates_point: [], // 2-3 球
    rates_score: [], // 正確比數
  };

  if (isExist) {
    // 已有檔案
    obj = JSON.parse(fs.readFileSync(fileName, 'utf8'));

    let isChange = false;

    // 寫入各賠率
    detailData.markets.forEach(detail => {
      let tmp = null;

      if (detail.g === Constant.GAME_TYPE.SINGLE.g) {
        // 不讓
        // 取得不讓球主客合賠率
        tmp = getRates(0, detail);
        if (checkRates(0, obj, detail) && tmp) {
          isChange = true;
          obj.rates_single.push(tmp);
        }
      } else if (detail.g === Constant.GAME_TYPE.HANDICAP.g) {
        // 讓球
        // 取得讓球主客合賠率
        tmp = getRates(1, detail);
        if (checkRates(1, obj, detail) && tmp) {
          isChange = true;
          obj.rates_handicap.push(tmp);
        }
      } else if (
        detail.g === Constant.GAME_TYPE.TOTAL_OVER_25.g &&
        detail.v1 === Constant.GAME_TYPE.TOTAL_OVER_25.v1
      ) {
        // 2.5 大小
        tmp = getTotalOver25(detail);
        if (checkTotalOver25(obj, detail) && tmp) {
          isChange = true;
          obj.rates_total_over_25.push(tmp);
        }
      } else if (
        detail.g === Constant.GAME_TYPE.POINT.g &&
        detail.fi === Constant.GAME_TYPE.POINT.fi
      ) {
        // 進球數
        tmp = getPonit(detail);
        if (checkPonit(obj, detail) && tmp) {
          isChange = true;
          obj.rates_point.push(tmp);
        }
      } else if (detail.g === Constant.GAME_TYPE.SCORE.g) {
        // 正確比分
        tmp = getScore(detail);
        if (checkScore(obj, detail) && tmp) {
          isChange = true;
          obj.rates_score.push(tmp);
        }
      }
    });

    if (isChange) {
      console.log(`${obj.code} - Rates is changed.`);

      let message = `比賽日期: ${obj.date}\n賽事: ${obj.code}\n隊伍: ${
        obj.teams.ai
      } @ ${obj.teams.hi}\n賠率已異動。\n${Constant.APP_URL}?gameCode=${
        obj.code
      }`;

      sendMessage(message);

      message = Point.getNotifyMessage(obj);
      if (message) {
        sendMessage(message);
      }
    }
  } else {
    // 賽事編號
    obj.code = detailData.code;

    // 日期
    const gameTime = moment.tz(detailData.kdt, 'Asia/Taipei');
    obj.date = gameTime.format('YYYY-MM-DD HH:mm');

    // 聯賽名稱
    obj.league = detailData.lexicon.resources[detailData.ti];

    // 隊伍名稱
    obj.teams.hi = detailData.lexicon.resources[detailData.hi];
    obj.teams.ai = detailData.lexicon.resources[detailData.ai];

    // 寫入各賠率
    detailData.markets.forEach(detail => {
      let tmp = null;

      if (detail.g === Constant.GAME_TYPE.SINGLE.g) {
        // 不讓
        // 取得不讓球主客合賠率
        tmp = getRates(0, detail);
        if (tmp) {
          obj.rates_single.push(tmp);
        }

        // 過關數
        obj.mins = detail.mins;
      } else if (detail.g === Constant.GAME_TYPE.HANDICAP.g) {
        // 讓球
        // 取得讓球主客合賠率
        tmp = getRates(1, detail);
        if (tmp) {
          obj.rates_handicap.push(tmp);
        }
      } else if (
        detail.g === Constant.GAME_TYPE.TOTAL_OVER_25.g &&
        detail.v1 === Constant.GAME_TYPE.TOTAL_OVER_25.v1
      ) {
        // 2.5 大小
        tmp = getTotalOver25(detail);
        if (tmp) {
          obj.rates_total_over_25.push(tmp);
        }
      } else if (
        detail.g === Constant.GAME_TYPE.POINT.g &&
        detail.fi === Constant.GAME_TYPE.POINT.fi
      ) {
        // 進球數
        tmp = getPonit(detail);
        if (tmp) {
          obj.rates_point.push(tmp);
        }
      } else if (detail.g === Constant.GAME_TYPE.SCORE.g) {
        // 正確比分
        tmp = getScore(detail);
        if (tmp) {
          obj.rates_score.push(tmp);
        }
      }
    });

    const message = Point.getNotifyMessage(obj);
    if (message) {
      sendMessage(message);
    }
  }

  // 寫入檔案
  saveFile(fileName, JSON.stringify(obj));
};

/**
 * rateCrawler
 *
 */
const rateCrawler = async () => {
  console.log('');
  console.log(
    `=========== Crawler start: ${moment().format(
      'YYYY-MM-DD HH:mm:ss'
    )} ==========`
  );

  // 取得所有足球賽事
  let data = null;
  try {
    data = await TslApi.getGames();
  } catch (e) {
    console.log(e);
  }

  if (data && data.length) {
    data.forEach(async (item, index) => {
      // 取得賽事賠率明細
      let detailData = null;
      try {
        detailData = await TslApi.getGameDetail(item.ni);
      } catch (e) {
        console.log(e);
      }

      if (detailData && detailData.length) {
        // 比較賠率及更新檔案
        compareData(detailData[0]);
      } else {
        console.log('Get game detail:', detailData);
      }
    });
  } else {
    console.log('Get games:', data);
  }
};

String.prototype.format = function() {
  a = this;
  for (k in arguments) {
    a = a.replace('{' + k + '}', arguments[k]);
  }
  return a;
};

// 第一次執行
rateCrawler();

/**
 * Main
 *
 */
schedule.scheduleJob('*/600 * * * * *', () => {
  rateCrawler();
});
