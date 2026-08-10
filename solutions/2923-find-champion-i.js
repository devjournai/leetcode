/**
 * Find Champion I
 * Intuition: A champion is a team that is stronger than all other teams. We can identify the champion by iterating through each team and verifying if it defeats every opponent.
 * Approach: 1. Initialize an outer `while` loop to iterate through each potential champion team from `0` to `n-1`. 2. For each potential champion, set a flag `currentTeamIsChampion` to `true`. 3. Initialize an inner `for` loop to iterate through all other teams (opponents). 4. Inside the inner loop, skip self-comparison. If the current potential champion is NOT stronger than an opponent (`grid[currentTeamIndex][opponentIndex] === 0`), then it cannot be the champion, so set `currentTeamIsChampion` to `false` and break the inner loop. 5. After the inner loop completes, if `currentTeamIsChampion` is still `true`, return the `currentTeamIndex` as it is the champion. 6. The problem guarantees exactly one champion, so the loop will always find and return a team.
 * Dry Run:
 *   grid = [[0,1],[0,0]]
 *   teamCount = 2
 *
 *   currentTeamIndex = 0:
 *     currentTeamIsChampion = true
 *     opponentIndex = 0: currentTeamIndex (0) === opponentIndex (0), continue.
 *     opponentIndex = 1:
 *       grid[0][1] is 1. Condition grid[0][1] === 0 is false.
 *       Loop continues.
 *     Inner loop ends.
 *     currentTeamIsChampion is true.
 *     Return currentTeamIndex (0).
 * Output: 0
 * Time Complexity: O(n^2)
 * Space Complexity: O(1)
 */
var findChampion = function (grid) {
  const teamCount = grid.length;
  let currentTeamIndex = 0;

  while (currentTeamIndex < teamCount) {
    let currentTeamIsChampion = true;

    for (
      let opponentIdentifier = 0;
      opponentIdentifier < teamCount;
      opponentIdentifier++
    ) {
      if (currentTeamIndex === opponentIdentifier) {
        continue;
      }
      if (grid[currentTeamIndex][opponentIdentifier] === 0) {
        currentTeamIsChampion = false;
        break;
      }
    }

    if (currentTeamIsChampion) {
      return currentTeamIndex;
    }

    currentTeamIndex++;
  }

  // This line should technically not be reached given problem constraints
  // that guarantee exactly one champion.
  return -1;
};
