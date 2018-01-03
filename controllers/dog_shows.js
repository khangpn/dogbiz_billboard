var express = require('express');
var router = express.Router();
var partials = express.Router();
var DateHelper = require("../lib/date-helper.js");
const {constants: {SELECT_LIMIT} } = require('../parameters');

router.get('/', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  var DogShow = req.models.dog_show;
  let page = req.params.page;
  page = (!isNaN(page) && parseInt(page) > 0) ? (parseInt(page) - 1) : 0;
  let limit = req.params.limit;
  limit = (!isNaN(limit) && parseInt(limit) > 0) ? parseInt(limit) : SELECT_LIMIT;
  DogShow.findAll({
    limit: limit,
    offset: page*limit
  })
    .then(function(dog_shows){
      res.render("list", {dog_shows: dog_shows});
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
    var startDate = req.body.startDate;
    var Sequelize = req.models.Sequelize;
    if (!DateHelper.isISO(startDate)) {
      var errorItem = new Sequelize.ValidationErrorItem(
        "The start date format is invalid (YYYY-MM-DD or YYYY/MM/DD)",
        "invalid format",
        "startDate",
        startDate
      );
      var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
      return res.render("create", {error: error});
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var DogShow = req.models.dog_show;
    return DogShow.create(data).then(function(dog_show){
      res.redirect("/dog_shows/" + dog_show.id); 
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
    var DogShow = req.models.dog_show;
    DogShow.destroy({
      where: { 
        id: req.params.id 
      }}).then(function(affectedRow){
        if (affectedRow == 1) return res.redirect("/dog_shows");
        var err = new Error("Can't find the dog_show with id: " + data.id);
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
    var DogShow = req.models.dog_show;
    DogShow.findById(req.params.id).then(function(dog_show) {
      if (!dog_show) {
        var err = new Error("Can't find the dog_show with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      return dog_show.getAchievements({
        include: [req.models.dog]
      }).then(achievements => {
        res.render('view', {dog_show: dog_show, achievements: achievements});
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
    var startDate = req.body.startDate;
    var Sequelize = req.models.Sequelize;
    if (!DateHelper.isISO(startDate)) {
      var errorItem = new Sequelize.ValidationErrorItem(
        "The start date format is invalid (YYYY-MM-DD or YYYY/MM/DD)",
        "invalid format",
        "startDate",
        startDate
      );
      var error = new Sequelize.ValidationError("The input is invalid", [errorItem]);
      return res.render("create", {error: error});
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var DogShow = req.models.dog_show;
    DogShow.findById(data.id).then(function(dog_show) {
      if (!dog_show) {
        var err = new Error("Can't find the dog_show with id: " + data.id);
        error.status = 404;
        next(error);
      }
      return dog_show.update(data).then(function(dog_show){
        res.redirect("/dog_shows/" + dog_show.id); 
      }, function (error) {
        res.render("edit", {dog_show: dog_show, error: error}); 
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
    var DogShow = req.models.dog_show;
    DogShow.findById(req.params.id, {
      include: [req.models.achievement]
    }).then(function(dog_show) {
      if (!dog_show) {
        var err = new Error("Can't find the dog_show with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      res.render('edit', {dog_show: dog_show});
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
