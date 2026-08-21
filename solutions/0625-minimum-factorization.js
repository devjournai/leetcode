/**
 * Minimum Factorization
 * Intuition: The smallest number whose digits multiply to `initialValue` is built from the largest possible digits (9 down to 2) so the digit count is minimized, then those factors are written from smallest to largest. Overflow or leftover primes > 9 fail.
 * Approach: 1. If `initialValue < 2` return it. 2. For `currentFactor` 9→2, while divisible, `factorList.push` and divide `processingNumber`. 3. If remainder `> 1` return 0. 4. Walk `factorList` from the end assembling `finalProduct = finalProduct*10 + digit`; if `> 2147483647` return 0.
 * Dry Run: initialValue=48.
 *   - 48/8=6, 6/6=1. Factors [8,6]. Reverse digits → 68. Return 68.
 * Time Complexity: O(log N)
 * Space Complexity: O(log N)
 */
var smallestFactorization = function (initialValue) {
  if (initialValue < 2) {
    return initialValue;
  }

  const factorList = [];
  let processingNumber = initialValue;

  let currentFactor = 9;
  while (currentFactor > 1) {
    while (processingNumber % currentFactor === 0) {
      factorList.push(currentFactor);
      processingNumber /= currentFactor;
    }
    currentFactor--;
  }

  if (processingNumber > 1) {
    return 0;
  }

  let finalProduct = 0;
  const maxSignedInt = 2147483647;

  let listLength = factorList.length;
  let listIndex = listLength - 1;

  for (; listIndex >= 0; listIndex--) {
    let currentDigit = factorList[listIndex];
    finalProduct = finalProduct * 10 + currentDigit;

    if (finalProduct > maxSignedInt) {
      return 0;
    }
  }

  return finalProduct;
};
