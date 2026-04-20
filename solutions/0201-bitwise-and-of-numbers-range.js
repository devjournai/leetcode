/**
 * Bitwise And Of Numbers Range
 * Time Complexity: O(log(right))
 * Space Complexity: O(1)
*/
var rangeBitwiseAnd = function (left, right) {
  let commonPrefixResult = 0;
  for (let currentBitPosition = 30; currentBitPosition >= 0; currentBitPosition--) {
    const bitIdentifier = 1 << currentBitPosition;
    if ((left & bitIdentifier) === (right & bitIdentifier)) {
      if ((left & bitIdentifier) !== 0) {
        commonPrefixResult |= bitIdentifier;
      }
    } else {
      break;
    }
  }
  return commonPrefixResult;
};