const db = require('../models')
const User = db.User
const Article = db.Article
const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const myPlaintextPassword = 's0/\/\P4$$w0rD';
  const someOtherPlaintextPassword = 'not_bacon';

const userController = {
  register: (req, res) => {
    res.render('register')
  },

  handleRegister: (req, res) => {
    const {username, password, nickname} = req.body
    if(!username || !password || !nickname) {
      req.flash('errorMessage', '請填入所有欄位')
      res.redirect('/register')
      return
    }

    bcrypt.hash(password, saltRounds, (error, hash) => {
      User.create(
        {
          username,
          password: hash,
          nickname,
        }
      ).then(user => {
        req.session.userId = user.id;
        res.redirect('/blog')
      }).catch(error => {
        req.flash('errorMessage', error)
        res.redirect('/register')
      })      
    })
  },

  login: (req, res) => {
    res.render('login')
  },

  logout: (req,res) => {
    req.session.userId = null
    res.redirect('/blog')
  },

  handleLogin: (req, res) => {
    const {username, password} = req.body
    if(!username || !password) {
      req.flash('errorMessage', '請輸入帳號及密碼')
      res.redirect('login')
      return
    }

    User.findOne({
      where: {
        username,
      }
    }).then(user => {
      if(!user) {
        req.flash('errorMessage', '請輸入正確帳號及密碼')
        res.redirect('login')
        return
      }
      bcrypt.compare(user.password, password.toString(), (error, result) => {
        if(error) {
          req.flash('errorMessage', '請輸入正確帳號及密碼')
          res.redirect('login')
          return
        }
        req.session.userId = user.id;
        res.redirect('blog')
      });
    }).catch(error => {
      req.flash('errorMessage', error.Message)
      res.redirect('login')
    })
  }
}

module.exports = userController