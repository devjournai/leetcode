/**
 * Queries On A Permutation With Key
 * Intuition: Maintain P = [1..m]. Each query finds the index of the value, records it, then moves that value to the front.
 * Approach: 1. Build the permutation list. 2. For each query, linear-search its index, push the index to the answer, splice it out and unshift to the front.
 * Dry Run: queries = [3,1,2,1], m = 5.
 *   - P=[1,2,3,4,5], 3 at 2 → [3,1,2,4,5]; 1 at 1 → [1,3,2,4,5]; 2 at 2 → [2,1,3,4,5]; 1 at 1. Answer [2,1,2,1].
 * Time Complexity: O(queriesLength * m)
 * Space Complexity: O(m + queriesLength)
 */
var processQueries = function (queries, m) {
  const currentPermutationList = Array.from(
    { length: m },
    (_, initialValueIndex) => initialValueIndex + 1
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
      1
    );
    currentPermutationList.unshift(removedElement[0]);
  }

  return collectedResults;
};
