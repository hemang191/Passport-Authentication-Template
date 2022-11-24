/*const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

module.exports = router;
*/

const express = require('express') ; 
const router = express.Router() ; 
const {ensureAuthenticated} = require('../config/auth') ; 

// welcome page 
router.get('/' , (req , res)=>
{
   res.send('Welcome') ; 
})

router.get('/dashboard' , ensureAuthenticated , (req , res)=> 
{
  res.render('dashboard', {
    name : req.user.name 
  }) ; 
})

module.exports = router ; 