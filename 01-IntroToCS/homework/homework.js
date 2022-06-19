'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  var acum = 0;
  for (var i = 0; i < num.length; i++){
    acum = acum + num[i] * Math.pow(2, num.length - 1 - i)
  }
  return acum;
}

function DecimalABinario(num) {
  // tu codigo aca
  var str = '';
  while(num > 0){
    var resto = num % 2;
    str = resto + str;
    num = Math.floor(num / 2)  
  }
  return str
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}