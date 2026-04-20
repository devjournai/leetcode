/**
 * Delete Operation For Two Strings
 * Time Complexity: O(M*N)
 * Space Complexity: O(M*N)
 */
var minDistance = function (word1, word2) {
  const firstWordLength = word1.length;
  const secondWordLength = word2.length;

  const deletionMatrix = Array.from({ length: firstWordLength + 1 }, () =>
    new Array(secondWordLength + 1).fill(0),
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
