/**
 * Minimum Equal Sum Of Two Arrays After Replacing Zeros
 * Intuition: The minimum sum an array can achieve is its current sum plus the count of zeros (each zero replaced by 1). To equalize sums, both arrays must reach at least the maximum of their minimum possible sums. If an array has no zeros, its sum is fixed. This fixed sum dictates an upper bound for the other array's minimum sum.
 * Approach: 1. Iterate through the first array to calculate its current sum and count of zeros. 2. Iterate through the second array to calculate its current sum and count of zeros. 3. Determine the minimum possible sum for each array by adding its current sum to its zero count. 4. Check for impossibility: if one array has no zeros and its fixed sum is less than the minimum possible sum of the other array, it's impossible. 5. Otherwise, the minimum equal sum is the maximum of the two minimum possible sums.
 * Dry Run: nums1 = [1, 0, 2], nums2 = [0, 0, 3]
 *   1. Initialize first array processing variables:
 *      firstArraySum = 0
 *      firstArrayZeros = 0
 *   2. Iterate nums1:
 *      num = 1: firstArraySum = 1
 *      num = 0: firstArraySum = 1, firstArrayZeros = 1
 *      num = 2: firstArraySum = 3
 *      After loop: firstArraySum = 3, firstArrayZeros = 1
 *   3. Initialize second array processing variables:
 *      secondArraySum = 0
 *      secondArrayZeros = 0
 *   4. Iterate nums2:
 *      element = 0: secondArraySum = 0, secondArrayZeros = 1
 *      element = 0: secondArraySum = 0, secondArrayZeros = 2
 *      element = 3: secondArraySum = 3
 *      After loop: secondArraySum = 3, secondArrayZeros = 2
 *   5. Calculate minimum possible sums:
 *      minPotentialSumOne = firstArraySum + firstArrayZeros = 3 + 1 = 4
 *      minPotentialSumTwo = secondArraySum + secondArrayZeros = 3 + 2 = 5
 *   6. Impossibility check:
 *      (minPotentialSumOne > secondArraySum && secondArrayZeros === 0) OR (minPotentialSumTwo > firstArraySum && firstArrayZeros === 0)
 *      (4 > 3 && 2 === 0) OR (5 > 3 && 1 === 0)
 *      (false) OR (false) -> false. No impossibility.
 *   7. Return Math.max(minPotentialSumOne, minPotentialSumTwo) = Math.max(4, 5) = 5.
 * Time Complexity: O(N + M)
 * Space Complexity: O(1)
 */
var minSum = function (nums1, nums2) {
  let currentSumOne = 0;
  let zeroCountOne = 0;

  for (const numberValue of nums1) {
    currentSumOne += numberValue;
    if (numberValue === 0) {
      zeroCountOne++;
    }
  }

  let currentSumTwo = 0;
  let zeroCountTwo = 0;

  for (const arrayElement of nums2) {
    currentSumTwo += arrayElement;
    if (arrayElement === 0) {
      zeroCountTwo++;
    }
  }

  const minPossibleSumOne = currentSumOne + zeroCountOne;
  const minPossibleSumTwo = currentSumTwo + zeroCountTwo;

  if (minPossibleSumOne > minPossibleSumTwo && zeroCountTwo === 0) {
    return -1;
  }

  if (minPossibleSumTwo > minPossibleSumOne && zeroCountOne === 0) {
    return -1;
  }

  return Math.max(minPossibleSumOne, minPossibleSumTwo);
};
