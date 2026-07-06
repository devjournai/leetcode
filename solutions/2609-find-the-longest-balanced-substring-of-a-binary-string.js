/**
 * Find The Longest Balanced Substring Of A Binary String
 * Intuition: A balanced substring must strictly consist of a sequence of zeroes followed by an equal number of ones (e.g., `0011`). We need to identify such `0...01...1` patterns within the string and find the one with the maximum length. The length of such a pattern is `2 * min(count_of_zeroes, count_of_ones)`.
 * Approach: 1. Initialize `maximumLength` to 0 and `currentPosition` to 0.
 * 2. Iterate using an outer `while` loop while `currentPosition` is within the string bounds. This loop processes the string by identifying potential `0...01...1` blocks.
 * 3. Inside the outer loop, first, skip any leading '1's using an inner `while` loop. These '1's cannot start a balanced `0...01...1` substring.
 * 4. Initialize `zeroCharacterCount` and `oneCharacterCount` to 0 for the current potential block.
 * 5. Count consecutive '0's using another inner `while` loop, incrementing `zeroCharacterCount` and `currentPosition`.
 * 6. Count consecutive '1's that immediately follow the '0's using a third inner `while` loop, incrementing `oneCharacterCount` and `currentPosition`.
 * 7. After counting the '1's, update `maximumLength` with the maximum of its current value and `2 * Math.min(zeroCharacterCount, oneCharacterCount)`.
 * 8. The `currentPosition` is advanced by the inner loops, ensuring that the outer loop proceeds to the next character after the processed block of zeroes and ones, or skipped ones.
 * 9. Return `maximumLength` after the outer loop completes.
 * Dry Run: s = "0011100011"
 * currentPosition = 0, maximumLength = 0
 *
 * Outer Loop 1 (currentPosition = 0):
 *   - Skip '1's: s[0] is '0'. `currentPosition` remains 0.
 *   - `zeroCharacterCount = 0`, `oneCharacterCount = 0`.
 *   - Count '0's:
 *     - s[0] = '0': `zeroCharacterCount = 1`, `currentPosition = 1`.
 *     - s[1] = '0': `zeroCharacterCount = 2`, `currentPosition = 2`.
 *   - Count '1's:
 *     - s[2] = '1': `oneCharacterCount = 1`, `currentPosition = 3`. `maximumLength = Math.max(0, 2 * Math.min(2, 1)) = 2`.
 *     - s[3] = '1': `oneCharacterCount = 2`, `currentPosition = 4`. `maximumLength = Math.max(2, 2 * Math.min(2, 2)) = 4`.
 *     - s[4] = '1': `oneCharacterCount = 3`, `currentPosition = 5`. `maximumLength = Math.max(4, 2 * Math.min(2, 3)) = 4`.
 *
 * Outer Loop 2 (currentPosition = 5):
 *   - Skip '1's: s[5] is '0'. `currentPosition` remains 5.
 *   - `zeroCharacterCount = 0`, `oneCharacterCount = 0`.
 *   - Count '0's:
 *     - s[5] = '0': `zeroCharacterCount = 1`, `currentPosition = 6`.
 *     - s[6] = '0': `zeroCharacterCount = 2`, `currentPosition = 7`.
 *     - s[7] = '0': `zeroCharacterCount = 3`, `currentPosition = 8`.
 *   - Count '1's:
 *     - s[8] = '1': `oneCharacterCount = 1`, `currentPosition = 9`. `maximumLength = Math.max(4, 2 * Math.min(3, 1)) = 4`.
 *     - s[9] = '1': `oneCharacterCount = 2`, `currentPosition = 10`. `maximumLength = Math.max(4, 2 * Math.min(3, 2)) = 4`.
 *
 * Outer Loop 3 (currentPosition = 10):
 *   - `currentPosition < s.length` (10 < 10) is false. Loop terminates.
 *
 * Return `maximumLength = 4`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findTheLongestBalancedSubstring = function (s) {
  let currentPosition = 0;
  let maximumLength = 0;

  while (currentPosition < s.length) {
    let zeroCharacterCount = 0;
    let oneCharacterCount = 0;

    while (currentPosition < s.length && s[currentPosition] === "1") {
      currentPosition++;
    }

    while (currentPosition < s.length && s[currentPosition] === "0") {
      zeroCharacterCount++;
      currentPosition++;
    }

    while (currentPosition < s.length && s[currentPosition] === "1") {
      oneCharacterCount++;
      currentPosition++;
      maximumLength = Math.max(
        maximumLength,
        2 * Math.min(zeroCharacterCount, oneCharacterCount),
      );
    }
  }

  return maximumLength;
};
