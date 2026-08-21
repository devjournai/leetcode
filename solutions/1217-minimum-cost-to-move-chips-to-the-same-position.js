/**
 * Minimum Cost To Move Chips To The Same Position
 * Intuition: Moving by 2 is free, so parity is all that costs; pile everything on even or odd and pay 1 per chip of the other parity.
 * Approach: 1. Count chips on even vs odd positions. 2. Return the smaller count.
 * Dry Run: position = [1,2,3]. Odds=2, evens=1 → cost 1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minCostToMoveChips = function (position) {
  let chipsAtEvenPositions = 0;
  let chipsAtOddPositions = 0;

  for (let currentChipLocation of position) {
    if (currentChipLocation % 2 === 0) {
      chipsAtEvenPositions++;
    } else {
      chipsAtOddPositions++;
    }
  }

  let minimumAchievableCost = Math.min(
    chipsAtEvenPositions,
    chipsAtOddPositions
  );
  return minimumAchievableCost;
};
