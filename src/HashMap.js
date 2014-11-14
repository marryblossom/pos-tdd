//Use to create the sort of HashMap data structure,
//which can combine the same input items.
function HashMap() {
  var length = 0;
  var obj = {};

  this.isEmpty = function() {
    return length == 0;
  };

  this.containsKey = function(key) {
    return (key in obj);
  };

  this.put = function(key, value) {
    if (!this.containsKey(key)) {
      length++;
    }
    obj[key] = value;
  };

  this.get = function(key) {
    return this.containsKey(key) ? obj[key] : null;
  };

  this.modify = function(key, value) {
    obj[key] += value;
  }

  this.keySet = function() {
    var keys = [];
    for (var key in obj) {
      keys.push(key);
    }
    return keys;
  };

  this.size = function() {
    return length;
  };

  this.print = function() {
    for (var key in obj) {
      console.log(key + ' ' + obj[key]);
    }
  }
}
