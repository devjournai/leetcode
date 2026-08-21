/**
 * Minimum Total Cost To Make Arrays Unequal
 * Intuition: Identify conflicting positions. If a dominant value causes many conflicts, we might need to swap its instances with values from non-conflicting positions. The minimum cost comes from picking the lowest-indexed positions to participate in swaps.
 * Approach:
 * 1. Iterate through arrays to find all indices where `nums1[i] === nums2[i]`. Store these "conflict" indices and count frequencies of values at these indices.
 * 2. If no conflicts, return 0.
 * 3. Identify the "dominant value" that appears most frequently among the conflict positions.
 * 4. Calculate `additionalMovesRequired`: the minimum number of conflicts involving the dominant value that *cannot* be resolved by swapping with other conflicting elements. These require elements from non-conflicting positions. This is `max(0, 2 * maxCount - totalConflicts)`.
 * 5. Iterate through the arrays again to find "helper" indices. A helper index `j` must be non-conflicting (`nums1[j] !== nums2[j]`) and `nums1[j]`, `nums2[j]` should not be the dominant value. Collect `additionalMovesRequired` such indices.
 * 6. If not enough helper indices are found, return -1.
 * 7. Combine all conflict indices and all selected helper indices. Sort them by index value.
 * 8. The total minimum cost is the sum of all these sorted indices, as each must participate in at least one swap to resolve the condition.
 * Dry Run:
 * nums1 = [1, 2, 3], nums2 = [1, 4, 3]
 * 1. `arrayLength = 3`.
 *    `problematicIndices = []`. `valueFrequencies = Map()`.
 *    Loop (`initialIndex` from 0 to 2):
 *    - `initialIndex = 0`: `nums1[0](1) === nums2[0](1)`. `problematicIndices = [0]`. `valueFrequencies = {1: 1}`.
 *    - `initialIndex = 1`: `nums1[1](2) !== nums2[1](4)`. No change.
 *    - `initialIndex = 2`: `nums1[2](3) === nums2[2](3)`. `problematicIndices = [0, 2]`. `valueFrequencies = {1: 1, 3: 1}`.
 * 2. `problematicIndices.length` is 2, not 0.
 * 3. `majorValue = -1`, `peakCount = 0`.
 *    Loop (`valKey, countVal` over `valueFrequencies`):
 *    - `valKey = 1, countVal = 1`: `peakCount = 1`, `majorValue = 1`.
 *    - `valKey = 3, countVal = 1`: No update as `countVal` is not greater than `peakCount`.
 * 4. `currentConflicts = 2`. `additionalMovesRequired = Math.max(0, 2 * 1 - 2) = 0`.
 * 5. `nonConflictingCandidateIndices = []`.
 *    Loop (`secondIndex` from 0 to 2, while `additionalMovesRequired > 0`): `additionalMovesRequired` is 0, so loop doesn't execute.
 * 6. `additionalMovesRequired` (0) is not > 0.
 * 7. `allInvolvedIndices = [0, 2]`. Sort `allInvolvedIndices` -> `[0, 2]`.
 * 8. `totalMinimumCost = 0`.
 *    Loop (`finalIndexIterator` over `allInvolvedIndices`):
 *    - `finalIndexIterator = 0`: `totalMinimumCost += 0` (0).
 *    - `finalIndexIterator = 1`: `totalMinimumCost += 2` (2).
 *    Loop finishes.
 * Return `totalMinimumCost = 2`.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimumTotalCost = function (nums1, nums2) {
  const arrayLength = nums1.length;
  const problematicIndices = [];
  const valueFrequencies = new Map();

  for (let initialIndex = 0; initialIndex < arrayLength; initialIndex++) {
    if (nums1[initialIndex] === nums2[initialIndex]) {
      problematicIndices.push(initialIndex);
      valueFrequencies.set(
        nums1[initialIndex],
        (valueFrequencies.get(nums1[initialIndex]) || 0) + 1
      );
    }
  }

  if (problematicIndices.length === 0) {
    return 0;
  }

  let majorValue = -1;
  let peakCount = 0;

  for (const [valKey, countVal] of valueFrequencies) {
    if (countVal > peakCount) {
      peakCount = countVal;
      majorValue = valKey;
    }
  }

  const currentConflicts = problematicIndices.length;
  let additionalMovesRequired = Math.max(0, 2 * peakCount - currentConflicts);

  const nonConflictingCandidateIndices = [];
  let secondIndex = 0;
  while (secondIndex < arrayLength && additionalMovesRequired > 0) {
    if (
      nums1[secondIndex] !== nums2[secondIndex] &&
      nums1[secondIndex] !== majorValue &&
      nums2[secondIndex] !== majorValue
    ) {
      nonConflictingCandidateIndices.push(secondIndex);
      additionalMovesRequired--;
    }
    secondIndex++;
  }

  if (additionalMovesRequired > 0) {
    return -1;
  }

  const allInvolvedIndices = [
    ...problematicIndices,
    ...nonConflictingCandidateIndices,
  ];
  allInvolvedIndices.sort(
    (firstElement, secondElement) => firstElement - secondElement
  );

  let totalMinimumCost = 0;
  let finalIndexIterator = 0;

  if (allInvolvedIndices.length > 0) {
    // Handle empty array for do...while safety
    do {
      totalMinimumCost += allInvolvedIndices[finalIndexIterator];
      finalIndexIterator++;
    } while (finalIndexIterator < allInvolvedIndices.length);
  }

  return totalMinimumCost;
};
