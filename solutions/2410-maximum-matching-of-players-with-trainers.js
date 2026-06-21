/**
 * Maximum Matching Of Players With Trainers
 * Intuition: To maximize matches, sort both players and trainers. Greedily match the weakest available player with the weakest available trainer that can accommodate them. This preserves stronger trainers for stronger players, maximizing future matching opportunities.
 * Approach: 1. Sort the players' abilities in ascending order. 2. Sort the trainers' capacities in ascending order. 3. Use two pointers, one for players and one for trainers, both starting at the beginning of their respective sorted arrays. 4. Iterate while both pointers are within bounds. If the current player's ability is less than or equal to the current trainer's capacity, a match is made: increment the match count, and advance both player and trainer pointers. 5. If the current player's ability is greater than the current trainer's capacity, the current trainer cannot satisfy this player (or any stronger player), so advance only the trainer pointer to find a more capable trainer. The player pointer remains in place as this player still needs a match. 6. Return the total count of successful matches.
 * Dry Run: players = [4, 1, 7, 9], trainers = [4, 5, 8]
 *   1. sortedPlayerSkills = [1, 4, 7, 9]
 *   2. sortedTrainerCapacities = [4, 5, 8]
 *   3. playerPosition = 0, trainerPosition = 0, successfulPairings = 0
 *   4. Loop:
 *      - playerPosition = 0 (skill: 1), trainerPosition = 0 (capacity: 4)
 *        1 <= 4 (true) -> successfulPairings = 1, playerPosition = 1, trainerPosition = 1
 *      - playerPosition = 1 (skill: 4), trainerPosition = 1 (capacity: 5)
 *        4 <= 5 (true) -> successfulPairings = 2, playerPosition = 2, trainerPosition = 2
 *      - playerPosition = 2 (skill: 7), trainerPosition = 2 (capacity: 8)
 *        7 <= 8 (true) -> successfulPairings = 3, playerPosition = 3, trainerPosition = 3
 *      - playerPosition = 3 (skill: 9), trainerPosition = 3 (capacity: 8)
 *        Loop condition (trainerPosition < sortedTrainerCapacities.length) is now false (3 < 3). Loop terminates.
 *   5. Return successfulPairings = 3.
 * Time Complexity: O(P log P + T log T)
 * Space Complexity: O(1)
 */
var matchPlayersAndTrainers = function (players, trainers) {
  players.sort((valA, valB) => valA - valB);
  trainers.sort((capA, capB) => capA - capB);

  let currentPlayers = 0;
  let currentTrainers = 0;
  let matchedCount = 0;

  while (currentPlayers < players.length && currentTrainers < trainers.length) {
    if (players[currentPlayers] <= trainers[currentTrainers]) {
      matchedCount++;
      currentPlayers++;
      currentTrainers++;
    } else {
      currentTrainers++;
    }
  }

  return matchedCount;
};
