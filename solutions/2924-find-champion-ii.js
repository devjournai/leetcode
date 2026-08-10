/**
 * Find Champion II
 * Intuition: A champion team is one that is not weaker than any other team, meaning no other team is stronger than it. In a directed graph, this translates to a team having no incoming edges (an in-degree of zero). If there is exactly one such team, it is the unique champion; otherwise, there is no unique champion.
 * Approach: 1. Initialize an array to store the in-degree for each team, with all values set to zero. 2. Iterate through all given edges. For each edge representing a strength relation from one team to another, increment the in-degree of the weaker team. 3. After processing all edges, iterate through the teams again. Count how many teams have an in-degree of zero and keep track of the last team found with an in-degree of zero. 4. If exactly one team was found with an in-degree of zero, return that team's index as the champion. Otherwise, return -1.
 * Dry Run: n = 3, edges = [[0,1],[1,2]]
 * 1. `totalTeamsCount` is 3. `incomingEdgeCount` initialized as `[0, 0, 0]`.
 * 2. `tournamentMatches` is `[[0,1],[1,2]]`.
 *    - For `[0,1]`: `incomingEdgeCount[1]` becomes 1. `incomingEdgeCount` is now `[0, 1, 0]`.
 *    - For `[1,2]`: `incomingEdgeCount[2]` becomes 1. `incomingEdgeCount` is now `[0, 1, 1]`.
 * 3. `championCandidate` is -1. `zeroInDegreeCounter` is 0.
 * 4. Iterate `teamIdentifier` from 0 to 2:
 *    - `teamIdentifier = 0`: `incomingEdgeCount[0]` is 0. `zeroInDegreeCounter` becomes 1. `championCandidate` becomes 0.
 *    - `teamIdentifier = 1`: `incomingEdgeCount[1]` is 1. No change to `zeroInDegreeCounter` or `championCandidate`.
 *    - `teamIdentifier = 2`: `incomingEdgeCount[2]` is 1. No change to `zeroInDegreeCounter` or `championCandidate`.
 * 5. Loop finishes. `zeroInDegreeCounter` is 1. Since it's exactly 1, return `championCandidate`, which is 0.
 * Time Complexity: O(N + M)
 * Space Complexity: O(N)
 */
var findChampion = function (n, edges) {
  const totalTeamsCount = n;
  const tournamentMatches = edges;

  const incomingEdgeCount = new Array(totalTeamsCount).fill(0);

  for (const currentMatch of tournamentMatches) {
    const weakerTeamNode = currentMatch[1];
    incomingEdgeCount[weakerTeamNode]++;
  }

  let championCandidate = -1;
  let zeroInDegreeCounter = 0;

  for (
    let teamIdentifier = 0;
    teamIdentifier < totalTeamsCount;
    teamIdentifier++
  ) {
    if (incomingEdgeCount[teamIdentifier] === 0) {
      zeroInDegreeCounter++;
      championCandidate = teamIdentifier;
    }
  }

  if (zeroInDegreeCounter === 1) {
    return championCandidate;
  } else {
    return -1;
  }
};
