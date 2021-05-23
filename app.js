const express = require('express');
const session = require('express-session');
const app = express();
const mongoose = require('mongoose');
const loginMongoDB = require('./db/loginDB');
const getAllUsersMongoDB = require('./db/allUsersDB');
const addUserMongoDB = require('./db/addUserDB');
const deleteUser = require('./db/deleteUserDB');
const addTekmaMongoDB = require('./db/addTekmaDB');
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
  if(req.session.username == "pero1" && req.session.password == "pero@123"){
    let users = await getAllUsersMongoDB();
    let date = new Date("2021-05-19 17:00:50");
      console.log(users[0]);
      // console.log(users[0].createdAt, date);
      // console.log(users[0].createdAt > date);
      // console.log(users[0].createdAt < date);
    //   console.log("2021-05-19 17:00:50" == "2021-05-19 17:00:50" );
    //   console.log("2022-05-19 17:00:50" > "2021-05-19 17:00:50" );
    //   console.log("2022-05-19 17:00:50" == "2021-05-19 17:00:50" );
    //  date+="";
      //  console.log(date);
      //  console.log(date.toString());

      

    //  console.log(date);
    
     //  console.log(users);
    res.render('admin', {users:users})
    }
    else if(req.session.username != undefined && req.session.password != undefined){
      res.redirect("/home")
     } else{
      res.redirect("/login")
    }
})
app.post('/add/user', async(req, res)=>{
   if(req.session.username != undefined && req.session.password != undefined){
    let usersAfterSave = await addUserMongoDB(req.body.username, req.body.password, req.body.description)
    res.redirect('/admin');
   }else{
    res.redirect("/login")
   }

    
})
app.post('/user/delete', async(req, res)=>{
  if(req.session.username != undefined && req.session.password != undefined){
    let deleteUserResponse = await deleteUser(req.body.id);  
    res.redirect('/admin')
   }else{
    res.redirect("/login")
   }

})
app.post('/add/tekma', async (req, res)=>{
  if(req.session.username != undefined && req.session.password != undefined){
    let radiMolimTe = await addTekmaMongoDB(req.body);
    res.send("<p>Stradasf;laskfjld;asfasdfjkas;ldf</p>")
   }else{
    res.redirect("/login")
   }
      
});

//
app.use((req, res)=>{
  if(req.session.username==undefined){
    res.redirect('/login')
    }else{
      res.redirect("/home")
    }
})

