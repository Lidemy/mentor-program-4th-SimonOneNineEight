const db = require('../models')
const fs = require('fs')
const path = require('path')
const {Prize,User,Menu} = db

const menuController = {
  menu: (req, res) => {
    const menuId = Number(req.params.id)
    if(!req.session.userSessionId) return res.redirect('/admin')
    Menu.findByPk(menuId).then(menu => {
      res.render('menuReadMore', {
        menu,
      })
    }).catch(error => {
      console.log(error)
      res.redirect('/admin/menu')
    })
  },

  addMenu: (req, res) => {
    if(!req.session.userSessionId) return res.redirect('/admin')
    res.render('addMenu')
  },

  handleAddMenu: (req, res) => {
    const {name, price, image} = req.body
    console.log(req.body)
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    if(!name || !price || !image) {
      req.flash('errorMessage', '請填入所有欄位')
      return res.redirect('/add-menu')
    }
    Menu.create({
      name,
      price,
      image,
      isDeleted: 0,
    }).then(menu => {
      res.redirect('/admin/menu')
    }).catch(error => {
      console.log(error)
      res.redirect('/admin/menu')
    })
  },

  updateMenu: (req, res) => {
    const menuId = req.params.id
    if(!req.session.userSessionId) return res.redirect('/admin')
    Menu.findByPk(menuId).then(menu => {
      res.render('updateMenu',{
        menu,
      })
    })
  },

  handleUpdateMenu: (req, res) => {
    const menuId = req.params.id
    const {name, price, image} = req.body
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    if(!name || !price || !image) {
      req.flash('errorMessage', '請填入所有欄位')
      return res.redirect(`/update/${prizeId}`)
    }
    Menu.update({
      name,
      price,
      image,
    },{where: {id: menuId},}).then(newMenu => {
      res.redirect('/admin/menu')
    }).catch(error => {
      console.log(error)
      res.redirect('/admin/menu')
    })
  },

  deleteMenu: (req, res) => {
    const menuId = req.params.id
    const UserId = req.session.userSessionId
    if(!UserId) return res.redirect('/admin')
    Menu.destroy({
      where: {id: menuId,},
    }).then(()=> {
      res.redirect('/admin/menu')
    }).catch(error => {
      console.log(error)
      res.redirect('/admin/menu')
    })
  },
}

module.exports = menuController