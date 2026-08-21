/**
 * Longest Subarray With Maximum Bitwise And
 * Intuition: The bitwise AND operation `a & b` always results in a value less than or equal to `min(a, b)`. Consequently, the bitwise AND of any subarray will always be less than or equal to any element within that subarray. For a subarray's bitwise AND to be the *maximum possible* value among all subarrays, it must necessarily be equal to the *maximum element* present in the entire input array. This can only happen if all elements within that specific subarray are themselves equal to this overall maximum element. Any smaller element in the subarray would reduce the bitwise AND result. Therefore, the problem reduces to finding the longest contiguous subarray composed entirely of elements equal to the overall maximum value in the input array.
 * Approach: 1. Determine the overall maximum value (`arrayHighestValue`) present in the `nums` array. This can be done by iterating through the array or by using `Math.max()`. 2. Initialize two integer variables: `maximumConsecutiveLength` to store the longest consecutive sequence found so far, and `currentConsecutiveCount` to track the length of the current consecutive sequence of `arrayHighestValue`. 3. Iterate through each `numberElement` in the `nums` array. 4. If `numberElement` is equal to `arrayHighestValue`, increment `currentConsecutiveCount`. 5. If `numberElement` is not equal to `arrayHighestValue`, reset `currentConsecutiveCount` to 0, as the consecutive sequence is broken. 6. After each step within the loop, update `maximumConsecutiveLength` to be the maximum of its current value and `currentConsecutiveCount`. 7. After iterating through all elements, return `maximumConsecutiveLength`.
 * Dry Run: nums = [1, 5, 2, 5, 5, 3]
 *   1. arrayHighestValue = Math.max(1, 5, 2, 5, 5, 3) = 5.
 *   2. maximumConsecutiveLength = 0.
 *   3. currentConsecutiveCount = 0.
 *   4. Loop through nums:
 *      - numberElement = 1: 1 !== 5. currentConsecutiveCount = 0. maximumConsecutiveLength = Math.max(0, 0) = 0.
 *      - numberElement = 5: 5 === 5. currentConsecutiveCount = 1. maximumConsecutiveLength = Math.max(0, 1) = 1.
 *      - numberElement = 2: 2 !== 5. currentConsecutiveCount = 0. maximumConsecutiveLength = Math.max(1, 0) = 1.
 *      - numberElement = 5: 5 === 5. currentConsecutiveCount = 1. maximumConsecutiveLength = Math.max(1, 1) = 1.
 *      - numberElement = 5: 5 === 5. currentConsecutiveCount = 2. maximumConsecutiveLength = Math.max(1, 2) = 2.
 *      - numberElement = 3: 3 !== 5. currentConsecutiveCount = 0. maximumConsecutiveLength = Math.max(2, 0) = 2.
 *   5. Return maximumConsecutiveLength = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestSubarray = function (nums) {
  const arrayHighestValue = Math.max(...nums);
  let maximumConsecutiveLength = 0;
  let currentConsecutiveCount = 0;

  for (const numberElement of nums) {
    if (numberElement === arrayHighestValue) {
      currentConsecutiveCount++;
    } else {
      currentConsecutiveCount = 0;
    }
    maximumConsecutiveLength = Math.max(
      maximumConsecutiveLength,
      currentConsecutiveCount
    );
  }

  return maximumConsecutiveLength;
};
