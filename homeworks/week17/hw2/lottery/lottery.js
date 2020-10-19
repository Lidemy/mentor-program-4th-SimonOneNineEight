const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const cors = require('cors')
const lotteryController = require('./controller/lottery')

const app = express()
const port = 5002

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

app.get('/', lotteryController.getAll)
app.get('/admin', lotteryController.admin)
app.get('/login', lotteryController.login)
app.get('/logout', lotteryController.logout)
app.get('/prize/:id', lotteryController.prize)
app.get('/addPrize', lotteryController.addPrize)
app.get('/lottery', lotteryController.getLottery)
app.get('/update/:id', lotteryController.updatePrize)
app.get('/delete/:id', lotteryController.deletePrize)

app.post('/login', lotteryController.handleLogin)
app.post('/prize', lotteryController.handleAddPrize)
app.post('/update/:id', lotteryController.handleUpdatePrize)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})