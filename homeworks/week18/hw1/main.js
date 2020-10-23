const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')

const mainController = require('./controller/main')
const lotteryController = require('./controller/lottery')
const userController = require('./controller/user')
const adminController = require('./controller/admin')

const app = express()
const port = process.env.PORT || 5002

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
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

app.get('/', mainController.init)
app.get('/menu', mainController.menu)
app.get('/admin', adminController.admin)
app.get('/prize/:id', lotteryController.prize)
app.get('/addPrize', lotteryController.addPrize)
app.get('/lottery', lotteryController.lottery)
app.get('/update/:id', lotteryController.updatePrize)
app.get('/delete/:id', lotteryController.deletePrize)
app.get('/login', userController.login)
app.get('/logout', userController.logout)


app.post('/lottery', lotteryController.getLottery)
app.post('/prize', lotteryController.handleAddPrize)
app.post('/update/:id', lotteryController.handleUpdatePrize)
app.post('/login', userController.handleLogin)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})