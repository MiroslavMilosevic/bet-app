const express = require('express');
const session = require('express-session')
const app = express();
const mongoose = require('mongoose');
const loginMongoDB = require('./db/loginDB');
const getAllUsersMongoDB = require('./db/allUsersDB');
// const User = require('./db/user');
app.set('view engine', 'ejs');

const dbURI = 'mongodb+srv://user1:12345@mycluster.dc55z.mongodb.net/first-base?retryWrites=true&w=majority'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true }).then(res => {
  console.log('connected')
  app.listen(3000, () => { console.log("listening at port 3000"); })

}).catch(err => {
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


app.get('/login', (req, res) => {
  if(req.session.username==undefined){
  res.render('login', { message: "", })
  }else{
    res.redirect("/home")
  }
});
app.post('/login', async (req, res) => {

  let loginData = await loginMongoDB(req.body.username, req.body.password);
  if (loginData != null && req.body.username == loginData.username && req.body.password == loginData.password ) {
    req.session.username = loginData.username;
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
  }
});

app.get('/admin', async (req, res) => {
  if(req.session.username!=undefined){
    let users = await getAllUsersMongoDB();

       console.log(users);
    res.render('admin', {users:users})
    }else{
      res.redirect("/login")
    }
//
})
//
app.use((req, res)=>{
  if(req.session.username==undefined){
    res.redirect('/login')
    }else{
      res.redirect("/home")
    }
})

