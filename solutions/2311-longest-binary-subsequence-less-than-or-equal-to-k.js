/**
 * Longest Binary Subsequence Less Than Or Equal To K
 * Intuition: To maximize the length of a subsequence, we should always include '0's as they don't increase the value. For '1's, we should prioritize those at lower bit positions (further to the right in the string) because they contribute less to the total value, allowing more '1's or '0's to be included while staying under `k`.
 * Approach: 1. Initialize `zeroCount`, `oneCount`, `currentTotal` (subsequence value), and `bitMultiplier` (current power of 2) to their starting values. 2. Iterate through the input string `s` from right to left (least significant bit to most significant bit) using a `while` loop and an `charIndex`. 3. If the character at `charIndex` is '0', increment `zeroCount`. 4. If the character at `charIndex` is '1', check if adding its `bitMultiplier` to `currentTotal` would keep the sum less than or equal to `k`, and also ensure `bitMultiplier` itself doesn't exceed `k`. If both conditions are met, update `currentTotal` and increment `oneCount`. 5. After processing each character, update `bitMultiplier` by multiplying it by 2, but only if `bitMultiplier` is currently less than or equal to `k` to prevent unnecessary large numbers. 6. Decrement `charIndex` and continue the loop. 7. Finally, return the sum of `zeroCount` and `oneCount`.
 * Dry Run: s = "100101", k = 5
 * Initial: zeroCount=0, oneCount=0, currentTotal=0, bitMultiplier=1, charIndex=5 (s.length-1)
 *
 * Iteration 1 (charIndex=5, s[5]='1'):
 *   - currentCharacter = '1'
 *   - bitMultiplier (1) <= k (5) is TRUE.
 *   - currentTotal (0) + bitMultiplier (1) <= k (5) is TRUE.
 *   - currentTotal becomes 1 (0 + 1).
 *   - oneCount becomes 1.
 *   - bitMultiplier (1) <= k (5) is TRUE.
 *   - bitMultiplier becomes 2 (1 * 2).
 *   - charIndex becomes 4.
 *
 * Iteration 2 (charIndex=4, s[4]='0'):
 *   - currentCharacter = '0'
 *   - zeroCount becomes 1.
 *   - bitMultiplier (2) <= k (5) is TRUE.
 *   - bitMultiplier becomes 4 (2 * 2).
 *   - charIndex becomes 3.
 *
 * Iteration 3 (charIndex=3, s[3]='1'):
 *   - currentCharacter = '1'
 *   - bitMultiplier (4) <= k (5) is TRUE.
 *   - currentTotal (1) + bitMultiplier (4) <= k (5) (i.e., 5 <= 5) is TRUE.
 *   - currentTotal becomes 5 (1 + 4).
 *   - oneCount becomes 2.
 *   - bitMultiplier (4) <= k (5) is TRUE.
 *   - bitMultiplier becomes 8 (4 * 2).
 *   - charIndex becomes 2.
 *
 * Iteration 4 (charIndex=2, s[2]='0'):
 *   - currentCharacter = '0'
 *   - zeroCount becomes 2.
 *   - bitMultiplier (8) <= k (5) is FALSE.
 *   - bitMultiplier remains 8.
 *   - charIndex becomes 1.
 *
 * Iteration 5 (charIndex=1, s[1]='0'):
 *   - currentCharacter = '0'
 *   - zeroCount becomes 3.
 *   - bitMultiplier (8) <= k (5) is FALSE.
 *   - bitMultiplier remains 8.
 *   - charIndex becomes 0.
 *
 * Iteration 6 (charIndex=0, s[0]='1'):
 *   - currentCharacter = '1'
 *   - bitMultiplier (8) <= k (5) is FALSE. Condition for '1' not met.
 *   - bitMultiplier (8) <= k (5) is FALSE.
 *   - bitMultiplier remains 8.
 *   - charIndex becomes -1.
 *
 * Loop ends.
 * Return zeroCount (3) + oneCount (2) = 5.
 * The subsequence formed is "00101" (reading characters from their original indices s[1], s[2], s[3], s[4], s[5])
 * which is binary 101, decimal 5. Length 5.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var longestSubsequence = function (inputString, targetValue) {
  let zeroCount = 0;
  let oneCount = 0;
  let currentTotal = 0;
  let bitMultiplier = 1;
  let charIndex = inputString.length - 1;

  while (charIndex >= 0) {
    const currentCharacter = inputString[charIndex];

    if (currentCharacter === "0") {
      zeroCount++;
    } else {
      if (
        bitMultiplier <= targetValue &&
        currentTotal + bitMultiplier <= targetValue
      ) {
        currentTotal += bitMultiplier;
        oneCount++;
      }
    }

    if (bitMultiplier <= targetValue) {
      bitMultiplier *= 2;
    }
    charIndex--;
  }

  return zeroCount + oneCount;
};
