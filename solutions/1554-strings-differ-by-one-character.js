/**
 * Strings Differ By One Character
 * Intuition: Two strings are almost equal if Hamming distance is exactly 1.
 * Approach: 1. Compare every pair. 2. Count diffs, abort if >1. 3. Return true if exactly 1.
 * Dry Run: dict = ["abcd","acbd","aacd"].
 *   - "abcd" vs "aacd" differ once → true.
 * Time Complexity: O(N^2 * M)
 * Space Complexity: O(1)
 */
var differByOne = function (dict) {
  const numberOfStrings = dict.length;
  const stringLength = dict[0].length;

  for (
    let currentStringIndex = 0;
    currentStringIndex < numberOfStrings;
    currentStringIndex++
  ) {
    const primaryString = dict[currentStringIndex];

    for (
      let nextStringIndex = currentStringIndex + 1;
      nextStringIndex < numberOfStrings;
      nextStringIndex++
    ) {
      const secondaryString = dict[nextStringIndex];
      let differingCharacters = 0;

      for (
        let characterPosition = 0;
        characterPosition < stringLength;
        characterPosition++
      ) {
        if (
          primaryString[characterPosition] !==
          secondaryString[characterPosition]
        ) {
          differingCharacters++;
          if (differingCharacters > 1) {
            break;
          }
        }
      }

      if (differingCharacters === 1) {
        return true;
      }
    }
  }

  return false;
};
