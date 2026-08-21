/**
 * Find The Winner Of An Array Game
 * Intuition: The winner is the first value that beats k consecutive challengers, or the global max if the array ends first.
 * Approach: 1. champion=arr[0], streak=0. 2. Walk challengers: if champion wins streak++, else champion=challenger streak=1. 3. Stop at streak==k or end.
 * Dry Run: arr = [2,1,3,5,4,6,7], k = 2.
 *   - 2 beats 1; 3 beats 2; 5 beats 3 then 4 with streak 2 → 5.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var getWinner = function (arr, k) {
  let currentChampion = arr[0];
  let currentStreak = 0;
  let challengerIndex = 1;

  while (challengerIndex < arr.length && currentStreak < k) {
    let challengerValue = arr[challengerIndex];

    if (currentChampion > challengerValue) {
      currentStreak++;
    } else {
      currentChampion = challengerValue;
      currentStreak = 1;
    }
    challengerIndex++;
  }

  return currentChampion;
};
