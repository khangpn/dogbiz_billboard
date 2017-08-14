var models = require('./../models');

models.sequelize.sync().then(function() {
  return console.log("Done syncing");
});
