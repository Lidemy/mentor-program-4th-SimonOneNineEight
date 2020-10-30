const db = require('../models')
const {Prize,User,Menu,Faq} = db

const adminController = {
  init: (req, res) => {
    res.render('admin')
  },

  lottery:(req, res) => {
    if(!req.session.userSessionId) return res.redirect('/admin')
    Prize.findAll().then(prizes => {
      Prize.sum('percentage').then(percentage => {
        let percentageError=''
        if(percentage > 1) percentageError = '中獎機率超過 100%'
        res.render('lotteryAdmin',{
          prizes,
          percentage: Math.round(percentage *= 100),
          percentageError,
        })
      })
    })
  },

  menu: (req, res) => {
    if(!req.session.userSessionId) return res.redirect('/admin')
    Menu.findAll({where: {isDeleted: 0}}).then(menus => {
      res.render('menuAdmin', {
        menus,
      })
    })
  },

  faq: (req, res) => {
    if(!req.session.userSessionId) return res.redirect('/admin')
    Faq.findAll().then(faqs => {
      res.render('faqAdmin', {
        faqs,
      })
    })
  }
}

module.exports = adminController