const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash');
const blogController = require('./controllers/blog.js')
const userController = require('./controllers/user.js')

const app = express()
const port = 5001

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))
app.use(flash())
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  res.locals.userId = req.session.userId || null;
  res.locals.errorMessage = req.flash('errorMessage');
  next();
})

app.get('/blog', blogController.init)
app.get('/article/:id', blogController.get)
app.get('/addArticle', blogController.addArticle)
app.get('/admin', blogController.admin)
app.get('/register', userController.register)
app.get('/login', userController.login)
app.get('/logout', userController.logout)
app.get('/update/:id', blogController.updateArticle)
app.get('/delete/:id', blogController.deleteArticle)

app.post('/article', blogController.handleAddArticle)
app.post('/login', userController.handleLogin)
app.post('/register', userController.handleRegister)
app.post('/update/:id', blogController.handleUpdateArticle)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})