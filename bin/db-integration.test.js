var models = require('./../models');

var breedImporter = require(__dirname+'/../lib/import-breeds.js');

var breedCsvFile = __dirname+"/../fci-breeds.csv";

models.sequelize.sync().then(function() {
  console.log(">>>>>>>>>> Done creating tables");
}).then(function() {
  return models.account.create({
    email: "khang@dogbiz.com",
    is_admin: true,
    password: "1234567890",
    password_confirm: "1234567890"
  }).then(function(account) {
    return models.admin.create({
      fullname: "Khang Nguyen",
      account_id: account.id
    }).then(function() {
      console.log(">>>>>>>>>> Done creating accounts");
    });
  });
}).then(function() {
  return breedImporter(breedCsvFile);
}).then(function() {
  return models.judge.create({
    fullname: "Bach Tran",
  }).then(function() {
    return models.dog.create({
      id: "ID101",
      name: "Ly Ly",
      birthday: new Date(2015, 5, 14),
      gender: false,
      dam: "Mother Dog",
      sire: "Father Dog",
      owner: "Khang",
      photo: "http://cdn2-www.dogtime.com/assets/uploads/2010/12/senior-dog-2.jpg",
      address: "Brussels Belgium",
      note: "A pretty dog",
      breed_fci: 1
    }).then(function(dog) {
      return models.contest.create({
        name: "HCM open 2",
        startDate: new Date(2017, 5, 14),
        address: "Ho Chi Minh City, Vietnam",
        note: "An open show for all kinds of dog"
      }).then(function(contest) {
        return models.achievement.create({
          rank: 1,
          dogClass: "Baby",
          round: "Breed",
          category: "Small Dog",
          dog_id: dog.id,
          contest_id: contest.id,
          judge_id: 1,
          note: "An impressive dog"
        }).then(function() {
          console.log(">>>>>>>>>> Done creating dogs");
        });
      });
    });
  });
});
