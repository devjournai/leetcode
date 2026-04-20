/**
 * Count Unique Characters Of All Substrings Of A Given String
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var uniqueLetterString = function (s) {
  const stringLength = s.length;
  const charPositions = {};
  let totalUniqueSum = 0;

  for (
    let currentIteration = 0;
    currentIteration < stringLength;
    currentIteration++
  ) {
    const currentLetter = s[currentIteration];
    if (!charPositions[currentLetter]) {
      charPositions[currentLetter] = [-1, -1];
    }

    const [previousPreviousIndex, previousIndex] = charPositions[currentLetter];
    totalUniqueSum +=
      (currentIteration - previousIndex) *
      (previousIndex - previousPreviousIndex);
    charPositions[currentLetter] = [previousIndex, currentIteration];
  }

  for (const charKey of Object.keys(charPositions)) {
    const [secondPreviousIndex, lastKnownIndex] = charPositions[charKey];
    if (lastKnownIndex >= 0) {
      totalUniqueSum +=
        (stringLength - lastKnownIndex) *
        (lastKnownIndex - secondPreviousIndex);
    }
  }

  return totalUniqueSum;
};
