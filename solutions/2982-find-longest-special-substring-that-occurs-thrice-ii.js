/**
 * Find Longest Special Substring That Occurs Thrice II
 * Intuition: Count all occurrences of special substrings by first breaking the input string into contiguous runs of identical characters. Then, for each character, iterate through possible substring lengths in decreasing order, summing up occurrences from its various runs until at least three occurrences are found.
 * Approach:
 * 1. Initialize a map `charToRunLengths` to store, for each character, a list of lengths of its consecutive runs in the input string `s`.
 * 2. Traverse the input string `s` once to identify all consecutive runs of identical characters. For each run, record its length and the character, and add the length to the corresponding character's list in `charToRunLengths`.
 * 3. Initialize `overallMaxLengthFound` to -1.
 * 4. Iterate through each character and its list of run lengths (`runLengthsList`) stored in `charToRunLengths`.
 *    a. Sort `runLengthsList` in descending order. This helps in an optimization later.
 *    b. Determine the maximum possible length for a special substring of this character, which is the length of its longest run.
 *    c. Iterate `candidateLength` from this maximum possible length down to 1.
 *       i. For each `candidateLength`, calculate `currentLengthTotalOccurrences` by summing up `(currentRunLength - candidateLength + 1)` for all `currentRunLength` in `runLengthsList` that are greater than or equal to `candidateLength`. Stop summing for a character's runs if `currentRunLength` becomes less than `candidateLength` (optimized by the descending sort).
 *       ii. If `currentLengthTotalOccurrences` is 3 or more, it means a special substring of length `candidateLength` occurs at least thrice. Update `overallMaxLengthFound` with `Math.max(overallMaxLengthFound, candidateLength)`. Then, `break` from this `candidateLength` loop, as we've found the longest `candidateLength` for this character.
 * 5. Return `overallMaxLengthFound`.
 * Dry Run: s = "aaaaabaaa"
 * 1. charToRunLengths = new Map()
 * 2. Traverse s:
 *    - "aaaaa": char 'a', length 5. charToRunLengths = { 'a': [5] }
 *    - "b": char 'b', length 1. charToRunLengths = { 'a': [5], 'b': [1] }
 *    - "aaa": char 'a', length 3. charToRunLengths = { 'a': [5, 3], 'b': [1] }
 * 3. overallMaxLengthFound = -1
 * 4. Process charToRunLengths:
 *    - For 'a': runLengthsList = [5, 3]
 *      a. Sort: [5, 3] (already sorted)
 *      b. maxCharacterRunLength = 5
 *      c. Iterate candidateLength from 5 down to 1:
 *         - candidateLength = 5: occurrences = 1. Not >= 3.
 *         - candidateLength = 4: occurrences = 2. Not >= 3.
 *         - candidateLength = 3: occurrences = 4. >= 3. overallMaxLengthFound = 3.
 * 5. Return overallMaxLengthFound = 3.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var maximumLength = function (s) {
  const charToRunLengths = new Map();
  const stringSize = s.length;
  let scanPointer = 0;

  while (scanPointer < stringSize) {
    const currentCharValue = s[scanPointer];
    let currentRunLength = 0;
    let innerScanPointer = scanPointer;

    while (
      innerScanPointer < stringSize &&
      s[innerScanPointer] === currentCharValue
    ) {
      currentRunLength++;
      innerScanPointer++;
    }

    if (!charToRunLengths.has(currentCharValue)) {
      charToRunLengths.set(currentCharValue, []);
    }
    charToRunLengths.get(currentCharValue).push(currentRunLength);
    scanPointer = innerScanPointer;
  }

  let overallMaxLengthFound = -1;

  for (const runLengthsList of charToRunLengths.values()) {
    runLengthsList.sort((lengthOne, lengthTwo) => lengthTwo - lengthOne);
    const maxCharacterRunLength = runLengthsList[0];

    for (
      let candidateSubstringLength = maxCharacterRunLength;
      candidateSubstringLength >= 1;
      candidateSubstringLength--
    ) {
      let currentLengthTotalOccurrences = 0;
      for (const singleCharacterRunLength of runLengthsList) {
        if (singleCharacterRunLength >= candidateSubstringLength) {
          currentLengthTotalOccurrences +=
            singleCharacterRunLength - candidateSubstringLength + 1;
        } else {
          break;
        }
      }
      if (currentLengthTotalOccurrences >= 3) {
        overallMaxLengthFound = Math.max(
          overallMaxLengthFound,
          candidateSubstringLength
        );
        break;
      }
    }
  }

  return overallMaxLengthFound;
};
