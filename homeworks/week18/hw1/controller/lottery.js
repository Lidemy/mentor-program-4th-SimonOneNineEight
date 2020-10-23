const db = require('../models')
const Prize = db.Prize
const User = db.User

const lotteryController = {
  lottery: (req, res) => {
    Prize.findAll().then(prizes => {
      res.render('lottery', {prizes,})
    })
  },

  getLottery: (req, res) => {
    Prize.findAll().then(prizes => {
      const prizeIdArr = []
      const percentageArr = []
      let percentage = 0
      for( const prize of prizes) {
        prizeIdArr.push(prize.id)
        percentage += prize.percentage
        percentageArr.push(percentage)
      }
      const random = (Math.round(Math.random()*100))/100;
      percentageArr.push(random)
      percentageArr.sort((a,b) => {return a - b})
      const randomIndex = percentageArr.indexOf(random)
      let result = {}
      if(randomIndex === (percentageArr.length)-1) {
        result = {
          name: '沒中哦！哭哭',
          imgUrl: 'https://support.discord.com/hc/user_images/p3ayzhZ2tMvRbQyMzD31TA.png',
          discription: '下次請努力！'
        }
        return res.render('result', {result,})
      } else {
        const resultId = prizeIdArr[randomIndex]
        Prize.findByPk(resultId).then(prize => {
        result = {
          name: prize.name,
          imgUrl: prize.imgUrl,
          discription: prize.discription,
        }
        return res.render('result', {result,})
      })}
    })
  },

  prize: (req, res) => {
    const prizeId = req.params.id
    Prize.findOne({
      where:{id: prizeId,},
    }).then(prize => {
      res.render('prize', {
        prize: prize,
      })
    }).catch(error => {
      console.log(error)
      res.redirect('/admin')
    })
  },

  addPrize: (req, res) => {
    if(!req.session.userSessionId) return res.redirect('/admin')
    res.render('addPrize')
  },

  handleAddPrize: (req, res) => {
    const {name, percentage, imgUrl, discription} = req.body
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    if(!name || !percentage || !imgUrl || !discription) {
      req.flash('errorMessage', '請填入所有欄位')
      return res.redirect('/addPrize')
    }
    Prize.sum('percentage').then(total => {
      const totalPercentage = total + Number(percentage)
      if(totalPercentage > 1) {
        req.flash('errorMessage', '總中獎機率超過 100%')
        return res.redirect('/addPrize')
      }
      Prize.create({
        name,
        percentage,
        imgUrl,
        discription,
        UserId,
      }).then(newPrize => {
        res.redirect('/admin')
      }).catch(error => {
        console.log(error)
        res.redirect('/admin')
      })
    })
  },

  updatePrize: (req, res) => {
    const prizeId = req.params.id
    if(!req.session.userSessionId) return res.redirect('/admin')
    Prize.findByPk(prizeId).then(prize => {
      res.render('updatePrize',{
        prize,
      })
    })
  },

  handleUpdatePrize: (req, res) => {
    const prizeId = req.params.id
    const {name, percentage, imgUrl, discription} = req.body
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    if(!name || !percentage || !imgUrl || !discription) {
      req.flash('errorMessage', '請填入所有欄位')
      return res.redirect(`/update/${prizeId}`)
    }
    Prize.sum('percentage').then(total => {
      Prize.findByPk(prizeId).then(prize => {
        const totalPercentage = total - prize.percentage + Number(percentage)
        if(totalPercentage > 1) {
          req.flash('errorMessage', '總中獎機率超過 100%')
          return res.redirect(`/update/${prizeId}`)
        }
        Prize.update({
          name,
          percentage,
          imgUrl,
          discription,
        },{where: {id: prizeId},}).then(newPrize => {
          res.redirect('/admin')
        }).catch(error => {
          console.log(error)
          res.redirect('/admin')
        })
      })
    })
  },

  deletePrize: (req, res) => {
    const prizeId = req.params.id
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    Prize.destroy({
      where: {id: prizeId,},
    }).then(()=> {
      res.redirect('/admin')
    }).catch(error => {
      console.log(error)
      res.redirect('/admin')
    })
  },

  getlottery: (req, res) => { 
    Prize.findAll().then(prizes => {
      const prizeIdArr = []
      const percentageArr = []
      let percentage = 0
      for( const prize of prizes) {
        prizeIdArr.push(prize.id)
        percentage += prize.percentage
        percentageArr.push(percentage)
      }
    })
  },
}

module.exports = lotteryController