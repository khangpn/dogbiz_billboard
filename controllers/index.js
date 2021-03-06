var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var partials = express.Router();

//--------------- Unauthenticated section ------------------
router.get('/', function(req, res, next) {
  Dog = req.models.dog;
  Breed = req.models.breed;
  Dog.findAll({
    include: [Breed]
  }).then(function(dogs) {
    res.render("../index", {title: 'DogBiz Billboard', dogs: dogs});
  }).catch(function(error) {
    next(error);
  });
});

router.get('/login', function(req, res, next) {
  if (res.locals.authenticated) return res.redirect('/accounts/' + res.locals.current_account.id);
  res.render("login");
});

router.post('/login', function(req, res, next) {
  if (res.locals.authenticated) return res.redirect('/accounts/' + res.locals.current_account.id);
  if (!req.body) return next(new Error('Cannot get the req.body'));
  var data = req.body;
  var Account = req.models.account;
  var Token = req.models.token;
  Account.findAll({
    where: {
      email: data.email
    }
  })
    .then(function(accounts){
      // Handle wrong authentication
      function wrongAuth () {
        var error = { errors: [] };
        var e = {
          message: "Email address or password is not correct"
        };
        error.errors.push(e);
        return res.render("login", {
          error: error
        });
      }

      // Handle logging in
      function login() {
        var token = Token.generateToken();
        var origin_name = token.name;
        token.account_id = account.id;
        token.save()
          .then(function(tk){
            if (data.remember === 'on') {
              res.cookie('token', origin_name, {
                httpOnly: true,
                maxAge: 1209600000
              });
            } else {
              res.cookie('token', origin_name, {
                httpOnly: true
              });
            }
            res.redirect('/accounts/' + account.id);
            
          }, function(error) {
            return next(error);
          });
      }

      if (!accounts || accounts.length===0) {
        wrongAuth();
      }
      var account = accounts[0];
      account.authenticate(data, function(error, result){
        if (error) return next(error);

        if (result) {
          login();
        } else {
          wrongAuth();
        }
      });
    }, function(error){
      return next(error);
    });
});

router.get('/logout', function(req, res, next) {
  if (!res.locals.authenticated) return res.redirect('/');
  if (!req.body) return next(new Error('Cannot get the req.body'));
  var token_name = req.cookies.token;
  if (token_name) {
    var Account = req.models.account;
    var Token = req.models.token;
    var hashed_token = crypto.createHash('md5').update(token_name).digest('hex');

    Token.findAll({
      where: {
        name: hashed_token
      },
      limit: 1,
      include: req.models.account
    }).then(
      function(tokens) {
        if (tokens && tokens.length === 1) {
          var token = tokens[0];
          token.destroy().then(function() {
              res.clearCookie('token');
              res.redirect('/');
            }, function(error) {
              return next(error);
            }
          );
        } else {
          res.redirect('/');
        }
      }, function (error) {
        return next(error);
      }
    );
  } else {
    res.redirect('/');
  }
});
//--------------------------------------------------------

//----------------- Partials section --------------------
partials.get('/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/_' + name);
});

router.use('/partials', partials);
//--------------------------------------------------------

module.exports = router;
