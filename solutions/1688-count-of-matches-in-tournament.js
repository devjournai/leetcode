/**
 * Count Of Matches In Tournament
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var numberOfMatches = function (n) {
  let currentTeamsCount = n;
  let totalMatchesPlayed = 0;

  while (currentTeamsCount > 1) {
    let matchesThisRound;
    let teamsAdvancing;

    if (currentTeamsCount % 2 === 0) {
      matchesThisRound = currentTeamsCount / 2;
      teamsAdvancing = currentTeamsCount / 2;
    } else {
      matchesThisRound = (currentTeamsCount - 1) / 2;
      teamsAdvancing = (currentTeamsCount - 1) / 2 + 1;
    }

    totalMatchesPlayed = totalMatchesPlayed + matchesThisRound;
    currentTeamsCount = teamsAdvancing;
  }

  return totalMatchesPlayed;
};
