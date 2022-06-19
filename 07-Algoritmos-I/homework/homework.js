'use strict'
// No cambies los nombres de las funciones.

function factorear(num) {
  // Factorear el número recibido como parámetro y devolver en un array
  // los factores por los cuales se va dividiendo a dicho número (De menor a mayor)
  // Ej: factorear(180) --> [1, 2, 2, 3, 3, 5] Ya que 1x2x2x3x3x5 = 180 y son todos números primos
  // Tu código:

  let array = [1];
  let i = 2;
  while(num !== 1){
    if(num % i === 0){
      array.push(i);
      num /= i;
    }else{
      i++;
    }
  }
  return array;
};

function bubbleSort(array) {
  // Implementar el método conocido como bubbleSort para ordenar de menor a mayor
  // el array recibido como parámetro
  // Devolver el array ordenado resultante
  // Tu código:

  // ->                  nuestro arreglo a ordenar                  -> [7, 5, 3, 9, 1] 
  // -> swap = true (entra al while) -> swap = false (entra al for) -> [5, 3, 7, 1, 9] -> primer recorrido -> swap = true;
  // -> swap = true (entra al while) -> swap = false (entra al for) -> [3, 5, 1, 7, 9] -> segundo recorrido -> swap = true;
  // -> swap = true (entra al while) -> swap = false (entra al for) -> [3, 1, 5, 7, 9] -> tercer recorrido -> swap = true;
  // -> swap = true (entra al while) -> swap = false (entra al for) -> [1, 3, 5, 7, 9] -> cuarto recorrido -> swap = true;
  // -> swap = true (entra al while)  -> no hay mas cambios -> return array

  let swap = true;
  while(swap){
    swap = false;
    for(let i = 0; i < array.length-1; i++){
      if(array[i] > array[i+1]){
        let aux = array[i]; // 7 -> 
        array[i] = array[i+1]; // 5 ->
        array[i+1] = aux; // 7 ->
        swap = true;
      }
    }
  }
  return array;
};

function insertionSort(array) {
  // Implementar el método conocido como insertionSort para ordenar de menor a mayor
  // el array recibido como parámetro utilizando arreglos
  // Devolver el array ordenado resultante
  // Tu código:

  // [9, 5, 1, 3, 4]
  //     i
  //  j

  for(let i = 1; i < array.length; i++){
    let j = i-1;
    let aux = array[i];
    while(j >= 0 && aux < array[j]){
      array[j+1] = array[j];
      j--;
    }
    array[j+1] = aux;
  }
  return array;
};

function selectionSort(array) {
  // Implementar el método conocido como selectionSort para ordenar de menor a mayor
  // el array recibido como parámetro utilizando dos arreglos
  // Devolver el array ordenado resultante
  // Tu código:

  // [8, 6, 1, 2, 9, 0]
  //  i
  //     j

  for(let i = 0; i < array.length; i++){
    let min = i;
    for(let j = i+1; j < array.length; j++){
      if(array[min] > array[j]){
        min = j;
      }
    }
    if(i !== min){
      let aux = array[i];
      array[i] = array[min];
      array[min] = aux;  
    }
  }
  return array;
};


// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
  factorear,
  bubbleSort,
  insertionSort,
  selectionSort,
};
