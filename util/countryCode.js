function countryCode (number) {
    if (number.slice(0,4) != "+234") {
       number = number.slice(1);
      let newNumber = `+234${number}`
      return newNumber
    } else {
      return number
    }
  }
  
module.exports = countryCode;
  