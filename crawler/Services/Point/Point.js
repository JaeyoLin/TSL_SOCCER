const Constant = require('../../utility/Constant');

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
    time: Constant.getDateNow(),
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
 * getNotifyMessage
 * 檢查賠率是否在區間
 *
 * @param {*} obj
 */
const getNotifyMessage = obj => {
  let message = null;

  // 檢查 2-3 球賠率是否在 1.85
  if (obj.rates_point && obj.rates_point.length > 0) {
    const tmpRate = obj.rates_point[obj.rates_point.length - 1].B;

    if (tmpRate >= 1.85 && tmpRate <= 1.9 && obj.mins === 1) {
      message = `比賽日期: ${obj.date}\n賽事: ${obj.code}\n隊伍: ${
        obj.teams.ai
      } @ ${obj.teams.hi}\n單場 2-3 球賠率落在 1.85 ~ 1.9。\n${
        Constant.APP_URL
      }?gameCode=${obj.code}`;
    }
  }

  return message;
};

const Point = {
  getPonit,
  checkPonit,
  getNotifyMessage,
};

module.exports = Point;
