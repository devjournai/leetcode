/**
 * Shortest Way To Form String
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
