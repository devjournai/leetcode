/**
 * Remove Colored Pieces If Both Neighbors Are The Same Color
 * Intuition: The game is fair in the sense that removing a piece only affects that specific piece's immediate neighbors, but it does not create or destroy other independent opportunities for moves. An 'AAA' sequence allows Alice one move (the middle 'A'), and a 'BBB' sequence allows Bob one move (the middle 'B'). These moves are independent of each other. The total number of available moves for each player can be pre-calculated. Alice wins if she has strictly more moves than Bob, because she moves first.
 * Approach: 1. Initialize two counters, one for Alice's total possible moves and one for Bob's total possible moves. 2. Iterate through the `colors` string from the second character to the second-to-last character (inclusive), as pieces at the ends cannot be removed. 3. For each character, check if it forms an 'AAA' triplet with its immediate neighbors. If so, increment Alice's move counter. 4. Otherwise, check if it forms a 'BBB' triplet with its immediate neighbors. If so, increment Bob's move counter. 5. After scanning the entire string, return `true` if Alice's total moves are strictly greater than Bob's total moves, indicating Alice wins; otherwise, return `false`.
 * Dry Run:
 *   colors = "AAABBB"
 *   aliceCount = 0
 *   bobCount = 0
 *   stringLength = 6
 *
 *   Iteration 1: middleIndex = 1
 *     colors[0] = 'A', colors[1] = 'A', colors[2] = 'A'
 *     This is 'AAA'. aliceCount becomes 1.
 *
 *   Iteration 2: middleIndex = 2
 *     colors[1] = 'A', colors[2] = 'A', colors[3] = 'B'
 *     Not 'AAA', not 'BBB'. No change to counts.
 *
 *   Iteration 3: middleIndex = 3
 *     colors[2] = 'A', colors[3] = 'B', colors[4] = 'B'
 *     Not 'AAA', not 'BBB'. No change to counts.
 *
 *   Iteration 4: middleIndex = 4
 *     colors[3] = 'B', colors[4] = 'B', colors[5] = 'B'
 *     This is 'BBB'. bobCount becomes 1.
 *
 *   Loop ends.
 *   aliceCount = 1, bobCount = 1
 *   Is aliceCount > bobCount? (1 > 1) is false.
 *   Return false.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var winnerOfGame = function (colors) {
  let aliceScore = 0;
  let bobScore = 0;
  let totalLength = colors.length;

  for (let scanIndex = 1; scanIndex < totalLength - 1; scanIndex++) {
    let pieceAtCurrent = colors[scanIndex];
    let pieceBefore = colors[scanIndex - 1];
    let pieceAfter = colors[scanIndex + 1];

    if (pieceAtCurrent === "A" && pieceBefore === "A" && pieceAfter === "A") {
      aliceScore++;
    } else if (
      pieceAtCurrent === "B" &&
      pieceBefore === "B" &&
      pieceAfter === "B"
    ) {
      bobScore++;
    }
  }

  return aliceScore > bobScore;
};
