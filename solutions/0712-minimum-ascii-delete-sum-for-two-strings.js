/**
 * Minimum Ascii Delete Sum For Two Strings
 * Intuition: `minimumAsciiCosts[i][j]` is the cheapest ASCII delete cost to equalize the first `i` chars of the first string and the first `j` of the second. Matching chars cost nothing extra; otherwise delete one of the two current chars.
 * Approach: 1. Build a (lengthFirst+1)×(lengthSecond+1) table. 2. Fill row 0 / column 0 with prefix ASCII sums (delete everything). 3. If chars match, copy the diagonal. 4. Else take min of deleting the first-string char vs the second-string char. Return the bottom-right cell.
 * Dry Run: "sea", "eat". Match 'e' and 'a'; delete 's' (115) and 't' (116). Result 231.
 * Time Complexity: O(m*n)
 * Space Complexity: O(m*n)
 */
var minimumDeleteSum = function (firstStringInput, secondStringInput) {
  const lengthFirst = firstStringInput.length;
  const lengthSecond = secondStringInput.length;

  const minimumAsciiCosts = new Array(lengthFirst + 1).fill(null).map(() => {
    return new Array(lengthSecond + 1).fill(0);
  });

  let currentStringOnePosition = 1;
  while (currentStringOnePosition <= lengthFirst) {
    minimumAsciiCosts[currentStringOnePosition][0] =
      minimumAsciiCosts[currentStringOnePosition - 1][0] +
      firstStringInput.charCodeAt(currentStringOnePosition - 1);
    currentStringOnePosition++;
  }

  let currentStringTwoPosition = 1;
  while (currentStringTwoPosition <= lengthSecond) {
    minimumAsciiCosts[0][currentStringTwoPosition] =
      minimumAsciiCosts[0][currentStringTwoPosition - 1] +
      secondStringInput.charCodeAt(currentStringTwoPosition - 1);
    currentStringTwoPosition++;
  }

  for (let primaryIndex = 1; primaryIndex <= lengthFirst; primaryIndex++) {
    for (
      let secondaryIndex = 1;
      secondaryIndex <= lengthSecond;
      secondaryIndex++
    ) {
      if (
        firstStringInput[primaryIndex - 1] ===
        secondStringInput[secondaryIndex - 1]
      ) {
        minimumAsciiCosts[primaryIndex][secondaryIndex] =
          minimumAsciiCosts[primaryIndex - 1][secondaryIndex - 1];
      } else {
        const asciiValueCharOne = firstStringInput.charCodeAt(primaryIndex - 1);
        const asciiValueCharTwo = secondStringInput.charCodeAt(
          secondaryIndex - 1
        );

        const deleteCharOneCost =
          minimumAsciiCosts[primaryIndex - 1][secondaryIndex] +
          asciiValueCharOne;
        const deleteCharTwoCost =
          minimumAsciiCosts[primaryIndex][secondaryIndex - 1] +
          asciiValueCharTwo;

        minimumAsciiCosts[primaryIndex][secondaryIndex] = Math.min(
          deleteCharOneCost,
          deleteCharTwoCost
        );
      }
    }
  }

  return minimumAsciiCosts[lengthFirst][lengthSecond];
};
