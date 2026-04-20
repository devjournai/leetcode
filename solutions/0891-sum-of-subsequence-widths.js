/**
 * Sum Of Subsequence Widths
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
