/**
 * Minimum Operations To Transform Array
 * Intuition: nums2 is one longer, so one append is required. Pair nums1[i] with nums2[i] using |diff| increments/decrements. The appended value should be a copy that can become nums2[n] cheaply, possibly already lying in some [min, max] pair.
 * Approach: Start with 1 (the append). Add |a-b| for each paired index. If no pair's range covers nums2[n], add the min distance from any paired value to that target.
 * Dry Run: nums1 = [2, 8], nums2 = [1, 7, 3] needs 4 operations.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minOperations = function (nums1, nums2) {
  let operations = 1;
  let coversLast = false;
  let extra = Infinity;
  const lastValue = nums2[nums2.length - 1];

  for (let i = 0; i < nums1.length; i++) {
    let high = nums1[i];
    let low = nums2[i];
    if (high < low) {
      [high, low] = [low, high];
    }
    operations += high - low;
    extra = Math.min(
      extra,
      Math.abs(high - lastValue),
      Math.abs(low - lastValue)
    );
    if (low <= lastValue && lastValue <= high) {
      coversLast = true;
    }
  }
  if (!coversLast) {
    operations += extra;
  }
  return operations;
};
