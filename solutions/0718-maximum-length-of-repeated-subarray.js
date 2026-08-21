/**
 * Maximum Length Of Repeated Subarray
 * Intuition: `dpArray[i][j]` is the common suffix length of `nums1[:i]` and `nums2[:j]`. Equal values extend the previous diagonal; mismatches stay 0. The answer is the global max cell.
 * Approach: 1. Allocate (lengthOne+1)×(lengthTwo+1) zeros. 2. For each pair of indices, if `nums1[indexA-1] === nums2[indexB-1]`, set dp to diagonal+1 and update `maximumMatchLength`. Return that max.
 * Dry Run: [1,2,3,2,1] and [3,2,1,4,7]. The run 3,2,1 yields dp 3; answer 3.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var findLength = function (nums1, nums2) {
  const lengthOne = nums1.length;
  const lengthTwo = nums2.length;

  const dpArray = new Array(lengthOne + 1).fill(null).map(() => {
    return new Array(lengthTwo + 1).fill(0);
  });

  let maximumMatchLength = 0;

  for (let indexA = 1; indexA <= lengthOne; indexA++) {
    for (let indexB = 1; indexB <= lengthTwo; indexB++) {
      if (nums1[indexA - 1] === nums2[indexB - 1]) {
        dpArray[indexA][indexB] = dpArray[indexA - 1][indexB - 1] + 1;
        maximumMatchLength = Math.max(
          maximumMatchLength,
          dpArray[indexA][indexB]
        );
      }
    }
  }

  return maximumMatchLength;
};
