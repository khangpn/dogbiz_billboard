var express = require('express');
var router = express.Router();
var partials = express.Router();
const {constants: {SELECT_LIMIT} } = require('../parameters');

// TODO: query each entry's achievements and calculat score
router.get('/', function(req, res, next) {

    // request validation here

    next();
  }, function(req, res, next) {
  var Entry = req.models.entry;
  var Dog = req.models.dog;
  var Contest = req.models.contest;
  let page = req.params.page;
  page = (!isNaN(page) && parseInt(page) > 0) ? (parseInt(page) - 1) : 0;
  let limit = req.params.limit;
  limit = (!isNaN(limit) && parseInt(limit) > 0) ? parseInt(limit) : SELECT_LIMIT;
  Entry.findAll({
    include: [Dog, Contest],
    limit: limit,
    offset: page*limit
  })
    .then(function(entries){
      res.render("list", {entries: entries});
    }).catch( function(error){
      next(error);
    });
});

router.post('/',
  function(req, res, next) {
    if (!res.locals.isAdmin) {
      var error = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    if (!req.body) {
      var error = new Error('Cannot get the req.body');
      error.status = 400;
      next(error);
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Entry = req.models.entry;
    return Entry.create(data).then(function(entry){
      res.redirect("/entries/" + entry.id); 
    }).catch ( function(error){
      res.render("create", {error: error});
    });
  }
);

router.get('/create', function(req, res, next) {
  if (!res.locals.isAdmin) {
    var error = new Error('You are not permitted to access this!');
    error.status = 401;
    return next(error);
  }
    next();
  }, function(req, res, next) {
    res.render("create");
  }
);

router.delete('/:id',
  function(req, res, next) {
    if (!res.locals.isAdmin) {
      var error = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }

    next();
  }, function(req, res, next) {
    var Entry = req.models.entry;
    Entry.destroy({
      where: { 
        id: req.params.id 
      }}).then(function(affectedRow){
        if (affectedRow == 1) return res.redirect("/entries");
        var error = new Error("Can't find the entry with id: " + data.id);
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
    var Entry = req.models.entry;
    var Dog = req.models.dog;
    var Contest = req.models.contest;
    Entry.findById(req.params.id, {
      include: [Dog, Contest]
    }).then(function(entry) {
      if (!entry) {
        var error = new Error("Can't find the entry with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      return entry.getAchievements().then(achievements => {
        res.render('view', {entry: entry, achievements: achievements});
      });
    }).catch(function(error) {
      next(error);
    });
});

router.put('/:id',
  function(req, res, next) {
    if (!res.locals.isAdmin) {
      var error = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    if (!req.body) {
      var error = new Error('Cannot get the req.body');
      error.status = 400;
      next(error);
    }
    next();
  }, function(req, res, next) {
    var data = req.body;
    var Entry = req.models.entry;
    Entry.findById(req.params.id).then(function(entry) {
      if (!entry) {
        var error = new Error("Can't find the entry with id: " + data.id);
        error.status = 404;
        next(error);
      }
      return entry.update(data).then(function(entry){
        res.redirect('/entries/' + entry.id); 
      }).catch ( function(error){
        res.render("edit", {entry:entry, error: error});
      });
    }).catch ( function(error){
      next(error);
    });

  }
);

router.get('/:id/edit', 
  function (req, res, next) {
    if (!res.locals.isAdmin) {
      var error = new Error('You are not permitted to access this!');
      error.status = 401;
      next(error);
    }
    next();
  }, function (req, res, next) {
    var Entry = req.models.entry;
    Entry.findById(req.params.id).then(function(entry) {
      if (!entry) {
        var error = new Error("Can't find the entry with id: " + req.params.id);
        error.status = 404;
        next(error);
      }
      res.render("edit", {entry: entry});
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
