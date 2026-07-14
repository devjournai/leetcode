/**
 * Minimum Cost To Make All Characters Equal
 * Intuition: To make all characters equal, every adjacent pair `s[k]` and `s[k-1]` must eventually be the same. The problem can be viewed as independently resolving "mismatches" where `s[k] !== s[k-1]`. An operation `invert(0...i)` costs `i + 1` and effectively flips the character `s[i]` relative to `s[i+1]`. An operation `invert(i...n-1)` costs `n - i` and effectively flips `s[i]` relative to `s[i-1]`. If `s[currentIndex]` is different from `s[currentIndex - 1]`, we must apply an operation that flips one of them to make them consistent. The specific operations to fix the `currentIndex - 1` vs `currentIndex` boundary are: (1) apply `invert(0...currentIndex-1)` (cost `currentIndex`) which effectively flips `s[currentIndex-1]` and its entire preceding segment, or (2) apply `invert(currentIndex...n-1)` (cost `n-currentIndex`) which effectively flips `s[currentIndex]` and its entire succeeding segment. We choose the minimum of these two costs for each mismatch.
 * Approach: 1. Initialize a variable `totalAccumulatedCost` to store the minimum total cost. 2. Iterate through the input string `s` starting from the second character (index `1`) up to the last character (index `s.length - 1`). Let the current iteration index be `currentPosition`. 3. In each iteration, compare the character at `s[currentPosition]` with the character at `s[currentPosition - 1]`. 4. If `s[currentPosition]` is not equal to `s[currentPosition - 1]`, it means there is a segment boundary that needs to be "fixed" to ensure all characters become equal. 5. To fix this boundary, calculate two potential costs: `costPrefixFlip` (equal to `currentPosition`) for flipping the prefix `s[0...currentPosition-1]`, and `costSuffixFlip` (equal to `s.length - currentPosition`) for flipping the suffix `s[currentPosition...s.length-1]`. 6. Add the minimum of `costPrefixFlip` and `costSuffixFlip` to `totalAccumulatedCost`. 7. After the loop completes, `totalAccumulatedCost` will contain the overall minimum cost. 8. Return `totalAccumulatedCost`.
 * Dry Run: s = "0101", n = 4
 * totalAccumulatedCost = 0
 *
 * currentPosition = 1:
 *   s[1] = '1', s[0] = '0'. '1' !== '0' is true.
 *   costPrefixFlip = 1.
 *   costSuffixFlip = 4 - 1 = 3.
 *   Math.min(1, 3) = 1.
 *   totalAccumulatedCost = 0 + 1 = 1.
 *
 * currentPosition = 2:
 *   s[2] = '0', s[1] = '1'. '0' !== '1' is true.
 *   costPrefixFlip = 2.
 *   costSuffixFlip = 4 - 2 = 2.
 *   Math.min(2, 2) = 2.
 *   totalAccumulatedCost = 1 + 2 = 3.
 *
 * currentPosition = 3:
 *   s[3] = '1', s[2] = '0'. '1' !== '0' is true.
 *   costPrefixFlip = 3.
 *   costSuffixFlip = 4 - 3 = 1.
 *   Math.min(3, 1) = 1.
 *   totalAccumulatedCost = 3 + 1 = 4.
 *
 * Loop finishes.
 * Return totalAccumulatedCost = 4.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minimumCost = function (s) {
  let totalAccumulatedCost = 0;
  let stringLength = s.length;

  for (
    let currentPosition = 1;
    currentPosition < stringLength;
    currentPosition++
  ) {
    if (s[currentPosition] !== s[currentPosition - 1]) {
      let costPrefixFlip = currentPosition;
      let costSuffixFlip = stringLength - currentPosition;
      totalAccumulatedCost += Math.min(costPrefixFlip, costSuffixFlip);
    }
  }

  return totalAccumulatedCost;
};
