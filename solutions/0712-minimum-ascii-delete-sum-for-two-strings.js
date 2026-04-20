/**
 * Minimum Ascii Delete Sum For Two Strings
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
          secondaryIndex - 1,
        );

        const deleteCharOneCost =
          minimumAsciiCosts[primaryIndex - 1][secondaryIndex] +
          asciiValueCharOne;
        const deleteCharTwoCost =
          minimumAsciiCosts[primaryIndex][secondaryIndex - 1] +
          asciiValueCharTwo;

        minimumAsciiCosts[primaryIndex][secondaryIndex] = Math.min(
          deleteCharOneCost,
          deleteCharTwoCost,
        );
      }
    }
  }

  return minimumAsciiCosts[lengthFirst][lengthSecond];
};
