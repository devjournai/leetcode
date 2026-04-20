/**
 * Permutations
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
