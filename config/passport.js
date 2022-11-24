const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose') ; // because we check the databases 

const bcrypt = require('bcryptjs') ; 

// now we need our user model 

const User = require('../models/User') ; 

module.exports = function(passport)
{
   passport.use(
    new LocalStrategy({usernameField: 'email'} , (email , password , done )=>
    {
      // match user 
      User.findOne({email : email})
      .then(user => 
        {
          // check on the basis of email that if email not found then user exist else not 
          if(!user)
          {
            return done(null , false , {message : 'That email is not registered'}) 
          }

          // now we should check for password 
          bcrypt.compare(password , user.password , (err , isMatch)=>
          {
            if(err) throw err ; 


            if(isMatch)
            {
              return done(null , user) ; 
            }
            else 
            {
              return done(null , false , {message :'Password incorrect'}) ; 
            }
          })  ; 

        })
      .catch(err => console.log(err)) ; 
    })
   );


   // now serializing and deserializing the user they store in form of session that user is logged in 

   passport.serializeUser((user , done)=>
   {
     done(null , user.id) ; 
   });

   passport.deserializeUser((id , done) => {
    User.findById(id,  (err ,user)=> {
      done(err , user) ; 
    });
   });
};