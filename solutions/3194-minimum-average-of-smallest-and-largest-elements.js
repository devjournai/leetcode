/**
 * Minimum Average Of Smallest And Largest Elements
 * Intuition: Each step pairs the current minimum with the current maximum, so sorting and pairing ends yields all n/2 averages.
 * Approach: 1. Sort nums. 2. Pair left and right pointers. 3. Track the minimum of (nums[left]+nums[right])/2.
 * Dry Run:
 *   nums = [7,8,3,4,15,13,4,1] sorted [1,3,4,4,7,8,13,15], averages 8,8,6,5.5 -> 5.5
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var minimumAverage = function (nums) {
  nums.sort((a, b) => a - b);
  let leftIndex = 0;
  let rightIndex = nums.length - 1;
  let minAverage = Infinity;
  while (leftIndex < rightIndex) {
    minAverage = Math.min(minAverage, (nums[leftIndex] + nums[rightIndex]) / 2);
    leftIndex++;
    rightIndex--;
  }
  return minAverage;
};
