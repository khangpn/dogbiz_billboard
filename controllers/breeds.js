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
  var Breed = req.models.breed;
  Breed.findAll()
    .then(function(breeds){
      res.render("list", {breeds: breeds});
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
      var Breed = req.models.admin;
      const account = Account.build(data['account']);
      account.validate().then(function() {
        const admin = Breed.build(data, {
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
    var Breed = req.models.admin;

    return Breed.create(data, {
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
    var Breed = req.models.admin;
    Breed.findById(req.params.id, {
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
    var Breed = req.models.admin;
    Breed.findById(req.params.id, {
      include: [req.models.account]
    }).then(function(admin) {
      if (!admin) {
        var err = new Error("Can't find the admin with id: " + req.params.id);
        error.status = 404;
        next(error);
      }

      //var returnedBreed = admin.toJSON();
      //returnedBreed.is_owner = admin.account.id == res.locals.current_account.id;
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
    var Breed = req.models.admin;
    return Breed.findById(data.id).then(function(admin) {
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
//--------------------------------------------------------

//----------------- Partials section --------------------
partials.get('/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/_' + name);
});

router.use('/partials', partials);
//--------------------------------------------------------
module.exports = router;
