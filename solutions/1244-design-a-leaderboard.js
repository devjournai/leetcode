/**
 * Design A Leaderboard
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
