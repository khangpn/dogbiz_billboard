var models = require('./../models');

models.sequelize.sync().then(function() {
  return models.account.create({
    email: "khang@dogbiz.com",
    is_admin: true,
    password: "qweasdzxc",
    password_confirm: "qweasdzxc"
  }).then(function(account) {
    var admin = models.admin.create({
      fullname: "Khang Nguyen",
      account_id: account.id
    }).then(function(admin) {
      console.log("Done syncing");
    });
  });
});
