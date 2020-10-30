const utilis = require('../utilis.js')
const db = require('../models')
const { Op } = require("sequelize");
const User = db.User
const Article = db.Article
const Tag = db.Tags

const blogController = {
  init: (req, res) => {
    utilis.getUserInfoById(req.session.userId, (user) => {
      Article.findAll({
        where: {isDeleted: 0},
        order:[['id', 'DESC']],
        include: User,
        include: Tag
      }).then(articles => {
        res.render('blog', { 
          user,
          articles,
        })
      }).catch(error => {
        console.log(error)
        res.redirect('/blog')
      })
    })
  },

  admin: (req, res) => {
    if(!req.session.userId) return res.redirect('/blog')
    utilis.getUserInfoById(req.session.userId, user => {
      if(user.authType !== '1') return res.redirect('/blog')
      Article.findAll({
        where: {isDeleted: 0},
        order:[['id', 'DESC']],
        include: User
      }).then(articles => {
        res.render('admin',{
          user,
          articles,
        })
      }).catch(error => {
        console.log(error)
        res.redirect('/blog')
      })
    })
  },

  getAll: (req, res) => {
    Article.findAll({
      where: {isDeleted: 0},
      include: User
    }).then(articles => {
      res.render('blog', { 
        articles: articles
      })
    }).catch(error => {
      console.log(error)
      res.redirect('/blog')
    })
  },

  get: (req, res) => {
    const id = req.params.id
    Article.findByPk(id,{
      include: Tag
    }).then(article => {
      if(!article) {
        console.log('Inavlid article Id')
        res.redirect('/blog')
        return
      }
      if(article.isDeleted === 1) return res.redirect('/blog')
      res.render('readMore', {
        user: article.UserId || 0,
        article,
      })
    })
  },

  addArticle: (req, res) => {
    const userId = req.session.userId
    if(!userId) return res.redirect('/blog')
    utilis.getUserInfoById(userId, user => {
      if(user.authType !== '1') {
        return res.redirect('/blog')
      }
      utilis.getAllTags(tags => {
        res.render('addArticle', {
          user,
          tags,
        })
      })
    })
  },

  handleAddArticle: (req, res) => {
    const {title, TagId, content} = req.body
    const UserId = req.session.userId
    if(!title || !TagId || !content) {
      req.flash('errorMessage', '請填入所有欄位')
      return res.redirect('/addArticle')
    }
    Article.create({
      UserId,
      title,
      TagId,
      content,
    }).then(newArticle => {
      res.redirect('/blog')
    }).catch(error => {
      console.log(error)
      req.flash('errorMessage', '新增文章失敗')
      return res.redirect('/addArticle')
    })
  },

  updateArticle: (req, res) => {
    const userId = req.session.userId
    const ArticleId = req.params.id
    if(!userId) return res.redirect('/blog')
    Article.findByPk(ArticleId, {
      include: [User, Tag]
    }).then(article => {
      if(article.isDeleted === 1) return res.redirect('/blog')
      Tag.findAll({
        where: {
          id: {[Op.ne]:article.TagId}
        }
      }).then(tags => {
        res.render('updateArticle', {
          article,
          user: article.User,
          tags,
        })
      })
    })
  },

  handleUpdateArticle: (req, res) => {
    const ArticleId = req.params.id
    const {title, TagId, content} = req.body
    if(!title || !TagId || !content) {
      req.flash('errorMessage', '請填入所有欄位')
      return res.redirect(`/update/${ArticleId}`)
    }
    Article.update({
      title,
      TagId,
      content,
    },{where: {id: ArticleId}}).then(newArticle => {
      res.redirect('/blog')
    }).catch(error => {
      console.log(error)
      req.flash('errorMessage', '更新文章失敗')
      return res.redirect(`/update/${ArticleId}`)
    })
  },

  deleteArticle: (req, res) => {
    const ArticleId = req.params.id
    const sessionUserId = req.session.userId
    Article.findByPk(ArticleId).then(article => {
      if(article.UserId !== sessionUserId){
        return res.redirect('/admin')
      }
      Article.update({
        isDeleted: 1,
      },{where: {id: ArticleId}}).then(newArticle => {
        res.redirect('/admin')
      }).catch(error => {
        console.log(error)
        req.flash('errorMessage', '刪除文章失敗')
        return res.redirect('/admin')
      })
    })
  }
}

module.exports = blogController
