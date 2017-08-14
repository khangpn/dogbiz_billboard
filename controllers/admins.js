var express = require('express');
var router = express.Router();
var partials = express.Router();

//----------------- Angular App--------------------
router.get('/', function(req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    next();
  }, function(req, res, next) {
  var Admin = req.models.admin;
  Admin.findAll({
    include: [req.models.account]
  })
    .then(function(admins){
      res.render("list", {admins: admins});
    }).catch( function(error){
      next(error);
    });
});

router.post('/',
  function(req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    if (!req.body) {
      var err = new Error('Cannot get the req.body');
      error.status = 400;
      next(error);
    }

    var data = req.body;
    var Sequelize = req.models.Sequelize;
    var errors = [];
    if (data['account'] == undefined) {
      var errorItem = new Sequelize.ValidationErrorItem(
        "The account data is invalid",
        "invalid format",
        "account",
        data['account']
      );
      errors.push(errorItem);
    }
    if (data['account']['email'] == undefined) {
      var errorItem = new Sequelize.ValidationErrorItem(
        "The email is invalid",
        "invalid format",
        "email",
        data['email']
      );
      errors.push(errorItem);
    }
    if (errors.length != 0) {
      var error = new Sequelize.ValidationError("The input is invalid", errors);
      res.render("create", {error: error});
    }

    next();
  }, function(req, res, next) {
    var data = req.body;

    // This is because of the current sequelize version error.
    // Unless we have this, it will add null to admin_id, hence raise "can not be null" error because of our model definition.
    data['account_id'] = 'tmp'; 

    data['account']['is_admin'] = true;
    var Account = req.models.account;
    var Admin = req.models.admin;

    return Admin.create(data, {
      include: [Account]
    }) .then(function(admin){
      res.redirect("/admins/" + admin.id); 
    }).catch ( function(error){
      next(error);
    });
  }
);

router.get('/create', function(req, res, next) {
  if (!res.locals.isAdmin) {
    var err = new Error('You are not permitted to access this!');
    err.status = 401;
    return next(err);
  }
    next();
  }, function(req, res, next) {
    res.render("create");
  }
);

router.delete('/:id',
  function(req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }

    next();
  }, function(req, res, next) {
    var Admin = req.models.admin;
    Admin.destroy({
      where: { id: req.params.id }
      })
      .then(function(deleteds){
        res.redirect("/admins");
      }).catch( function(error){
        next(error);
      });
  }
);

/*TODO: handle admin and admin views*/
router.get('/:id', 
  function (req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    next();
  }, function (req, res, next) {
    var Admin = req.models.admin;
    Admin.findById(req.params.id, {
      include: [req.models.account]
    }).then(function(admin) {
      if (!admin) {
        var err = new Error("Can't find the admin with id: " + req.params.id);
        error.status = 404;
        next(error);
      }

      //var returnedAdmin = admin.toJSON();
      //returnedAdmin.is_owner = admin.account.id == res.locals.current_account.id;
      res.render('view', {admin: admin});
    }).catch(function(error) {
      next(error);
    });
});

router.put('/:id',
  function(req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    if (!req.body) {
      var err = new Error('Cannot get the req.body');
      error.status = 400;
      next(error);
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Admin = req.models.admin;
    return Admin.findById(data.id).then(function(admin) {
        if (!admin) {
          var err = new Error("Can't find the admin with id: " + data.id);
          error.status = 404;
          next(error);
        }

      return admin.update(data).then(function(admin){
        res.render("view", {admin: admin}); 
      }, function (error) {
        next(error);
      });
    }).catch( function(error){
      next(error);
    });
  }
);

router.post('/:id/password',
  function(req, res, next) {
    if (!res.locals.authenticated) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    if (!req.body) {
      var err = new Error('Cannot get the req.body');
      error.status = 400;
      next(error);
    }
    var data = req.body;
    if (!data.account.old_password) {
      var err = new Error('Old password must not be empty');
      error.status = 400;
      next(error);
    }

    var Admin = req.models.admin;
    return Admin.findById(data.id).then(function(admin) {
      if (!admin) {
        var err = new Error("Can't find the item with id: " + data.id);
        error.status = 404;
        next(error);
      }
      if (admin.account_id != res.locals.current_account.id) {
        var err = new Error('You are not permitted to access this!');
        error.status = 401;
        next(error);
      }
      res.locals.current_admin = admin;
      return next();
    }).catch( function(error){
      next(error);
    });
  }, function(req, res, next) {
    var data = req.body;
    var accountData = data.account;
    var account = res.locals.current_account;

    account.checkPasswordMatch(accountData.old_password, function(error, matched){
      if (error) return next(error);

      if (matched) {
        account.set('password', accountData.password);
        account.set('password_confirm', accountData.password_confirm);
        account.save()
          .then(function(updatedAcc){
            res.redirect('/admins/' + res.locals.current_admin.id); 
          }).catch( function(error){
            next(error);
          });
      } else {
        var err = new Error('Your old password is incorrect!');
        error.status = 401;
        next(error);
      }
    });
  }
);
//--------------------------------------------------------

//----------------- Partials section --------------------
partials.get('/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/_' + name);
});

router.use('/partials', partials);
//--------------------------------------------------------
module.exports = router;
