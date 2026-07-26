/**
 * Sorting Three Groups
 * Intuition: To make the array non-decreasing with elements 1, 2, or 3, the final array must be of the form [1,...,1,2,...,2,3,...,3]. The problem asks for the minimum operations (removals) to achieve this. This is equivalent to finding the longest possible non-decreasing subsequence of this specific structure. The number of removals will be the total length minus the length of this longest subsequence.
 * Approach: 1. Initialize three variables, `longestEndingOne`, `longestEndingTwo`, and `longestEndingThree`, to zero. These variables will store the maximum length of a non-decreasing subsequence found so far that ends with the value 1, 2, or 3, respectively. 2. Iterate through each `currentNumber` in the input array `nums`. 3. For each `currentNumber`, update the `longestEnding` variables:
 *    a. If `currentNumber` is 1: It can only extend a sequence of 1s. So, `longestEndingOne` increases by 1.
 *    b. If `currentNumber` is 2: It can extend a sequence of 1s (represented by `longestEndingOne`) or an existing sequence of 2s (represented by `longestEndingTwo`). `longestEndingTwo` is updated to be 1 plus the maximum of these two.
 *    c. If `currentNumber` is 3: It can extend a sequence of 1s (`longestEndingOne`), 2s (`longestEndingTwo`), or 3s (`longestEndingThree`). `longestEndingThree` is updated to be 1 plus the maximum of these three.
 *    It's important that when updating a variable (e.g., `longestEndingTwo`), it uses the values of `longestEndingOne` and `longestEndingTwo` from *before* the current `currentNumber` was processed. This is naturally handled by the conditional structure.
 * 4. After iterating through all numbers, the maximum value among `longestEndingOne`, `longestEndingTwo`, and `longestEndingThree` will represent the length of the longest desired non-decreasing subsequence. 5. The minimum operations (removals) is the total length of `nums` minus this maximum length.
 * Dry Run: nums = [1, 3, 2, 1, 3, 3]
 * Initial: longestEndingOne = 0, longestEndingTwo = 0, longestEndingThree = 0
 *
 * 1. currentNumber = 1:
 *    longestEndingOne = 0 + 1 = 1
 *    State: longestEndingOne = 1, longestEndingTwo = 0, longestEndingThree = 0
 *
 * 2. currentNumber = 3:
 *    longestEndingThree = Math.max(1, 0, 0) + 1 = 2
 *    State: longestEndingOne = 1, longestEndingTwo = 0, longestEndingThree = 2
 *
 * 3. currentNumber = 2:
 *    longestEndingTwo = Math.max(1, 0) + 1 = 2
 *    State: longestEndingOne = 1, longestEndingTwo = 2, longestEndingThree = 2
 *
 * 4. currentNumber = 1:
 *    longestEndingOne = 1 + 1 = 2
 *    State: longestEndingOne = 2, longestEndingTwo = 2, longestEndingThree = 2
 *
 * 5. currentNumber = 3:
 *    longestEndingThree = Math.max(2, 2, 2) + 1 = 3
 *    State: longestEndingOne = 2, longestEndingTwo = 2, longestEndingThree = 3
 *
 * 6. currentNumber = 3:
 *    longestEndingThree = Math.max(2, 2, 3) + 1 = 4
 *    State: longestEndingOne = 2, longestEndingTwo = 2, longestEndingThree = 4
 *
 * Final Max Length: Math.max(longestEndingOne, longestEndingTwo, longestEndingThree) = Math.max(2, 2, 4) = 4
 * Original Array Length: 6
 * Minimum Operations: 6 - 4 = 2
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minimumOperations = function (nums) {
  const numbersLength = nums.length;
  let longestEndingOne = 0;
  let longestEndingTwo = 0;
  let longestEndingThree = 0;

  for (const currentNumber of nums) {
    if (currentNumber === 1) {
      longestEndingOne = longestEndingOne + 1;
    } else if (currentNumber === 2) {
      longestEndingTwo = Math.max(longestEndingOne, longestEndingTwo) + 1;
    } else if (currentNumber === 3) {
      longestEndingThree =
        Math.max(longestEndingOne, longestEndingTwo, longestEndingThree) + 1;
    }
  }

  const maximumAchievableLength = Math.max(
    longestEndingOne,
    longestEndingTwo,
    longestEndingThree,
  );
  const minimumOperationsCount = numbersLength - maximumAchievableLength;
  return minimumOperationsCount;
};
