/**
 * Count Unique Characters Of All Substrings Of A Given String
 * Intuition: A character at index p is unique in a substring iff that substring includes p but not the previous or next same letter. Contribution is (p-prev)*(next-p).
 * Approach: 1. `charPositions[letter] = [prevPrev, prev]` starting [-1,-1]. 2. On each i, add `(i-prev)*(prev-prevPrev)` then slide to [prev, i]. 3. After the string, add `(n-last)*(last-secondLast)` for each letter.
 * Dry Run: s = "ABC". First occurrences add 0 in-loop; closing adds (n-last)*(last-(-1)): A 3, B 4, C 3 → 10.
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
