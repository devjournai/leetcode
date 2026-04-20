/**
 * Distinct Subsequences II
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var distinctSubseqII = function (s) {
  const moduloValue = 1e9 + 7;
  const subsequenceCounts = new Array(s.length + 1).fill(0);
  subsequenceCounts[0] = 1;

  const lastSeenPosition = new Array(26).fill(-1);

  for (
    let currentCharacterIndex = 0;
    currentCharacterIndex < s.length;
    currentCharacterIndex++
  ) {
    const alphabetMapping = s.charCodeAt(currentCharacterIndex) - 97;

    let currentSubsequenceTotal =
      (subsequenceCounts[currentCharacterIndex] * 2) % moduloValue;

    if (lastSeenPosition[alphabetMapping] !== -1) {
      currentSubsequenceTotal =
        (currentSubsequenceTotal -
          subsequenceCounts[lastSeenPosition[alphabetMapping]] +
          moduloValue) %
        moduloValue;
    }

    subsequenceCounts[currentCharacterIndex + 1] = currentSubsequenceTotal;
    lastSeenPosition[alphabetMapping] = currentCharacterIndex;
  }
  const resultNonEmpty =
    (subsequenceCounts[s.length] - 1 + moduloValue) % moduloValue;

  return resultNonEmpty;
};
