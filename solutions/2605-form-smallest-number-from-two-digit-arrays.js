/**
 * Form Smallest Number From Two Digit Arrays
 * Intuition: The smallest number can either be a single digit (if both arrays share it) or a two-digit number formed by combining the smallest digits from each array. We need to find the minimum among these possibilities.
 * Approach: 1. Convert the first array into a Set for efficient common digit lookup. 2. Iterate through the second array to find the smallest common digit, initializing it to a value outside the digit range (e.g., 10). 3. Find the smallest digit in the first array and the smallest digit in the second array. 4. Construct two potential two-digit numbers using these minimums (e.g., min1*10+min2 and min2*10+min1) and take the smaller one. 5. If a common digit was found, compare it with the smallest two-digit number. Otherwise, the smallest two-digit number is the answer.
 * Dry Run: nums1 = [4, 1, 3], nums2 = [5, 7, 2]
 *   1. firstArraySet = Set {1, 3, 4}
 *   2. smallestCommonFound = 10
 *   3. Iterate currentCandidate in nums2:
 *      - currentCandidate = 5: firstArraySet.has(5) is false.
 *      - currentCandidate = 7: firstArraySet.has(7) is false.
 *      - currentCandidate = 2: firstArraySet.has(2) is false.
 *      smallestCommonFound remains 10.
 *   4. minimumFromFirstArray = Math.min(4, 1, 3) = 1
 *   5. minimumFromSecondArray = Math.min(5, 7, 2) = 2
 *   6. numberFromFirstSmallest = 1 * 10 + 2 = 12
 *   7. numberFromSecondSmallest = 2 * 10 + 1 = 21
 *   8. overallMinimumTwoDigit = Math.min(12, 21) = 12
 *   9. smallestCommonFound (10) !== 10 is false.
 *   10. Return overallMinimumTwoDigit = 12.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var minNumber = function (nums1, nums2) {
  const firstArraySet = new Set(nums1);
  let smallestCommonFound = 10;

  for (const currentCandidate of nums2) {
    if (firstArraySet.has(currentCandidate)) {
      if (currentCandidate < smallestCommonFound) {
        smallestCommonFound = currentCandidate;
      }
    }
  }

  const minimumFromFirstArray = Math.min(...nums1);
  const minimumFromSecondArray = Math.min(...nums2);

  const numberFromFirstSmallest =
    minimumFromFirstArray * 10 + minimumFromSecondArray;
  const numberFromSecondSmallest =
    minimumFromSecondArray * 10 + minimumFromFirstArray;

  const overallMinimumTwoDigit = Math.min(
    numberFromFirstSmallest,
    numberFromSecondSmallest,
  );

  if (smallestCommonFound !== 10) {
    return Math.min(smallestCommonFound, overallMinimumTwoDigit);
  } else {
    return overallMinimumTwoDigit;
  }
};
