var DateHelper = function() {
  var _dateRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  var helper = {};

  this.isValid = dateString => {
    return (dateString !== undefined && 
      dateString !== null &&
      typeof dateString === "string" && 
      _dateRegex.test(dateString));
  }

  this.formatToISOString = dateString => {
    if(!this.isValid(dateString)) {
      return null;
    }

    let opera1 = dateString.split('/');
    let opera2 = dateString.split('-');
    if (opera1.length === 3) {
      var dateParts = opera1;
    } else if (opera2.length === 3) {
      var dateParts = opera2;
    }
    return (dateParts[2] + '-' + 
      dateParts[1] + '-' + dateParts[0]);
  }

  this.parseToDate = dateString => {
    if(!this.isValid(dateString)) {
      return null;
    }

    let opera1 = dateString.split('/');
    let opera2 = dateString.split('-');
    if (opera1.length === 3) {
      var dateParts = opera1;
    } else if (opera2.length === 3) {
      var dateParts = opera2;
    }
    let dateISOString = dateParts[2] + '-' + dateParts[1] + '-' + dateParts[0]
    return new Date(dateISOString);
  }
}

module.exports = new DateHelper();
