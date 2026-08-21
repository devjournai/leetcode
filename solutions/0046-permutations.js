/**
 * Permutations
 * Intuition: A permutation is built by choosing unused numbers one at a time. When none remain, the current sequence is a complete permutation.
 * Approach: 1. Recurse with the sequence so far and the leftover numbers. 2. If leftovers are empty, push the sequence. 3. Otherwise, for each leftover index, append that number and recurse on leftovers with that index removed.
 * Dry Run: nums = [1, 2, 3].
 *   - Pick 1, leftovers [2, 3] → pick 2 then 3 → [1, 2, 3]; pick 3 then 2 → [1, 3, 2].
 *   - Similarly start with 2 and 3. Six permutations total.
 * Time Complexity: O(N * N!)
 * Space Complexity: O(N * N!)
 */
var permute = function (nums) {
  const collectedPermutations = [];

  const generateAllPerms = (currentSequence, remainingNumbers) => {
    if (remainingNumbers.length === 0) {
      collectedPermutations.push(currentSequence);
      return;
    }

    for (
      let selectionIdx = 0;
      selectionIdx < remainingNumbers.length;
      selectionIdx++
    ) {
      const pickedNumber = remainingNumbers[selectionIdx];
      const nextSequence = [...currentSequence, pickedNumber];

      const leftPart = remainingNumbers.slice(0, selectionIdx);
      const rightPart = remainingNumbers.slice(selectionIdx + 1);
      const nextRemainingNumbers = [...leftPart, ...rightPart];

      generateAllPerms(nextSequence, nextRemainingNumbers);
    }
  };

  generateAllPerms([], nums);

  return collectedPermutations;
};
