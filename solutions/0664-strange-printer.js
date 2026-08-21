/**
 * Strange Printer
 * Intuition: `minTurns[i][j]` is the fewest turns to print s[i..j]. Printing the last char "for free" when it already appeared at a split point `k` with s[k]==s[j] merges those turns.
 * Approach: 1. Length 1 → 1. 2. Else start from `minTurns[i][j-1]+1`. 3. For each split where s[split]==s[end], take `minTurns[i][split] + minTurns[split+1][j-1]` (0 if empty). 4. Answer `minTurns[0][n-1]`.
 * Dry Run: s = "aaabbb".
 *   - All a's need 1 turn, all b's 1 more. Return 2.
 * Time Complexity: O(n^3)
 * Space Complexity: O(n^2)
 */
var strangePrinter = function (s) {
  const totalLength = s.length;
  if (totalLength === 0) {
    return 0;
  }

  const minTurns = new Array(totalLength)
    .fill(0)
    .map(() => new Array(totalLength).fill(0));

  for (let currentLength = 1; currentLength <= totalLength; currentLength++) {
    for (
      let startIndex = 0;
      startIndex <= totalLength - currentLength;
      startIndex++
    ) {
      const endIndex = startIndex + currentLength - 1;

      if (currentLength === 1) {
        minTurns[startIndex][endIndex] = 1;
      } else {
        minTurns[startIndex][endIndex] = minTurns[startIndex][endIndex - 1] + 1;

        for (let splitPoint = startIndex; splitPoint < endIndex; splitPoint++) {
          if (s[splitPoint] === s[endIndex]) {
            const valLeft = minTurns[startIndex][splitPoint];
            const valRight =
              splitPoint + 1 <= endIndex - 1
                ? minTurns[splitPoint + 1][endIndex - 1]
                : 0;
            const intermediateCost = valLeft + valRight;
            minTurns[startIndex][endIndex] = Math.min(
              minTurns[startIndex][endIndex],
              intermediateCost
            );
          }
        }
      }
    }
  }

  return minTurns[0][totalLength - 1];
};
