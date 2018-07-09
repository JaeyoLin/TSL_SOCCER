const fs = require('fs');
const schedule = require('node-schedule');
const request = require('request');
const moment = require('moment-timezone');
const appRoot = require('app-root-path');

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
 * getDateNow
 *
 */
const getDateNow = () => {
  return moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');
};

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

/**
 * getRates
 * 取得主客合賠率
 *
 * @param {*} type 0: 不讓球, 1: 讓球
 * @param {*} detail
 */
const getRates = (type, detail) => {
  let awayWin = Constant.GAME_TYPE.SINGLE.TYPE.AWAY_WIN;
  let draw = Constant.GAME_TYPE.SINGLE.TYPE.DRAW;
  let homeWin = Constant.GAME_TYPE.SINGLE.TYPE.HOME_WIN;

  if (type === 1) {
    awayWin = Constant.GAME_TYPE.HANDICAP.TYPE.AWAY_WIN;
    draw = Constant.GAME_TYPE.HANDICAP.TYPE.DRAW;
    homeWin = Constant.GAME_TYPE.HANDICAP.TYPE.HOME_WIN;
  }

  // 賠率
  let rate = {
    hi: 0,
    draw: 0,
    ai: 0,
    v: '',
    v1: '',
    time: getDateNow(),
  };

  // 塞入讓球
  rate.v = detail.v;
  rate.v1 = detail.v1;

  const tmpArray = detail.codes;
  if (tmpArray) {
    tmpArray.forEach(tmp => {
      const c = tmp.c;

      switch (c) {
        // 客勝
        case awayWin:
          rate.ai = tmp.oddPerSet[1];
          break;

        // 合局
        case draw:
          rate.draw = tmp.oddPerSet[1];
          break;

        // 主勝
        case homeWin:
          rate.hi = tmp.oddPerSet[1];
          break;
      }
    });
  }

  if (rate.ai === 0) {
    return null;
  }

  return rate;
};

/**
 * getTotalOver25
 * 取得 2.5 大小
 *
 * @param {*} detail
 */
const getTotalOver25 = detail => {
  // 賠率
  let rate = {
    over: 0,
    under: 0,
    time: getDateNow(),
  };

  const tmpArray = detail.codes;
  if (tmpArray) {
    tmpArray.forEach(tmp => {
      const c = tmp.c;

      switch (c) {
        // Over
        case Constant.GAME_TYPE.TOTAL_OVER_25.TYPE.OVER:
          rate.over = tmp.oddPerSet[1];
          break;

        // Under
        case Constant.GAME_TYPE.TOTAL_OVER_25.TYPE.UNDER:
          rate.under = tmp.oddPerSet[1];
          break;
      }
    });
  }

  if (rate.over === 0) {
    return null;
  }

  return rate;
};

/**
 * getPonit
 * 進球數
 *
 * @param {*} detail
 */
const getPonit = detail => {
  // 賠率
  let rate = {
    A: 0, // 0-1 球
    B: 0, // 2-3 球
    C: 0, // 4+
    time: getDateNow(),
  };

  const tmpArray = detail.codes;
  if (tmpArray) {
    tmpArray.forEach(tmp => {
      const c = tmp.c;

      switch (c) {
        // 0-1 球
        case Constant.GAME_TYPE.POINT.TYPE.A:
          rate.A = tmp.oddPerSet[1];
          break;
        // 2-3 球
        case Constant.GAME_TYPE.POINT.TYPE.B:
          rate.B = tmp.oddPerSet[1];
          break;
        // 4+
        case Constant.GAME_TYPE.POINT.TYPE.C:
          rate.C = tmp.oddPerSet[1];
          break;
      }
    });
  }

  if (rate.A === 0) {
    return null;
  }

  return rate;
};

/**
 * getScore
 * 正確比數
 *
 * @param {*} detail
 */
