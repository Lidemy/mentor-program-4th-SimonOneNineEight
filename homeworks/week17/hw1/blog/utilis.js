const db = require('./models')
const User = db.User
const Article = db.Article
const Tag = db.Tags

const utilis = {
  getUserInfoById: (id, cb) => {
    if(!id) {
      return cb(null)
    }
    User.findByPk(id).then(user => {
      return cb(user)
    }).catch(error => {
      return "invalid id"
    })
  },

  getArticleById: (id, include, cb) => {
    Article.findOne({
      where: {id,},
      include,
    }).then(user => {
      return cb(user)
    }).catch(error => {
      return "invalid id"
    })
  },

  getAllTags: (cb) => {
    Tag.findAll().then(tags => {return cb(tags)})
  },
}


module.exports = utilis
