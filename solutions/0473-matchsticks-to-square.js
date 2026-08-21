/**
 * Matchsticks To Square
 * Intuition: Four equal sides exist only if the total length is divisible by 4 and no stick exceeds that side. Place sticks largest-first into four buckets that never exceed the side; skip symmetric empty-bucket retries.
 * Approach: 1. Reject fewer than 4 sticks or total % 4 ≠ 0. 2. `sideLength = total/4`; sort descending; reject if the longest stick > side. 3. `solveRecursively(stickIndex)` tries adding the stick to each of 4 `currentSides` that still have room, backtracks, and `break`s after failing an empty side (identical empty sides). 4. Success when every stick is placed.
 * Dry Run: [1,1,2,2,2], total 8, side 2.
 *   - Sorted [2,2,2,1,1]. Place three 2s on three sides, then 1+1 fill the last → true.
 * Time Complexity: O(4^N)
 * Space Complexity: O(N)
 */
var makesquare = function (inputSticks) {
  if (inputSticks.length < 4) {
    return false;
  }

  const totalLength = inputSticks.reduce(
    (acc, currentVal) => acc + currentVal,
    0
  );
  if (totalLength % 4 !== 0) {
    return false;
  }

  const sideLength = totalLength / 4;
  inputSticks.sort((valA, valB) => valB - valA);

  if (inputSticks[0] > sideLength) {
    return false;
  }

  const currentSides = [0, 0, 0, 0];

  function solveRecursively(stickIndex) {
    if (stickIndex === inputSticks.length) {
      return true;
    }

    for (let currentSideIdx = 0; currentSideIdx < 4; currentSideIdx++) {
      if (
        currentSides[currentSideIdx] + inputSticks[stickIndex] <=
        sideLength
      ) {
        currentSides[currentSideIdx] += inputSticks[stickIndex];
        if (solveRecursively(stickIndex + 1)) {
          return true;
        }
        currentSides[currentSideIdx] -= inputSticks[stickIndex];
        if (currentSides[currentSideIdx] === 0) {
          break;
        }
      }
    }
    return false;
  }

  return solveRecursively(0);
};
