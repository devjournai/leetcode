/**
 * Xor Queries Of A Subarray
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var xorQueries = function (arr, queries) {
  const arrLength = arr.length;
  const prefixXorSums = new Array(arrLength + 1);
  prefixXorSums[0] = 0;

  for (let indexCounter = 0; indexCounter < arrLength; indexCounter++) {
    const currentArrayElement = arr[indexCounter];
    prefixXorSums[indexCounter + 1] =
      prefixXorSums[indexCounter] ^ currentArrayElement;
  }

  const totalQueriesCount = queries.length;
  const computedResults = new Array(totalQueriesCount);

  for (
    let queryIterator = 0;
    queryIterator < totalQueriesCount;
    queryIterator++
  ) {
    const currentQueryPair = queries[queryIterator];
    const queryLeftBoundary = currentQueryPair[0];
    const queryRightBoundary = currentQueryPair[1];
    const queryXorSum =
      prefixXorSums[queryRightBoundary + 1] ^ prefixXorSums[queryLeftBoundary];
    computedResults[queryIterator] = queryXorSum;
  }

  return computedResults;
};
