const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

const mainController = require('./controller/main')
const lotteryController = require('./controller/lottery')
const userController = require('./controller/user')
const adminController = require('./controller/admin')
const menuController = require('./controller/menu')
const faqController = require('./controller/faq')

const app = express()
const port = process.env.PORT || 5002

const storage = multer.diskStorage({
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('Please upload an image'))
    }
  },
  destination: (req, file, cb) => {
    cb(null, 'public/img')
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({storage,})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(flash())
app.use(express.static(__dirname + '/public'))
app.use(cors())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use((req, res, next) => {
  res.locals.userSessionId = req.session.userSessionId || null
  res.locals.errorMessage = req.flash('errorMessage') || null
  next()
})


// main middleware
app.get('/', mainController.init)
app.get('/menu', mainController.menu)
app.get('/lottery', mainController.lottery)

// admin middleware
app.get('/admin', adminController.init)
app.get('/admin/menu', adminController.menu)
app.get('/admin/lottery', adminController.lottery)
app.get('/admin/faq', adminController.faq)

//lottery middleware
app.get('/prize/:id', lotteryController.prize)
app.get('/add-prize', lotteryController.addPrize)
app.get('/prize/update/:id', lotteryController.updatePrize)
app.get('/prize/delete/:id', lotteryController.deletePrize)
app.post('/lottery', lotteryController.getLottery)
app.post('/prize', lotteryController.handleAddPrize)
app.post('/prize/update/:id', lotteryController.handleUpdatePrize)

//menu middleware
app.get('/menu/:id', menuController.menu)
app.get('/add-menu', menuController.addMenu)
app.get('/menu/update/:id', menuController.updateMenu)
app.get('/menu/delete/:id', menuController.deleteMenu)
app.post('/menu', menuController.handleAddMenu)
app.post('/menu/update/:id', menuController.handleUpdateMenu)


//faq middleware
app.get('/faq/:id', faqController.faq)
app.get('/add-faq', faqController.addFaq)
app.get('/faq/update/:id', faqController.updateFaq)
app.get('/faq/delete/:id', faqController.deleteFaq)
app.post('/faq', faqController.handleAddFaq)
app.post('/faq/update/:id', faqController.handleUpdateFaq)


//user middleware
app.get('/login', userController.login)
app.get('/logout', userController.logout)
app.post('/login', userController.handleLogin)


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})