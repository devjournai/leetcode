/**
 * Maximum Number Of Non Overlapping Palindrome Substrings
 * Intuition: The problem requires finding the maximum count of non-overlapping palindrome substrings, each with a minimum length `k`. This naturally points towards a dynamic programming approach where we build up the solution for prefixes of the string. To efficiently check for palindromes, we can precompute all possible substring palindromes using another DP table.
 * Approach: 1. **Precompute Palindromes:** Initialize a 2D boolean array `isPalindromeMatrix` where `isPalindromeMatrix[i][j]` is true if `s[i...j]` is a palindrome. Populate this table by iterating through substring lengths and starting positions. A single-character substring is always a palindrome. A two-character substring is a palindrome if both characters are identical. For longer substrings, `s[i...j]` is a palindrome if `s[i] === s[j]` and the inner substring `s[i+1...j-1]` is also a palindrome. 2. **Dynamic Programming for Max Count:** Initialize a 1D integer array `dpMaxCounts` of size `s.length + 1`, where `dpMaxCounts[i]` stores the maximum number of non-overlapping palindromes found in the prefix `s[0...i-1]`. Iterate `currentEndPosition` from `k` up to `s.length`. For each `currentEndPosition`, first, consider not adding a new palindrome ending at `currentEndPosition - 1`, so `dpMaxCounts[currentEndPosition]` inherits `dpMaxCounts[currentEndPosition - 1]`. Then, iterate `currentStartPosition` backwards from `currentEndPosition - k` down to 0. If the substring `s[currentStartPosition...currentEndPosition-1]` is a palindrome (checked using `isPalindromeMatrix`) and its length is at least `k`, update `dpMaxCounts[currentEndPosition]` by taking the maximum of its current value and `dpMaxCounts[currentStartPosition] + 1`. This `dpMaxCounts[currentStartPosition]` represents the maximum count of palindromes found *before* the current palindrome `s[currentStartPosition...currentEndPosition-1]`. 3. **Result:** The final answer is `dpMaxCounts[s.length]`.
 * Dry Run: s = "abacaba", k = 2
 * stringLength = 7
 *
 * Phase 1: isPalindromeMatrix (simplified for relevant true values and length >= k)
 * isPalindromeMatrix[0][2] (aba) = true
 * isPalindromeMatrix[2][4] (aca) = true
 * isPalindromeMatrix[4][6] (aba) = true
 * isPalindromeMatrix[1][5] (bacab) = true
 * isPalindromeMatrix[0][6] (abacaba) = true
 *
 * Phase 2: dpMaxCounts (size 8, initialized to 0s)
 * dpMaxCounts = [0, 0, 0, 0, 0, 0, 0, 0]
 * k = 2
 *
 * currentEndPosition = 2:
 *   dpMaxCounts[2] = dpMaxCounts[1] = 0
 *   currentStartPosition from 0 to 0:
 *     currentStartPosition = 0: s[0...1] "ab" -> isPalindromeMatrix[0][1] = false.
 *   dpMaxCounts = [0, 0, 0, 0, 0, 0, 0, 0]
 *
 * currentEndPosition = 3:
 *   dpMaxCounts[3] = dpMaxCounts[2] = 0
 *   currentStartPosition from 1 to 0:
 *     currentStartPosition = 1: s[1...2] "ba" -> isPalindromeMatrix[1][2] = false.
 *     currentStartPosition = 0: s[0...2] "aba" -> isPalindromeMatrix[0][2] = true. Length 3 >= k.
 *       dpMaxCounts[3] = Math.max(0, dpMaxCounts[0] + 1) = Math.max(0, 0 + 1) = 1.
 *   dpMaxCounts = [0, 0, 0, 1, 0, 0, 0, 0]
 *
 * currentEndPosition = 4:
 *   dpMaxCounts[4] = dpMaxCounts[3] = 1
 *   currentStartPosition from 2 to 0: (no relevant palindromes s[X...3])
 *   dpMaxCounts = [0, 0, 0, 1, 1, 0, 0, 0]
 *
 * currentEndPosition = 5:
 *   dpMaxCounts[5] = dpMaxCounts[4] = 1
 *   currentStartPosition from 3 to 0:
 *     currentStartPosition = 2: s[2...4] "aca" -> isPalindromeMatrix[2][4] = true. Length 3 >= k.
 *       dpMaxCounts[5] = Math.max(1, dpMaxCounts[2] + 1) = Math.max(1, 0 + 1) = 1.
 *   dpMaxCounts = [0, 0, 0, 1, 1, 1, 0, 0]
 *
 * currentEndPosition = 6:
 *   dpMaxCounts[6] = dpMaxCounts[5] = 1
 *   currentStartPosition from 4 to 0:
 *     currentStartPosition = 1: s[1...5] "bacab" -> isPalindromeMatrix[1][5] = true. Length 5 >= k.
 *       dpMaxCounts[6] = Math.max(1, dpMaxCounts[1] + 1) = Math.max(1, 0 + 1) = 1.
 *   dpMaxCounts = [0, 0, 0, 1, 1, 1, 1, 0]
 *
 * currentEndPosition = 7:
 *   dpMaxCounts[7] = dpMaxCounts[6] = 1
 *   currentStartPosition from 5 to 0:
 *     currentStartPosition = 4: s[4...6] "aba" -> isPalindromeMatrix[4][6] = true. Length 3 >= k.
 *       dpMaxCounts[7] = Math.max(1, dpMaxCounts[4] + 1) = Math.max(1, 1 + 1) = 2. (Palindromes: s[0..2] and s[4..6])
 *     currentStartPosition = 0: s[0...6] "abacaba" -> isPalindromeMatrix[0][6] = true. Length 7 >= k.
 *       dpMaxCounts[7] = Math.max(2, dpMaxCounts[0] + 1) = Math.max(2, 0 + 1) = 2.
 *   dpMaxCounts = [0, 0, 0, 1, 1, 1, 1, 2]
 *
 * Return dpMaxCounts[7] = 2.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var maxPalindromes = function (s, k) {
  const stringLength = s.length;
  const isPalindromeMatrix = new Array(stringLength)
    .fill(false)
    .map(() => new Array(stringLength).fill(false));

  for (let segmentLength = 1; segmentLength <= stringLength; segmentLength++) {
    for (
      let segmentStart = 0;
      segmentStart + segmentLength <= stringLength;
      segmentStart++
    ) {
      const segmentEnd = segmentStart + segmentLength - 1;
      if (segmentLength === 1) {
        isPalindromeMatrix[segmentStart][segmentEnd] = true;
      } else if (segmentLength === 2) {
        isPalindromeMatrix[segmentStart][segmentEnd] =
          s[segmentStart] === s[segmentEnd];
      } else {
        isPalindromeMatrix[segmentStart][segmentEnd] =
          s[segmentStart] === s[segmentEnd] &&
          isPalindromeMatrix[segmentStart + 1][segmentEnd - 1];
      }
    }
  }

  const dpMaxCounts = new Array(stringLength + 1).fill(0);

  for (
    let currentEndPosition = k;
    currentEndPosition <= stringLength;
    currentEndPosition++
  ) {
    dpMaxCounts[currentEndPosition] = dpMaxCounts[currentEndPosition - 1];
    for (
      let currentStartPosition = currentEndPosition - k;
      currentStartPosition >= 0;
      currentStartPosition--
    ) {
      if (isPalindromeMatrix[currentStartPosition][currentEndPosition - 1]) {
        dpMaxCounts[currentEndPosition] = Math.max(
          dpMaxCounts[currentEndPosition],
          dpMaxCounts[currentStartPosition] + 1,
        );
      }
    }
  }

  return dpMaxCounts[stringLength];
};
