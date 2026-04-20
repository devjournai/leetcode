/**
 * Utf 8 Validation
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var validUtf8 = function (data) {
  let bytesToProcess = 0;
  let totalBytesInArray = data.length;

  for (let byteIndex = 0; byteIndex < totalBytesInArray; byteIndex++) {
    let currentByteValue = data[byteIndex];

    if (bytesToProcess === 0) {
      if ((currentByteValue & 0b10000000) === 0b00000000) {
        bytesToProcess = 0;
      } else if ((currentByteValue & 0b11100000) === 0b11000000) {
        bytesToProcess = 1;
      } else if ((currentByteValue & 0b11110000) === 0b11100000) {
        bytesToProcess = 2;
      } else if ((currentByteValue & 0b11111000) === 0b11110000) {
        bytesToProcess = 3;
      } else {
        return false;
      }
    } else {
      if ((currentByteValue & 0b11000000) === 0b10000000) {
        bytesToProcess--;
      } else {
        return false;
      }
    }
  }

  return bytesToProcess === 0;
};