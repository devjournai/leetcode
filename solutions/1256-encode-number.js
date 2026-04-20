/**
 * Encode Number
 * Time Complexity: O(log num)
 * Space Complexity: O(log num)
 */
var encode = function (num) {
  let shiftedValue = num + 1;

  let binaryStringRepresentation = shiftedValue.toString(2);

  let finalEncodedString = binaryStringRepresentation.replace(/^./, "");

  return finalEncodedString;
};
