/**
 * Shuffle The Array
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
