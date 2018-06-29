const TIMEOUT = 5000;
const SOCCER_GAMES_JSON =
  'https://www.sportslottery.com.tw/web/services/rs/betting/games/15102/0.json?status=active&limit=21&action=excludeTournamentWithExceptionPriority&marketLimit=1&sportId=s-441&locale=tw&brandId=defaultBrand&channelId=1';
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
};

const Constant = {
  SOCCER_GAMES_JSON,
  SOCCER_GAME,
  TIMEOUT,
  HEADERS,
  GAME_TYPE,
};

module.exports = Constant;
