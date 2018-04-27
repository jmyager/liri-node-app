var a = process.argv[2]

var array = process.argv;
var newArray = array.splice(2, array.length);
var newString = newArray.toString();
var newerString = newString.replace(/,/g, "+");
console.log(newerString);
