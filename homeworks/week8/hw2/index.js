/* eslint no-restricted-syntax: 0 */
/* eslint no-unused-vars: 0 */
/* eslint no-shadow: 0 */
/* eslint no-alert: 0 */

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

// call twitch to find info for the top 5 games
const getTopGame = (cb) => {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://api.twitch.tv/kraken/games/top/?limit=5', true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', clientID);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      cb(JSON.parse(request.response));
    } else {
      alert('error');
    }
  };
  request.send();
};

// call twitch to find info for the top 5 streams
const getTopStream = (game, cb) => {
  const baseUrl = 'https://api.twitch.tv/kraken/streams/?game=';
  const request = new XMLHttpRequest();
  request.open('GET', baseUrl + encodeURIComponent(game), true);
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
  request.setRequestHeader('Client-ID', clientID);
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      cb(JSON.parse(request.response));
    } else {
      alert('error');
    }
  };
  request.send();
};

// append streams to the stream list
function appendStreams(stream) {
  const streams = stream.streams.forEach((stream) => {
    const element = document.createElement('div');
    const content = template
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$topic', stream.channel.status)
      .replace('$name', stream.channel.name);
    element.classList.add('top-stream__block');
    element.innerHTML = content;
    document.querySelector('.top-stream__list').appendChild(element);
  });
}

// first get the top games then use the data to get top streams
getTopGame((games) => {
  const topGames = games.top.map(game => game.game.name);
  for (const game of topGames) {
    const element = document.createElement('li');
    element.classList.add('nav__links__game');
    element.innerHTML = game;
    document.querySelector('.nav__links').appendChild(element);
  }
  getTopStream(topGames[0], (topStream) => {
    const gameName = document.createElement('h1');
    [gameName.innerHTML] = topGames;
    document.querySelector('.top-stream__game-name').appendChild(gameName);
    appendStreams(topStream);
  });
});

// if you click the navbar, you should switch to another game.

document.querySelector('.nav__links').addEventListener('click', (e) => {
  if (e.target.classList.contains('nav__links__game')) {
    const streamGame = e.target.innerText;
    document.querySelector('h1').innerText = streamGame;
    document.querySelector('.top-stream__list').innerHTML = '';
    getTopStream(streamGame, (gameTopStream) => {
      appendStreams(gameTopStream);
    });
  }
});
