/**
 * Compare Sums of Bitonic Parts
 * Intuition: We use two variables, l and r, to record the sums of the ascending and descending parts, respectively. Initially, l is set to the first element of the array, and r is set to the sum of all elements in the array.
 * Approach: We use two variables, l and r, to record the sums of the ascending and descending parts, respectively. Initially, l is set to the first element of the array, and r is set to the sum of all elements in the array. We iterate from the second element of the array until we find the peak element. During the iteration, we add the current element to l and subtract the previous element from r. Finally, we compare the values of l and r and return the corresponding result.
 * Dry Run: Input: nums = [1,3,2,1]. Output: 1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var compareBitonicSums = function (nums) {
  let l = nums[0];
  let r = nums.reduce((acc, curr) => acc + curr, 0);

  for (let i = 1; i < nums.length; i++) {
    if (nums[i - 1] > nums[i]) {
      break;
    }
    l += nums[i];
    r -= nums[i - 1];
  }

  if (l === r) {
    return -1;
  }
  return l > r ? 0 : 1;
};
