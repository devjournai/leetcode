/**
 * Sum Of Subsequence Widths
 * Intuition: After sorting, nums[i] is the max of 2^i subsequences that include it and some subset of the left, and the min of 2^(n-1-i) that include it and some subset of the right. Width contribution is nums[i] * (2^i - 2^(n-1-i)).
 * Approach: 1. Sort `nums`. 2. Precompute `powerOfTwo[i] = 2^i % (1e9+7)`. 3. For each index, add `nums[i] * (powerOfTwo[i] - powerOfTwo[n-1-i] + mod) % mod` into `totalWidthSum`. 4. Return the sum mod.
 * Dry Run: nums = [2, 1, 3].
 *   - Sorted [1,2,3]. Powers 1,2,4. Terms: 1*(1-4), 2*(2-2), 3*(4-1) → after mod: 1*(-3)+0+9 → 6.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var sumSubseqWidths = function (nums) {
  const moduloValue = 1e9 + 7;
  const arrayLength = nums.length;

  nums.sort((firstElement, secondElement) => firstElement - secondElement);

  const powerOfTwo = [1];
  let powerIterator = 1;
  while (powerIterator < arrayLength) {
    powerOfTwo[powerIterator] =
      (powerOfTwo[powerIterator - 1] * 2) % moduloValue;
    powerIterator++;
  }

  let totalWidthSum = 0;
  let currentElementIndex = 0;
  while (currentElementIndex < arrayLength) {
    const currentNumber = nums[currentElementIndex];
    const maxContributionFactor = powerOfTwo[currentElementIndex];
    const minContributionFactor =
      powerOfTwo[arrayLength - 1 - currentElementIndex];
    const termValue =
      (currentNumber *
        (maxContributionFactor - minContributionFactor + moduloValue)) %
      moduloValue;
    totalWidthSum = (totalWidthSum + termValue) % moduloValue;
    currentElementIndex++;
  }

  return totalWidthSum;
};
