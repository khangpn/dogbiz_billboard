var express = require('express');
var router = express.Router();
var partials = express.Router();
var DateHelper = require("../lib/date-helper.js");

//----------------- Angular App--------------------
router.get('/', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  var Contest = req.models.contest;
  let page = req.params.page;
  page = (!isNaN(page) && parseInt(page) > 0) ? (parseInt(page) - 1) : 0;
  let limit = req.params.limit;
  limit = (!isNaN(limit) && parseInt(limit) > 0) ? parseInt(limit) : SELECT_LIMIT;
  Contest.findAll({
    limit: limit,
    offset: page*limit
  })
    .then(function(contests){
      res.render("list", {contests: contests});
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
    var Contest = req.models.contest;
    return Contest.create(data).then(function(contest){
      res.redirect("/contests/" + contest.id); 
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
    var Contest = req.models.contest;
    Contest.destroy({
      where: { 
        id: req.params.id 
      }}).then(function(affectedRow){
        if (affectedRow == 1) return res.redirect("/contests");
        var err = new Error("Can't find the contest with id: " + data.id);
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
    var Contest = req.models.contest;
    Contest.findById(req.params.id).then(function(contest) {
      if (!contest) {
        var err = new Error("Can't find the contest with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      return contest.getAchievements({
        include: [req.models.dog]
      }).then(achievements => {
        res.render('view', {contest: contest, achievements: achievements});
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
    var Contest = req.models.contest;
    Contest.findById(data.id).then(function(contest) {
      if (!contest) {
        var err = new Error("Can't find the contest with id: " + data.id);
        error.status = 404;
        next(error);
      }
      return contest.update(data).then(function(contest){
        res.redirect("/contests/" + contest.id); 
      }, function (error) {
        res.render("edit", {contest: contest, error: error}); 
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
    var Contest = req.models.contest;
    Contest.findById(req.params.id, {
      include: [req.models.achievement]
    }).then(function(contest) {
      if (!contest) {
        var err = new Error("Can't find the contest with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      res.render('edit', {contest: contest});
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
