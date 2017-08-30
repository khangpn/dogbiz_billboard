var express = require('express');
var router = express.Router();
var partials = express.Router();

var dogClasses = [
"Baby",
"Puppy",
"Intermediate",
"Junior",
"Open",
"Champion",
"Veteran"
];
var rounds = [
"Breed",
"Group",
"Show"
];
var categories = [
"Winner Dog",
"Winner Bitch",
"Best of Winner",
"Class Winner",
"Best of Opposite Sex (Reserve Best Of Breed)",
"Best of Breed",
"Best In Group",
"Reserve Best In Group",
"Best in Show",
"Reserve Best in Show"
];

var setConstants = function(req, res, next) {
  res.locals.categories = categories;
  res.locals.rounds = rounds;
  res.locals.dogClasses = dogClasses;
  next();
}

var getJudgeList = function(Judge, cb) {
  return Judge.findAll().then(cb);
};

//----------------- Angular App--------------------
router.get('/', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  var Achievement = req.models.achievement;
  Achievement.findAll({
    include: [ 
      req.models.contest,
      req.models.judge,
      req.models.dog 
    ]
  })
    .then(function(achievements){
      res.render("list", {achievements: achievements});
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
  }, setConstants,
  function(req, res, next) {
    var data = req.body;
    var Achievement = req.models.achievement;
    return Achievement.create(data).then(function(achievement){
      res.redirect("/achievements/" + achievement.id); 
    }).catch ( function(error){
      var cb = function(judges) {
        res.render("create", {error: error, judges: judges});
      }
      return getJudgeList(req.models.judge, cb);
    });
  }
);

router.get('/create', 
  function(req, res, next) {
    if (!res.locals.isAdmin) {
      var err = new Error('You are not permitted to access this!');
      err.status = 401;
      return next(err);
    }
    next();
  }, setConstants,
  function(req, res, next) {
    var cb = function(judges) {
      res.render("create", {judges: judges});
    }
    return getJudgeList(req.models.judge, cb);
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
    var Achievement = req.models.achievement;
    Achievement.findById(req.params.id).then(function(achievement) {
      achievement.destroy().then(function() {
        res.redirect("/achievements");
      }).catch( function(error){
        next(error);
      });
    }).catch( function(error){
      var err = new Error("Can't find the achievement with id: " + data.id);
      error.status = 404;
      next(error);
    });
  }
);

router.get('/:id', 
  function (req, res, next) {

    // request validation here

    next();
  }, function (req, res, next) {
    var Achievement = req.models.achievement;
    Achievement.findById(req.params.id, {
      include: [
        req.models.contest,
        req.models.judge,
        req.models.dog
      ]
    }).then(function(achievement) {
      if (!achievement) {
        var err = new Error("Can't find the achievement with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      res.render('view', {achievement: achievement});
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
    if (req.body['startDate']) {
      var startDate = new Date(req.body['startDate']);
      req.body['startDate'] = startDate;
      req.body['year'] = startDate.getFullYear();
    }
    next();
  }, setConstants,
  function(req, res, next) {
    var data = req.body;
    var Achievement = req.models.achievement;
    Achievement.findById(data.id).then(function(achievement) {
      if (!achievement) {
        var err = new Error("Can't find the achievement with id: " + data.id);
        error.status = 404;
        next(error);
      }
      return achievement.update(data).then(function(achievement){
        res.redirect("/achievements/" + achievement.id); 
      }, function (error) {
        var cb = function(judges) {
          res.render('edit', {error: error,
            achievement: achievement,
            judges: judges});
        }
        return getJudgeList(req.models.judge, cb);
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
  }, setConstants,
  function (req, res, next) {
    var Achievement = req.models.achievement;
    Achievement.findById(req.params.id, {
      include: [
        req.models.dog,
        req.models.contest
      ]
    }).then(function(achievement) {
      if (!achievement) {
        var err = new Error("Can't find the achievement with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      var cb = function(judges) {
        res.render('edit', {achievement: achievement, judges: judges});
      }
      return getJudgeList(req.models.judge, cb);
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
