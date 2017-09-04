var express = require('express');
var router = express.Router();
var partials = express.Router();
var DateHelper = require("../lib/date-helper.js");

const SELECT_LIMIT = 50;
//----------------- Angular App--------------------
router.get('/', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  const Dog = req.models.dog;
  let sequelize = req.models.sequelize;
  Dog.findAll({
    include: [req.models.breed],
    order: [
      ['score', 'DESC']
    ],
    limit: SELECT_LIMIT
  })
    .then(function(dogs){
      res.render("list", {dogs: dogs});
    }).catch( function(error){
      next(error);
    });
});

router.get('/page/:pageNumber', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  var Dog = req.models.dog;
  let pageNumber = req.params.pageNumber;
  pageNumber = (!isNaN(pageNumber) && parseInt(pageNumber) > 0) ? (parseInt(pageNumber) - 1) : 0;
  Dog.findAll({
    include: [req.models.breed],
    order: [['score', 'DESC']],
    limit: SELECT_LIMIT,
    offset: pageNumber*SELECT_LIMIT
  })
    .then(function(dogs){
      res.render("list", {dogs: dogs});
    }).catch( function(error){
      next(error);
    });
});

router.get('/top/:topLimit', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  const Dog = req.models.dog;
  let limit = req.params.topLimit;
  limit = (!isNaN(limit) && parseInt(limit) > 0) ? parseInt(limit) : 1;
  Dog.findAll({
    include: [req.models.breed],
    order: [['score', 'DESC']],
    limit: limit
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
    if (req.body.gender == undefined) {
      req.body.gender = false;
    }
    var birthday = req.body.birthday;
    var Sequelize = req.models.Sequelize;
    if (!DateHelper.isISO(birthday)) {
      var errorItem = new Sequelize.ValidationErrorItem(
        "The birthday format is invalid (YYYY-MM-DD or YYYY/MM/DD)",
        "invalid format",
        "birthday",
        birthday
      );
      var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
      var Breed = req.models.breed;
      return Breed.findAll().then(function(breeds) {
        res.render("create", {error: error, breeds: breeds});
      })
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Dog = req.models.dog;
    var Breed = req.models.breed;
    return Breed.findById(data.breed_fci).then(function(breed) {
      if (!breed) {
        var Sequelize = req.models.Sequelize;
        var errorItem = new Sequelize.ValidationErrorItem(
          "Can't find the breed with id: " + data.breed_fci,
          "record not found",
          "breed_fci",
          data.breed_fci
        );
        var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
        return Breed.findAll().then(function(breeds) {
          res.render("create", {error: error, breeds: breeds});
        })
      }
      return Dog.create(data).then(function(dog){
        res.redirect("/dogs/" + dog.id); 
      })
    }).catch ( function(error){
      return Breed.findAll().then(function(breeds) {
        res.render("create", {error: error, breeds: breeds});
      })
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
    var Breed = req.models.breed;
    return Breed.findAll().then(function(breeds) {
      res.render("create", {breeds: breeds});
    })
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
      return dog.getAchievements({
        include: [req.models.contest]
      }).then(achievements => {
        return dog.getEntries({
          include: [req.models.contest]
        }).then(entries => {
          res.render('view', {dog: dog, entries: entries, achievements: achievements});
        });
      });
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
    var birthday = req.body.birthday;
    var Sequelize = req.models.Sequelize;
    if (!DateHelper.isISO(birthday)) {
      var errorItem = new Sequelize.ValidationErrorItem(
        "The birthday format is invalid (YYYY-MM-DD or YYYY/MM/DD)",
        "invalid format",
        "birthday",
        birthday
      );
      var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
      return res.render("create", {error: error});
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Dog = req.models.dog;
    var Breed = req.models.breed;
    Dog.findById(req.params.id, {
      include: [Breed]
    }).then(function(dog) {
        if (!dog) {
          var err = new Error("Can't find the dog with id: " + data.id);
          error.status = 404;
          next(error);
        }
        return Breed.findById(data.breed_fci).then(function(breed) {
          if (!breed) {
            var Sequelize = req.models.Sequelize;
            var errorItem = new Sequelize.ValidationErrorItem(
              "Can't find the breed with id: " + data.breed_fci,
              "record not found",
              "breed_fci",
              data.breed_fci
            );
            var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
            throw error;
          }
          return dog.update(data).then(function(dog){
            res.redirect('/dogs/' + dog.id); 
          });
        }).catch ( function(error){
          return Breed.findAll().then(function(breeds) {
            res.render("edit", {breeds: breeds, dog:dog, error: error});
          })
        });
    }).catch ( function(error){
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
      return Breed.findAll().then(function(breeds) {
        res.render("edit", {breeds: breeds, dog: dog});
      })
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
