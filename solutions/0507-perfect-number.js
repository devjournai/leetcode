/**
 * Perfect Number
 * Intuition: A perfect number equals the sum of its proper divisors. Walk factors up to sqrt(n), adding both `d` and `n/d` (except n itself, seeded as 1).
 * Approach: 1. Return false if `num <= 1`. 2. Start `accumulatedSum = 1`. 3. For `currentFactor` from 2 while `factor*factor <= num`, if it divides, add it and the paired quotient unless they are the same. 4. Compare the sum to `num`.
 * Dry Run: num = 28.
 *   - Factors: 2+14, 4+7. Sum 1+2+14+4+7 = 28. Return true.
 * Time Complexity: O(sqrt(num))
 * Space Complexity: O(1)
 */
var checkPerfectNumber = function (num) {
  if (num <= 1) {
    return false;
  }

  let accumulatedSum = 1;

  for (
    let currentFactor = 2;
    currentFactor * currentFactor <= num;
    currentFactor++
  ) {
    if (num % currentFactor === 0) {
      accumulatedSum += currentFactor;
      if (currentFactor * currentFactor !== num) {
        accumulatedSum += num / currentFactor;
      }
    }
  }

  return accumulatedSum === num;
};
