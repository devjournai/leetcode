/**
 * Most Frequent Prime
 * Intuition: Iterate through every cell, then every possible 8-directional path from that cell. Along each path, generate numbers by appending digits and check if they are prime and greater than 10. Store frequencies of such primes in a map. Finally, iterate through the map to find the most frequent prime, prioritizing the largest in case of ties.
 * Approach: 1. Initialize matrix dimensions, an empty map for prime counts, and an array for 8 directions. 2. Define a helper function `isNumberPrime` to efficiently check primality. 3. Use nested loops to iterate through each starting cell (row, col) in the matrix. 4. For each starting cell, use another loop to iterate through all 8 defined directions. 5. Within the direction loop, use a `while` loop to traverse the path: a. Construct the current number by appending the digit from the current cell. b. If the number is greater than 10 and is prime, update its count in the frequency map. c. Move to the next cell in the current direction. 6. After all paths are traversed, iterate through the `primeCountsMap` to find the prime with the maximum frequency. If multiple primes share the highest frequency, select the largest among them. 7. Return the identified prime or -1 if no such prime exists.
 * Dry Run:
 * Input: mat = [[1, 1], [3, 1]]
 * matrixRows = 2, matrixCols = 2
 * primeCountsMap = {}
 * travelDirections = [[0,1], [1,1], [1,0], [1,-1], [0,-1], [-1,-1], [-1,0], [-1,1]]
 *
 * isNumberPrime(num): checks if num is prime (e.g., isNumberPrime(11) -> true, isNumberPrime(12) -> false).
 *
 * Outer loops:
 * rowIndex = 0, colIndex = 0 (mat[0][0] = 1)
 * deltaRow = 0, deltaCol = 1 (East)
 * currentRow = 0, currentCol = 0, currentValue = 0
 * Path: mat[0][0]=1 -> currentValue=1. mat[0][1]=1 -> currentValue=11.
 * currentValue = 11: 11 > 10 and isNumberPrime(11) is true.
 * primeCountsMap = {11: 1}
 * Path ends (col becomes 2, out of bounds).
 * deltaRow = 1, deltaCol = 1 (South-East)
 * currentRow = 0, currentCol = 0, currentValue = 0
 * Path: mat[0][0]=1 -> currentValue=1. mat[1][1]=1 -> currentValue=11.
 * currentValue = 11: 11 > 10 and isNumberPrime(11) is true.
 * primeCountsMap = {11: 2}
 * Path ends (row/col becomes 2, out of bounds).
 * ... (other directions and starting cells processed)
 *
 * Consider rowIndex = 1, colIndex = 0 (mat[1][0] = 3)
 * deltaRow = -1, deltaCol = 1 (North-East)
 * currentRow = 1, currentCol = 0, currentValue = 0
 * Path: mat[1][0]=3 -> currentValue=3. mat[0][1]=1 -> currentValue=31.
 * currentValue = 31: 31 > 10 and isNumberPrime(31) is true.
 * primeCountsMap = {11: 2, 31: 1}
 * Path ends (row becomes -1, out of bounds).
 *
 * After all traversals: Suppose primeCountsMap = {11: 2, 31: 1, 13: 1}
 *
 * Finding result:
 * highestFrequency = 0, resultPrime = -1
 *
 * primeKey = 11, currentPrimeFrequency = 2
 * 2 > 0: true. highestFrequency = 2, resultPrime = 11.
 * primeKey = 31, currentPrimeFrequency = 1
 * 1 > 2: false. 1 === 2: false.
 * primeKey = 13, currentPrimeFrequency = 1
 * 1 > 2: false. 1 === 2: false.
 *
 * Final resultPrime = 11.
 * Time Complexity: O(M * N * max(M, N) * sqrt(10^max(M,N)))
 * Space Complexity: O(M * N * max(M,N))
 */
var mostFrequentPrime = function (mat) {
  const matrixRows = mat.length;
  const matrixCols = mat[0].length;
  const primeCountsMap = new Map();
  const travelDirections = [
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
    [-1, -1],
    [-1, 0],
    [-1, 1],
  ];

  const isNumberPrime = (numberToCheck) => {
    if (numberToCheck <= 1) return false;
    for (
      let primeDivisor = 2;
      primeDivisor * primeDivisor <= numberToCheck;
      primeDivisor++
    ) {
      if (numberToCheck % primeDivisor === 0) return false;
    }
    return true;
  };

  for (let rowIndex = 0; rowIndex < matrixRows; rowIndex++) {
    for (let colIndex = 0; colIndex < matrixCols; colIndex++) {
      for (const [deltaRow, deltaCol] of travelDirections) {
        let currentRow = rowIndex;
        let currentCol = colIndex;
        let currentValue = 0;
        while (
          currentRow >= 0 &&
          currentRow < matrixRows &&
          currentCol >= 0 &&
          currentCol < matrixCols
        ) {
          currentValue = currentValue * 10 + mat[currentRow][currentCol];
          if (currentValue > 10 && isNumberPrime(currentValue)) {
            primeCountsMap.set(
              currentValue,
              (primeCountsMap.get(currentValue) || 0) + 1
            );
          }
          currentRow += deltaRow;
          currentCol += deltaCol;
        }
      }
    }
  }

  let highestFrequency = 0;
  let resultPrime = -1;
  for (const [primeKey, currentPrimeFrequency] of primeCountsMap) {
    if (currentPrimeFrequency > highestFrequency) {
      highestFrequency = currentPrimeFrequency;
      resultPrime = primeKey;
    } else if (
      currentPrimeFrequency === highestFrequency &&
      primeKey > resultPrime
    ) {
      resultPrime = primeKey;
    }
  }

  return resultPrime;
};
