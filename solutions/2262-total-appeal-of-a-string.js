/**
 * Total Appeal Of A String
 * Intuition: The total appeal of all substrings can be calculated by summing the individual contributions of each character in the original string. For each character `s[i]` at index `i`, it contributes to the appeal of any substring `s[left...right]` if `left <= i <= right` and `s[i]` is a distinct character within that substring. We can count this contribution by considering `s[i]` as the *first* occurrence of its character in a given substring that starts after its previous occurrence. The number of such substrings is found by multiplying the count of valid starting positions (`left`) by the count of valid ending positions (`right`).
 * Approach: 1. Initialize `overallAppeal` to 0. 2. Create an array `lastCharacterPositions` of size 26, initialized with -1, to track the last seen index for each lowercase English letter. 3. Iterate through the input string `s` using an `iteratorIndex` from 0 to `s.length - 1`. 4. For each character `s[iteratorIndex]`, calculate its `charCodeOffset` (0 for 'a', 1 for 'b', etc.). 5. Determine the number of substrings `s[left...right]` for which `s[iteratorIndex]` is a distinct character by calculating `(iteratorIndex - lastCharacterPositions[charCodeOffset]) * (s.length - iteratorIndex)`. The first term `(iteratorIndex - lastCharacterPositions[charCodeOffset])` represents the number of valid start positions for `left` (from `lastCharacterPositions[charCodeOffset] + 1` up to `iteratorIndex`). The second term `(s.length - iteratorIndex)` represents the number of valid end positions for `right` (from `iteratorIndex` up to `s.length - 1`). 6. Add this `currentSegmentContribution` to `overallAppeal`. 7. Update `lastCharacterPositions[charCodeOffset]` to `iteratorIndex`. 8. After the loop completes, return `overallAppeal`.
 * Dry Run: s = "aba"
 * stringLength = 3
 * lastCharacterPositions = [-1, -1, ..., -1] (26 elements)
 * overallAppeal = 0
 *
 * iteratorIndex = 0 (s[0] = 'a'):
 * charCodeOffset = 0
 * currentSegmentContribution = (0 - lastCharacterPositions[0]) * (3 - 0) = (0 - (-1)) * 3 = 1 * 3 = 3
 * overallAppeal = 0 + 3 = 3
 * lastCharacterPositions[0] = 0
 * lastCharacterPositions becomes [0, -1, ..., -1]
 * iteratorIndex = 1 (s[1] = 'b'):
 * charCodeOffset = 1
 * currentSegmentContribution = (1 - lastCharacterPositions[1]) * (3 - 1) = (1 - (-1)) * 2 = 2 * 2 = 4
 * overallAppeal = 3 + 4 = 7
 * lastCharacterPositions[1] = 1
 * lastCharacterPositions becomes [0, 1, -1, ..., -1]
 * iteratorIndex = 2 (s[2] = 'a'):
 * charCodeOffset = 0
 * currentSegmentContribution = (2 - lastCharacterPositions[0]) * (3 - 2) = (2 - 0) * 1 = 2 * 1 = 2
 * overallAppeal = 7 + 2 = 9
 * lastCharacterPositions[0] = 2
 * lastCharacterPositions becomes [2, 1, -1, ..., -1]
 * Loop ends.
 * Return overallAppeal = 9.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var appealSum = function (s) {
  const stringLength = s.length;
  const lastCharacterPositions = new Array(26).fill(-1);
  let overallAppeal = 0;

  for (let iteratorIndex = 0; iteratorIndex < stringLength; iteratorIndex++) {
    const charCodeOffset = s.charCodeAt(iteratorIndex) - "a".charCodeAt(0);
    const currentSegmentContribution =
      (iteratorIndex - lastCharacterPositions[charCodeOffset]) *
      (stringLength - iteratorIndex);
    overallAppeal += currentSegmentContribution;
    lastCharacterPositions[charCodeOffset] = iteratorIndex;
  }

  return overallAppeal;
};
