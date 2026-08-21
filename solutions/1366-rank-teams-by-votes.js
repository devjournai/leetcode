/**
 * Rank Teams By Votes
 * Intuition: Rank teams by how often they appear in each voting position, comparing from first place down, and breaking remaining ties alphabetically.
 * Approach: 1. For each team, store an array of vote counts per rank. 2. Increment the corresponding rank for every character in every vote. 3. Sort teams by those count arrays (higher is better), then by team letter. 4. Join the sorted letters.
 * Dry Run: votes = ["ABC", "ACB", "ABC", "ACB", "ACB"].
 *   - A: [5,0,0], B: [0,2,3], C: [0,3,2].
 *   - A first; C beats B at rank 1. Return "ACB".
 * Time Complexity: O(N * M + M^2 * log M)
 * Space Complexity: O(M^2)
 */
var rankTeams = function (votes) {
  const teamsQuantity = votes[0].length;
  const teamRankCounts = new Map();

  const initialTeamChars = votes[0].split("");
  for (let charIndex = 0; charIndex < initialTeamChars.length; charIndex++) {
    const currentTeamLetter = initialTeamChars[charIndex];
    teamRankCounts.set(currentTeamLetter, new Array(teamsQuantity).fill(0));
  }

  for (let voteIndex = 0; voteIndex < votes.length; voteIndex++) {
    const currentVoteString = votes[voteIndex];
    for (
      let positionVoteIndex = 0;
      positionVoteIndex < teamsQuantity;
      positionVoteIndex++
    ) {
      const rankedTeamChar = currentVoteString[positionVoteIndex];
      teamRankCounts.get(rankedTeamChar)[positionVoteIndex]++;
    }
  }

  const teamsForSorting = votes[0].split("");

  teamsForSorting.sort((teamA, teamB) => {
    for (
      let comparePosition = 0;
      comparePosition < teamsQuantity;
      comparePosition++
    ) {
      const votesForTeamA = teamRankCounts.get(teamA)[comparePosition];
      const votesForTeamB = teamRankCounts.get(teamB)[comparePosition];

      if (votesForTeamA > votesForTeamB) {
        return -1;
      }
      if (votesForTeamA < votesForTeamB) {
        return 1;
      }
    }
    return teamA < teamB ? -1 : 1;
  });

  return teamsForSorting.join("");
};
