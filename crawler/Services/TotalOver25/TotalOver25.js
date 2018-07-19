const Constant = require('../../utility/Constant');

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
    time: Constant.getDateNow(),
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

const TotalOver25 = {
  getTotalOver25,
  checkTotalOver25,
};

module.exports = TotalOver25;
