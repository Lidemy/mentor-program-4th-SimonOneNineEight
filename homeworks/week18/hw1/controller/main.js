const db = require('../models')
const {Prize,User,Menu,Faq} = db

const mainController = {
  init: (req, res) => {
    Prize.findAll().then(prizes => {
      Faq.findAll().then(faqs => {
        res.render('main', {
          prizes,
          faqs,
        })
      })
    })
  },

  lottery: (req, res) => {
    Prize.findAll().then(prizes => {
      res.render('lottery', {prizes,})
    })
  },

  menu: (req, res) =>  {
    Menu.findAll({where:{isDeleted:0,}}).then(menus => {
      res.render('menu',{
        menus,
      })
    })
  }
}

module.exports = mainController