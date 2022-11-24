/*const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router; 
*/

const express = require('express') ;
const router = express.Router() ; 
const bcrypt = require('bcryptjs');
const passport = require('passport') ; 
//const forwardAuthenticated = require('../config/auth');
// User Model 
const User = require('../models/User');
// login page 
router.get('/login' , (req , res)=>
{
  res.render('login') ;  
}) 
// Register page 

router.get('/register'  , (req ,res)=>
{
  res.render('register');
})

// register post request 

router.post('/register' , (req, res)=>
{
   const {name , email , password , password2} = req.body ; 

   let errors = [] ; 
   // now check that all required fields should be fill in the form 
   if(!name || !email || !password || !password2)
   {
     errors.push({msg : "Please fill in all fields"});
   }

   // check password and password2 
   if(password != password2)
   {
    errors.push({msg : "Passwords do not match"});
   }
   
   // add password length 

   if(password.length < 4)
   {
     errors.push({msg : 'Password should at least 4 characters long '}) ; 
   }


   if(errors.length > 0){
    res.render('register' , {
      errors , name , email , password , password2
    });
    // here we pass the arguments so that we don't have to refill the form on resubmission
    
   }

   else 
   {
     // now if no errors than store in database by encrypting the password 
     User.findOne({email : email})
     .then(user =>
      {
        if(user)
        {
          // user exists 
          errors.push({msg : "This E-mail is already registered"}) ; 
          res.render('register' , {
            errors , name , email , password , password2
          }); 
        }
        else{
          // now user not exist save it to the browser 
          const newUser = new User({
            name ,
            email,
            password
          });

          // hash password 
          bcrypt.genSalt(10 , (err , salt)=>
          bcrypt.hash(newUser.password , salt, (err,hash)=>
          {
            if(err) 
            {
              throw err ; 
            }
            // if not error then password is equal to hash 
            newUser.password = hash ;

            // now save the user as password is hashed 
            newUser.save()  
            .then(user => {
              // user registered then send to login page 
              req.flash('success_msg' , 'You are now registered and can login') ; 
              res.redirect('/users/login');   
            })
            .catch(err=> console.log(err));
          }))
        }
      })

   }
})


// login post request 

router.post('/login' , (req , res,next)=>
{
  passport.authenticate('local' , {
    successRedirect: '/dashboard' , 
    failureRedirect: '/users/login',
    failureFlash : true  
  }) (req ,res ,next) ;
});
module.exports = router ; 


// logout handle 

router.get('/logout' , (req ,res)=>
{
  req.logout(err =>
    {
      if(err)
      {
        console.log(err) ; 
        return err; 
      }
      req.flash('success_msg ' , 'you are logged out');

       res.redirect('/users/login') ;
      
    })
   
});
