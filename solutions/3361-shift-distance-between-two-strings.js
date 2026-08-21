/**
 * Shift Distance Between Two Strings
 * Intuition: Each letter can walk forward using `nextCost` or backward using `previousCost` on the alphabet ring. Precompute the 26×26 cost of each direction so each aligned pair `s[i] → t[i]` is a constant-time min of the two routes.
 * Approach: 1. `forwardCost[i][j]` = cost of next-shifts from letter i to j; fill by walking 26 steps from each start. 2. Same for `backwardCost` with `previousCost`. 3. Sum `min(forward, backward)` over all positions. 4. Return the total.
 * Dry Run: s="ab", t="ad", unit costs 1. a→a is 0; b→d next is 2, prev is 24. Pair cost 0+2=2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var shiftDistance = function (s, t, nextCost, previousCost) {
  const ALPHABET = 26;
  const forwardCost = Array.from({ length: ALPHABET }, () =>
    new Array(ALPHABET).fill(0)
  );
  const backwardCost = Array.from({ length: ALPHABET }, () =>
    new Array(ALPHABET).fill(0)
  );

  for (let startLetter = 0; startLetter < ALPHABET; startLetter++) {
    let runningCost = 0;
    for (let step = 0; step < ALPHABET; step++) {
      forwardCost[startLetter][(startLetter + step) % ALPHABET] = runningCost;
      runningCost += nextCost[(startLetter + step) % ALPHABET];
    }
  }

  for (let startLetter = 0; startLetter < ALPHABET; startLetter++) {
    let runningCost = 0;
    for (let step = 0; step < ALPHABET; step++) {
      backwardCost[startLetter][(startLetter - step + ALPHABET) % ALPHABET] =
        runningCost;
      runningCost += previousCost[(startLetter - step + ALPHABET) % ALPHABET];
    }
  }

  let totalDistance = 0;
  for (let index = 0; index < s.length; index++) {
    const fromLetter = s.charCodeAt(index) - 97;
    const toLetter = t.charCodeAt(index) - 97;
    totalDistance += Math.min(
      forwardCost[fromLetter][toLetter],
      backwardCost[fromLetter][toLetter]
    );
  }

  return totalDistance;
};
