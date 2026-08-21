/**
 * Find Players With Zero Or One Losses
 * Intuition: To efficiently count losses for each player and then filter them, a hash map (Map in JavaScript) is the most suitable data structure. This allows for quick updates and retrieval of player loss counts.
 * Approach: 1. Initialize a Map to store each player's loss count. Iterate through the input matches, updating the loss count for each loser and ensuring every winner is recorded with zero losses if they haven't lost. 2. Initialize two empty lists for players with zero losses and players with one loss. Iterate through the entries of the loss count map. Add players with a loss count of zero to the first list and players with a loss count of one to the second list. 3. Sort both resulting lists in ascending order. 4. Return the two sorted lists as a single array.
 * Dry Run: matches = [[1,3],[2,3],[3,6],[5,6],[5,7],[4,5],[4,8],[4,9],[10,4],[10,9]]
 * 1. playerLossTracker (Map):
 *    - [1,3]: {1:0, 3:1}
 *    - [2,3]: {1:0, 3:2, 2:0}
 *    - [3,6]: {1:0, 3:2, 2:0, 6:1}
 *    - [5,6]: {1:0, 3:2, 2:0, 6:2, 5:0}
 *    - [5,7]: {1:0, 3:2, 2:0, 6:2, 5:0, 7:1}
 *    - [4,5]: {1:0, 3:2, 2:0, 6:2, 5:1, 7:1, 4:0}
 *    - [4,8]: {1:0, 3:2, 2:0, 6:2, 5:1, 7:1, 4:0, 8:1}
 *    - [4,9]: {1:0, 3:2, 2:0, 6:2, 5:1, 7:1, 4:0, 8:1, 9:1}
 *    - [10,4]: {1:0, 3:2, 2:0, 6:2, 5:1, 7:1, 4:1, 8:1, 9:1, 10:0}
 *    - [10,9]: {1:0, 3:2, 2:0, 6:2, 5:1, 7:1, 4:1, 8:1, 9:2, 10:0}
 *    Final playerLossTracker: {1:0, 3:2, 2:0, 6:2, 5:1, 7:1, 4:1, 8:1, 9:2, 10:0}
 * 2. playersWithNoLosses = [], playersWithSingleLoss = []
 *    Iterate playerLossTracker:
 *    - 1 (0 losses): playersWithNoLosses.push(1) -> [1]
 *    - 3 (2 losses): skip
 *    - 2 (0 losses): playersWithNoLosses.push(2) -> [1, 2]
 *    - 6 (2 losses): skip
 *    - 5 (1 loss): playersWithSingleLoss.push(5) -> [5]
 *    - 7 (1 loss): playersWithSingleLoss.push(7) -> [5, 7]
 *    - 4 (1 loss): playersWithSingleLoss.push(4) -> [5, 7, 4]
 *    - 8 (1 loss): playersWithSingleLoss.push(8) -> [5, 7, 4, 8]
 *    - 9 (2 losses): skip
 *    - 10 (0 losses): playersWithNoLosses.push(10) -> [1, 2, 10]
 * 3. Sort:
 *    playersWithNoLosses: [1, 2, 10]
 *    playersWithSingleLoss: [4, 5, 7, 8]
 * 4. Return [[1, 2, 10], [4, 5, 7, 8]]
 * Time Complexity: O(N + P log P)
 * Space Complexity: O(P)
 */
var findWinners = function (matches) {
  const playerLossTracker = new Map();

  for (const currentMatchPair of matches) {
    const winningPlayerId = currentMatchPair[0];
    const losingPlayerId = currentMatchPair[1];

    playerLossTracker.set(
      winningPlayerId,
      playerLossTracker.get(winningPlayerId) ?? 0
    );
    playerLossTracker.set(
      losingPlayerId,
      (playerLossTracker.get(losingPlayerId) ?? 0) + 1
    );
  }

  const playersWithNoLosses = [];
  const playersWithSingleLoss = [];

  for (const [
    participantPlayerId,
    participantLossCount,
  ] of playerLossTracker.entries()) {
    if (participantLossCount === 0) {
      playersWithNoLosses.push(participantPlayerId);
    } else if (participantLossCount === 1) {
      playersWithSingleLoss.push(participantPlayerId);
    }
  }

  playersWithNoLosses.sort((idA, idB) => idA - idB);
  playersWithSingleLoss.sort((idOne, idTwo) => idOne - idTwo);

  return [playersWithNoLosses, playersWithSingleLoss];
};
