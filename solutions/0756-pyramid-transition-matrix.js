/**
 * Pyramid Transition Matrix
 * Time Complexity: O(A + N * K^N)
 * Space Complexity: O(K^3 + N^2)
 */
var pyramidTransition = function (bottom, allowed) {
  const validPatternsMap = new Map();
  for (const patternEntry of allowed) {
    const baseBlocks = patternEntry.substring(0, 2);
    const topBlock = patternEntry.charAt(2);
    validPatternsMap.set(
      baseBlocks,
      (validPatternsMap.get(baseBlocks) || "") + topBlock,
    );
  }

  function recursivePyramidCheck(currentRowFormation, currentNextRow = "") {
    if (currentRowFormation.length === 1) {
      return true;
    }

    if (currentNextRow.length === currentRowFormation.length - 1) {
      return recursivePyramidCheck(currentNextRow);
    }

    const currentPairIndex = currentNextRow.length;
    const subSegment = currentRowFormation.substring(
      currentPairIndex,
      currentPairIndex + 2,
    );
    const nextLevelOptions = validPatternsMap.get(subSegment);

    if (!nextLevelOptions) {
      return false;
    }

    for (const candidateTopBlock of nextLevelOptions) {
      if (
        recursivePyramidCheck(
          currentRowFormation,
          currentNextRow + candidateTopBlock,
        )
      ) {
        return true;
      }
    }

    return false;
  }

  return recursivePyramidCheck(bottom);
};
