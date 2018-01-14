var express = require('express');
var router = express.Router();
var partials = express.Router();
var DateHelper = require("../lib/date-helper.js");
const {constants: {SELECT_LIMIT} } = require('../parameters');

router.get('/', function(req, res, next) {

    // request validation here
    if (!req.query.searchTerm) {
      return res.status(400).json({msg: "The search term is missing"})
    }

    next();
  }, function(req, res, next) {
  const Dog = req.models.dog;
  const Sequelize = req.models.Sequelize;
  const Op = Sequelize.Op;
  const searchTerm = req.query.searchTerm
  Dog.findAll({
    include: [req.models.breed],
    where: {
      [Op.or]: {
        name: {
          [Op.iLike]: `%${searchTerm}%`
        },
        chipId: {
          [Op.iLike]: `%${searchTerm}%`
        }
      }
    },
    order: [
      ['score', 'DESC']
    ],
    limit: SELECT_LIMIT
  }).then(function(dogs){
    res.json(dogs)
    return null
  }).catch( function(error){
    next(error);
  });
});

//router.get('/top/:limit', function(req, res, next) {
//
//    // request validation here
//
//    next();
//  }, function(req, res, next) {
//  const Dog = req.models.dog;
//  let limit = req.params.limit;
//  limit = (!isNaN(limit) && parseInt(limit) > 0) ? parseInt(limit) : SELECT_LIMIT;
//  Dog.findAll({
//    include: [req.models.breed],
//    order: [['score', 'DESC']],
//    limit: limit
//  }).then(function(dogs){
//    var Breed = req.models.breed;
//    return Breed.findAll().then(function(breeds) {
//      res.render("list", {dogs: dogs, breeds: breeds});
//    });
//  }).catch( function(error){
//    next(error);
//  });
//});
//
//router.get('/breed/:fci', function(req, res, next) {
//
//    // request validation here
//
//    next();
//  }, function(req, res, next) {
//  const Dog = req.models.dog;
//  const Breed = req.models.breed;
//  let fci = req.params.fci;
//  Breed.findById(fci).then(function(breed) {
//    if (!breed) {
//      var error = new Error("Can't find the breed with id: " + fci);
//      error.status = 404;
//      next(error);
//    }
//    let limit = req.params.limit;
//    limit = (!isNaN(limit) && parseInt(limit) > 0) ? parseInt(limit) : SELECT_LIMIT;
//    let page = req.params.page;
//    page = (!isNaN(page) && parseInt(page) > 0) ? (parseInt(page) - 1) : 0;
//    breed.getDogs({
//      include: [ req.models.breed ],
//      order: [['score', 'DESC']],
//      limit: limit,
//      offset: page*limit
//    }).then(function(dogs){
//      var Breed = req.models.breed;
//      return Breed.findAll().then(function(breeds) {
//        res.render("top_breed", {breed: breed, dogs: dogs, breeds: breeds});
//      });
//    }).catch( function(error){
//      next(error);
//    });
//  }).catch( function(error){
//    next(error);
//  });
//});
//
//router.post('/',
//  function(req, res, next) {
//    if (!res.locals.isAdmin) {
//      var error = new Error('You are not permitted to access this!');
//      error.status = 401;
//      next(error);
//    }
//    if (!req.body) {
//      var error = new Error('Cannot get the req.body');
//      error.status = 400;
//      next(error);
//    }
//    if (req.body.gender == undefined) {
//      req.body.gender = false;
//    }
//    var birthday = req.body.birthday;
//    var Sequelize = req.models.Sequelize;
//    if (!DateHelper.isISO(birthday)) {
//      var errorItem = new Sequelize.ValidationErrorItem(
//        "The birthday format is invalid (YYYY-MM-DD or YYYY/MM/DD)",
//        "invalid format",
//        "birthday",
//        birthday
//      );
//      var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
//      var Breed = req.models.breed;
//      return Breed.findAll().then(function(breeds) {
//        res.render("create", {error: error, breeds: breeds});
//      })
//    }
//    next();
//  }, function(req, res, next) {
//    var data = req.body;
//    var Dog = req.models.dog;
//    var Breed = req.models.breed;
//    return Breed.findById(data.breed_fci).then(function(breed) {
//      if (!breed) {
//        var Sequelize = req.models.Sequelize;
//        var errorItem = new Sequelize.ValidationErrorItem(
//          "Can't find the breed with id: " + data.breed_fci,
//          "record not found",
//          "breed_fci",
//          data.breed_fci
//        );
//        var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
//        return Breed.findAll().then(function(breeds) {
//          res.render("create", {error: error, breeds: breeds});
//        })
//      }
//      return Dog.create(data).then(function(dog){
//        res.redirect("/dogs/" + dog.id); 
//      })
//    }).catch ( function(error){
//      return Breed.findAll().then(function(breeds) {
//        res.render("create", {error: error, breeds: breeds});
//      })
//    });
//  }
//);
//
//router.get('/create', function(req, res, next) {
//  if (!res.locals.isAdmin) {
//    var error = new Error('You are not permitted to access this!');
//    err.status = 401;
//    return next(err);
//  }
//    next();
//  }, function(req, res, next) {
//    var Breed = req.models.breed;
//    return Breed.findAll().then(function(breeds) {
//      res.render("create", {breeds: breeds});
//    })
//  }
//);
//
//router.delete('/:id',
//  function(req, res, next) {
//    if (!res.locals.isAdmin) {
//      var error = new Error('You are not permitted to access this!');
//      error.status = 401;
//      next(error);
//    }
//
//    next();
//  }, function(req, res, next) {
//    var Dog = req.models.dog;
//    Dog.destroy({
//      where: { 
//        id: req.params.id 
//      }}).then(function(affectedRow){
//        if (affectedRow == 1) return res.redirect("/dogs");
//        var error = new Error("Can't find the dog with id: " + data.id);
//        error.status = 404;
//        next(error);
//      }).catch( function(error){
//        next(error);
//      });
//  }
//);
//
//router.get('/:id', 
//  function (req, res, next) {
//
//    // request validation here
//
//    next();
//  }, function (req, res, next) {
//    var Dog = req.models.dog;
//    Dog.findById(req.params.id, {
//      include: [req.models.breed]
//    }).then(function(dog) {
//      if (!dog) {
//        var error = new Error("Can't find the dog with id: " + req.params.id);
//        error.status = 404;
//        next(error);
//      }
//      return dog.getAchievements({
//        include: [req.models.dog_show]
//      }).then(achievements => {
//        res.render('view', {dog: dog, achievements: achievements});
//      });
//    }).catch(function(error) {
//      next(error);
//    });
//});
//
//router.get('/chipId/:chipId', 
//  function (req, res, next) {
//
//    // request validation here
//
//    next();
//  }, function (req, res, next) {
//    var Dog = req.models.dog;
//    Dog.findOne({
//      where: {
//        chipId: req.params.chipId
//      },
//      include: [req.models.breed]
//    }).then(function(dog) {
//      if (!dog) {
//        var error = new Error("Can't find the dog with chip ID: " + req.params.chipId);
//        error.status = 404;
//        next(error);
//      }
//      return dog.getAchievements({
//        include: [req.models.dog_show]
//      }).then(achievements => {
//        res.render('view', {dog: dog, achievements: achievements});
//      });
//    }).catch(function(error) {
//      next(error);
//    });
//});
//
//router.put('/:id',
//  function(req, res, next) {
//    if (!res.locals.isAdmin) {
//      var error = new Error('You are not permitted to access this!');
//      error.status = 401;
//      next(error);
//    }
//    if (!req.body) {
//      var error = new Error('Cannot get the req.body');
//      error.status = 400;
//      next(error);
//    }
//    if (req.body.gender == undefined) {
//      req.body.gender = false;
//    }
//    var birthday = req.body.birthday;
//    var Sequelize = req.models.Sequelize;
//    if (!DateHelper.isISO(birthday)) {
//      var errorItem = new Sequelize.ValidationErrorItem(
//        "The birthday format is invalid (YYYY-MM-DD or YYYY/MM/DD)",
//        "invalid format",
//        "birthday",
//        birthday
//      );
//      var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
//      return res.render("create", {error: error});
//    }
//    next();
//  }, function(req, res, next) {
//    var data = req.body;
//    var Dog = req.models.dog;
//    var Breed = req.models.breed;
//    Dog.findById(req.params.id, {
//      include: [Breed]
//    }).then(function(dog) {
//        if (!dog) {
//          var error = new Error("Can't find the dog with id: " + data.id);
//          error.status = 404;
//          next(error);
//        }
//        return Breed.findById(data.breed_fci).then(function(breed) {
//          if (!breed) {
//            var Sequelize = req.models.Sequelize;
//            var errorItem = new Sequelize.ValidationErrorItem(
//              "Can't find the breed with id: " + data.breed_fci,
//              "record not found",
//              "breed_fci",
//              data.breed_fci
//            );
//            var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
//            throw error;
//          }
//          return dog.update(data).then(function(dog){
//            res.redirect('/dogs/' + dog.id); 
//          });
//        }).catch ( function(error){
//          return Breed.findAll().then(function(breeds) {
//            res.render("edit", {breeds: breeds, dog:dog, error: error});
//          })
//        });
//    }).catch ( function(error){
//      next(error);
//    });
//
//  }
//);
//
//router.get('/:id/edit', 
//  function (req, res, next) {
//    if (!res.locals.isAdmin) {
//      var error = new Error('You are not permitted to access this!');
//      error.status = 401;
//      next(error);
//    }
//    next();
//  }, function (req, res, next) {
//    var Dog = req.models.dog;
//    var Breed = req.models.breed;
//    Dog.findById(req.params.id, {
//      include: [Breed]
//    }).then(function(dog) {
//      if (!dog) {
//        var error = new Error("Can't find the dog with id: " + req.params.id);
//        error.status = 404;
//        next(error);
//      }
//      return Breed.findAll().then(function(breeds) {
//        res.render("edit", {breeds: breeds, dog: dog});
//      })
//    }).catch(function(error) {
//      next(error);
//    });
//});
//
////----------------- Partials section --------------------
//partials.get('/:name', function (req, res) {
//  var name = req.params.name;
//  res.render('partials/_' + name);
//});
//
//router.use('/partials', partials);
//--------------------------------------------------------
module.exports = router;
