/**
 * Minimum Deletions To Make Array Divisible
 * Intuition: For an element 'x' to divide all numbers in an array `numsDivide`, 'x' must be a common divisor of all elements in `numsDivide`. The most restrictive common divisor is the greatest common divisor (GCD). Therefore, 'x' must divide `GCD(numsDivide)`. To minimize deletions, we need to find the smallest element in `nums` (after sorting) that divides `GCD(numsDivide)`.
 * Approach: 1. Compute the GCD of all elements in `numsDivide`. This becomes our target value that any candidate from `nums` must divide. 2. Sort the `nums` array in ascending order. This ensures we check the smallest candidates first, which directly corresponds to the minimum number of deletions (the index of the element in the sorted array). 3. Iterate through the sorted `nums` array. For each number, check if the calculated target GCD is divisible by it. 4. The first number found that satisfies this condition is the smallest valid number from `nums`. Its index in the sorted array is the minimum number of deletions required. 5. If no such number is found after checking all elements in `nums`, return -1.
 * Dry Run:
 * nums = [2, 3, 4, 7], numsDivide = [6, 12, 18]
 * 1. Calculate GCD of numsDivide:
 *    gcd(6, 12) = 6
 *    gcd(6, 18) = 6
 *    `targetGcdValue` = 6
 * 2. Sort nums:
 *    `sortedNumbers` = [2, 3, 4, 7]
 * 3. Iterate through `sortedNumbers`:
 *    - `currentNumberIndex` = 0, `currentNumberCandidate` = 2
 *      `targetGcdValue` % `currentNumberCandidate` -> 6 % 2 === 0 (True)
 *      Return `currentNumberIndex` (0).
 * Result: 0
 *
 * nums = [3, 4], numsDivide = [2, 8]
 * 1. Calculate GCD of numsDivide:
 *    gcd(2, 8) = 2
 *    `targetGcdValue` = 2
 * 2. Sort nums:
 *    `sortedNumbers` = [3, 4]
 * 3. Iterate through `sortedNumbers`:
 *    - `currentNumberIndex` = 0, `currentNumberCandidate` = 3
 *      `targetGcdValue` % `currentNumberCandidate` -> 2 % 3 !== 0 (False)
 *    - `currentNumberIndex` = 1, `currentNumberCandidate` = 4
 *      `targetGcdValue` % `currentNumberCandidate` -> 2 % 4 !== 0 (False)
 * 4. Loop finishes, no valid number found.
 *    Return -1.
 * Result: -1
 * Time Complexity: O(N_D * log(max(numsDivide)) + N_N * log(N_N))
 * Space Complexity: O(log(max(numsDivide)) + N_N)
 */
var minOperations = function (nums, numsDivide) {
  function computeGcd(firstOperand, secondOperand) {
    if (secondOperand === 0) {
      return firstOperand;
    }
    return computeGcd(secondOperand, firstOperand % secondOperand);
  }

  let targetGcdValue = numsDivide.reduce(computeGcd);

  let sortedNumbers = [...nums].sort((valueA, valueB) => valueA - valueB);

  let currentNumberIndex = 0;
  let totalNumbers = sortedNumbers.length;

  while (currentNumberIndex < totalNumbers) {
    let currentNumberCandidate = sortedNumbers[currentNumberIndex];
    if (targetGcdValue % currentNumberCandidate === 0) {
      return currentNumberIndex;
    }
    currentNumberIndex++;
  }

  return -1;
};
