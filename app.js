const mongoose = require('mongoose')
const express = require('express')
const session = require('express-session')
const app = express()
const ProductRoute = require('./routes/product.route.js')
const AuthRoute = require('./routes/auth.route.js')
const passport = require('passport')

require('dotenv').config();
const NODE_ENV = process.env.NODE_ENV
const SESSION_SECRET= process.env.SESSION_SECRET;
const mongoDB_connect_url = NODE_ENV.includes('test') ? process.env.MONGODB_TEST_ENV_URL : process.env.MONGODB_CONNECT_URL;
// require('./auth')

//Add support for API middlewares to work with JSON and  url encoded inputs
app.use(express.json())
app.use(express.urlencoded({extended : false}))
// app.use(session({secret: SESSION_SECRET}))
// app.use(passport.initialize())
// app.use(passport.session())

app.use('/api/products', ProductRoute)
app.use('/auth', AuthRoute)

// function isLoggedIn(req,res,next){
//     req.user ? next() : res.sendStatus(401);
// }

mongoose.connect(mongoDB_connect_url)
.then(()=>{
    console.log("Connected to the DB")
})
.catch(() => {
    console.log("Connection to DB failed")
});

app.get('/', (req, res) => {
    res.send("Hello from Express API <br><a href='/auth/google'> Sign in with Google");
});


// app.get('/auth/google', 
//     passport.authenticate('google',{scope: ['email', 'profile   ']})
// );

// app.get('/auth/google/callback', 
//     passport.authenticate('google',{
//         successRedirect: '/auth/authenticated',
//         failureRedirect: '/auth/failed'
//     }));
// app.get('/auth/google/callback', 
//     passport.authenticate('google',{
//         successRedirect: '/auth/authenticated',
//         failureRedirect: '/auth/failed'
//     }));


// app.get('/auth/authenticated', isLoggedIn,(req,res) => {
//     res.send(`Hi ${req.user.displayName}, you are now authenticated ! <br> <a href="/auth/logout"> Logout`)
// });

// app.get('/auth/logout',(req,res)=>{
//     req.logout(function(err) {
//         if (err) { return next(err); }
//         res.redirect('/');
//       });
      
//     req.session.destroy()
//     res.send('GoodBye !')
// })

// app.get('/auth/failed', (req,res)=>{
//     res.send('Failed to Authenticate :(')
// })

module.exports = app