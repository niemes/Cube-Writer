var fs = require('fs');
if (process.argv.length < 3) {
  console.log('Usage: node ' + process.argv[1] + ' FILENAME');
  process.exit(1);
}
var filename = process.argv[2];
String.prototype.sansAccent = function(){
    var accent = [
        /[\300-\306]/g, /[\340-\346]/g, // A, a
        /[\310-\313]/g, /[\350-\353]/g, // E, e
        /[\314-\317]/g, /[\354-\357]/g, // I, i
        /[\322-\330]/g, /[\362-\370]/g, // O, o
        /[\331-\334]/g, /[\371-\374]/g, // U, u
        /[\321]/g, /[\361]/g, // N, n
        /[\307]/g, /[\347]/g, // C, c
    ];
    var noaccent = ['A','a','E','e','I','i','O','o','U','u','N','n','C','c'];

    var str = this;
    for(var i = 0; i < accent.length; i++){
        str = str.replace(accent[i], noaccent[i]);
    }

    return str;
}

function text2array(filename) {

  var txtfile = (filename);
  var goodList = [];
  fs.readFile(txtfile, 'utf8', function(err, data) {
    if (err) throw err;
    var test = data;
    var regexWord = /[A-zéèâêîôûà]{3,18}/g;
    let list = test.match(regexWord);

    list.forEach(function(mot){
      var a = mot.toLowerCase();
      var b = a.sansAccent();
      var c = '"'+ b.toString() + '"';
      goodList.push(c);
    });
    fs.writeFile("./" + filename + ".js", goodList, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
});
  });
}
text2array(filename)
