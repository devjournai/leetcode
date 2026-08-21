/**
 * Reverse Integer
 * Intuition: Peel digits from the absolute value with `% 10` and rebuild them into `processedResult`, then restore the original sign and clamp to 32-bit range (return 0 on overflow).
 * Approach: 1. Store MAX_INT / MIN_INT. 2. Set `tempValue = abs(value)` and `processedResult = 0`. 3. While `tempValue > 0`, append `digit = tempValue % 10` and floor-divide `tempValue`. 4. Negate if `value < 0`. 5. Return 0 if outside [MIN_INT, MAX_INT], else `finalResult`.
 * Dry Run: value = -123.
 *   - tempValue=123 → 3, then 32, then 321. finalResult=-321, in range → -321.
 * Time Complexity: O(log10(n))
 * Space Complexity: O(log10(n))
 */
var reverse = function (value) {
  const MAX_INT = Math.pow(2, 31) - 1;
  const MIN_INT = -Math.pow(2, 31);

  let tempValue = Math.abs(value);
  let processedResult = 0;

  while (tempValue > 0) {
    const digit = tempValue % 10;
    processedResult = processedResult * 10 + digit;
    tempValue = Math.floor(tempValue / 10);
  }

  const finalResult = value < 0 ? -processedResult : processedResult;

  if (finalResult > MAX_INT || finalResult < MIN_INT) {
    return 0;
  }

  return finalResult;
};
