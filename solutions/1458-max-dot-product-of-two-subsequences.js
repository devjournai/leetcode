/**
 * Max Dot Product Of Two Subsequences
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var maxDotProduct = function (nums1, nums2) {
  const firstArrayLength = nums1.length;
  const secondArrayLength = nums2.length;

  const memoizationTable = new Array(firstArrayLength + 1)
    .fill(null)
    .map(() => new Array(secondArrayLength + 1).fill(-Infinity));

  for (
    let firstArrayIndex = 1;
    firstArrayIndex <= firstArrayLength;
    firstArrayIndex++
  ) {
    for (
      let secondArrayIndex = 1;
      secondArrayIndex <= secondArrayLength;
      secondArrayIndex++
    ) {
      const currentElementProduct =
        nums1[firstArrayIndex - 1] * nums2[secondArrayIndex - 1];

      let maxIncludingCurrentPair = currentElementProduct;
      if (
        memoizationTable[firstArrayIndex - 1][secondArrayIndex - 1] !==
        -Infinity
      ) {
        maxIncludingCurrentPair = Math.max(
          maxIncludingCurrentPair,
          currentElementProduct +
            memoizationTable[firstArrayIndex - 1][secondArrayIndex - 1],
        );
      }

      const maxSkippingFirst =
        memoizationTable[firstArrayIndex - 1][secondArrayIndex];
      const maxSkippingSecond =
        memoizationTable[firstArrayIndex][secondArrayIndex - 1];

      memoizationTable[firstArrayIndex][secondArrayIndex] = Math.max(
        maxIncludingCurrentPair,
        maxSkippingFirst,
        maxSkippingSecond,
      );
    }
  }

  return memoizationTable[firstArrayLength][secondArrayLength];
};
