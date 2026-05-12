/**
 * Widest Pair Of Indices With Equal Range Sum
 * Intuition: The problem asks for the widest range (i, j) where the sum of elements in `nums1` from `i` to `j` equals the sum of elements in `nums2` from `i` to `j`. This condition can be rephrased as the sum of differences `(nums1[k] - nums2[k])` from `k=i` to `j` must be zero. By calculating a running prefix sum of these differences, we are looking for two indices `p` and `q` such that `prefixSumDiff[q] - prefixSumDiff[p-1] == 0`, which simplifies to `prefixSumDiff[q] == prefixSumDiff[p-1]`. To maximize `q - (p-1)`, we need to find the earliest index `p-1` for a given prefix sum difference `value` and the latest index `q` for the same `value`.
 * Approach: 1. Initialize a `Map` to store the first encountered index for each prefix difference, starting with `(0, -1)` to handle cases where a prefix difference of zero occurs from index 0. 2. Initialize a `currentPrefixDifference` to 0 and a `maximumWidth` to 0. 3. Iterate through the arrays from `currentIndex = 0` to `arrayLength - 1`. 4. In each iteration, update `currentPrefixDifference` by adding `nums1[currentIndex] - nums2[currentIndex]`. 5. Check if `currentPrefixDifference` already exists as a key in the `Map`. 6. If it exists, calculate the `calculatedWidth` as `currentIndex - prefixDiffToIndexMap.get(currentPrefixDifference)` and update `maximumWidth` with the maximum of `maximumWidth` and `calculatedWidth`. 7. If `currentPrefixDifference` does not exist in the `Map`, store it with its `currentIndex` as the value, ensuring we record the *first* occurrence. 8. After the loop completes, return `maximumWidth`.
 * Dry Run: nums1 = [1, 0, 1], nums2 = [0, 1, 0]
 * arrayLength = 3
 * prefixDiffToIndexMap = Map { 0 => -1 }
 * currentPrefixDifference = 0
 * maximumWidth = 0
 *
 * currentIndex = 0:
 * currentPrefixDifference = 0 + (nums1[0] - nums2[0]) = 0 + (1 - 0) = 1
 * prefixDiffToIndexMap.has(1) is false.
 * prefixDiffToIndexMap.set(1, 0) -> Map { 0 => -1, 1 => 0 }
 *
 * currentIndex = 1:
 * currentPrefixDifference = 1 + (nums1[1] - nums2[1]) = 1 + (0 - 1) = 0
 * prefixDiffToIndexMap.has(0) is true.
 * previousIndex = prefixDiffToIndexMap.get(0) = -1
 * calculatedWidth = 1 - (-1) = 2
 * maximumWidth = Math.max(0, 2) = 2
 *
 * currentIndex = 2:
 * currentPrefixDifference = 0 + (nums1[2] - nums2[2]) = 0 + (1 - 0) = 1
 * prefixDiffToIndexMap.has(1) is true.
 * previousIndex = prefixDiffToIndexMap.get(1) = 0
 * calculatedWidth = 2 - 0 = 2
 * maximumWidth = Math.max(2, 2) = 2
 *
 * Loop finishes.
 * Return maximumWidth = 2.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var widestPairOfIndices = function (nums1, nums2) {
  const arrayLength = nums1.length;
  const prefixDiffToIndexMap = new Map();
  prefixDiffToIndexMap.set(0, -1);

  let currentPrefixDifference = 0;
  let maximumWidth = 0;

  for (let currentIndex = 0; currentIndex < arrayLength; currentIndex++) {
    currentPrefixDifference += nums1[currentIndex] - nums2[currentIndex];

    if (prefixDiffToIndexMap.has(currentPrefixDifference)) {
      const calculatedWidth =
        currentIndex - prefixDiffToIndexMap.get(currentPrefixDifference);
      maximumWidth = Math.max(maximumWidth, calculatedWidth);
    } else {
      prefixDiffToIndexMap.set(currentPrefixDifference, currentIndex);
    }
  }

  return maximumWidth;
};
