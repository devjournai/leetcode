/**
 * Delete Operation For Two Strings
 * Intuition: Equalize the strings by deletions only. Matching letters cost 0 and copy the diagonal; otherwise take one extra deletion from either word and keep the cheaper option. The answer is min deletions to empty both prefixes.
 * Approach: 1. Allocate `deletionMatrix` of size `(firstWordLength+1)×(secondWordLength+1)`. 2. Base: row 0 is `columnTraversal`, column 0 is `rowTraversal`. 3. If `word1[i-1]===word2[j-1]`, copy `deletionMatrix[i-1][j-1]`; else min of `deleteFromFirst` / `deleteFromSecond` plus 1. 4. Return `deletionMatrix[firstWordLength][secondWordLength]`.
 * Dry Run: word1="sea", word2="eat".
 *   - Match 'e','a' on overlapping prefixes. Bottom-right becomes 2 (delete 's' and 't'). Return 2.
 * Time Complexity: O(M*N)
 * Space Complexity: O(M*N)
 */
var minDistance = function (word1, word2) {
  const firstWordLength = word1.length;
  const secondWordLength = word2.length;

  const deletionMatrix = Array.from({ length: firstWordLength + 1 }, () =>
    new Array(secondWordLength + 1).fill(0)
  );

  for (
    let columnTraversal = 1;
    columnTraversal <= secondWordLength;
    columnTraversal++
  ) {
    deletionMatrix[0][columnTraversal] = columnTraversal;
  }

  for (let rowTraversal = 1; rowTraversal <= firstWordLength; rowTraversal++) {
    deletionMatrix[rowTraversal][0] = rowTraversal;
  }

  for (
    let currentFirstWordIndex = 1;
    currentFirstWordIndex <= firstWordLength;
    currentFirstWordIndex++
  ) {
    for (
      let currentSecondWordIndex = 1;
      currentSecondWordIndex <= secondWordLength;
      currentSecondWordIndex++
    ) {
      if (
        word1[currentFirstWordIndex - 1] === word2[currentSecondWordIndex - 1]
      ) {
        deletionMatrix[currentFirstWordIndex][currentSecondWordIndex] =
          deletionMatrix[currentFirstWordIndex - 1][currentSecondWordIndex - 1];
      } else {
        const deleteFromFirst =
          deletionMatrix[currentFirstWordIndex - 1][currentSecondWordIndex] + 1;
        const deleteFromSecond =
          deletionMatrix[currentFirstWordIndex][currentSecondWordIndex - 1] + 1;
        deletionMatrix[currentFirstWordIndex][currentSecondWordIndex] =
          Math.min(deleteFromFirst, deleteFromSecond);
      }
    }
  }

  return deletionMatrix[firstWordLength][secondWordLength];
};
