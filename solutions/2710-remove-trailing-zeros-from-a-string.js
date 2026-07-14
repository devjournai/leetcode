/**
 * Remove Trailing Zeros From A String
 * Intuition: Trailing zeros are insignificant for the integer value when they appear at the end of a number string. To remove them, we need to find the last non-zero digit and form a new string up to that point.
 * Approach: 1. Initialize a pointer to the last character of the input string. 2. Iterate backwards, decrementing the pointer, as long as the current character is '0'. 3. Once a non-'0' character is found (or the beginning of the string is reached), the pointer indicates the end of the significant part of the string. 4. Return the substring from the beginning of the original string up to and including the character at the final pointer position.
 * Dry Run: Input: num = "51230100"
 *   1. inputStringLength = 8
 *   2. currentPointer = 7
 *   3. While loop:
 *      - currentPointer = 7: num[7] is '0'. currentPointer becomes 6.
 *      - currentPointer = 6: num[6] is '0'. currentPointer becomes 5.
 *      - currentPointer = 5: num[5] is '1'. The condition num[currentPointer] === '0' is false. Loop terminates.
 *   4. currentPointer is now 5.
 *   5. Result is num.substring(0, 5 + 1), which is num.substring(0, 6).
 *   6. This substring is "512301".
 *   7. Return "512301".
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var removeTrailingZeros = function (num) {
  let inputStringLength = num.length;
  let currentPointer = inputStringLength - 1;

  while (currentPointer >= 0 && num[currentPointer] === "0") {
    currentPointer--;
  }

  return num.substring(0, currentPointer + 1);
};
