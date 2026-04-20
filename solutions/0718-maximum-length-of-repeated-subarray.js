/**
 * Maximum Length Of Repeated Subarray
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
          dpArray[indexA][indexB],
        );
      }
    }
  }

  return maximumMatchLength;
};
