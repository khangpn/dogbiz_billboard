var express = require('express');
var router = express.Router();
var partials = express.Router();

router.get('/', function(req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    next();
  }, function(req, res, next) {
  var Account = req.models.account;
  var Admin = req.models.admin;
  Account.findAll({
    include: [Admin]
  }).then(function(accounts){
    res.render("list", {accounts: accounts});
  }).catch( function(error){
    next(error);
  });
});

router.get('/:id', 
  function (req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    next();
  }, function (req, res, next) {
    var Account = req.models.account;
    var Admin = req.models.admin;
    Account.findById(req.params.id, {
      include: [Admin]
    }).then(function(account) {
      if (!account) {
        var err = new Error("Can't find the account with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      res.render('view', {account: account});
    }).catch(function(error) {
      next(error);
    });
});

//----------------- Partials section --------------------
partials.get('/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/_' + name);
});

router.use('/partials', partials);
//--------------------------------------------------------

module.exports = router;
