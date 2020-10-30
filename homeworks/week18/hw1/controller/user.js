const db = require('../models')
const {Prize,User,Menu} = db

const userController = {
  login: (req, res) => {
    res.render('login')
  },

  handleLogin: (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
      res.flash('errorMessage','請輸入帳號及密碼')
    }
    User.findOne({
      where: {username,}
    }).then(user => {
      if(!user) {
        req.flash('errorMessage', '不存在使用者')
        return res.redirect('/login')
      }
      if(user.password !== password) {
        req.flash('errorMessage', '帳號或密碼錯誤')
        return res.redirect('/login')
      }
      req.session.userSessionId = user.id
      res.redirect('/admin')
    }).catch(error => {
      console.log(error)
      res.redirect('login')
    })
  },

  logout: (req, res) => {
    req.session.userSessionId = null
    res.redirect('/admin')
  }
}

module.exports = userController