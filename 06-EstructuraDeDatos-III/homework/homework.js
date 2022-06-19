"use strict";

const DeleteRequireCache = require("@11ty/eleventy/src/Util/DeleteRequireCache");

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

// --> root{value: value, rigth: null, left: null}

function BinarySearchTree(value) {
  this.value = value; // puede ser cualquier cosa
  this.right = null;
  this.left = null;
};

let bst = new BinarySearchTree()

BinarySearchTree.prototype.insert = function(value){
  // mayores || menores
  // mayores  ? DERECHA 
  // menores  ? IZQUIERDA
  if(value > this.value){
    // derecha
    if(this.right === null){
      this.right = new BinarySearchTree(value);
    }else{
      this.right.insert(value); // recursividad
    }
  }
  if(value < this.value){
    // izquierda
    if(this.left === null){
      this.left = new BinarySearchTree(value);
    }else{
      this.left.insert(value);
    }
  }
};

BinarySearchTree.prototype.contains = function(value){
  if(this.value === value) return true;
  if(value > this.value){
    // busca a la derecha
    if(this.right === null) return false;
    else return this.right.contains(value);
  }

  if(value < this.value){
    // busca a la izquierda
    if(this.left === null) return false;
    else return this.left.contains(value);
  }
};

BinarySearchTree.prototype.depthFirstForEach = function(f, order){
  // --> order = pre-order (root - izquierda - derecha)
  // --> order = in-order (izquierda - root - derecha)
  // --> order = post-order (izquierda - derecha - root)
  if(order === 'pre-order'){
  // root - izquierda - derecha
    f(this.value); // console.log(value)
    // this.left && this.left.depthFirstForEach()
    if(this.left !== null) this.left.depthFirstForEach(f, order);

    if(this.right !== null) this.right.depthFirstForEach(f, order);
  }

  else if(order === 'post-order'){
    // izquierda - derecha - root
    if(this.left !== null) this.left.depthFirstForEach(f, order);

    if(this.right !== null) this.right.depthFirstForEach(f, order);

    f(this.value);
  }

  else{
    //'in-order'
    // izquierda - root - derecha
    if(this.left !== null) this.left.depthFirstForEach(f, order);

    f(this.value);

    if(this.right !== null) this.right.depthFirstForEach(f, order);
  }
};

BinarySearchTree.prototype.size = function(){
  if(this.right === null && this.left === null) return 1;

  if(this.left !== null && this.right === null) return 1 + this.left.size();

  if(this.right !== null && this.left === null) return 1 + this.right.size();

  if(this.right !== null && this.left !== null) return 1 + this.left.size() + this.right.size();
};

BinarySearchTree.prototype.breadthFirstForEach = function(f, arr = []){
  // lee por niveles --> de izquierda a derecha iniciando en root --> se ejecuta como una cola (FIFO)
  if(this.left !== null){
    arr.push(this.left)
  }

  if(this.right !== null){
    arr.push(this.right)
  }

  f(this.value);

  if(arr.length > 0){
    arr.shift().breadthFirstForEach(f, arr);
  }
};





// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
