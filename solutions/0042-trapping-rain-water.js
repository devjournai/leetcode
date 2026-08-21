/**
 * Trapping Rain Water
 * Intuition: Water on bar i is limited by the shorter of the tallest wall to its left and the tallest wall to its right, minus height[i]. Precomputing those two maxima makes each cell O(1).
 * Approach: 1. If fewer than 3 bars, return 0. 2. Scan left to right storing the running max height at each index. 3. Scan right to left storing the running max from the right. 4. For each index add max(0, min(leftMax, rightMax) - height[i]).
 * Dry Run: height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1].
 *   - At i=2: leftMax=1, rightMax=3, height=0 → trap 1.
 *   - At i=5: leftMax=2, rightMax=3, height=0 → trap 2.
 *   - Summing all positions yields 6.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var trap = function (height) {
  let structureLength = height.length;
  if (structureLength < 3) {
    return 0;
  }

  let maximumHeightsFromLeft = new Array(structureLength).fill(0);
  let currentHighestFromLeft = 0;

  for (
    let currentPosition = 0;
    currentPosition < structureLength;
    currentPosition++
  ) {
    currentHighestFromLeft = Math.max(
      currentHighestFromLeft,
      height[currentPosition]
    );
    maximumHeightsFromLeft[currentPosition] = currentHighestFromLeft;
  }

  let maximumHeightsFromRight = new Array(structureLength).fill(0);
  let currentHighestFromRight = 0;

  for (
    let reversePosition = structureLength - 1;
    reversePosition >= 0;
    reversePosition--
  ) {
    currentHighestFromRight = Math.max(
      currentHighestFromRight,
      height[reversePosition]
    );
    maximumHeightsFromRight[reversePosition] = currentHighestFromRight;
  }

  let totalTrappedVolume = 0;
  for (
    let computationPosition = 0;
    computationPosition < structureLength;
    computationPosition++
  ) {
    let wallHeightLimit = Math.min(
      maximumHeightsFromLeft[computationPosition],
      maximumHeightsFromRight[computationPosition]
    );
    let actualWaterAccumulated = wallHeightLimit - height[computationPosition];
    if (actualWaterAccumulated > 0) {
      totalTrappedVolume += actualWaterAccumulated;
    }
  }

  return totalTrappedVolume;
};
