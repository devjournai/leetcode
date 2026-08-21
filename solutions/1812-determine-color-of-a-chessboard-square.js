/**
 * Determine Color Of A Chessboard Square
 * Intuition: Squares alternate color. Adding the file letter code to the rank number is odd exactly on white squares in this mapping.
 * Approach: 1. Split `coordinates` into letter and digit. 2. Sum `letterCode + numberValue`. 3. Return whether that sum is odd.
 * Dry Run: coordinates = "a1".
 *   - 'a'=97 + 1 = 98 even → false (black).
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
