/**
 * Queries On A Permutation With Key
 * Time Complexity: O(queriesLength * m)
 * Space Complexity: O(m + queriesLength)
 */
var processQueries = function (queries, m) {
  const currentPermutationList = Array.from(
    { length: m },
    (_, initialValueIndex) => initialValueIndex + 1,
  );
  const collectedResults = [];
  const queriesLength = queries.length;

  for (
    let queryProcessingIndex = 0;
    queryProcessingIndex < queriesLength;
    queryProcessingIndex++
  ) {
    const currentQuery = queries[queryProcessingIndex];
    let foundElementPosition = -1;

    for (
      let permutationIterationIndex = 0;
      permutationIterationIndex < currentPermutationList.length;
      permutationIterationIndex++
    ) {
      if (currentPermutationList[permutationIterationIndex] === currentQuery) {
        foundElementPosition = permutationIterationIndex;
        break;
      }
    }

    collectedResults.push(foundElementPosition);

    const removedElement = currentPermutationList.splice(
      foundElementPosition,
      1,
    );
    currentPermutationList.unshift(removedElement[0]);
  }

  return collectedResults;
};
