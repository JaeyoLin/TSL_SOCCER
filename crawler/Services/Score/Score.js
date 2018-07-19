const Constant = require('../../utility/Constant');

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
    time: Constant.getDateNow(),
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

const Score = {
  getScore,
  checkScore,
};

module.exports = Score;
