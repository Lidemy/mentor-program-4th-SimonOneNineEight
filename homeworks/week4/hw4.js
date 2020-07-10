/* eslint indent: 0 */
/* eslint indent: 0 */
const request = require('request');

const apiUrl = 'https://api.twitch.tv/kraken/games/top';

const option = {
  url: apiUrl,
  headers: {
    'Client-ID': 'bv602at6oeolu51flo911vif4akdf8',
    Accept: 'application/vnd.twitchtv.v5+json',
  },
};

request(option, (error, response, body) => {
  if (error) {
    console.log('error');
    return;
  }
  const data = JSON.parse(body);
  const games = data.top;
  for (let i = 0; i < games.length; i += 1) {
    console.log(`${games[i].viewers} ${games[i].game.name}`);
  }
});
