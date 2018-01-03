var express = require('express');
var router = express.Router();
var partials = express.Router();
var DateHelper = require("../lib/date-helper.js");

//----------------- Angular App--------------------
router.get('/', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  var Judge = req.models.judge;
  Judge.findAll({
  })
    .then(function(judges){
      res.render("list", {judges: judges});
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
    var Judge = req.models.judge;
    return Judge.create(data).then(function(judge){
      res.redirect("/judges/" + judge.id); 
    }).catch ( function(error){
      res.render("create", {judge: data, error: error});
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
    var Judge = req.models.judge;
    Judge.destroy({
      where: { 
        id: req.params.id 
      }}).then(function(affectedRow){
        if (affectedRow == 1) return res.redirect("/judges");
        var err = new Error("Can't find the judge with id: " + data.id);
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
    var Judge = req.models.judge;
    Judge.findById(req.params.id, {
    }).then(function(judge) {
      if (!judge) {
        var err = new Error("Can't find the judge with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      return judge.getMarks({
        include: [req.models.dog_show]
      }).then(marks => {
        res.render('view', {judge: judge, marks: marks});
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
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Judge = req.models.judge;
    Judge.findById(req.params.id, {
    }).then(function(judge) {
      if (!judge) {
        var err = new Error("Can't find the judge with id: " + data.id);
        error.status = 404;
        next(error);
      }
      return judge.update(data).then(function(judge){
        res.redirect('/judges/' + judge.id); 
      }).catch ( function(error){
        res.render("edit", {judge:judge, error: error});
      });
    }).catch ( function(error){
      res.render("edit", {error: error});
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
    var Judge = req.models.judge;
    Judge.findById(req.params.id, {
    }).then(function(judge) {
      if (!judge) {
        var err = new Error("Can't find the judge with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      res.render('edit', {judge: judge});
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
