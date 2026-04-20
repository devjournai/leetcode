/**
 * Super Egg Drop
 * Time Complexity: O(k * n)
 * Space Complexity: O(k)
 */
var superEggDrop = function (k, n) {
  const eggCountLimit = k;
  const floorLimit = n;

  const dpFloors = new Array(eggCountLimit + 1).fill(0);

  let movesTaken = 0;

  while (dpFloors[eggCountLimit] < floorLimit) {
    movesTaken++;

    for (let eggCounter = eggCountLimit; eggCounter >= 1; eggCounter--) {
      dpFloors[eggCounter] =
        1 + dpFloors[eggCounter - 1] + dpFloors[eggCounter];
    }
  }

  return movesTaken;
};
