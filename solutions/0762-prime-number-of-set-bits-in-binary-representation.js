/**
 * Prime Number of Set Bits in Binary Representation
 * Time Complexity: O((right - left) * log(right))
 * Space Complexity: O(1)
 */
var countPrimeSetBits = function (left, right) {
  const primeNumbersCollection = new Set([
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31,
  ]);
  let totalPrimeBitNumbers = 0;

  for (
    let currentNumberInLoop = left;
    currentNumberInLoop <= right;
    currentNumberInLoop++
  ) {
    let numberToProcess = currentNumberInLoop;
    let setBitsCount = 0;
    while (numberToProcess > 0) {
      numberToProcess &= numberToProcess - 1;
      setBitsCount++;
    }
    if (primeNumbersCollection.has(setBitsCount)) {
      totalPrimeBitNumbers++;
    }
  }

  return totalPrimeBitNumbers;
};
