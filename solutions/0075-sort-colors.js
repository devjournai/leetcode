/**
 * Sort Colors
 * Intuition: Dutch National Flag: keep a low pointer for the next 0, a high pointer for the next 2, and a middle scan pointer; swap 0s left and 2s right in one pass.
 * Approach: 1. Initialize low=0, mid=0, high=n-1. 2. While mid ≤ high: if nums[mid] is 0 swap with low and advance both; if 2 swap with high and decrement high only; if 1 just advance mid.
 * Dry Run: [2,0,2,1,1,0] → swap 2 with last 0 → [0,0,2,1,1,2] → swap 0s left, skip 1s, swap remaining 2s → [0,0,1,1,2,2]
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var sortColors = function (nums) {
  let lowIndex = 0;
  let highIndex = nums.length - 1;
  let middleIndex = 0;

  while (middleIndex <= highIndex) {
    if (nums[middleIndex] === 0) {
      let swapItemOne = nums[lowIndex];
      nums[lowIndex] = nums[middleIndex];
      nums[middleIndex] = swapItemOne;
      lowIndex++;
      middleIndex++;
    } else if (nums[middleIndex] === 2) {
      let swapItemTwo = nums[highIndex];
      nums[highIndex] = nums[middleIndex];
      nums[middleIndex] = swapItemTwo;
      highIndex--;
    } else {
      middleIndex++;
    }
  }
};
