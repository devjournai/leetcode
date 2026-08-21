/**
 * Minimum Xor Sum Of Two Arrays
 * Intuition: Assign each nums2 index to a unique nums1 slot (permutation). DP on a bitmask of used nums2 indices; popcount is which nums1 element is next.
 * Approach: 1. dpMemo[0]=0, rest Infinity. 2. For each mask, try unused bit j: dp[mask|1<<j] = min(..., dp[mask] + (nums1[popcount] ^ nums2[j])). 3. Return dp[full mask].
 * Dry Run: nums1=[1,2], nums2=[2,3]. Pairings 1^2+2^3=0+1=1 vs 1^3+2^2=2+0=2. Return 1.
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
            (nums1[setBitsCount] ^ nums2[elementLoopIndex])
        );
      }
      elementLoopIndex++;
    }
    currentMaskValue++;
  }

  return dpMemo[(1 << arraySize) - 1];
};
