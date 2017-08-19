var express = require('express');
var router = express.Router();
var partials = express.Router();

//----------------- Angular App--------------------
router.get('/', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  var Dog = req.models.dog;
  Dog.findAll({
    include: [req.models.breed]
  })
    .then(function(dogs){
      res.render("list", {dogs: dogs});
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
    if (req.body['birthday']) {
      var birthday = new Date(req.body['birthday']);
      req.body['birthday'] = birthday;
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Dog = req.models.dog;

    return Dog.create(data) .then(function(dog){
      res.redirect("/dogs/" + dog.id); 
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
    var Dog = req.models.dog;
    Dog.destroy({
      where: { 
        id: req.params.id 
      }}).then(function(affectedRow){
        if (affectedRow == 1) return res.redirect("/dogs");
        var err = new Error("Can't find the dog with id: " + data.id);
        error.status = 404;
        next(error);
      }).catch( function(error){
        next(error);
      });
  }
);

router.get('/:id', 
  function (req, res, next) {

    // request validation here

    next();
  }, function (req, res, next) {
    var Dog = req.models.dog;
    Dog.findById(req.params.id, {
      include: [req.models.breed]
    }).then(function(dog) {
      if (!dog) {
        var err = new Error("Can't find the dog with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      res.render('view', {dog: dog});
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
    if (req.body.gender == undefined) {
      req.body.gender = false;
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Dog = req.models.dog;
    Dog.findById(req.params.id, {
      include: [req.models.breed]
    }).then(function(dog) {
        if (!dog) {
          var err = new Error("Can't find the dog with id: " + data.id);
          error.status = 404;
          next(error);
        }

      return dog.update(data).then(function(dog){
        res.render("view", {dog: dog}); 
      }, function (error) {
        res.render("edit", {dog: dog, error: error}); 
      });
    }).catch( function(error){
      next(error);
    });
  }
);

router.get('/:id/edit', 
  function (req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    next();
  }, function (req, res, next) {
    var Dog = req.models.dog;
    var Breed = req.models.breed;
    Dog.findById(req.params.id, {
      include: [Breed]
    }).then(function(dog) {
      if (!dog) {
        var err = new Error("Can't find the dog with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      res.render('edit', {dog: dog});
    }).catch(function(error) {
      next(error);
    });
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
