/**
 * Count Beautiful Splits in an Array
 * Intuition: Split into nums1 | nums2 | nums3. The split is beautiful if nums1 is a prefix of nums2 or nums2 is a prefix of nums3. Z-arrays from every start answer prefix matches in O(1).
 * Approach: 1. For each start index, compute Z of nums[start..] (Z[i] = longest prefix of nums[i..] matching nums[start..]). 2. Enumerate split points i, j. 3. Count when (len(nums2) >= len(nums1) and z[0][i+1] >= len(nums1)) or z[i+1][j+1] >= len(nums2).
 * Dry Run: nums = [1,1,1,1]. Many splits work because every prefix matches. z[0][1]=3, etc.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */

var beautifulSplits = function (nums) {
  const n = nums.length;
  const zByStart = [];
  for (let startIndex = 0; startIndex < n; startIndex++) {
    zByStart.push(zFunction(nums, startIndex));
  }

  let beautifulCount = 0;
  for (let firstEnd = 0; firstEnd < n - 2; firstEnd++) {
    for (let secondEnd = firstEnd + 1; secondEnd < n - 1; secondEnd++) {
      const nums1Length = firstEnd + 1;
      const nums2Length = secondEnd - firstEnd;
      if (
        (nums2Length >= nums1Length &&
          zByStart[0][firstEnd + 1] >= nums1Length) ||
        zByStart[firstEnd + 1][secondEnd + 1] >= nums2Length
      ) {
        beautifulCount++;
      }
    }
  }
  return beautifulCount;
};

function zFunction(nums, startIndex) {
  const n = nums.length;
  const zValues = new Array(n).fill(0);
  let windowLeft = 0;
  let windowRight = 0;
  for (let index = 1 + startIndex; index < n; index++) {
    if (index < windowRight) {
      zValues[index] = Math.min(
        windowRight - index,
        zValues[index - windowLeft + startIndex]
      );
    }
    while (
      index + zValues[index] < n &&
      nums[zValues[index] + startIndex] === nums[index + zValues[index]]
    ) {
      zValues[index]++;
    }
    if (index + zValues[index] > windowRight) {
      windowLeft = index;
      windowRight = index + zValues[index];
    }
  }
  return zValues;
}
