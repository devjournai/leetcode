/**
 * The k-th Lexicographical String of All Happy Strings of Length n
 * Time Complexity: O(3 * 2^n * n)
 * Space Complexity: O(n)
 */
var getHappyString = function (n, k) {
  const characterChoices = ["a", "b", "c"];
  let finalFoundString = "";
  let currentRank = k;

  function generateAndSearch(partialString) {
    const lengthMatch = partialString.length === n;
    if (lengthMatch) {
      currentRank--;
      if (currentRank === 0) {
        finalFoundString = partialString;
        return true;
      }
      return false;
    }

    for (
      let indexForNextChar = 0;
      indexForNextChar < characterChoices.length;
      indexForNextChar++
    ) {
      const nextAvailableChar = characterChoices[indexForNextChar];
      const previousCharInPath = partialString[partialString.length - 1];

      if (
        partialString.length > 0 &&
        nextAvailableChar === previousCharInPath
      ) {
        continue;
      }

      const recursiveSuccess = generateAndSearch(
        partialString + nextAvailableChar,
      );
      if (recursiveSuccess) {
        return true;
      }
    }
    return false;
  }

  generateAndSearch("");
  return finalFoundString;
};