const getScore = detail => {
  // 賠率
  let rate = {
    '1_0': 0,
    '0_0': 0,
    '0_1': 0,
    '2_0': 0,
    '1_1': 0,
    '0_2': 0,
    '2_1': 0,
    '2_2': 0,
    '1_2': 0,
    '3_0': 0,
    '3_3': 0,
    '0_3': 0,
    '3_1': 0,
    '4_4': 0,
    '1_3': 0,
    '3_2': 0,
    '5_5': 0,
    '2_3': 0,
    '4_0': 0,
    '0_4': 0,
    '4_1': 0,
    '1_4': 0,
    '4_2': 0,
    '2_4': 0,
    '4_3': 0,
    '3_4': 0,
    '5_0': 0,
    '0_5': 0,
    '5_1': 0,
    '1_5': 0,
    '5_2': 0,
    '2_5': 0,
    '5_3': 0,
    '3_5': 0,
    '5_4': 0,
    '4_5': 0,
    time: getDateNow(),
  };

  const tmpArray = detail.codes;
  if (tmpArray) {
    tmpArray.forEach(tmp => {
      const c = tmp.c;

      switch (c) {
        case Constant.GAME_TYPE.SCORE.TYPE['1_0']:
          rate['1_0'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_0']:
          rate['0_0'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_1']:
          rate['0_1'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_0']:
          rate['2_0'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_1']:
          rate['1_1'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_2']:
          rate['0_2'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_1']:
          rate['2_1'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_2']:
          rate['2_2'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_2']:
          rate['1_2'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_0']:
          rate['3_0'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_3']:
          rate['3_3'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_3']:
          rate['0_3'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_1']:
          rate['3_1'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_4']:
          rate['4_4'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_3']:
          rate['1_3'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_2']:
          rate['3_2'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_5']:
          rate['5_5'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_3']:
          rate['2_3'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_0']:
          rate['4_0'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_4']:
          rate['0_4'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_1']:
          rate['4_1'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_4']:
          rate['1_4'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_2']:
          rate['4_2'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_4']:
          rate['2_4'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_3']:
          rate['4_3'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_4']:
          rate['3_4'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_0']:
          rate['5_0'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_5']:
          rate['0_5'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_1']:
          rate['5_1'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_5']:
          rate['1_5'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_2']:
          rate['5_2'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_5']:
          rate['2_5'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_3']:
          rate['5_3'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_5']:
          rate['3_5'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_4']:
          rate['5_4'] = tmp.oddPerSet[1];
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_5']:
          rate['4_5'] = tmp.oddPerSet[1];
          break;
      }
    });
  }

  if (rate['1_0'] === 0) {
    return null;
  }

  return rate;
};

/**
 * checkRates
 *
 * @param {*} type
 * @param {*} obj
 * @param {*} detail
 */
const checkRates = (type, obj, detail) => {
  let awayWin = Constant.GAME_TYPE.SINGLE.TYPE.AWAY_WIN;
  let draw = Constant.GAME_TYPE.SINGLE.TYPE.DRAW;
  let homeWin = Constant.GAME_TYPE.SINGLE.TYPE.HOME_WIN;

  let aiRate = obj.rates_single[obj.rates_single.length - 1].ai;
  let drawRate = obj.rates_single[obj.rates_single.length - 1].draw;
  let hiRate = obj.rates_single[obj.rates_single.length - 1].hi;

  if (type === 1) {
    awayWin = Constant.GAME_TYPE.HANDICAP.TYPE.AWAY_WIN;
    draw = Constant.GAME_TYPE.HANDICAP.TYPE.DRAW;
    homeWin = Constant.GAME_TYPE.HANDICAP.TYPE.HOME_WIN;

    aiRate = obj.rates_handicap[obj.rates_handicap.length - 1].ai;
    drawRate = obj.rates_handicap[obj.rates_handicap.length - 1].draw;
    hiRate = obj.rates_handicap[obj.rates_handicap.length - 1].hi;
  }

  // 比較賠率是否有變動
  let isChange = false;
  const tmpArray = detail.codes;
  if (tmpArray) {
    tmpArray.forEach(tmp => {
      const c = tmp.c;

      switch (c) {
        // 客勝
        case awayWin:
          if (aiRate !== tmp.oddPerSet[1]) {
            isChange = true;
          }
          break;

        // 合局
        case draw:
          if (drawRate !== tmp.oddPerSet[1]) {
            isChange = true;
          }
          break;

        // 主勝
        case homeWin:
          if (hiRate !== tmp.oddPerSet[1]) {
            isChange = true;
          }
          break;
      }
    });
  }
  return isChange;
};

/**
 * checkTotalOver25
 *
 * @param {*} obj
 * @param {*} detail
 */
const checkTotalOver25 = (obj, detail) => {
  // 比較賠率是否有變動
  let isChange = false;
  const tmpArray = detail.codes;
  if (tmpArray) {
    tmpArray.forEach(tmp => {
      const c = tmp.c;

      switch (c) {
        // Over
        case Constant.GAME_TYPE.TOTAL_OVER_25.TYPE.OVER:
          if (
            obj.rates_total_over_25[obj.rates_total_over_25.length - 1].over !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;

        // Under
        case Constant.GAME_TYPE.TOTAL_OVER_25.TYPE.UNDER:
          if (
            obj.rates_total_over_25[obj.rates_total_over_25.length - 1]
              .under !== tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
      }
    });
  }
  return isChange;
};

/**
 * checkPonit
 *
 * @param {*} obj
 * @param {*} detail
 */
const checkPonit = (obj, detail) => {
  // 比較賠率是否有變動
  let isChange = false;
  const tmpArray = detail.codes;
  if (tmpArray) {
    tmpArray.forEach(tmp => {
      const c = tmp.c;

      switch (c) {
        // 0-1 球
        case Constant.GAME_TYPE.POINT.TYPE.A:
          if (
            obj.rates_point[obj.rates_point.length - 1].A !== tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        // 2-3 球
        case Constant.GAME_TYPE.POINT.TYPE.B:
          if (
            obj.rates_point[obj.rates_point.length - 1].B !== tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        // 4+
        case Constant.GAME_TYPE.POINT.TYPE.C:
          if (
            obj.rates_point[obj.rates_point.length - 1].C !== tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
      }
    });
  }
  return isChange;
};

/**
 * checkScore
 * 檢查比數賠率是否有變動
 *
 * @param {*} obj
 * @param {*} detail
 */
const checkScore = (obj, detail) => {
  // 比較賠率是否有變動
  let isChange = false;
  const tmpArray = detail.codes;

  if (tmpArray) {
    tmpArray.forEach(tmp => {
      const c = tmp.c;
      switch (c) {
        case Constant.GAME_TYPE.SCORE.TYPE['1_0']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['1_0'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_0']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['0_0'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_1']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['0_1'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_0']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['2_0'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_1']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['1_1'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_2']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['0_2'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_1']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['2_1'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_2']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['2_2'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_2']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['1_2'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_0']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['3_0'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_3']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['3_3'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_3']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['0_3'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_1']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['3_1'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_4']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['4_4'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_3']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['1_3'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_2']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['3_2'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_5']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['5_5'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_3']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['2_3'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_0']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['4_0'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_4']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['0_4'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_1']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['4_1'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_4']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['1_4'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_2']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['4_2'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_4']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['2_4'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_3']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['4_3'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_4']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['3_4'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_0']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['5_0'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['0_5']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['0_5'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_1']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['5_1'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['1_5']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['1_5'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_2']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['5_2'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['2_5']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['2_5'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_3']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['5_3'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['3_5']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['3_5'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['5_4']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['5_4'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
        case Constant.GAME_TYPE.SCORE.TYPE['4_5']:
          if (
            obj.rates_score[obj.rates_score.length - 1]['4_5'] !==
            tmp.oddPerSet[1]
          ) {
            isChange = true;
          }
          break;
      }
    });
  }

  return isChange;
};

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
    teams: {
      hi: '', // 主隊名稱
      ai: '', // 客隊名稱
    },
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

      const message = `比賽日期: ${obj.date}\n賽事: ${obj.code}\n隊伍: ${
        obj.teams.ai
      } @ ${obj.teams.hi}\n賠率已異動。`;

      Line.sendMessage(message);

      LineNotify.send(`\n${message}`);
    }

    // 寫入檔案
    saveFile(fileName, JSON.stringify(obj));
  } else {
    // 賽事編號
    obj.code = detailData.code;

    // 日期
    const gameTime = moment.tz(detailData.kdt, 'Asia/Taipei');
    obj.date = gameTime.format('YYYY-MM-DD HH:mm');

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

    // 寫入檔案
    saveFile(fileName, JSON.stringify(obj));
  }
};

/**
 * rateCrawler
 *
 */
const rateCrawler = async () => {
  console.log(
    `=========== Crawler start: ${moment().format(
      'YYYY-MM-DD HH:mm:ss'
    )} ==========`
  );

  // 取得所有足球賽事
  let data = null;
  try {
    data = await getGames();
  } catch (e) {
    console.log(e);
  }

  if (data && data.length) {
    data.forEach(async (item, index) => {
      // 取得賽事賠率明細
      let detailData = null;
      try {
        detailData = await getGameDetail(item.ni);
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
