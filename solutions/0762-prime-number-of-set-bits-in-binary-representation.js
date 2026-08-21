/**
 * Prime Number of Set Bits in Binary Representation
 * Intuition: For every integer in `[left, right]`, count 1-bits with `n &= n-1` and test that count against a fixed set of primes that fit in 32-bit integers (2 through 31).
 * Approach: 1. Store primes in `primeNumbersCollection`. 2. For `currentNumberInLoop` from `left` to `right`, zero `setBitsCount` while clearing lowest-set bits. 3. If the count is in the set, increment `totalPrimeBitNumbers`. Return it.
 * Dry Run: left = 6, right = 10.
 *   - 6 (110) has 2 bits → prime. 7 (111) has 3 → prime. 8 (1000) has 1 → not. 9 (1001) has 2 → prime. 10 (1010) has 2 → prime. Return 4.
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
