/**
 * Encode Number
 * Intuition: The encoding is the binary of num+1 without the leading 1, which enumerates all bit strings in order.
 * Approach: 1. Set shiftedValue = num+1. 2. Convert to binary. 3. Drop the first character with replace(/^./, ""). 4. Return that string.
 * Dry Run: num = 23
 *   24 in binary is 11000. Drop leading 1 -> "1000".
 *   num = 0 -> 1 in binary "1" -> "".
 * Time Complexity: O(log num)
 * Space Complexity: O(log num)
 */
var encode = function (num) {
  let shiftedValue = num + 1;

  let binaryStringRepresentation = shiftedValue.toString(2);

  let finalEncodedString = binaryStringRepresentation.replace(/^./, "");

  return finalEncodedString;
};
