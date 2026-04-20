/**
 * Remove All Adjacent Duplicates In String II
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
