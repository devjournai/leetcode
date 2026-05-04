/**
 * Minimum Xor Sum Of Two Arrays
 * Time Complexity: O(2^N * N)
 * Space Complexity: O(2^N)
 */
var minimumXORSum = function (nums1, nums2) {
  const arraySize = nums1.length;
  const dpMemo = new Array(1 << arraySize).fill(Infinity);
  dpMemo[0] = 0;

  let currentMaskValue = 0;
  while (currentMaskValue < 1 << arraySize) {
    let setBitsCount = 0;
    let temporaryMask = currentMaskValue;
    while (temporaryMask > 0) {
      temporaryMask &= temporaryMask - 1;
      setBitsCount++;
    }

    let elementLoopIndex = 0;
    while (elementLoopIndex < arraySize) {
      if (!(currentMaskValue & (1 << elementLoopIndex))) {
        const updatedMaskValue = currentMaskValue | (1 << elementLoopIndex);
        dpMemo[updatedMaskValue] = Math.min(
          dpMemo[updatedMaskValue],
          dpMemo[currentMaskValue] +
            (nums1[setBitsCount] ^ nums2[elementLoopIndex]),
        );
      }
      elementLoopIndex++;
    }
    currentMaskValue++;
  }

  return dpMemo[(1 << arraySize) - 1];
};
