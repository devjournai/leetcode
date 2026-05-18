/**
 * Minimum Moves To Convert String
 * Intuition: To find the minimum moves, a greedy approach is optimal. When an 'X' is encountered, it must be converted. To minimize moves, we should perform a move that covers this 'X' and potentially two subsequent characters. Starting a move at the earliest 'X' ensures it is covered efficiently, and by covering the next two positions, we avoid needing separate moves for them.
 * Approach: 1. Initialize a counter for moves and an index to traverse the string. 2. Iterate through the string while the index is within bounds. 3. If the character at the current index is 'X', increment the moves counter and advance the index by 3 (as the current 'X' and the next two characters are now covered). 4. If the character is 'O', simply advance the index by 1. 5. Return the total moves.
 * Dry Run: s = "OXOOX"
 * 1. Initialize movesCounter = 0, stringIndex = 0.
 * 2. stringIndex = 0: s[0] is 'O'. stringIndex becomes 1.
 * 3. stringIndex = 1: s[1] is 'X'. movesCounter becomes 1. stringIndex becomes 1 + 3 = 4.
 * 4. stringIndex = 4: s[4] is 'X'. movesCounter becomes 2. stringIndex becomes 4 + 3 = 7.
 * 5. stringIndex = 7: 7 >= s.length (5). Loop terminates.
 * 6. Return movesCounter (2).
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minimumMoves = function (s) {
  let movesCount = 0;
  let stringIndex = 0;
  const stringLength = s.length;

  while (stringIndex < stringLength) {
    if (s[stringIndex] === "X") {
      movesCount++;
      stringIndex += 3;
    } else {
      stringIndex++;
    }
  }

  return movesCount;
};
