/**
 * Design A Leaderboard
 * Intuition: Scores only need a map from player to total. The expensive work is top(K), which can sort the current scores and sum the first K values.
 * Approach: 1. Constructor stores playerScores as a Map. 2. addScore adds score to the player's existing total (or 0). 3. top copies all score values, sorts them descending, then sums the first K entries. 4. reset deletes the player from the map.
 * Dry Run: addScore(1,73), addScore(2,56), addScore(3,39), addScore(4,51), addScore(5,4)
 *   playerScores: 1->73, 2->56, 3->39, 4->51, 5->4
 *   top(3): values [73,56,39,51,4] sorted [73,56,51,39,4]; sum first 3 = 180
 *   reset(1) deletes player 1. addScore(2,51) makes 2->107
 *   top(3): [107,51,39,4] sorted; sum 107+51+39 = 197
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var Leaderboard = function () {
  this.playerScores = new Map();
};

Leaderboard.prototype.addScore = function (playerId, score) {
  const currentScore = this.playerScores.get(playerId) || 0;
  const updatedScore = currentScore + score;
  this.playerScores.set(playerId, updatedScore);
};

Leaderboard.prototype.top = function (K) {
  const allScoreValues = Array.from(this.playerScores.values());

  allScoreValues.sort((firstVal, secondVal) => secondVal - firstVal);

  let totalTopScore = 0;
  let scoreCount = 0;

  for (const singleScore of allScoreValues) {
    if (scoreCount >= K) {
      break;
    }
    totalTopScore += singleScore;
    scoreCount++;
  }

  return totalTopScore;
};

Leaderboard.prototype.reset = function (playerId) {
  this.playerScores.delete(playerId);
};
