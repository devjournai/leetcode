/**
 * Remove All Adjacent Duplicates In String II
 * Intuition: A stack of (char, run-length) collapses a run as soon as it reaches k, matching the repeated adjacent-deletion process.
 * Approach: 1. For each char, increment the top run if it matches, else push [char,1]. 2. Pop when the run hits k. 3. Rebuild the string from remaining runs.
 * Dry Run: s="deeedbbcccbdaa", k=3. "eee" pops, "ccc" pops, leftover "d"+"bb"+"bdaa" after further collapses → "aa".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeDuplicates = function (s, k) {
  const characterStorage = [];

  for (let stringIterator = 0; stringIterator < s.length; ++stringIterator) {
    const currentItem = s[stringIterator];
    const storageLength = characterStorage.length;

    if (
      storageLength > 0 &&
      characterStorage[storageLength - 1][0] === currentItem
    ) {
      characterStorage[storageLength - 1][1]++;
      if (characterStorage[storageLength - 1][1] === k) {
        characterStorage.pop();
      }
    } else {
      characterStorage.push([currentItem, 1]);
    }
  }

  const finalStringSegments = characterStorage.map(function (stackElement) {
    const elementChar = stackElement[0];
    const elementCount = stackElement[1];
    return elementChar.repeat(elementCount);
  });

  const finalOutput = finalStringSegments.join("");
  return finalOutput;
};
