/**
 * Count Of Matches In Tournament
 * Intuition: Each match eliminates one team, so a tournament that ends with one winner always plays `n-1` matches. Simulating even/odd pairing yields the same total.
 * Approach: 1. While `currentTeamsCount > 1`, if even play `n/2` matches and `n/2` advance; if odd play `(n-1)/2` and `(n-1)/2+1` advance. 2. Add `matchesThisRound` to `totalMatchesPlayed`. 3. Return the total.
 * Dry Run: n = 7
 * 7 odd → 3 matches, 4 advance; 4 even → 2 matches, 2 advance; 2 even → 1 match. Total = 6 (= n−1).
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
