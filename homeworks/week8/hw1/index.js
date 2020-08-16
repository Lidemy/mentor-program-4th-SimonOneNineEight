/* eslint no-alert: 0 */
const goLottery = document.querySelector('.lottery');

function changeToPrizePage(prize) {
  const lottery = document.querySelector('.lottery');
  const lotteryBox = document.querySelector('.lottery__box');
  const lotteryResultContent = document.querySelector('.lottery__result h2');
  let prizeText;
  if (prize === 'FIRST') {
    lottery.classList.add('prize1');
    lotteryBox.classList.add('hide');
    prizeText = '恭喜你中頭獎了！日本東京來回雙人遊！';
  } else if (prize === 'SECOND') {
    lottery.classList.add('prize2');
    lotteryBox.classList.add('hide');
    prizeText = '二獎！90 吋電視一台！';
  } else if (prize === 'THIRD') {
    lottery.classList.add('prize3');
    lotteryBox.classList.add('hide');
    prizeText = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
  } else if (prize === 'NONE') {
    lottery.classList.add('noPrize');
    lotteryBox.classList.add('hide');
    prizeText = '銘謝惠顧';
  } else {
    alert('系統不穩定，請再試一次');
  }
  const element = document.createElement('h2');
  element.classList.add('lottery__result__title');
  element.innerText = prizeText;
  lotteryResultContent.appendChild(element);
}

goLottery.addEventListener('click',
  (e) => {
    if (e.target.classList.contains('go__lottery')) {
      const request = new XMLHttpRequest();
      request.onload = () => {
        const whichPrize = JSON.parse(request.responseText).prize;
        if (request.status >= 200 && request.status < 400) {
          changeToPrizePage(whichPrize);
        } else {
          alert('系統不穩定，請再試一次');
        }
      };
      request.onerror = () => alert('系統不穩定，請再試一次');
      request.open('GET', 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery', true);
      request.send();
    }
  });
