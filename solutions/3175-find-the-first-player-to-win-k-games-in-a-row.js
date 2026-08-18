/**
 * Find The First Player To Win K Games In A Row
 * Intuition: The current winner stays at the front and plays the next opponent. The first player who wins k consecutive games, or the maximum skill if k is huge, is the answer.
 * Approach: 1. Track currentChampion and winStreak starting from index 0. 2. Scan remaining players; if challenger is greater they become champion with streak 1, else increment streak. 3. Stop at streak k or end of array (max remaining).
 * Dry Run:
 *   skills = [4,2,6,3,9], k = 2. 4 beats 2 (streak 1), 6 beats 4 (streak 1), 6 beats 3 (streak 2). Return 6.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var findWinningPlayer = function (skills, k) {
  let championIndex = 0;
  let winStreak = 0;
  for (
    let challengerIndex = 1;
    challengerIndex < skills.length;
    challengerIndex++
  ) {
    if (skills[challengerIndex] > skills[championIndex]) {
      championIndex = challengerIndex;
      winStreak = 1;
    } else {
      winStreak++;
    }
    if (winStreak >= k) {
      return championIndex;
    }
  }
  return championIndex;
};
