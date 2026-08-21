/**
 * Cinema Seat Allocation
 *
 * Intuition: A family needs four consecutive seats in [2-5], [4-7], or [6-9]. Empty rows fit two families (left+right). Only reserved rows need extra checks.
 * Approach: 1. Map reserved columns per row. 2. Start with 2 * (n - reservedRows). 3. For each reserved row, if left and right are free add 2; else if any of left/middle/right is free add 1.
 * Dry Run: n=3, reserved=[[1,2]]. Empty rows 2 and 3 contribute 4. Row 1: left blocked, middle and right free → 1. Total 5.
 * Time Complexity: O(R)
 * Space Complexity: O(R)
 */
var maxNumberOfFamilies = function (totalRows, reservedSeatPositions) {
  const rowToReservedSeatsMap = new Map();

  for (const [currentSeatRow, seatColumnNumber] of reservedSeatPositions) {
    if (!rowToReservedSeatsMap.has(currentSeatRow)) {
      rowToReservedSeatsMap.set(currentSeatRow, new Set());
    }
    rowToReservedSeatsMap.get(currentSeatRow).add(seatColumnNumber);
  }

  let maximumFamilyGroups = 2 * (totalRows - rowToReservedSeatsMap.size);

  for (const occupiedColumnsInRow of rowToReservedSeatsMap.values()) {
    let currentFamilyCount = 0;

    const canFitLeftGroup =
      !occupiedColumnsInRow.has(2) &&
      !occupiedColumnsInRow.has(3) &&
      !occupiedColumnsInRow.has(4) &&
      !occupiedColumnsInRow.has(5);
    const canFitRightGroup =
      !occupiedColumnsInRow.has(6) &&
      !occupiedColumnsInRow.has(7) &&
      !occupiedColumnsInRow.has(8) &&
      !occupiedColumnsInRow.has(9);
    const canFitMiddleGroup =
      !occupiedColumnsInRow.has(4) &&
      !occupiedColumnsInRow.has(5) &&
      !occupiedColumnsInRow.has(6) &&
      !occupiedColumnsInRow.has(7);

    if (canFitLeftGroup && canFitRightGroup) {
      currentFamilyCount = 2;
    } else if (canFitLeftGroup || canFitRightGroup || canFitMiddleGroup) {
      currentFamilyCount = 1;
    }

    maximumFamilyGroups += currentFamilyCount;
  }

  return maximumFamilyGroups;
};
