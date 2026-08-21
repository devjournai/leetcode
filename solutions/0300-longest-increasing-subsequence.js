/**
 * Longest Increasing Subsequence
 * Intuition: Keep an array of the smallest tails of increasing subsequences of each length. Binary search the first tail >= current; replace it or append to grow the LIS length.
 * Approach: 1. Empty → 0. 2. For each num, binary-search tails for the leftmost index not strictly less than num. 3. If that index equals length, push; else overwrite tails[index]. 4. Return tails.length.
 * Dry Run: nums = [10,9,2,5,3,7,101,18].
 *   - tails evolves [10]→[9]→[2]→[2,5]→[2,3]→[2,3,7]→[2,3,7,101]→[2,3,7,18].
 *   - Return 4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var lengthOfLIS = function (nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  const increasingSubsequenceTails = [];

  for (const currentNumber of nums) {
    let binarySearchLeft = 0;
    let binarySearchRight = increasingSubsequenceTails.length - 1;
    let insertionPoint = increasingSubsequenceTails.length;

    while (binarySearchLeft <= binarySearchRight) {
      const binarySearchMid = Math.floor(
        (binarySearchLeft + binarySearchRight) / 2
      );
      if (increasingSubsequenceTails[binarySearchMid] < currentNumber) {
        binarySearchLeft = binarySearchMid + 1;
      } else {
        insertionPoint = binarySearchMid;
        binarySearchRight = binarySearchMid - 1;
      }
    }

    if (insertionPoint === increasingSubsequenceTails.length) {
      increasingSubsequenceTails.push(currentNumber);
    } else {
      increasingSubsequenceTails[insertionPoint] = currentNumber;
    }
  }

  return increasingSubsequenceTails.length;
};
