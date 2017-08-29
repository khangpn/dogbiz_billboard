var models = require('./../models');
var breedImporter = require(__dirname+'/../lib/import-breeds.js');
var breedCsvFile = __dirname+"/../fci-breeds.csv";

models.sequelize.sync().then(function() {
  return models.account.create({
    email: "khang@dogbiz.com",
    is_admin: true,
    password: "1234567890",
    password_confirm: "1234567890"
  }).then(function(account) {
    var admin = models.admin.create({
      fullname: "Khang Nguyen",
      account_id: account.id
    }).then(function(admin) {
      return breedImporter(breedCsvFile);
    }).then(function() {
      console.log("Done syncing");
    });
  });
});
