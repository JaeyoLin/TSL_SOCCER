const moment = require('moment-timezone');

const TIMEOUT = 5000;
const SOCCER_GAMES_JSON =
  'https://www.sportslottery.com.tw/web/services/rs/betting/games/15102/0.json?status=active&limit=41&action=excludeTournamentWithExceptionPriority&marketLimit=1&sportId=s-441&locale=tw&brandId=defaultBrand&channelId=1';
const SOCCER_GAME =
  'https://www.sportslottery.com.tw/web/services/rs/betting/games/15102/0.json?eventMethods=1&eventMethods=2&nevIds={0}&locale=tw&brandId=defaultBrand&channelId=1';

const HEADERS = {
  Accept: 'application/json, text/javascript, */*; q=0.01',
  'Accept-Encoding': 'gzip, deflate, br',
  'Accept-Language': 'zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja;q=0.6,zh-CN;q=0.5',
  Connection: 'keep-alive',
  Host: 'www.sportslottery.com.tw',
  LOCALE: 'tw',
  Referer: 'https://www.sportslottery.com.tw/zh/web/guest/sports-betting',
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36',
  'X-Requested-With': 'XMLHttpRequest',
};

/**
 * Web app url
 */
const APP_URL = 'http://aaronlin.net/soccer';

/**
 * getDateNow
 *
 */
const getDateNow = () => {
  return moment.tz('Asia/Taipei').format('YYYY-MM-DD HH:mm');
};

const GAME_TYPE = {
  // 不讓
  SINGLE: {
    g: 261,
    TYPE: {
      AWAY_WIN: 402,
      DRAW: 401,
      HOME_WIN: 400,
    },
  },

  // 讓球
  HANDICAP: {
    g: 265,
    TYPE: {
      AWAY_WIN: 447,
      DRAW: 446,
      HOME_WIN: 445,
    },
  },

  // 2.5 大小
  TOTAL_OVER_25: {
    g: 262,
    v1: 2.5,
    TYPE: {
      OVER: 472,
      UNDER: 471,
    },
  },

  // 進球數
  POINT: {
    g: 267,
    fi: '721',
    TYPE: {
      A: 587, // 0-1
      B: 588, // 2-3
      C: 589, // 4+
    },
  },

  // 正確比分
  SCORE: {
    g: 269,
    TYPE: {
      '1_0': 659,
      '0_0': 616,
      '0_1': 617,
      '2_0': 660,
      '1_1': 639,
      '0_2': 618,
      '2_1': 653,
      '2_2': 640,
      '1_2': 624,
      '3_0': 661,
      '3_3': 641,
      '0_3': 619,
      '3_1': 654,
      '4_4': 642,
      '1_3': 625,
      '3_2': 648,
      '5_5': 643,
      '2_3': 630,
      '4_0': 662,
      '0_4': 620,
      '4_1': 655,
      '1_4': 626,
      '4_2': 649,
      '2_4': 631,
      '4_3': 645,
      '3_4': 635,
      '5_0': 663,
      '0_5': 621,
      '5_1': 656,
      '1_5': 627,
      '5_2': 650,
      '2_5': 632,
      '5_3': 646,
      '3_5': 636,
      '5_4': 644,
      '4_5': 638,
    },
  },
};

const Constant = {
  SOCCER_GAMES_JSON,
  SOCCER_GAME,
  TIMEOUT,
  HEADERS,
  GAME_TYPE,
  APP_URL,
  getDateNow,
};

module.exports = Constant;
