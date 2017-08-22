var DateHelper = function() {
  var _dmyRegex = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
  var _isoRegex = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
  var helper = {};

  var reverseDateString = dateString => {
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

  this.isDMY = dateString => {
    return (dateString !== undefined && 
      dateString !== null &&
      typeof dateString === "string" && 
      _dmyRegex.test(dateString));
  }

  this.isISO = dateString => {
    return (dateString !== undefined && 
      dateString !== null &&
      typeof dateString === "string" && 
      _isoRegex.test(dateString));
  }

  this.formatDMYToISOString = dateString => {
    if(!this.isDMY(dateString)) {
      return null;
    }

    return reverseDateString(dateString);
  }

  this.formatISOToDMY = dateString => {
    if(!this.isISO(dateString)) {
      return null;
    }
    return reverseDateString(dateString);
  }

  this.parseISOToDate = dateString => {
    if(!this.isISO(dateString)) {
      return null;
    }
    return new Date(dateISOString);
  }

  this.parseDMYToDate = dateString => {
    let dateISOString = this.formatDMYToISOString(dateString);
    return new Date(dateISOString);
  }
}

module.exports = new DateHelper();
