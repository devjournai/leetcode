/**
 * Shortest Way To Form String
 * Intuition: Greedily consume a subsequence of source as far as possible through target, then start a new pass. Impossible if a target char never appears in source.
 * Approach: 1. Build a set of source chars; if any target char is missing, return -1. 2. Two pointers: scan source while matching target. 3. Each full source pass that advances target counts as 1. 4. If a pass matches nothing, -1.
 * Dry Run: source = "abc", target = "abcbc".
 *   - First pass takes "abc", second takes "bc". Count 2.
 * Time Complexity: O(source.length * target.length)
 * Space Complexity: O(source.length)
 */
var shortestWay = function (sourceString, targetString) {
  const sourceCharacterSet = new Set();
  for (const characterItem of sourceString) {
    sourceCharacterSet.add(characterItem);
  }

  for (const targetCharToCheck of targetString) {
    if (!sourceCharacterSet.has(targetCharToCheck)) {
      return -1;
    }
  }

  let subsequenceCount = 0;
  let targetPosition = 0;

  while (targetPosition < targetString.length) {
    let currentSourcePosition = 0;
    const startingTargetPositionForMatch = targetPosition;

    while (
      currentSourcePosition < sourceString.length &&
      targetPosition < targetString.length
    ) {
      if (
        sourceString[currentSourcePosition] === targetString[targetPosition]
      ) {
        targetPosition++;
      }
      currentSourcePosition++;
    }

    if (targetPosition === startingTargetPositionForMatch) {
      return -1;
    }

    subsequenceCount++;
  }

  return subsequenceCount;
};
