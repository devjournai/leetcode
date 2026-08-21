/**
 * The k-th Lexicographical String of All Happy Strings of Length n
 * Intuition: Happy strings use a,b,c with no two consecutive equal. DFS in lex order and decrement k at each complete string until k hits 0.
 * Approach: 1. Recurse appending a/b/c that differ from the last character. 2. When length is n, decrement k; if k becomes 0, store that string and stop. 3. Return the stored string (empty if fewer than k happy strings).
 * Dry Run: n = 1, k = 3.
 *   - "a" (k=2), "b" (k=1), "c" (k=0). Return "c".
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
        partialString + nextAvailableChar
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
