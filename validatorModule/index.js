var Validator = function()
{
  this.isEmail = function(email)
  {
    const regrex = /\S+@\S+\.\S+/;
    return regrex.test(email);
  }
  this.isName = function(name)
  {
     const regrex = /\S+ \S+/;
    return regrex.test(name); 
  }
  this.isEmpty = function(expression)
  {
      return (expression.trim()=="");
  }
};

module.exports = new Validator();