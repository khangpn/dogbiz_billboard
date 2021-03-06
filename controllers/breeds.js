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
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Breed = req.models.breed;

    return Breed.create(data).then(function(breed){
      res.redirect("/breeds/" + breed.fci); 
    }).catch(function(error){
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

router.delete('/:fci',
  function(req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }

    next();
  }, function(req, res, next) {
    var Breed = req.models.breed;
    Breed.findById(req.params.fci).then(function(breed){
      return breed.destroy().then(function() {
        res.redirect("/breeds");
      });
    }).catch( function(error){
      next(error);
    });
  }
);

router.get('/:fci', 
  function (req, res, next) {

    // request validation here

    next();
  }, function (req, res, next) {
    var Breed = req.models.breed;
    Breed.findById(req.params.fci).then(function(breed) {
      if (!breed) {
        var err = new Error("Can't find the breed with fci: " + req.params.fci);
        error.status = 404;
        next(error);
      }
      return breed.getDogs().then(dogs => {
        res.render('view', {breed: breed, dogs: dogs});
      });
    }).catch(function(error) {
      next(error);
    });
});

router.get('/:fci/edit', 
  function (req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    next();
  }, function (req, res, next) {
    var Breed = req.models.breed;
    Breed.findById(req.params.fci).then(function(breed) {
      if (!breed) {
        var err = new Error("Can't find the breed with fci: " + req.params.fci);
        error.status = 404;
        next(error);
      }
      res.render('edit', {breed: breed});
    }).catch(function(error) {
      next(error);
    });
});

router.put('/:fci',
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
    var fci= req.params.fci;
    var Breed = req.models.breed;
    return Breed.findById(fci).then(function(breed) {
      if (!breed) {
        var error = new Error("Can't find the breed with fci: " + fci);
        error.status = 404;
        next(error);
      }

      return breed.update(data).then(function(breed){
        res.redirect('/breeds/' + breed.fci); 
      }, function (error) {
        res.render("view", {breed: breed, error: error}); 
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
