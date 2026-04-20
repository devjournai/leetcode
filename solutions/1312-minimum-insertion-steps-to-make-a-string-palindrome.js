/**
 * Minimum Insertion Steps To Make A String Palindrome
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var minInsertions = function (s) {
  const stringSize = s.length;
  const dpTable = new Array(stringSize)
    .fill(0)
    .map(() => new Array(stringSize).fill(0));

  for (
    let initialPosition = stringSize - 2;
    initialPosition >= 0;
    initialPosition--
  ) {
    for (
      let finalPosition = initialPosition + 1;
      finalPosition < stringSize;
      finalPosition++
    ) {
      if (s[initialPosition] === s[finalPosition]) {
        dpTable[initialPosition][finalPosition] =
          dpTable[initialPosition + 1][finalPosition - 1];
      } else {
        dpTable[initialPosition][finalPosition] =
          Math.min(
            dpTable[initialPosition + 1][finalPosition],
            dpTable[initialPosition][finalPosition - 1],
          ) + 1;
      }
    }
  }

  return dpTable[0][stringSize - 1];
};
