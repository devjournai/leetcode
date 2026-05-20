/**
 * Plates Between Candles
 * Intuition: To find plates between candles in a given range, we need to locate the leftmost valid candle and the rightmost valid candle within that range. Once these boundary candles are identified, a prefix sum array of plates can efficiently calculate the count of plates between them.
 * Approach: 1. Precompute a prefix sum array `platePrefixSums` where `platePrefixSums[i]` stores the count of plates from index 0 up to `i-1`. 2. Precompute an array `leftmostCandlePosition` where `leftmostCandlePosition[i]` stores the index of the closest candle to the left of or at index `i`. 3. Precompute an array `rightmostCandlePosition` where `rightmostCandlePosition[i]` stores the index of the closest candle to the right of or at index `i`. 4. For each query `[queryStartBoundary, queryEndBoundary]`, find the effective left candle `actualLeftCandle` using `rightmostCandlePosition[queryStartBoundary]` and the effective right candle `actualRightCandle` using `leftmostCandlePosition[queryEndBoundary]`. If both exist and `actualLeftCandle < actualRightCandle`, the number of plates is `platePrefixSums[actualRightCandle] - platePrefixSums[actualLeftCandle]`. Otherwise, it's 0.
 * Dry Run: s = "||**||**|*", queries = [[3, 8]]
 * stringLength = 10
 *
 * 1. Precomputation (Forward pass):
 *    platePrefixSums initialized: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
 *    leftmostCandlePosition initialized: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
 *
 *    forwardScanIndex = 0, currentCandleLocation = -1
 *    s[0] = '|': currentCandleLocation = 0. platePrefixSums[1] = 0. leftmostCandlePosition[0] = 0.
 *    s[1] = '|': currentCandleLocation = 1. platePrefixSums[2] = 0. leftmostCandlePosition[1] = 1.
 *    s[2] = '*': platePrefixSums[3] = 1. leftmostCandlePosition[2] = 1.
 *    s[3] = '*': platePrefixSums[4] = 2. leftmostCandlePosition[3] = 1.
 *    s[4] = '|': currentCandleLocation = 4. platePrefixSums[5] = 2. leftmostCandlePosition[4] = 4.
 *    s[5] = '|': currentCandleLocation = 5. platePrefixSums[6] = 2. leftmostCandlePosition[5] = 5.
 *    s[6] = '*': platePrefixSums[7] = 3. leftmostCandlePosition[6] = 5.
 *    s[7] = '*': platePrefixSums[8] = 4. leftmostCandlePosition[7] = 5.
 *    s[8] = '|': currentCandleLocation = 8. platePrefixSums[9] = 4. leftmostCandlePosition[8] = 8.
 *    s[9] = '*': platePrefixSums[10] = 5. leftmostCandlePosition[9] = 8.
 *
 *    After forward pass:
 *    platePrefixSums = [0, 0, 0, 1, 2, 2, 2, 3, 4, 4, 5]
 *    leftmostCandlePosition = [0, 1, 1, 1, 4, 5, 5, 5, 8, 8]
 *
 * 2. Precomputation (Backward pass):
 *    rightmostCandlePosition initialized: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1]
 *
 *    backwardScanIndex = 9, adjacentCandleLocation = -1
 *    s[9] = '*': rightmostCandlePosition[9] = -1.
 *    s[8] = '|': adjacentCandleLocation = 8. rightmostCandlePosition[8] = 8.
 *    s[7] = '*': rightmostCandlePosition[7] = 8.
 *    s[6] = '*': rightmostCandlePosition[6] = 8.
 *    s[5] = '|': adjacentCandleLocation = 5. rightmostCandlePosition[5] = 5.
 *    s[4] = '|': adjacentCandleLocation = 4. rightmostCandlePosition[4] = 4.
 *    s[3] = '*': rightmostCandlePosition[3] = 4.
 *    s[2] = '*': rightmostCandlePosition[2] = 4.
 *    s[1] = '|': adjacentCandleLocation = 1. rightmostCandlePosition[1] = 1.
 *    s[0] = '|': adjacentCandleLocation = 0. rightmostCandlePosition[0] = 0.
 *
 *    After backward pass:
 *    rightmostCandlePosition = [0, 1, 4, 4, 4, 5, 8, 8, 8, -1]
 *
 * 3. Query Processing:
 *    queryResults initialized: [0]
 *
 *    queryIterationIndex = 0: currentQuery = [3, 8]
 *    queryStartBoundary = 3, queryEndBoundary = 8
 *    actualLeftCandle = rightmostCandlePosition[3] = 4
 *    actualRightCandle = leftmostCandlePosition[8] = 8
 *    Condition (4 !== -1 && 8 !== -1 && 4 < 8) is true.
 *    queryResults[0] = platePrefixSums[actualRightCandle] - platePrefixSums[actualLeftCandle]
 *    queryResults[0] = platePrefixSums[8] - platePrefixSums[4] = 4 - 2 = 2.
 *
 * Final queryResults = [2]. Matches example.
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N + Q)
 */
var platesBetweenCandles = function (s, queries) {
  const stringLength = s.length;
  const platePrefixSums = new Array(stringLength + 1).fill(0);
  const leftmostCandlePosition = new Array(stringLength).fill(-1);
  const rightmostCandlePosition = new Array(stringLength).fill(-1);

  for (
    let forwardScanIndex = 0, currentCandleLocation = -1;
    forwardScanIndex < stringLength;
    ++forwardScanIndex
  ) {
    platePrefixSums[forwardScanIndex + 1] =
      platePrefixSums[forwardScanIndex] + (s[forwardScanIndex] === "*" ? 1 : 0);
    if (s[forwardScanIndex] === "|") {
      currentCandleLocation = forwardScanIndex;
    }
    leftmostCandlePosition[forwardScanIndex] = currentCandleLocation;
  }

  for (
    let backwardScanIndex = stringLength - 1, adjacentCandleLocation = -1;
    backwardScanIndex >= 0;
    --backwardScanIndex
  ) {
    if (s[backwardScanIndex] === "|") {
      adjacentCandleLocation = backwardScanIndex;
    }
    rightmostCandlePosition[backwardScanIndex] = adjacentCandleLocation;
  }

  const queryResults = new Array(queries.length).fill(0);
  for (
    let queryIterationIndex = 0;
    queryIterationIndex < queries.length;
    ++queryIterationIndex
  ) {
    const currentQuery = queries[queryIterationIndex];
    const queryStartBoundary = currentQuery[0];
    const queryEndBoundary = currentQuery[1];

    const actualLeftCandle = rightmostCandlePosition[queryStartBoundary];
    const actualRightCandle = leftmostCandlePosition[queryEndBoundary];

    if (
      actualLeftCandle !== -1 &&
      actualRightCandle !== -1 &&
      actualLeftCandle < actualRightCandle
    ) {
      queryResults[queryIterationIndex] =
        platePrefixSums[actualRightCandle] - platePrefixSums[actualLeftCandle];
    }
  }

  return queryResults;
};
