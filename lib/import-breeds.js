var fs = require('fs');
var Promise = require('bluebird');
var parser = Promise.promisify(require('csv-parse'));

var models = require('./../models');
var Breed = models.breed;

var importer = function(breedCsvFile) {
  //var breedCsvFile = __dirname+"/../fci-breeds.csv";
  var options = {
    trim: true,
    columns: true
  }
  var file = fs.readFileSync(breedCsvFile, 'utf8');

  return parser(file, options).then(function(rows) {
    rows.forEach(function(record) {
      // CSV Format:
      // id,name,section,provisional,country,url,image,pdf
      let breedData = {
        fci: record.id,
        name: record.name,
        section: record.section,
        country: record.country,
        url: record.url,
        image: record.image,
        pdf: record.pdf
      };
      return Breed.create(breedData);
    });
  }).then(function() {
    //console.log(">>>>>>>>>> Done importing breed");
  }).catch(function(err) {
    console.error(err);
  });
}

module.exports = importer;
