/**
 * String Compression II
 * Time Complexity: O(N^2 * K)
 * Space Complexity: O(N * K)
 */
var getLengthOfOptimalCompression = function (s, k) {
  const stringLength = s.length;
  const maxPossibleValue = stringLength + 1;

  const memo = new Array(stringLength + 1)
    .fill()
    .map(() => new Array(k + 1).fill(maxPossibleValue));

  memo[0][0] = 0;

  const computeRunLength = (runLengthCount) => {
    if (runLengthCount === 0) return 0;
    if (runLengthCount === 1) return 1;
    if (runLengthCount < 10) return 2;
    if (runLengthCount < 100) return 3;
    return 4;
  };

  for (
    let currentStringIndex = 1;
    currentStringIndex <= stringLength;
    currentStringIndex++
  ) {
    for (
      let currentDeletionsAllowed = 0;
      currentDeletionsAllowed <= k;
      currentDeletionsAllowed++
    ) {
      let matchingCharacterCount = 0;
      let nonMatchingDeletions = 0;

      for (
        let backwardScanIndex = currentStringIndex;
        backwardScanIndex >= 1;
        backwardScanIndex--
      ) {
        if (s[backwardScanIndex - 1] === s[currentStringIndex - 1]) {
          matchingCharacterCount++;
        } else {
          nonMatchingDeletions++;
        }

        if (currentDeletionsAllowed - nonMatchingDeletions >= 0) {
          memo[currentStringIndex][currentDeletionsAllowed] = Math.min(
            memo[currentStringIndex][currentDeletionsAllowed],
            memo[backwardScanIndex - 1][
              currentDeletionsAllowed - nonMatchingDeletions
            ] + computeRunLength(matchingCharacterCount),
          );
        }
      }

      if (currentDeletionsAllowed > 0) {
        memo[currentStringIndex][currentDeletionsAllowed] = Math.min(
          memo[currentStringIndex][currentDeletionsAllowed],
          memo[currentStringIndex - 1][currentDeletionsAllowed - 1],
        );
      }
    }
  }

  return memo[stringLength][k];
};
