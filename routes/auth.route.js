const express = require('express')
const {authenticateGoogle, authGoogleCallback, authGoogleSuccess, authLogout, authGoogleFailure} = require('../controller/auth.controller')

const router = express.Router();
function isLoggedIn(req,res,next){
    req.user ? next() : res.sendStatus(401);
}

router.get('/google', authenticateGoogle);

router.get('/google/callback', authGoogleCallback);

router.get('/authenticated', isLoggedIn, authGoogleSuccess);

router.get('/failed', authGoogleFailure);

router.get('/logout', authLogout);

module.exports = router