/**
 * Minimum Cost To Move Chips To The Same Position
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
    chipsAtOddPositions,
  );
  return minimumAchievableCost;
};
