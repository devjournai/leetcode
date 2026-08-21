/**
 * Patching Array
 * Intuition: If you can already form every sum in [1, reach], a next nums[i] ≤ reach + 1 extends the range by nums[i]; otherwise patch reach + 1, which doubles the covered range to 2 * reach + 1.
 * Approach: 1. reach = 0, patches = 0, i = 0. 2. While reach < n: if nums[i] exists and nums[i] <= reach + 1, add it to reach and i++. 3. Else set reach = reach * 2 + 1 and increment patches. 4. Return patches.
 * Dry Run: nums = [1, 3], n = 6.
 *   - Take 1 → reach 1. 3 > 2 so patch → reach 3, patches 1.
 *   - Take 3 → reach 6. Return 1.
 * Time Complexity: O(L + log N)
 * Space Complexity: O(1)
 */
var minPatches = function (nums, n) {
  let totalPatches = 0;
  let currentElementIndex = 0;
  let maximumReachableSum = 0;

  while (maximumReachableSum < n) {
    if (
      currentElementIndex < nums.length &&
      nums[currentElementIndex] <= maximumReachableSum + 1
    ) {
      maximumReachableSum += nums[currentElementIndex];
      currentElementIndex++;
    } else {
      maximumReachableSum = maximumReachableSum * 2 + 1;
      totalPatches++;
    }
  }

  return totalPatches;
};
