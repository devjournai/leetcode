/**
 * Utf 8 Validation
 * Intuition: A UTF-8 sequence starts with a leading byte that encodes how many continuation bytes follow (`bytesToProcess`); each continuation must match `10xxxxxx`.
 * Approach: 1. Scan `data`. 2. When `bytesToProcess===0`, classify the byte: 0xxxxxxx (0 extra), 110xxxxx (1), 1110xxxx (2), 11110xxx (3); otherwise invalid. 3. Otherwise require `10xxxxxx` and decrement. 4. Valid only if the array ends with `bytesToProcess===0`.
 * Dry Run: data = [197, 130, 1] → 11000101, 10000010, 00000001.
 *   - 110xxxxx → need 1 continuation; 10000010 counts it down; 1 is a 1-byte char. Return true.
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
