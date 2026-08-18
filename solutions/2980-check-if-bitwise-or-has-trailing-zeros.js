/**
 * Check If Bitwise Or Has Trailing Zeros
 * Intuition: For the bitwise OR of a selection of numbers to have at least one trailing zero, the result must be an even number. This condition is met if and only if all numbers included in the bitwise OR operation are themselves even. Since the problem requires selecting two or more elements, we simply need to determine if there are at least two even numbers available in the input array. If so, their bitwise OR will always be even, fulfilling the requirement.
 * Approach: 1. Initialize a counter for even numbers to zero. 2. Iterate through the input array using a while loop and an index. 3. For each number, check if it is even. 4. If the number is even, increment the even counter. 5. After checking each number, immediately verify if the even counter has reached two or more. 6. If it has, return `true` as the condition is met. 7. If the loop completes and the even counter is still less than two, it means no such pair or group exists, so return `false`.
 * Dry Run: nums = [1, 2, 3, 4]
 * 1. Initialize `evenCountTracker = 0`, `currentLoopIndex = 0`.
 * 2. `currentLoopIndex` is 0, `nums[0]` is 1. 1 % 2 is not 0. `evenCountTracker` remains 0. `evenCountTracker` (0) is not >= 2. `currentLoopIndex` becomes 1.
 * 3. `currentLoopIndex` is 1, `nums[1]` is 2. 2 % 2 is 0. `evenCountTracker` becomes 1. `evenCountTracker` (1) is not >= 2. `currentLoopIndex` becomes 2.
 * 4. `currentLoopIndex` is 2, `nums[2]` is 3. 3 % 2 is not 0. `evenCountTracker` remains 1. `evenCountTracker` (1) is not >= 2. `currentLoopIndex` becomes 3.
 * 5. `currentLoopIndex` is 3, `nums[3]` is 4. 4 % 2 is 0. `evenCountTracker` becomes 2. `evenCountTracker` (2) IS >= 2. Return `true`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var hasTrailingZeros = function (nums) {
  let evenCountTracker = 0;
  let currentLoopIndex = 0;

  while (currentLoopIndex < nums.length) {
    let currentNumber = nums[currentLoopIndex];
    if (currentNumber % 2 === 0) {
      evenCountTracker++;
    }
    if (evenCountTracker >= 2) {
      return true;
    }
    currentLoopIndex++;
  }

  return false;
};
