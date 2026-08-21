/**
 * Maximum Number Of Accepted Invitations
 * Intuition: This is bipartite matching: boys to girls with grid[boy][girl]=1. Kuhn’s DFS augmenting-path algorithm assigns each boy a girl, possibly reassigning previous matches.
 * Approach: 1. `girlInvitationStatus[girl]` stores the matched boy or -1. 2. For each boy, DFS `attemptMatchForBoy` over unused girls he likes. 3. If the girl is free or her current boy can rematch, assign her. 4. Count successful matches.
 * Dry Run: grid = [[1,1,1],[1,0,1],[0,0,1]].
 *   - Three augmenting assignments possible → 3.
 * Time Complexity: O(m * n * (m + n))
 * Space Complexity: O(m + n)
 */
var maximumInvitations = function (grid) {
  const boyDimension = grid.length;
  const girlDimension = grid[0].length;
  const girlInvitationStatus = new Array(girlDimension).fill(-1);

  let totalAcceptedInvitations = 0;

  for (let boyIndex = 0; boyIndex < boyDimension; boyIndex++) {
    const girlVisitedForBoy = new Array(girlDimension).fill(false);
    if (attemptMatchForBoy(boyIndex, girlVisitedForBoy)) {
      totalAcceptedInvitations++;
    }
  }

  return totalAcceptedInvitations;

  function attemptMatchForBoy(currentBoyConsidering, visitedGirlsInPath) {
    for (
      let currentGirlOption = 0;
      currentGirlOption < girlDimension;
      currentGirlOption++
    ) {
      if (
        grid[currentBoyConsidering][currentGirlOption] &&
        !visitedGirlsInPath[currentGirlOption]
      ) {
        visitedGirlsInPath[currentGirlOption] = true;

        if (
          girlInvitationStatus[currentGirlOption] === -1 ||
          attemptMatchForBoy(
            girlInvitationStatus[currentGirlOption],
            visitedGirlsInPath
          )
        ) {
          girlInvitationStatus[currentGirlOption] = currentBoyConsidering;
          return true;
        }
      }
    }
    return false;
  }
};
