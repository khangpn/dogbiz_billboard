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
    if (data['account'] == undefined) {
      var errorItem = new Sequelize.ValidationErrorItem(
        "The account data is invalid",
        "invalid format",
        "account",
        data['account']
      );
      var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
      res.render("create", {error: error});
    } else {
      var Account = req.models.account;
      var Admin = req.models.admin;
      const account = Account.build(data['account']);
      account.validate().then(function() {
        const admin = Admin.build(data, {
          include: [Account]
        });
        return admin.validate().then(function() {
          next();
        }).catch(function(error) {
          res.render("create", {error: error});
        });
      }).catch(function(error) {
        res.render("create", {error: error});
      });
    }
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
      res.render("create", {error: error});
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
    Admin.findById(req.params.id, {
      include: [req.models.account]
      }).then(function(admin){
        var account = admin.account;
        // If we call admin.destroy, the corresponding account will not be deleted on cascade.
        return account.destroy().then(function() {
          res.redirect("/admins");
        });
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
        res.render("view", {admin: admin, error: error}); 
      });
    }).catch( function(error){
      next(error);
    });
  }
);

router.get('/:id/password',
  function(req, res, next) {
    if (!res.locals.authenticated) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }

    var Admin = req.models.admin;
    return Admin.findById(data.id).then(function(admin) {
      if (!admin) {
        var err = new Error("Can't find the admin with id: " + data.id);
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
    render("password", {admin: res.locals.current_admin});
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
        var err = new Error("Can't find the admin with id: " + data.id);
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
            render("password", {admin: res.locals.current_admin, error: error});
          });
      } else {
        var errorItem = new Sequelize.ValidationErrorItem(
          "Your old password is incorrect!",
          "invalid password",
          "password",
          data['password']
        );
        var error = new Sequelize.ValidationError("The input is invalid", [errors]);
        render("password", {admin: res.locals.current_admin, error: error});
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
