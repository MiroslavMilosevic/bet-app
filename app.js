const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const loginMongoDB = require('./db/loginDB');
const getAllUsersMongoDB = require('./db/allUsersDB');
const addUserMongoDB = require('./db/addUserDB');
const deleteUser = require('./db/deleteUserDB');
const addTekmaMongoDB = require('./db/addTekmaDB');
const getAllTekmasMongoDB = require('./db/allTekmeDB');
const deleteTekmaMongoDB = require('./db/deleteTekmaDB');
const getAllRemovedTekmeMongoDB = require('./db/allRemovedTekmeDB');
const daLiJeProsloDB = require('./db/daLiJeProsloDB');
// var bodyParser = require('body-parser')
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
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))

// app.use((req,res)=>{
//   console.log(req.session.username, '>>>>>>>>>>>>>>>>>?"":LHDHFKSHFJSDKFDKS');
//   req.next()
// })

app.get('/login', (req, res) => {
  if (req.session.username == undefined) {
    res.render('login', { message: "", })
  } else {
    res.redirect("/home")
  }
});
app.post('/login', async (req, res) => {

  let loginData = await loginMongoDB(req.body.username, req.body.password);
  if (loginData != null && req.body.username == loginData.username && req.body.password == loginData.password) {
    req.session.username = loginData.username;
    req.session.password = loginData.password;
    res.redirect('/home');
  }
  else
    res.render('login', { message: "wrong username or password" })
});

app.get('/home', (req, res) => {
  if (req.session.username != undefined && req.session.password != undefined) {
    res.render('home', { username: req.session.username })
  } else {
    res.redirect('/login')
  }
});

app.get('/admin', async (req, res) => {
  if (req.session.username == "pero1" && req.session.password == "pero@123") {
    let users = await getAllUsersMongoDB();
    let tekmas = await getAllTekmasMongoDB();
    let removed_tekmas = await getAllRemovedTekmeMongoDB();
    // let date = new Date("2021-05-19 17:00:50");
    res.render('admin', { users: users, tekme: tekmas, removed_tekme: removed_tekmas })
  }
  else if (req.session.username != undefined && req.session.password != undefined) {
    res.redirect("/home")
  } else {
    res.redirect("/login")
  }
})
app.post('/add/user', async (req, res) => {
  if (req.session.username != undefined && req.session.password != undefined) {
    let usersAfterSave = await addUserMongoDB(req.body.username, req.body.password, req.body.description)
    res.redirect('/admin');
  } else {
    res.redirect("/login")
  }


})
app.post('/user/delete', async (req, res) => {
  if (req.session.username != undefined && req.session.password != undefined) {
    let deleteUserResponse = await deleteUser(req.body.id);
    res.redirect('/admin')
  } else {
    res.redirect("/login")
  }

})
app.post('/add/tekma', async (req, res) => {
  if (req.session.username != undefined && req.session.password != undefined) {
    let responseAddTekma = await addTekmaMongoDB(req.body);
    res.redirect('/admin')
  } else {
    res.redirect("/login")
  }
});
app.post('/delete/tekma', async (req, res) => {
  if (req.session.username != undefined && req.session.password != undefined) {
    console.log('delete/tekma pogodjennnnnnnnnnnnnnnnnnnnnn');
    let deleteTekmaResponse = await deleteTekmaMongoDB(req.body.id);
    console.log(deleteTekmaResponse);
    res.redirect('/admin')
  } else {
    res.redirect("/login")
  }
});
///delete/tekma
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login')
});

app.post('/proslo', async (req, res) => {
  let response = await daLiJeProsloDB.prosloMongoDB(req.body.id); res.redirect('/admin')
});
app.post('/nije', async (req, res) => {
  let response = await daLiJeProsloDB.nijeMongoDB(req.body.id); res.redirect('/admin')
});
app.post('/delete/removed', async (req, res) => {
  let response = await daLiJeProsloDB.obrisiRemovedTekmuMongoDB(req.body.id); res.redirect('/admin')
});


//
app.use((req, res) => {
  if (req.session.username == undefined) {
    res.redirect('/login')
  } else {
    res.redirect("/home")
  }
})

