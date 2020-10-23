const db = require('../models')
const Prize = db.Prize
const User = db.User

const adminController = {
  getAll: (req, res) => {
    Prize.findAll().then(prizes => {
      res.json(prizes)
    })
  },

  admin:(req, res) => {
    Prize.findAll().then(prizes => {
      Prize.sum('percentage').then(percentage => {
        let percentageError=''
        if(percentage > 1) percentageError = '中獎機率超過 100%'
        res.render('admin',{
          prizes,
          percentage: Math.round(percentage *= 100),
          percentageError,
        })
      })
    })
  },
}

module.exports = adminController