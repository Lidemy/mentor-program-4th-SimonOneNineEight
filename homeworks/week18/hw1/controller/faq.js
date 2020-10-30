const db = require('../models')
const fs = require('fs')
const path = require('path')
const {Prize,User,Menu,Faq} = db

const menuController = {
  faq: (req, res) => {
    const faqId = Number(req.params.id)
    if(!req.session.userSessionId) return res.redirect('/admin')
    Faq.findByPk(faqId).then(faq => {
      res.render('faqReadMore', {
        faq,
      })
    }).catch(error => {
      console.log(error)
      res.redirect('/admin/faq')
    })
  },

  addFaq: (req, res) => {
    if(!req.session.userSessionId) return res.redirect('/admin')
    res.render('addFaq')
  },

  handleAddFaq: (req, res) => {
    const {question, answer} = req.body
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    if(!question || !answer) {
      req.flash('errorMessage', '請填入所有欄位')
      return res.redirect('/add-faq')
    }
    Faq.create({
      question,
      answer,
    }).then(faq => {
      res.redirect('/admin/faq')
    }).catch(error => {
      console.log(error)
      res.redirect('/admin/faq')
    })
  },

  updateFaq: (req, res) => {
    const faqId = req.params.id
    if(!req.session.userSessionId) return res.redirect('/admin')
    Faq.findByPk(faqId).then(faq => {
      res.render('updateFaq',{
        faq,
      })
    })
  },

  handleUpdateFaq: (req, res) => {
    const faqId = req.params.id
    const {question, answer} = req.body
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    if(!question || !answer) {
      req.flash('errorMessage', '請填入所有欄位')
      return res.redirect(`/update/${prizeId}`)
    }
    Faq.update({
      question,
      answer
    },{where: {id: faqId},}).then(newFaq => {
      res.redirect('/admin/faq')
    }).catch(error => {
      console.log(error)
      res.redirect('/admin/faq')
    })
  },

  deleteFaq: (req, res) => {
    const faqId = req.params.id
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    Faq.destroy({
      where: {id: faqId,},
    }).then(()=> {
      res.redirect('/admin/faq')
    }).catch(error => {
      console.log(error)
      res.redirect('/admin/faq')
    })
  },
}

module.exports = menuController 