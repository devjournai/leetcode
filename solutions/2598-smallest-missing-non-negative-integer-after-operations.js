/**
 * Smallest Missing Non Negative Integer After Operations
 * Intuition: The key insight is that adding or subtracting 'value' from a number 'x' does not change its remainder when divided by 'value'. Therefore, all numbers that share the same remainder 'r' can be transformed into any integer of the form 'r + k * value'. To maximize the MEX (smallest missing non-negative integer), we greedily try to form 0, then 1, then 2, and so on. We can form a number 'm' if there's at least one number in the input array whose remainder when divided by 'value' is 'm % value'. If we use such a number, its count for that remainder is decremented.
 * Approach: 1. Initialize a hash map, `remainderMap`, to store the frequencies of remainders of each number in `nums` when divided by `value`. Ensure remainders are non-negative using `((num % value) + value) % value`. 2. Iterate through each `singleNumber` in the `nums` array to populate `remainderMap`. 3. Initialize a counter `currentMexCheck` to 0. 4. Enter a `while(true)` loop. In each iteration, calculate `targetModulo = currentMexCheck % value`. 5. Retrieve `countInMap` for `targetModulo` from `remainderMap`. 6. If `remainderMap` does not have `targetModulo` or if `countInMap` is 0, it means we cannot form `currentMexCheck`. Thus, `currentMexCheck` is the smallest missing non-negative integer, and we return it. 7. Otherwise, decrement the count for `targetModulo` in `remainderMap` and increment `currentMexCheck` to check the next integer.
 * Dry Run: nums = [1, -10, 7, 13], value = 3
 *   1. Initialize remainderMap = new Map().
 *   2. Process inputNumbers:
 *      - singleNumber = 1: computedRemainder = ((1 % 3) + 3) % 3 = 1. remainderMap = { 1: 1 }
 *      - singleNumber = -10: computedRemainder = ((-10 % 3) + 3) % 3 = (-1 + 3) % 3 = 2. remainderMap = { 1: 1, 2: 1 }
 *      - singleNumber = 7: computedRemainder = ((7 % 3) + 3) % 3 = 1. remainderMap = { 1: 2, 2: 1 }
 *      - singleNumber = 13: computedRemainder = ((13 % 3) + 3) % 3 = 1. remainderMap = { 1: 3, 2: 1 }
 *   3. Find smallest missing integer:
 *      - currentMexCheck = 0:
 *        - targetModulo = 0 % 3 = 0.
 *        - remainderMap does not have key 0. `countInMap` would be `undefined`.
 *        - Condition `(!remainderMap.has(targetModulo) || countInMap === 0)` is true.
 *        - Return 0.
 * Time Complexity: O(N)
 * Space Complexity: O(min(N, value))
 */
var findSmallestInteger = function (nums, value) {
  const remainderMap = new Map();

  nums.forEach((singleNumber) => {
    const computedRemainder = ((singleNumber % value) + value) % value;
    remainderMap.set(
      computedRemainder,
      (remainderMap.get(computedRemainder) || 0) + 1
    );
  });

  let currentMexCheck = 0;
  while (true) {
    const targetModulo = currentMexCheck % value;
    const countInMap = remainderMap.get(targetModulo);

    if (!remainderMap.has(targetModulo) || countInMap === 0) {
      return currentMexCheck;
    }

    remainderMap.set(targetModulo, countInMap - 1);
    currentMexCheck++;
  }
};
