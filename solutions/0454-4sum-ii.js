/**
 * 4sum II
 * Time Complexity: O(n^2)
 * Space Complexity: O(n^2)
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
  const sumFrequencies = new Map();

  for (const valueOne of nums1) {
    for (const valueTwo of nums2) {
      const currentPairSum = valueOne + valueTwo;
      sumFrequencies.set(
        currentPairSum,
        (sumFrequencies.get(currentPairSum) || 0) + 1,
      );
    }
  }

  let finalCount = 0;
  const lengthOfArrays = nums3.length;

  for (let indexThree = 0; indexThree < lengthOfArrays; indexThree++) {
    const valueThree = nums3[indexThree];
    for (let indexFour = 0; indexFour < lengthOfArrays; indexFour++) {
      const valueFour = nums4[indexFour];
      const sumOfOtherPair = valueThree + valueFour;
      const targetComplement = -sumOfOtherPair;

      finalCount += sumFrequencies.get(targetComplement) || 0;
    }
  }

  return finalCount;
};
