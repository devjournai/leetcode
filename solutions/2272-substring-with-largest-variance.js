/**
 * Substring With Largest Variance
 * Intuition: The problem asks for the maximum difference between counts of any two characters in a substring, where both characters must be present. This can be reframed as finding the maximum `count(charA) - count(charB)` for all pairs of distinct characters (charA, charB) and all valid substrings. This subproblem can be solved efficiently using a Kadane's-like algorithm, which tracks current counts and resets when the 'minor' character dominates too much.
 * Approach: 1. Initialize `overallMaximumVariance` to 0. 2. Identify all unique characters present in the input string `s`. 3. Iterate through every possible pair of distinct unique characters `(majorChar, minorChar)`. 4. For each pair, run a modified Kadane's algorithm: Initialize `currentMajorCountValue`, `currentMinorCountValue` to 0, `potentialMaximumVariance` to 0, and `minorCharFoundInSegment` flag to false. 5. Iterate through the input string `s`. If the current character is `majorChar`, increment `currentMajorCountValue`. If it's `minorChar`, increment `currentMinorCountValue` and set `minorCharFoundInSegment` to true. 6. If `minorCharFoundInSegment` is true, update `potentialMaximumVariance = Math.max(potentialMaximumVariance, currentMajorCountValue - currentMinorCountValue)`. This ensures both characters are present. 7. Implement Kadane's reset logic: If `currentMajorCountValue < currentMinorCountValue`, it means `minorChar` is dominating, so reset `currentMajorCountValue = 0`, `currentMinorCountValue = 0`, and `minorCharFoundInSegment = false` to start a new potential substring segment. 8. After iterating through `s` for a pair, update `overallMaximumVariance = Math.max(overallMaximumVariance, potentialMaximumVariance)`. 9. Return `overallMaximumVariance`.
 * Dry Run: s = "bbaa"
 *   uniqueCharacterSet = ['a', 'b']
 *   overallMaximumVariance = 0
 *
 *   Pair ('a', 'b') (majorChar='a', minorChar='b'):
 *     currentMajorCountValue = 0, currentMinorCountValue = 0, potentialMaximumVariance = 0, minorCharFoundInSegment = false
 *     charCurrentIteration = 'b': currentMinorCountValue=1, minorCharFoundInSegment=true. No update to potentialMaximumVariance. currentMajorCountValue (0) < currentMinorCountValue (1), so reset: currentMajorCountValue=0, currentMinorCountValue=0, minorCharFoundInSegment=false.
 *     charCurrentIteration = 'b': currentMinorCountValue=1, minorCharFoundInSegment=true. No update to potentialMaximumVariance. currentMajorCountValue (0) < currentMinorCountValue (1), so reset: currentMajorCountValue=0, currentMinorCountValue=0, minorCharFoundInSegment=false.
 *     charCurrentIteration = 'a': currentMajorCountValue=1. No update to potentialMaximumVariance. Not currentMajorCountValue < currentMinorCountValue.
 *     charCurrentIteration = 'a': currentMajorCountValue=2. No update to potentialMaximumVariance. Not currentMajorCountValue < currentMinorCountValue.
 *     End of inner loop. potentialMaximumVariance for this pair = 0.
 *     overallMaximumVariance = Math.max(0, 0) = 0.
 *
 *   Pair ('b', 'a') (majorChar='b', minorChar='a'):
 *     currentMajorCountValue = 0, currentMinorCountValue = 0, potentialMaximumVariance = 0, minorCharFoundInSegment = false
 *     charCurrentIteration = 'b': currentMajorCountValue=1. No update to potentialMaximumVariance. Not currentMajorCountValue < currentMinorCountValue.
 *     charCurrentIteration = 'b': currentMajorCountValue=2. No update to potentialMaximumVariance. Not currentMajorCountValue < currentMinorCountValue.
 *     charCurrentIteration = 'a': currentMinorCountValue=1, minorCharFoundInSegment=true. minorCharFoundInSegment is true. potentialMaximumVariance = Math.max(0, 2-1) = 1. Not currentMajorCountValue < currentMinorCountValue.
 *     charCurrentIteration = 'a': currentMinorCountValue=2, minorCharFoundInSegment=true. minorCharFoundInSegment is true. potentialMaximumVariance = Math.max(1, 2-2) = 1. Not currentMajorCountValue < currentMinorCountValue.
 *     End of inner loop. potentialMaximumVariance for this pair = 1.
 *     overallMaximumVariance = Math.max(0, 1) = 1.
 *
 *   Final result: 1.
 * Time Complexity: O(C^2 * N)
 * Space Complexity: O(C)
 */
var largestVariance = function (s) {
  const freq = new Map();
  for (const char of s) {
    freq.set(char, (freq.get(char) || 0) + 1);
  }

  const uniqueCharacterSet = new Set(s);
  let overallMaximumVariance = 0;

  for (const majorChar of uniqueCharacterSet) {
    for (const minorChar of uniqueCharacterSet) {
      if (majorChar === minorChar) {
        continue;
      }

      let currentMajorCountValue = 0;
      let currentMinorCountValue = 0;
      let minorCharFoundInSegment = false;

      let remainingMinor = freq.get(minorChar);

      for (const charCurrentIteration of s) {
        if (charCurrentIteration === majorChar) {
          currentMajorCountValue++;
        }
        if (charCurrentIteration === minorChar) {
          currentMinorCountValue++;
          remainingMinor--;
          minorCharFoundInSegment = true;
        }

        if (minorCharFoundInSegment) {
          overallMaximumVariance = Math.max(
            overallMaximumVariance,
            currentMajorCountValue - currentMinorCountValue
          );
        }

        if (
          currentMajorCountValue < currentMinorCountValue &&
          remainingMinor > 0
        ) {
          currentMajorCountValue = 0;
          currentMinorCountValue = 0;
          minorCharFoundInSegment = false;
        }
      }
    }
  }

  return overallMaximumVariance;
};
