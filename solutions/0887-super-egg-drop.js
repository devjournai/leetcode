/**
 * Super Egg Drop
 * Intuition: `dpFloors[e]` is the most floors testable with `e` eggs and the current number of moves. One more move yields `1 + dp[e-1] (break) + dp[e] (survive)`. Increase moves until `dp[k] >= n`.
 * Approach: 1. `dpFloors` size k+1, all 0. 2. While `dpFloors[k] < n`, increment `movesTaken` and for eggs k down to 1 set `dp[e] = 1 + dp[e-1] + dp[e]` (reverse order so the old `dp[e-1]` is still the previous-move value). 3. Return `movesTaken`.
 * Dry Run: k = 1, n = 2.
 *   - Move 1: dp[1]=1. Move 2: dp[1]=2. 2≥2 → return 2.
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
