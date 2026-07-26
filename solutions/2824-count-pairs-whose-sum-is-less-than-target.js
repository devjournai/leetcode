/**
 * Count Pairs Whose Sum Is Less Than Target
 * Intuition: Sorting the array allows for an efficient two-pointer approach to find pairs satisfying a sum condition. If the sum of the smallest and largest elements is less than the target, then the smallest element combined with any element up to the largest will also be less than the target. If the sum is too large, we must reduce the larger element.
 * Approach: 1. Sort the input array `nums` in non-decreasing order. 2. Initialize a counter `pairCount` to zero. 3. Use two pointers, `startPointer` initialized to the beginning of the array (index 0) and `endPointer` initialized to the end of the array (index `nums.length - 1`). 4. While `startPointer` is less than `endPointer`: a. Calculate the sum of elements at `startPointer` and `endPointer`. b. If this sum is less than `target`, it means `nums[startPointer]` can form a valid pair with `nums[endPointer]` and all elements between `startPointer` and `endPointer` (inclusive of `endPointer`). Add `endPointer - startPointer` to `pairCount` and increment `startPointer`. c. Otherwise (if the sum is greater than or equal to `target`), decrement `endPointer` to try a smaller sum. 5. Return `pairCount`.
 * Dry Run: nums = [-1, 1, 2, 3, 1], target = 2
 * 1. Sort: nums becomes [-1, 1, 1, 2, 3]
 * 2. pairCount = 0, startPointer = 0, endPointer = 4
 * 3. Loop (startPointer < endPointer):
 *    - Iteration 1: startPointer = 0 (nums[0] = -1), endPointer = 4 (nums[4] = 3). Sum = -1 + 3 = 2. Sum >= target. Decrement endPointer. endPointer = 3.
 *    - Iteration 2: startPointer = 0 (nums[0] = -1), endPointer = 3 (nums[3] = 2). Sum = -1 + 2 = 1. Sum < target. Add (endPointer - startPointer) = (3 - 0) = 3 to pairCount. pairCount = 3. Increment startPointer. startPointer = 1.
 *    - Iteration 3: startPointer = 1 (nums[1] = 1), endPointer = 3 (nums[3] = 2). Sum = 1 + 2 = 3. Sum >= target. Decrement endPointer. endPointer = 2.
 *    - Iteration 4: startPointer = 1 (nums[1] = 1), endPointer = 2 (nums[2] = 1). Sum = 1 + 1 = 2. Sum >= target. Decrement endPointer. endPointer = 1.
 *    - Iteration 5: startPointer = 1, endPointer = 1. Condition (startPointer < endPointer) is false. Loop terminates.
 * 4. Return pairCount = 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(log N)
 */
var countPairs = function (nums, target) {
  let pairCount = 0;
  let startPointer = 0;
  let endPointer = nums.length - 1;

  nums.sort((firstElement, secondElement) => firstElement - secondElement);

  while (startPointer < endPointer) {
    let currentSumValue = nums[startPointer] + nums[endPointer];
    if (currentSumValue < target) {
      pairCount += endPointer - startPointer;
      startPointer++;
    } else {
      endPointer--;
    }
  }

  return pairCount;
};
