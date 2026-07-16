/**
 * Find The Value Of The Partition
 * Intuition: To minimize the value of the partition |max(nums1) - min(nums2)|, we need to make max(nums1) and min(nums2) as close as possible. This is achieved by sorting the array and considering adjacent elements. If we split the sorted array `[...nums[i-1], nums[i]...]` such that `nums[i-1]` is the maximum in `nums1` and `nums[i]` is the minimum in `nums2`, their difference `nums[i] - nums[i-1]` represents a potential minimum partition value. Since all numbers are positive, `nums[i] - nums[i-1]` will be non-negative when sorted.
 * Approach: 1. Sort the input array `nums` in ascending order. 2. Initialize a variable `minimumGap` to `Infinity` to store the smallest difference found. 3. Iterate through the sorted array starting from the second element (index 1). 4. In each step, calculate the difference between the current element and its preceding element. 5. Update `minimumGap` with the smaller of its current value and the calculated difference. 6. Return `minimumGap`.
 * Dry Run: nums = [1, 3, 2]
 * 1. `nums.sort((alphaValue, betaValue) => alphaValue - betaValue);` transforms `nums` to `[1, 2, 3]`.
 * 2. `smallestDifferenceFound = Infinity`.
 * 3. `iterationPointer = 1`.
 *    - Loop condition `iterationPointer < nums.length` (1 < 3) is true.
 *    - `currentNumberInSequence = nums[1] = 2`.
 *    - `precedingNumberInSequence = nums[0] = 1`.
 *    - `calculatedDifferenceBetween = currentNumberInSequence - precedingNumberInSequence = 2 - 1 = 1`.
 *    - `smallestDifferenceFound = Math.min(Infinity, 1) = 1`.
 *    - `iterationPointer` increments to 2.
 * 4. `iterationPointer = 2`.
 *    - Loop condition `iterationPointer < nums.length` (2 < 3) is true.
 *    - `currentNumberInSequence = nums[2] = 3`.
 *    - `precedingNumberInSequence = nums[1] = 2`.
 *    - `calculatedDifferenceBetween = currentNumberInSequence - precedingNumberInSequence = 3 - 2 = 1`.
 *    - `smallestDifferenceFound = Math.min(1, 1) = 1`.
 *    - `iterationPointer` increments to 3.
 * 5. `iterationPointer = 3`.
 *    - Loop condition `iterationPointer < nums.length` (3 < 3) is false. Loop terminates.
 * 6. Return `smallestDifferenceFound` which is 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var findValueOfPartition = function (nums) {
  nums.sort((alphaValue, betaValue) => alphaValue - betaValue);

  let smallestDifferenceFound = Infinity;
  let iterationPointer = 1;

  while (iterationPointer < nums.length) {
    let currentNumberInSequence = nums[iterationPointer];
    let precedingNumberInSequence = nums[iterationPointer - 1];
    let calculatedDifferenceBetween =
      currentNumberInSequence - precedingNumberInSequence;
    smallestDifferenceFound = Math.min(
      smallestDifferenceFound,
      calculatedDifferenceBetween,
    );
    iterationPointer++;
  }

  return smallestDifferenceFound;
};
