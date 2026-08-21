/**
 * Palindrome Removal
 * Intuition: Removing a palindromic subarray costs one move. Interval DP stores the min moves for arr[i..j]; matching ends can be removed with the inner interval, and any split can combine two independent intervals.
 * Approach: 1. Allocate minMovesMatrix[n][n] as Infinity; set the diagonal to 1 (single elements). 2. Grow window length from 2 to n. 3. If arr[start] equals arr[end], a length-2 window costs 1, otherwise copy the inner interval cost. 4. For every splitIndex, take min of left+right subinterval costs. 5. Return minMovesMatrix[0][n-1].
 * Dry Run: arr = [1,2]
 *   dp[0][0]=1, dp[1][1]=1. Window length 2, start=0,end=1: equal? no. Split at 0: 1+1=2. Return 2.
 *   arr = [1,3,4,1,5]: matching 1s let [1,3,4,1] cost the same as [3,4], then +1 for 5; optimal is 3.
 * Time Complexity: O(N^3)
 * Space Complexity: O(N^2)
 */
var minimumMoves = function (arr) {
  const arrayLength = arr.length;
  const minMovesMatrix = new Array(arrayLength)
    .fill(0)
    .map(() => new Array(arrayLength).fill(Infinity));

  for (let diagonalIndex = 0; diagonalIndex < arrayLength; diagonalIndex++) {
    minMovesMatrix[diagonalIndex][diagonalIndex] = 1;
  }

  for (
    let currentWindowLength = 2;
    currentWindowLength <= arrayLength;
    currentWindowLength++
  ) {
    for (
      let startWindowIndex = 0;
      startWindowIndex <= arrayLength - currentWindowLength;
      startWindowIndex++
    ) {
      const endWindowIndex = startWindowIndex + currentWindowLength - 1;

      if (arr[startWindowIndex] === arr[endWindowIndex]) {
        if (currentWindowLength === 2) {
          minMovesMatrix[startWindowIndex][endWindowIndex] = 1;
        } else {
          minMovesMatrix[startWindowIndex][endWindowIndex] =
            minMovesMatrix[startWindowIndex + 1][endWindowIndex - 1];
        }
      }

      for (
        let splitIndex = startWindowIndex;
        splitIndex < endWindowIndex;
        splitIndex++
      ) {
        minMovesMatrix[startWindowIndex][endWindowIndex] = Math.min(
          minMovesMatrix[startWindowIndex][endWindowIndex],
          minMovesMatrix[startWindowIndex][splitIndex] +
            minMovesMatrix[splitIndex + 1][endWindowIndex]
        );
      }
    }
  }

  return minMovesMatrix[0][arrayLength - 1];
};
