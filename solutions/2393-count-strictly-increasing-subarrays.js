/**
 * Count Strictly Increasing Subarrays
 * Intuition: A strictly increasing sequence of length `k` forms `k * (k + 1) / 2` strictly increasing subarrays. We can iterate through the array, identify such sequences, and sum their contributions.
 * Approach: 1. Initialize `cumulativeTotal` to 0 and `segmentCurrentLength` to 1 (representing the minimum length of an increasing subarray, a single element). 2. Use a `while` loop to iterate `currentPointer` from the second element to the end of the array. 3. Inside the loop, check if the current element is strictly greater than the previous element. If true, increment `segmentCurrentLength`. 4. If the current element is not strictly greater than the previous, it means the strictly increasing segment has ended. At this point, calculate the number of subarrays formed by the *previous* segment (`segmentCurrentLength * (segmentCurrentLength + 1) / 2`) and add it to `cumulativeTotal`. Then, reset `segmentCurrentLength` to 1 to start counting a new potential segment from the current element. 5. After the loop completes, there will always be one last segment's contribution that hasn't been added yet; add it to `cumulativeTotal`. 6. Return `cumulativeTotal`.
 * Dry Run: nums = [1, 2, 3, 1, 2]
 *   - Initial: cumulativeTotal = 0, segmentCurrentLength = 1, currentPointer = 1
 *   - currentPointer = 1 (nums[1]=2, nums[0]=1):
 *       - nums[1] > nums[0] (2 > 1) is true. segmentCurrentLength becomes 2.
 *       - nums[1] <= nums[0] (2 <= 1) is false.
 *       - currentPointer becomes 2.
 *   - currentPointer = 2 (nums[2]=3, nums[1]=2):
 *       - nums[2] > nums[1] (3 > 2) is true. segmentCurrentLength becomes 3.
 *       - nums[2] <= nums[1] (3 <= 2) is false.
 *       - currentPointer becomes 3.
 *   - currentPointer = 3 (nums[3]=1, nums[2]=3):
 *       - nums[3] > nums[2] (1 > 3) is false.
 *       - nums[3] <= nums[2] (1 <= 3) is true.
 *           - cumulativeTotal += (3 * (3 + 1)) / 2 = 6.
 *           - segmentCurrentLength becomes 1.
 *       - currentPointer becomes 4.
 *   - currentPointer = 4 (nums[4]=2, nums[3]=1):
 *       - nums[4] > nums[3] (2 > 1) is true. segmentCurrentLength becomes 2.
 *       - nums[4] <= nums[3] (2 <= 1) is false.
 *       - currentPointer becomes 5.
 *   - Loop condition (5 < 5) is false. Loop ends.
 *   - After loop: cumulativeTotal += (2 * (2 + 1)) / 2 = 6 + 3 = 9.
 *   - Return 9.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var countSubarrays = function (nums) {
  if (!nums || nums.length === 0) {
    return 0;
  }

  let cumulativeTotal = 0;
  let segmentCurrentLength = 1;
  let currentPointer = 1;

  while (currentPointer < nums.length) {
    if (nums[currentPointer] > nums[currentPointer - 1]) {
      segmentCurrentLength++;
    }
    if (nums[currentPointer] <= nums[currentPointer - 1]) {
      cumulativeTotal +=
        (segmentCurrentLength * (segmentCurrentLength + 1)) / 2;
      segmentCurrentLength = 1;
    }
    currentPointer++;
  }

  cumulativeTotal += (segmentCurrentLength * (segmentCurrentLength + 1)) / 2;

  return cumulativeTotal;
};
