const Constant = require('../../utility/Constant');

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
    time: Constant.getDateNow(),
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

const Rate = {
  getRates,
  checkRates,
};

module.exports = Rate;
