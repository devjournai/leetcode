/**
 * Longest Happy Prefix
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var longestPrefix = function (s) {
  const stringLengthIdentifier = s.length;

  if (stringLengthIdentifier === 0) {
    return "";
  }

  let currentLpsMatchLength = 0;
  const lpsValueStorage = new Array(stringLengthIdentifier).fill(0);

  for (
    let stringIterationIndex = 1;
    stringIterationIndex < stringLengthIdentifier;
    stringIterationIndex++
  ) {
    while (
      currentLpsMatchLength > 0 &&
      s[stringIterationIndex] !== s[currentLpsMatchLength]
    ) {
      currentLpsMatchLength = lpsValueStorage[currentLpsMatchLength - 1];
    }

    if (s[stringIterationIndex] === s[currentLpsMatchLength]) {
      currentLpsMatchLength++;
    }

    lpsValueStorage[stringIterationIndex] = currentLpsMatchLength;
  }

  const resultLength = lpsValueStorage[stringLengthIdentifier - 1];
  return s.slice(0, resultLength);
};
