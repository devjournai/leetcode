/**
 * Shuffle The Array
 * Intuition: nums is [x1..xn, y1..yn]. Interleave by pushing nums[i] then nums[i+n] for i in 0..n-1.
 * Approach: 1. Create an empty result. 2. For processingIndex 0..n-1 push nums[i] and nums[i+n]. 3. Return the new array.
 * Dry Run: nums = [2,5,1,3,4,7], n = 3
 *   - pairs (2,3), (5,4), (1,7)
 *   - [2,3,5,4,1,7]
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var shuffle = function (nums, n) {
  const finalShuffledArray = [];
  let processingIndex = 0;

  for (processingIndex = 0; processingIndex < n; processingIndex++) {
    finalShuffledArray.push(nums[processingIndex]);
    finalShuffledArray.push(nums[processingIndex + n]);
  }

  return finalShuffledArray;
};
