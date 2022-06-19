"use strict";

const { listenerCount } = require("@11ty/eleventy/src/Util/AsyncEventEmitter");

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function LinkedList(){
  this.head = null;
  this._length = 0;
}

function Node(value) {
  this.value = value;
  this.next = null;
}

let list = new LinkedList()

// tengo:     head -> null
// objetivo:  head -> 1 -> null
LinkedList.prototype.add = function(data){
  let node = new Node(data);
  //node = {value: data, next: null}

  let current = this.head;
  if(!current){
 //if(!this.head)
 //if(this.head === null)
 //if(current === null)
    this.head = node
    this._length++
    return node
  }

  // head -> 1 -> 2 -> 3 -> null
  //                   ^
  while(current.next){
 //while(current.next !== null)
    current = current.next
  }
  current.next = node
  this._length++
  return node
};


 //tengo:      head -> 1 -> 2 -> 3 -> 4 -> null
 // objetivo:  head -> 1 -> 2 -> 3 -> null
LinkedList.prototype.remove = function(){
 // head -> null
 let current = this.head;
 if(current === null) return null
 //if (this.head === null) return null;
 //if(this._length === 0) return 0

 // -> head -> 1 -> null

 else if(current && !current.next){
  let aux = current.value; // aux = 1
    this.head = null;
    this._length--;
    return aux; // 1
 }
 // else if(this.head && !this.head.next){
 //   let aux = this.head.value;
 //   this.head = null;
 //   this._length--;
 //   return aux;
 // }

 // else if (this._length === 1){
 //   let aux = this.head.value;
 //   this.head = null;
 //   this._length--;
 //   return aux;
 // }
 
 while(current.next.next){
  current = current.next
 }
 let aux = current.next.value;
 current.next = null; // 6
 this._length--;
 return aux; // 6
}; 

// serch(2)
//tengo: head -> 1 -> 3 -> 5 -> 2 -> null
//                              ^
LinkedList.prototype.search = function(value){
  if(this.head === null) return null;
  let current = this.head;
  while(current){
    //current = nodo -> {value, next}
    if(current.value === value) return current.value
    else if(typeof value === 'function'){
      // value * 2
      // serch(function(value) value*2 === 4 ? true : false)
      //tengo: head -> 1 -> 3 -> 5 -> 2 -> null
      //                              ^
      if(value(current.value)){
        return current.value;
      } 
    }
    current = current.next;
  }
  return null;
};






/*
Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/
 
// Hash Table: plantea la posibilidad de guardar y retraer informacion de manera eficiente.
// juan
// nombres o palabras con J -> van a ir a parar al mismo cajon

// y así mismo con cada letra A B C D E...

// key: juan
// value: carpeta de juan

// get(key) -> get(juan) -> hash(juan) -> 
// busco en el cajon J -> juan -> value: carpeta de juan

// key: nos dice donde guardar y donde ir a buscar
// value: es el valor asociado a ese key

function HashTable() {
  this.numBuckets = 35;
  this.buckets = [];
}

HashTable.prototype.hash = function(key){
  let sum = 0;
  for(var i = 0; i < key.length; i++){
    sum += key.charCodeAt(i)
  }
  return sum % this.numBuckets; // sum % 35
  // 10 % 35 = 10 -> [10]
  // 70 % 35 = 0 -> [0]
  // 80 % 35 = 10 -> [10]

};

HashTable.prototype.set = function(key, value){
  if(typeof key !== 'string') throw new TypeError('Keys must be strings')
  let i = this.hash(key); // donde guardarlo!

  if(this.buckets[i] === undefined){
    this.buckets[i] = {}
  }
  this.buckets[i][key] = value;
  // -> this.buckets = [];
  // i = 3;
  // this.buckets[3] = [,,,{}]
  // this.buckets[i].key = NOO -> ('.' es literal)
  // this.buckets[i][key] = [,,,{key: value}]
};

HashTable.prototype.get = function(key){
  let i = this.hash(key) // 3
  // this.buckets[i][hola] = [,,,{hola: value}]
  return this.buckets[i][key]
};

HashTable.prototype.hasKey = function(key){
  let i = this.hash(key);
  // this.buckets[3] = [,,,{hola: value, goodmorning: valor, salut: valor}]
  // key = goodmorning ->  true ->           ^
  // key = bye -> false
  return this.buckets[i].hasOwnProperty(key)
}

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
