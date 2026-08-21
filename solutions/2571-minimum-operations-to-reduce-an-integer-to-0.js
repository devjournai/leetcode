/**
 * Minimum Operations To Reduce An Integer To 0
 * Intuition: To reduce an integer `n` to 0 by adding or subtracting powers of 2, we can examine its binary representation. The key insight is to make greedy choices based on the least significant bits. If `n` is even, we can effectively divide it by 2 without an operation count, as any operations on `n/2` can be 'scaled' up. If `n` is odd, we must either add 1 (2^0) or subtract 1 (2^0) to make it even. The optimal greedy choice is to pick the operation (+1 or -1) that results in a number with more trailing zeros in its binary representation. This often means converting `...01` to `...00` (by subtracting 1) and `...11` to `...100` (by adding 1), as `...11` is closer to the next power of 2 (or multiple thereof) than to the previous.
 * Approach: 1. Initialize an operation counter and a mutable variable for the input number. 2. Loop until the number becomes zero. 3. In each iteration, examine the last two bits of the current number using a bitwise AND with 3. 4. Use a switch statement based on these two bits: a. If the last two bits are `00` or `10` (number is even), perform a right bit shift (divide by 2) without incrementing the operation counter. b. If the last two bits are `01` (e.g., 5, 9), subtract 1 from the number and increment the operation counter. c. If the last two bits are `11` (e.g., 3, 7), add 1 to the number and increment the operation counter. 5. Return the final operation count.
 * Dry Run: n = 3
 *   initialNumber = 3
 *   totalOperations = 0
 *   currentNumber = 3 (binary: 011)
 *
 *   Loop 1: currentNumber = 3
 *     lastTwoBits = 3 & 3 = 3
 *     Switch case 3:
 *       currentNumber = 3 + 1 = 4 (binary: 100)
 *       totalOperations = 1
 *
 *   Loop 2: currentNumber = 4
 *     lastTwoBits = 4 & 3 = 0
 *     Switch case 0:
 *       currentNumber = 4 >> 1 = 2 (binary: 010)
 *
 *   Loop 3: currentNumber = 2
 *     lastTwoBits = 2 & 3 = 2
 *     Switch case 2:
 *       currentNumber = 2 >> 1 = 1 (binary: 001)
 *
 *   Loop 4: currentNumber = 1
 *     lastTwoBits = 1 & 3 = 1
 *     Switch case 1:
 *       currentNumber = 1 - 1 = 0
 *       totalOperations = 2
 *
 *   Loop ends as currentNumber is 0.
 *   Return totalOperations = 2.
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var minOperations = function (initialNumber) {
  let totalOperations = 0;
  let currentNumber = initialNumber;

  for (; currentNumber > 0;) {
    const lastTwoBits = currentNumber & 3;

    switch (lastTwoBits) {
      case 0:
      case 2:
        currentNumber >>= 1;
        break;
      case 1:
        currentNumber -= 1;
        totalOperations++;
        break;
      case 3:
        currentNumber += 1;
        totalOperations++;
        break;
    }
  }

  return totalOperations;
};
