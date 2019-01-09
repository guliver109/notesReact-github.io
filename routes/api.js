const router = require("express").Router();
const user = require("../models/user.js");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const passport = require("passport");
const validateRegisterInput = require("../client/validation/register");
const validateLoginInput = require("../client/validation/login")

const User = require("../models/user");


router.post("/submit", function(req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

      if(!isValid) {
        return res.status(400).jason(errors);
      }
      User.findOne({
          email: req.body.email
      }).then(user => {
        if(user) {
          return res.status(400).json({
          email: "Email already exists!"
          });
        }
        // else {
        //   const avatar = gravatar.url(req.body.email, {
        //     s: '200',
        //     r: 'pg',
        //     d: 'mm'
        //   });
        // }
      })
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        // avatar
    });

    bcrypt.genSalt(10, (err, salt) => {
        if(err) console.error('There was an error', err);
        else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) console.error('There was an error', err);
                else {
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.json(user)
                        }); 
                }
            });
            // return res.redirect("/profile");
        }   
    });
});

router.post('/login', (req, res) => {

  const { errors, isValid } = validateLoginInput(req.body);

  if(!isValid) {
      return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
      .then(user => {
          if(!user) {
              errors.email = 'User not found'
              return res.status(404).json(errors);
          }
          bcrypt.compare(password, user.password)
                  .then(isMatch => {
                      if(isMatch) {
                          const payload = {
                              id: user.id,
                              name: user.name,
                              avatar: user.avatar
                          }
                          jwt.sign(payload, 'secret', {
                              expiresIn: 3600
                          }, (err, token) => {
                              if(err) console.error('There is some error in token', err);
                              else {
                                  res.json({
                                      success: true,
                                      token: `Bearer ${token}`
                                  });
                              }
                          });
                      }
                      else {
                          errors.password = 'Incorrect Password';
                          return res.status(400).json(errors);
                      }
                  });
      });
});

// return res.redirect("/profile");

// router.get("/profile", function (req, res, next) {
//   user.findOne({email: req.body.email})
//     console.log(req.body)
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err);
//       } else if (!user) {
//           var err = new Error("User not found!");
//           res.status(401).json(err);
//           return callback(err);
//       }
//       bcrypt.compare(password, user.passwordConf, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// });

router.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/login");
      }
    });
  }
});

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
  return res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
  });
});

module.exports = router;