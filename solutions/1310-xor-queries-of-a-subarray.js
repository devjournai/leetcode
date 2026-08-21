/**
 * Xor Queries Of A Subarray
 * Intuition: Prefix XOR answers any range: xor(L..R) = prefix[R+1] ^ prefix[L] because XOR is its own inverse.
 * Approach: 1. Build prefixXorSums[0]=0 and prefix[i+1]=prefix[i]^arr[i]. 2. For each query [L,R] store prefix[R+1]^prefix[L]. 3. Return the answers.
 * Dry Run: arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]. Prefix [0,1,2,6,14]. Answers 1^3=2, 3^4=7, 1^3^4^8=14, 8.
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
