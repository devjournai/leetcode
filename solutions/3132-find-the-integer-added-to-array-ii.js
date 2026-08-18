/**
 * Find The Integer Added To Array II
 * Intuition: After removing two elements from nums1, remaining values plus x equal the sorted nums2. Try the three candidate x values: nums2[0]-nums1[0], nums2[0]-nums1[1], nums2[0]-nums1[2] (because two removals).
 * Approach: 1. Sort both arrays. 2. For each candidate x among the first three differences, check whether nums2 is a subsequence of nums1 mapped by +x with at most 2 skips. 3. Return the minimum valid x.
 * Dry Run:
 *   nums1 = [4,20,16,12,8], nums2 = [14,18,10] sorted 4,8,12,16,20 and 10,14,18. x=6 works after removing 4 and 20.
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var minimumAddedInteger = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);

  const canMatchWithDifference = (addedInteger) => {
    let skipCount = 0;
    let nums2Index = 0;
    for (
      let nums1Index = 0;
      nums1Index < nums1.length && nums2Index < nums2.length;
      nums1Index++
    ) {
      if (nums1[nums1Index] + addedInteger === nums2[nums2Index]) {
        nums2Index++;
      } else {
        skipCount++;
        if (skipCount > 2) {
          return false;
        }
      }
    }
    return nums2Index === nums2.length;
  };

  let minAddedInteger = Infinity;
  for (let startIndex = 0; startIndex < 3; startIndex++) {
    const addedInteger = nums2[0] - nums1[startIndex];
    if (canMatchWithDifference(addedInteger)) {
      minAddedInteger = Math.min(minAddedInteger, addedInteger);
    }
  }
  return minAddedInteger;
};
