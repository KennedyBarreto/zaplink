function validateUrl(value) {
    var urlPattern = new RegExp('^(http(s?):\\/\\/)?'); // validate protocol
          
  
        return !!urlPattern.test(value);
  }
  
  module.exports = { validateUrl };