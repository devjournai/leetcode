/**
 * Determine the Winner of a Bowling Game
 *
 * Intuition:
 * The score of each turn depends only on whether the player scored a strike
 * (10 pins) in either of the previous two turns.
 *
 * Compute each player's total score independently, then compare the scores.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Create a helper function to calculate a player's score.
 *
 * 2. For every turn:
 *
 *      If either of the previous two turns was a strike,
 *      add:
 *
 *          2 × currentPins
 *
 *      Otherwise add:
 *
 *          currentPins
 *
 * 3. Compute:
 *
 *      score1
 *      score2
 *
 * 4. Compare the two scores.
 *
 *      score1 > score2 → 1
 *
 *      score2 > score1 → 2
 *
 *      otherwise → 0
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * player1 =
 *
 * [5,10,3,2]
 *
 * Score:
 *
 * 5
 * +10
 * +2×3
 * +2×2
 *
 * =25
 *
 * player2 =
 *
 * [6,5,7,3]
 *
 * Score:
 *
 * 6+5+7+3
 *
 * =21
 *
 * Return:
 *
 * 1
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */

var isWinner = function (player1, player2) {
  const calculateScore = (player) => {
    let score = 0;

    for (let i = 0; i < player.length; i++) {
      if ((i > 0 && player[i - 1] === 10) || (i > 1 && player[i - 2] === 10)) {
        score += player[i] * 2;
      } else {
        score += player[i];
      }
    }

    return score;
  };

  const score1 = calculateScore(player1);
  const score2 = calculateScore(player2);

  if (score1 > score2) {
    return 1;
  }

  if (score2 > score1) {
    return 2;
  }

  return 0;
};
