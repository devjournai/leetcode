/**
 * Minimum Operations To Make The Integer Zero
 * Intuition: The problem asks to find the minimum number of operations, `k`, such that `num1` can be reduced to zero. Each operation subtracts `(2^i + num2)`. If we perform `k` operations, the total subtracted value is `(sum of k chosen 2^i terms) + (k * num2)`. For `num1` to become zero, this total must equal `num1`. This means `num1 - (k * num2)` must be expressible as the sum of `k` powers of two. A key property is that any positive integer `N` can be represented as a sum of `countSetBits(N)` unique powers of two. Furthermore, `N` can be expressed as a sum of `k` powers of two if and only if `countSetBits(N) <= k <= N`.
 * Approach: 1. Iterate through possible numbers of operations, `currentOperationsCount`, starting from 1 up to 60 (as `i` is in `[0, 60]`, and the maximum number of set bits for a relevant `remaining` value is significantly less than 60).
 *           2. For each `currentOperationsCount`, calculate the required `currentRemainingValue = num1 - num2 * currentOperationsCount`. This is the value that must be formed by summing `currentOperationsCount` powers of two.
 *           3. Check two conditions for `currentRemainingValue` to be representable:
 *              a. `currentRemainingValue < currentOperationsCount`: If the `currentRemainingValue` is less than the number of operations, it's impossible to sum `currentOperationsCount` positive powers of two (each `2^i >= 1`) to reach `currentRemainingValue`. In this case, no solution exists for this `currentOperationsCount` or any larger one, so return -1.
 *              b. `currentOperationsCount >= getSetBitsCount(currentRemainingValue)`: This checks if `currentOperationsCount` is sufficient to represent `currentRemainingValue`. If this condition holds, and `currentRemainingValue >= currentOperationsCount` (from condition 3a), then `currentOperationsCount` is a valid number of operations. Since we iterate `currentOperationsCount` in increasing order, this is the minimum, so return `currentOperationsCount`.
 *           4. If the loop completes without finding a solution, return -1.
 * Dry Run: num1 = 3, num2 = -2
 *   Helper getSetBitsCount(numberVal):
 *     getSetBitsCount(5):
 *       initialBits = 0, currentVal = 5 (101_2)
 *       currentVal=5: initialBits += 1 (5&1), currentVal = 2
 *       currentVal=2: initialBits += 0 (2&1), currentVal = 1
 *       currentVal=1: initialBits += 1 (1&1), currentVal = 0
 *       Returns 2.
 *     getSetBitsCount(7):
 *       initialBits = 0, currentVal = 7 (111_2)
 *       currentVal=7: initialBits += 1, currentVal = 3
 *       currentVal=3: initialBits += 1, currentVal = 1
 *       currentVal=1: initialBits += 1, currentVal = 0
 *       Returns 3.
 *     getSetBitsCount(9):
 *       initialBits = 0, currentVal = 9 (1001_2)
 *       currentVal=9: initialBits += 1, currentVal = 4
 *       currentVal=4: initialBits += 0, currentVal = 2
 *       currentVal=2: initialBits += 0, currentVal = 1
 *       currentVal=1: initialBits += 1, currentVal = 0
 *       Returns 2.
 *
 *   makeTheIntegerZero(3, -2):
 *   Loop for currentOperationsCount from 1 to 60:
 *   - currentOperationsCount = 1:
 *     - currentRemainingValue = 3 - (-2 * 1) = 5
 *     - (currentRemainingValue < currentOperationsCount) => (5 < 1) is false.
 *     - (currentOperationsCount >= getSetBitsCount(currentRemainingValue)) => (1 >= getSetBitsCount(5)) => (1 >= 2) is false.
 *   - currentOperationsCount = 2:
 *     - currentRemainingValue = 3 - (-2 * 2) = 7
 *     - (currentRemainingValue < currentOperationsCount) => (7 < 2) is false.
 *     - (currentOperationsCount >= getSetBitsCount(currentRemainingValue)) => (2 >= getSetBitsCount(7)) => (2 >= 3) is false.
 *   - currentOperationsCount = 3:
 *     - currentRemainingValue = 3 - (-2 * 3) = 9
 *     - (currentRemainingValue < currentOperationsCount) => (9 < 3) is false.
 *     - (currentOperationsCount >= getSetBitsCount(currentRemainingValue)) => (3 >= getSetBitsCount(9)) => (3 >= 2) is true.
 *     - Return 3.
 * Time Complexity: O(MAX_OPERATIONS_LIMIT * log(MAX_POSSIBLE_REMAINING_VALUE))
 * Space Complexity: O(1)
 */
var makeTheIntegerZero = function (num1, num2) {
  function getSetBitsCount(numberVal) {
    let initialBits = 0;
    let currentVal = numberVal;
    while (currentVal > 0) {
      initialBits += currentVal & 1;
      currentVal = Math.floor(currentVal / 2);
    }
    return initialBits;
  }

  for (
    let currentOperationsCount = 1;
    currentOperationsCount <= 60;
    currentOperationsCount++
  ) {
    let currentRemainingValue = num1 - num2 * currentOperationsCount;

    if (currentRemainingValue < currentOperationsCount) {
      return -1;
    }

    if (currentOperationsCount >= getSetBitsCount(currentRemainingValue)) {
      return currentOperationsCount;
    }
  }

  return -1;
};
