/**
 * Maximum Xor After Operations
 * Intuition: The key insight lies in understanding the effect of the operation `nums[i] = nums[i] AND (nums[i] XOR x)`. By analyzing the bitwise behavior, we observe that this operation can only change a 1-bit to a 0-bit, but it can never change a 0-bit to a 1-bit. If a specific bit position is 0 in all numbers in the original array, it will remain 0 in all numbers after any number of operations, thus contributing 0 to the final XOR sum. However, if a specific bit position is 1 in at least one number in the original array, we can strategically apply operations to ensure that exactly one number in the final array has a 1 at that bit position, while all other numbers have a 0. This guarantees that the final XOR sum will have a 1 at that bit position. Therefore, the maximum possible XOR sum is achieved by setting every bit that is present in the initial bitwise OR of all numbers.
 * Approach: 1. Initialize a variable to accumulate the bitwise OR of all elements, starting from zero. 2. Iterate through each number in the input array. 3. In each iteration, update the accumulator variable by performing a bitwise OR operation with the current number. 4. After processing all numbers, the accumulator will hold the bitwise OR of all original elements, which represents the maximum achievable XOR sum.
 * Dry Run: nums = [3, 5, 2]
 * 1. Initialize `resultHolder = 0`.
 * 2. Loop `indexIterator` from 0 to 2:
 *    a. `indexIterator = 0`, `currentNumber = nums[0] = 3` (binary `011`).
 *       `resultHolder = resultHolder | currentNumber = 0 | 3 = 3` (binary `011`).
 *    b. `indexIterator = 1`, `currentNumber = nums[1] = 5` (binary `101`).
 *       `resultHolder = resultHolder | currentNumber = 3 | 5 = 7` (binary `011 | 101 = 111`).
 *    c. `indexIterator = 2`, `currentNumber = nums[2] = 2` (binary `010`).
 *       `resultHolder = resultHolder | currentNumber = 7 | 2 = 7` (binary `111 | 010 = 111`).
 * 3. Loop finishes. Return `resultHolder`, which is 7.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var maximumXOR = function (nums) {
  let currentMaxOr = 0;
  let elementCount = nums.length;

  for (let idxPosition = 0; idxPosition < elementCount; idxPosition++) {
    let arrayElement = nums[idxPosition];
    currentMaxOr |= arrayElement;
  }

  return currentMaxOr;
};
