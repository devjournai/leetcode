/**
 * Determine Color Of A Chessboard Square
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var squareIsWhite = function (coordinates) {
  const [firstChar, secondChar] = coordinates;
  const letterCode = firstChar.charCodeAt(0);
  const numberValue = parseInt(secondChar, 10);
  const totalCharacteristic = letterCode + numberValue;
  return totalCharacteristic % 2 !== 0;
};
