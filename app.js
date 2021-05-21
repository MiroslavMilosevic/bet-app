const express = require('express');
const session = require('express-session')
const app = express();
const mongoose = require('mongoose');
const loginMongoDB = require('./db/loginDB');
// const User = require('./db/user');
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://user1:12345@mycluster.dc55z.mongodb.net/first-base?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser:true,useUnifiedTopology: true}).then(res=>{
    console.log('connected')
    app.listen(3000, () => { console.log("listening at port 3000"); })

}).catch(err=>{
    console.log('error hapened');
});


////app.use
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(express.static('script'));
app.use(session({
  //   username:'jocara10',
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

////app.use

app.get('/login', (req, res) => {
  res.render('login', { message: "", })
});

app.post('/login', (req, res) => {

  console.log(req.body);
  if (req.body.username == "jocara10") {
    req.session.username = 'jocara10';
    res.redirect('/home');
  }
  else
    res.render('login', { message: "wrong username or password" })
});

app.get('/home', (req, res) => {
  if (req.session.username != undefined) {
    res.render('home', { username: req.session.username })
  } else {
    res.redirect('/login')
  //  res.send("<p>you must be loged in</p>")
  }
});

app.post('/myfetch',async (req, res) => {
  console.log("myfetch pogodjen");
  let loginData = await loginMongoDB("pero1",'pero@123')
 //let ppp = await User.findOne({username:'pero23'})
  // let niz = User.find().then(dbData=>{
    console.log(loginData.description);
  // let obj = { ime: 'kito', prezime: 'kitic' }
   res.json(loginData);
 
})

