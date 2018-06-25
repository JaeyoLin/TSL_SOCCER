const SOCCER_GAMES_JSON = 'https://www.sportslottery.com.tw/web/services/rs/betting/games/15102/0.json?status=active&limit=21&action=excludeTournamentWithExceptionPriority&marketLimit=1&sportId=s-441&locale=tw&brandId=defaultBrand&channelId=1';
const SOCCER_GAME = 'https://www.sportslottery.com.tw/web/services/rs/betting/games/15102/0.json?eventMethods=1&eventMethods=2&nevIds={0}&locale=tw&brandId=defaultBrand&channelId=1';
const TIMEOUT = 3000;

const Constant = {
  SOCCER_GAMES_JSON,
  SOCCER_GAME,
  TIMEOUT,
}

module.exports = Constant;