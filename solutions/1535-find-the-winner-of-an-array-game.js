/**
 * Find The Winner Of An Array Game
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
