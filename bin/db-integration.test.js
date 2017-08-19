var models = require('./../models');

models.sequelize.sync().then(function() {
  models.account.create({
    email: "khang@dogbiz.com",
    is_admin: true,
    password: "1234567890",
    password_confirm: "1234567890"
  }).then(function(account) {
    return models.admin.create({
      fullname: "Khang Nguyen",
      account_id: account.id
    })
  });

  models.breed.create({
    name: "Pug",
    note: "A list of pug dogs"
  }).then(function(breed) {
    return models.dog.create({
      name: "Ly Ly",
      birthday: new Date(2015, 5, 14),
      gender: false,
      parents: "Mother Dog, Father Dog",
      address: "Brussels Belgium",
      note: "A pretty dog",
      breed_id: breed.id
    });
  });

  models.contest.create({
    name: "HCM open 2",
    startDate: new Date(2017, 5, 14),
    note: "An open show for all kinds of dog"
  }).then(function(breed) {
    return models.dog.create({
      name: "Ly Ly",
      birthday: new Date(2015, 5, 14),
      gender: false,
      parents: "Mother Dog, Father Dog",
      address: "Brussels Belgium",
      note: "A pretty dog",
      breed_id: breed.id
    });
  });
}).then(function() {
  console.log("Done syncing");
});
