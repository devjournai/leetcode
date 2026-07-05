/**
 * Count The Number Of Beautiful Subarrays
 * Intuition: The given operation (subtracting 2^k from two numbers i, j if their kth bit is 1) ensures that the parity of the count of 1s at any specific bit position within the subarray remains unchanged. For all elements in a subarray to become 0, the final count of 1s at every bit position must be 0 (an even number). Therefore, a subarray is beautiful if and only if, for every bit position, the total number of elements in that subarray having their kth bit set is even. This condition is mathematically equivalent to the XOR sum of all elements in the subarray being 0. The problem then transforms into counting subarrays whose elements XOR to 0.
 * Approach: 1. Initialize a counter `totalBeautiful` for the result and a variable `currentXorSum` to keep track of the running XOR sum of elements encountered so far.
 * 2. Create a `frequencyMap` (using a JavaScript Map) to store the count of how many times each prefix XOR sum has occurred. Initialize `frequencyMap` with `(0, 1)` to account for the empty prefix having an XOR sum of 0, which correctly counts subarrays starting from index 0 that have an XOR sum of 0.
 * 3. Iterate through each `arrayElement` in the input `nums` array.
 * 4. In each iteration, update `currentXorSum` by XORing it with the `arrayElement`: `currentXorSum ^= arrayElement`.
 * 5. Check if `currentXorSum` already exists as a key in `frequencyMap`. If it does, it means there were previous segments (ending before the current index) whose prefix XOR sum matches `currentXorSum`. The XOR sum of the subarray from such a previous segment's end to the current index will be 0. Add the frequency of `currentXorSum` from `frequencyMap` to `totalBeautiful`.
 * 6. Regardless of whether `currentXorSum` was found, update its frequency in `frequencyMap`. If it's a new XOR sum, set its count to 1; otherwise, increment its existing count.
 * 7. After iterating through all elements, return `totalBeautiful`.
 * Dry Run: nums = [1, 2, 3]
 * 1. Initialize `totalBeautiful = 0`, `currentXorSum = 0`.
 * 2. `frequencyMap = {0: 1}`.
 * 3. Iterate `arrayElement`s:
 *    - `arrayElement = 1` (index 0):
 *      - `currentXorSum = 0 ^ 1 = 1`.
 *      - `frequencyMap` does not have `1`.
 *      - `frequencyMap.set(1, 1)`. `frequencyMap = {0: 1, 1: 1}`.
 *    - `arrayElement = 2` (index 1):
 *      - `currentXorSum = 1 ^ 2 = 3`.
 *      - `frequencyMap` does not have `3`.
 *      - `frequencyMap.set(3, 1)`. `frequencyMap = {0: 1, 1: 1, 3: 1}`.
 *    - `arrayElement = 3` (index 2):
 *      - `currentXorSum = 3 ^ 3 = 0`.
 *      - `frequencyMap` has `0`. `totalBeautiful += frequencyMap.get(0)` (which is 1). `totalBeautiful = 1`.
 *      - `frequencyMap.set(0, frequencyMap.get(0) + 1)` (which is 2). `frequencyMap = {0: 2, 1: 1, 3: 1}`.
 * 4. End loop. Return `totalBeautiful = 1`.
 *    The only beautiful subarray is `[1, 2, 3]` (1^2^3 = 0).
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var beautifulSubarrays = function (nums) {
  let totalBeautiful = 0;
  const xorValueCounts = new Map();
  let currentXorRunningSum = 0;

  xorValueCounts.set(0, 1);

  for (const currentNumber of nums) {
    currentXorRunningSum ^= currentNumber;
    const previousCount = xorValueCounts.get(currentXorRunningSum) || 0;
    totalBeautiful += previousCount;
    xorValueCounts.set(currentXorRunningSum, previousCount + 1);
  }

  return totalBeautiful;
};
