/**
 * Number Of Ways To Separate Numbers
 * Intuition: The problem requires separating a string of digits into a non-decreasing list of positive integers without leading zeros. This is a classic dynamic programming problem where we build solutions for prefixes of the string. The non-decreasing constraint necessitates comparing numbers. To efficiently compare substrings, pre-calculating the Longest Common Prefix (LCP) array allows for O(1) comparison, making the DP transition efficient. The core idea is to build up solutions by considering `num[0...i]` and trying all possible lengths for the last number, then summing ways from valid previous states.
 * Approach: 1. Pre-calculate the LCP array: `longestCommonPrefix[i][j]` stores the length of the longest common prefix between `num[i...]` and `num[j...]`. This is done in O(N^2) time by iterating from the end of the string backwards. 2. Initialize a 2D DP array, `dynamicProgrammingWays[i][len]`, to store the number of ways to separate `num[0...i]` such that the last number formed is `num[i - len + 1 ... i]`. 3. Initialize another 2D array, `cumulativeSumWays[i][k]`, to store the sum of `dynamicProgrammingWays[i][j]` for `j` from 1 to `k`. This allows for efficient range sum queries. 4. Handle the base case: `dynamicProgrammingWays[0][1] = 1` (the first digit forms a number of length 1) and `cumulativeSumWays[0][1] = 1`. 5. Iterate `segmentEndIndex` from 1 to `n-1`. For each `segmentEndIndex`, iterate `currentNumberLen` from 1 to `segmentEndIndex + 1`. 6. Inside the inner loop, check for leading zeros. If the current number is the first in the sequence (starts at index 0), `dynamicProgrammingWays[segmentEndIndex][currentNumberLen]` is 1. 7. Otherwise, calculate `totalWaysAccumulated` from `cumulativeSumWays[previousEndIndex][min(previousEndIndex + 1, currentNumberLen)]`. This accounts for valid previous numbers shorter than or equal to `currentNumberLen`. 8. If `currentNumberLen` is a possible length for the previous number, use the LCP array to compare the previous number (of length `currentNumberLen`) with the current number. If the previous number is strictly greater, subtract `dynamicProgrammingWays[previousEndIndex][currentNumberLen]` from `totalWaysAccumulated`. 9. Store the `totalWaysAccumulated` (modulo `1e9 + 7`) in `dynamicProgrammingWays[segmentEndIndex][currentNumberLen]`. 10. After computing all `dynamicProgrammingWays` values for `segmentEndIndex`, update `cumulativeSumWays[segmentEndIndex]` based on `dynamicProgrammingWays[segmentEndIndex]`. 11. The final answer is `cumulativeSumWays[n-1][n]`.
 * Dry Run: num = "123"
 * n = 3, MOD = 1e9 + 7
 * 1. lcp table (partial): lcp[i][j] is length of common prefix of num[i...] and num[j...]
 *    lcp[0][0]=3, lcp[1][1]=2, lcp[2][2]=1. Other pairs (e.g., lcp[0][1]=0 as '1' != '2').
 * 2. dp and prefixSum tables initialized to 0. (size 3x4)
 * 3. Base case (segmentEndIndex = 0):
 *    dynamicProgrammingWays[0][1] = 1 (for "1")
 *    cumulativeSumWays[0][0] = 0
 *    cumulativeSumWays[0][1] = 1
 * 4. segmentEndIndex = 1 (processing "12"):
 *    cumulativeSumWays[1][0] = 0
 *    currentNumberLen = 1 (current number is "2", starts at num[1]):
 *        previousEndIndex = 0. totalWaysAccumulated = cumulativeSumWays[0][min(1,1)] = cumulativeSumWays[0][1] = 1.
 *        Previous number start = 0. Compare num[0]="1" with num[1]="2" (length 1). "1" <= "2" is True. No subtraction.
 *        dynamicProgrammingWays[1][1] = 1 (representing ["1", "2"])
 *    currentNumberLen = 2 (current number is "12", starts at num[0]):
 *        currentNumberStart = 0. This is the first number in sequence.
 *        dynamicProgrammingWays[1][2] = 1 (representing ["12"])
 *    Update cumulativeSumWays[1]:
 *        cumulativeSumWays[1][1] = (cumulativeSumWays[1][0] + dynamicProgrammingWays[1][1]) % MOD = (0+1)%MOD = 1
 *        cumulativeSumWays[1][2] = (cumulativeSumWays[1][1] + dynamicProgrammingWays[1][2]) % MOD = (1+1)%MOD = 2
 * 5. segmentEndIndex = 2 (processing "123"):
 *    cumulativeSumWays[2][0] = 0
 *    currentNumberLen = 1 (current number is "3", starts at num[2]):
 *        previousEndIndex = 1. totalWaysAccumulated = cumulativeSumWays[1][min(2,1)] = cumulativeSumWays[1][1] = 1.
 *        Previous number start = 1. Compare num[1]="2" with num[2]="3" (length 1). "2" <= "3" is True. No subtraction.
 *        dynamicProgrammingWays[2][1] = 1 (representing ["1", "2", "3"])
 *    currentNumberLen = 2 (current number is "23", starts at num[1]):
 *        previousEndIndex = 0. totalWaysAccumulated = cumulativeSumWays[0][min(1,2)] = cumulativeSumWays[0][1] = 1.
 *        Previous number start = 0. Cannot have length 2 (only 1). The condition `currentNumberLen (2) <= previousEndIndex+1 (1)` is False. So no explicit comparison, and previous shorter numbers contribute.
 *        dynamicProgrammingWays[2][2] = 1 (representing ["1", "23"])
 *    currentNumberLen = 3 (current number is "123", starts at num[0]):
 *        currentNumberStart = 0. This is the first number in sequence.
 *        dynamicProgrammingWays[2][3] = 1 (representing ["123"])
 *    Update cumulativeSumWays[2]:
 *        cumulativeSumWays[2][1] = (cumulativeSumWays[2][0] + dynamicProgrammingWays[2][1]) % MOD = (0+1)%MOD = 1
 *        cumulativeSumWays[2][2] = (cumulativeSumWays[2][1] + dynamicProgrammingWays[2][2]) % MOD = (1+1)%MOD = 2
 *        cumulativeSumWays[2][3] = (cumulativeSumWays[2][2] + dynamicProgrammingWays[2][3]) % MOD = (2+1)%MOD = 3
 * 6. Final Result: cumulativeSumWays[n-1][n] = cumulativeSumWays[2][3] = 3.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var numberOfCombinations = function (num) {
  const totalLength = num.length;
  if (num[0] === "0") {
    return 0;
  }

  const moduloValue = 1e9 + 7;

  const longestCommonPrefix = new Array(totalLength + 1)
    .fill(0)
    .map(() => new Array(totalLength + 1).fill(0));

  for (let rowIter = totalLength - 1; rowIter >= 0; rowIter--) {
    for (let colIter = totalLength - 1; colIter >= 0; colIter--) {
      if (num[rowIter] === num[colIter]) {
        longestCommonPrefix[rowIter][colIter] =
          longestCommonPrefix[rowIter + 1][colIter + 1] + 1;
      }
    }
  }

  const dynamicProgrammingWays = new Array(totalLength)
    .fill(0)
    .map(() => new Array(totalLength + 1).fill(0));
  const cumulativeSumWays = new Array(totalLength)
    .fill(0)
    .map(() => new Array(totalLength + 1).fill(0));

  dynamicProgrammingWays[0][1] = 1;
  cumulativeSumWays[0][1] = 1;

  for (
    let segmentEndIndex = 1;
    segmentEndIndex < totalLength;
    segmentEndIndex++
  ) {
    cumulativeSumWays[segmentEndIndex][0] = 0;

    for (
      let currentNumberLen = 1;
      currentNumberLen <= segmentEndIndex + 1;
      currentNumberLen++
    ) {
      const currentNumberStart = segmentEndIndex - currentNumberLen + 1;

      if (num[currentNumberStart] === "0") {
        continue;
      }

      const previousEndIndex = currentNumberStart - 1;

      if (previousEndIndex < 0) {
        dynamicProgrammingWays[segmentEndIndex][currentNumberLen] = 1;
        continue;
      }

      let totalWaysAccumulated =
        cumulativeSumWays[previousEndIndex][
          Math.min(previousEndIndex + 1, currentNumberLen)
        ];

      if (currentNumberLen <= previousEndIndex + 1) {
        const previousNumberStart = previousEndIndex - currentNumberLen + 1;

        function compareSubstrings(
          firstStartIndex,
          secondStartIndex,
          comparisonLength,
        ) {
          const commonMatchLength =
            longestCommonPrefix[firstStartIndex][secondStartIndex];
          if (commonMatchLength >= comparisonLength) {
            return true;
          }
          return (
            num.charCodeAt(firstStartIndex + commonMatchLength) <=
            num.charCodeAt(secondStartIndex + commonMatchLength)
          );
        }

        if (
          !compareSubstrings(
            previousNumberStart,
            currentNumberStart,
            currentNumberLen,
          )
        ) {
          totalWaysAccumulated =
            (totalWaysAccumulated -
              dynamicProgrammingWays[previousEndIndex][currentNumberLen] +
              moduloValue) %
            moduloValue;
        }
      }
      dynamicProgrammingWays[segmentEndIndex][currentNumberLen] =
        totalWaysAccumulated;
    }

    for (
      let currentSumIndex = 1;
      currentSumIndex <= segmentEndIndex + 1;
      currentSumIndex++
    ) {
      cumulativeSumWays[segmentEndIndex][currentSumIndex] =
        (cumulativeSumWays[segmentEndIndex][currentSumIndex - 1] +
          dynamicProgrammingWays[segmentEndIndex][currentSumIndex]) %
        moduloValue;
    }
  }

  return cumulativeSumWays[totalLength - 1][totalLength];
};
