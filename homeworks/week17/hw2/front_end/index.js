/* eslint no-alert: 0 */


$.getJSON('http://localhost:5002/', prizes => {
  const prizeListTemplate = `<li>❤ </li>`
  for(const prize of prizes) {
    $('.lottery__prize__list').append(`<li>❤ ${prize.name}: ${prize.discription} </li>`)
  }
});

const goLottery = () => {
  $.ajax({
    type: 'GET',
    url: 'http://localhost:5002/lottery',
    success: prize => {
      console.log(prize.imgUrl)
      $('.lottery__box').hide()
      $('.lottery__result').show()
      $('.lottery').css('background-image', `url(${String(prize.imgUrl)})`)
      $('.lottery').height('calc(100vh - 320px)')
      $('.lottery__result').append(`
        <h2>${prize.name}</h2>
        <div>恭喜獲得 ${prize.discription}</div>
        <div><a href='./index.html'>我要抽獎</a></div>
      `)
    },
    error: error => {
      console.log(error)
    }
  });
}

$('.go__lottery').click((e) => {
  goLottery();
});
