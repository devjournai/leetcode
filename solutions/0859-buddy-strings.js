/**
 * Buddy Strings
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var buddyStrings = function (s, goal) {
  const firstStringLength = s.length;
  const secondStringLength = goal.length;

  if (firstStringLength !== secondStringLength) {
    return false;
  }

  const mismatchPositions = [];
  const charFrequencyMap = new Map();
  let hasRepeatingChar = false;

  for (
    let traverseIndex = 0;
    traverseIndex < firstStringLength;
    ++traverseIndex
  ) {
    const charFromS = s[traverseIndex];
    const charFromGoal = goal[traverseIndex];

    if (charFromS !== charFromGoal) {
      mismatchPositions.push(traverseIndex);
    }

    if (mismatchPositions.length > 2) {
      return false;
    }

    const currentCharCount = (charFrequencyMap.get(charFromS) || 0) + 1;
    charFrequencyMap.set(charFromS, currentCharCount);
    if (currentCharCount > 1) {
      hasRepeatingChar = true;
    }
  }

  if (mismatchPositions.length === 0) {
    return hasRepeatingChar;
  }

  if (mismatchPositions.length === 2) {
    const firstMismatchIndex = mismatchPositions[0];
    const secondMismatchIndex = mismatchPositions[1];

    const sValAtFirst = s[firstMismatchIndex];
    const goalValAtFirst = goal[firstMismatchIndex];
    const sValAtSecond = s[secondMismatchIndex];
    const goalValAtSecond = goal[secondMismatchIndex];

    return sValAtFirst === goalValAtSecond && sValAtSecond === goalValAtFirst;
  }

  return false;
};
