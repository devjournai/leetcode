/**
 * Maximum Beauty Of An Array After Applying Operation
 * Intuition: To maximize the count of elements that can be made equal to a specific value X, each chosen element `nums[i]` must be transformable to X, meaning `X` must be within `[nums[i] - k, nums[i] + k]`. For a set of elements to be made equal to X, X must exist in the intersection of all their individual `[nums[i] - k, nums[i] + k]` ranges. Sorting the array simplifies this condition: for a sorted subarray `nums[left...right]` to be transformable to a common value, the intersection `[max(nums[p]-k), min(nums[p]+k)]` for `p` from `left` to `right` must be non-empty. Due to sorting, this simplifies to `[nums[right]-k, nums[left]+k]`. This interval is non-empty if `nums[right]-k <= nums[left]+k`, or `nums[right] - nums[left] <= 2 * k`.
 * Approach: 1. Sort the input array `nums` in non-decreasing order. 2. Initialize a variable `maximumAchievableLength` to 0 to store the maximum beauty found. 3. Use a sliding window approach with two pointers, `startWindowIndex` (left) and `endWindowIndex` (right), both initialized to 0. 4. Iterate `endWindowIndex` from 0 to `nums.length - 1`. 5. Inside the loop, check if the current window `nums[startWindowIndex...endWindowIndex]` satisfies the condition: `nums[endWindowIndex] - nums[startWindowIndex] > 2 * k`. 6. If the condition is true, it means the current window is too wide to be made equal, so shrink the window by incrementing `startWindowIndex` until the condition is no longer met. 7. After adjusting `startWindowIndex`, the current window `nums[startWindowIndex...endWindowIndex]` is valid. Update `maximumAchievableLength` with `Math.max(maximumAchievableLength, endWindowIndex - startWindowIndex + 1)`. 8. After the loop completes, return `maximumAchievableLength`.
 * Dry Run: nums = [4, 6, 1, 2], k = 2
 * 1. Sort nums: [1, 2, 4, 6]
 * 2. maximumAchievableLength = 0, startWindowIndex = 0, allowedRangeDifference = 4 (2*k)
 * 3. endWindowIndex = 0: nums[0]=1. (1 - 1) <= 4. maximumAchievableLength = max(0, 0-0+1) = 1.
 * 4. endWindowIndex = 1: nums[1]=2. (2 - 1) <= 4. maximumAchievableLength = max(1, 1-0+1) = 2.
 * 5. endWindowIndex = 2: nums[2]=4. (4 - 1) <= 4. maximumAchievableLength = max(2, 2-0+1) = 3.
 * 6. endWindowIndex = 3: nums[3]=6. (6 - 0) > 4 is true.
 *    While (nums[3] - nums[0] > 4): startWindowIndex becomes 1. Current window `nums[1...3]`.
 *    Now (nums[3] - nums[1]) is (6 - 2) which is 4. (4 > 4) is false. While loop terminates.
 *    maximumAchievableLength = max(3, 3-1+1) = max(3, 3) = 3.
 * 7. Loop ends. Return 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maximumBeauty = function (nums, k) {
  nums.sort((firstElement, secondElement) => firstElement - secondElement);

  let maximumAchievableLength = 0;
  let startWindowIndex = 0;
  const allowedRangeDifference = 2 * k;

  for (let endWindowIndex = 0; endWindowIndex < nums.length; endWindowIndex++) {
    while (
      nums[endWindowIndex] - nums[startWindowIndex] >
      allowedRangeDifference
    ) {
      startWindowIndex++;
    }
    maximumAchievableLength = Math.max(
      maximumAchievableLength,
      endWindowIndex - startWindowIndex + 1
    );
  }

  return maximumAchievableLength;
};
