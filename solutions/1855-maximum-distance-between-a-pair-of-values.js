/**
 * Maximum Distance Between a Pair of Values
 * Intuition: Both arrays are nonincreasing. Two pointers: if nums1[i] > nums2[j], i is too large so advance i; else j−i is a valid distance and we try a larger j.
 * Approach: 1. Start `pointerOne`/`pointerTwo` at 0. 2. While both in range, either increment i or update `maximumDistanceValue` and increment j. 3. Return the max.
 * Dry Run: nums1=[55,30,5,4,2], nums2=[100,20,10,10,5].
 *   - 55≤100 → dist 0, j++. 55>20 and 30>20 → i to 2. Then 5≤20/10/5 while j grows → maximumDistanceValue=2.
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var maxDistance = function (nums1, nums2) {
  let maximumDistanceValue = 0;
  let pointerOne = 0;
  let pointerTwo = 0;

  while (pointerOne < nums1.length && pointerTwo < nums2.length) {
    if (nums1[pointerOne] > nums2[pointerTwo]) {
      pointerOne++;
    } else {
      maximumDistanceValue = Math.max(
        maximumDistanceValue,
        pointerTwo - pointerOne
      );
      pointerTwo++;
    }
  }

  return maximumDistanceValue;
};
