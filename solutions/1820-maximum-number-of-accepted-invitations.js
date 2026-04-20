/**
 * Maximum Number Of Accepted Invitations
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
            visitedGirlsInPath,
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
