/* eslint no-restricted-syntax: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-shadow: 0 */
/* eslint no-alert: 0 */
/* eslint quote-props: 0 */
/* eslint no-undef : 0 */

const clientID = 'bv602at6oeolu51flo911vif4akdf8';
const template = `
  <div class='top-stream__video'>
    <img src='$preview'>
  </div>
  <div class='top-stream__info'>
    <div class='top-stream__logo'>
      <img src='$logo'>
    </div>
  <div class='top-stream__content'>
    <div class='top-stream__topic'>
      $topic
    </div>
    <div class='top-stream__name'>
      $name
    </div>
  </div>
  </div>`;

const getTopGamesFromApi = (cb) => {
  fetch('https://api.twitch.tv/kraken/games/top/?limit=5',
    {
      headers:
        new Headers({
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': 'bv602at6oeolu51flo911vif4akdf8',
        }),
    })
    .then(resp => resp.json())
    .then(data => cb(data))
    .catch(err => console.log(err));
};


const getTopStreamsFromApi = (game, cb) => {
  const baseUrl = 'https://api.twitch.tv/kraken/streams/?game=';
  fetch(`${baseUrl}${game}&limit=20`,
    {
      headers:
        new Headers({
          'Accept': 'application/vnd.twitchtv.v5+json',
          'Client-ID': 'bv602at6oeolu51flo911vif4akdf8',
        }),
    })
    .then(resp => resp.json())
    .then(data => cb(data))
    .catch(err => console.log(err));
};

const appendStreams = (stream) => {
  const streams = stream.streams.forEach((stream) => {
    const content = template
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$topic', stream.channel.status)
      .replace('$name', stream.channel.name);
    $('.top-stream__list').append(`<div class='top-stream__block'>${content}</div>`);
  });
};

getTopGamesFromApi((gameApi) => {
  const topGameList = gameApi.top.map(game => game.game.name);
  for (const game of topGameList) {
    $('.nav__links').append(`<li class='nav__links__game'>${game}</li>`);
  }
  getTopStreamsFromApi(topGameList[0], (streamApi) => {
    $('.top-stream__game-name').append(`<h1'>${topGameList[0]}</h1>`);
    appendStreams(streamApi);
  });
});

$('.nav__links').click((e) => {
  const target = $(e.target);
  const streamGame = String(target.text());
  $('.top-stream__game-name h1').text(streamGame);
  $('.top-stream__list').empty();
  getTopStreamsFromApi(streamGame, (gameTopStream) => {
    appendStreams(gameTopStream);
  });
});
