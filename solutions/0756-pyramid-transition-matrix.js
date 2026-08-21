/**
 * Pyramid Transition Matrix
 * Intuition: Each allowed triple `ABC` means `C` may sit on pair `AB`. Recursively build the next row pair-by-pair; a pyramid exists if some coloring reduces to a single block.
 * Approach: 1. Map each two-letter base in `allowed` to a string of possible `topBlock`s. 2. `recursivePyramidCheck(currentRowFormation, currentNextRow)`: if the row length is 1, return true; if `currentNextRow` is one shorter than the row, recurse on that next row. 3. Otherwise take the pair at `currentNextRow.length`; if it has no options, fail. 4. Try each `candidateTopBlock` and return true on the first success.
 * Dry Run: bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"].
 *   - Pair "BC" → "C"; next row starts "C". Pair "CD" → "E"; next row "CE".
 *   - Recurse on "CE" → "A" (from "CEA") → single block. Return true.
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
      (validPatternsMap.get(baseBlocks) || "") + topBlock
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
      currentPairIndex + 2
    );
    const nextLevelOptions = validPatternsMap.get(subSegment);

    if (!nextLevelOptions) {
      return false;
    }

    for (const candidateTopBlock of nextLevelOptions) {
      if (
        recursivePyramidCheck(
          currentRowFormation,
          currentNextRow + candidateTopBlock
        )
      ) {
        return true;
      }
    }

    return false;
  }

  return recursivePyramidCheck(bottom);
};
