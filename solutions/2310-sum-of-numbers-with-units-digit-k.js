/**
 * Sum Of Numbers With Units Digit K
 * Intuition: The units digit of the sum of 'count' numbers, each ending in 'k', must be equal to the units digit of 'num'. This means (count * k) % 10 === num % 10. Additionally, the total sum 'num' must be achievable by 'count' positive numbers ending in 'k'. The minimum sum for 'count' such numbers is 'count * k' (if k > 0, as k is the smallest positive number ending in k) or 'count * 10' (if k === 0, as 10 is the smallest positive number ending in 0). The units digit pattern for 'count * k' repeats every 10 iterations, so checking 'count' from 1 to 10 is sufficient.
 * Approach: 1. Handle the base case where `num` is 0, returning 0 as an empty set sums to 0. 2. Iterate a `currentSetSize` from 1 to 10 to represent the number of integers in the set. 3. For each `currentSetSize`, calculate the expected units digit of the sum, which is `(currentSetSize * k) % 10`. 4. Compare this with the units digit of `num` (`num % 10`). 5. If the units digits match, calculate the minimum possible total sum for `currentSetSize` positive integers ending in `k`. If `k` is 0, each integer must be at least 10, so the minimum total sum is `currentSetSize * 10`. Otherwise (if `k > 0`), each integer must be at least `k`, so the minimum total sum is `currentSetSize * k`. 6. If `num` is greater than or equal to this minimum total sum, then `currentSetSize` is a valid and minimal solution (due to iterating `currentSetSize` from 1 upwards), so return `currentSetSize`. 7. If no such `currentSetSize` is found after checking up to 10, return -1.
 * Dry Run: num = 34, k = 2
 *   1. initialNum (34) is not 0.
 *   2. Loop currentSetSize from 1 to 10:
 *      a. currentSetSize = 1:
 *         - sumUnitsDigitCandidate = (1 * 2) % 10 = 2.
 *         - inputNumUnitsDigit = 34 % 10 = 4.
 *         - 2 !== 4. Continue.
 *      b. currentSetSize = 2:
 *         - sumUnitsDigitCandidate = (2 * 2) % 10 = 4.
 *         - inputNumUnitsDigit = 34 % 10 = 4.
 *         - 4 === 4 (Match!).
 *         - lowerBoundEachNumber: k (2) is not 0, so lowerBoundEachNumber = 2.
 *         - currentSetMinTotal = 2 * 2 = 4.
 *         - Check initialNum (34) >= currentSetMinTotal (4)? Yes, 34 >= 4.
 *         - Return currentSetSize (2).
 *   Result: 2
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minimumNumbers = function (initialNum, unitsDigitK) {
  if (initialNum === 0) {
    return 0;
  }

  for (let currentSetSize = 1; currentSetSize <= 10; currentSetSize++) {
    const sumUnitsDigitCandidate = (currentSetSize * unitsDigitK) % 10;
    const inputNumUnitsDigit = initialNum % 10;

    if (sumUnitsDigitCandidate === inputNumUnitsDigit) {
      const lowerBoundEachNumber = unitsDigitK === 0 ? 10 : unitsDigitK;
      const currentSetMinTotal = currentSetSize * lowerBoundEachNumber;

      if (initialNum >= currentSetMinTotal) {
        return currentSetSize;
      }
    }
  }

  return -1;
};
