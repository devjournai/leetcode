/**
 * Check if Two Chessboard Squares Have the Same Color
 * Intuition: A square is black or white from the parity of file + rank. Two squares match when those parities match.
 * Approach: 1. Color(coord) is true when letter parity differs from digit parity (same as 1812). 2. Compare the two colors.
 * Dry Run:
 *   a1 is dark (a odd, 1 odd -> same parity -> black in 1812's white test is false). h3: h even, 3 odd -> white. Different -> false.
 *   a1 and c3 are both dark -> true.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var checkTwoChessboards = function (coordinate1, coordinate2) {
  const squareIsWhite = (coordinates) => {
    const letter = coordinates.charCodeAt(0);
    const digit = coordinates.charCodeAt(1);
    return letter % 2 !== digit % 2;
  };

  return squareIsWhite(coordinate1) === squareIsWhite(coordinate2);
};
