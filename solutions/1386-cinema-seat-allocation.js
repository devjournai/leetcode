/**
 * Cinema Seat Allocation
 *
 * Intuition:
 *
 * Each family needs 4 consecutive seats.
 *
 * The possible groups of 4 seats are:
 *
 *     Left:
 *     [2, 3, 4, 5]
 *
 *     Middle:
 *     [4, 5, 6, 7]
 *
 *     Right:
 *     [6, 7, 8, 9]
 *
 * ------------------------------------------------------------
 *
 * A row without any reserved seats can always accommodate
 * 2 families:
 *
 *     [2,3,4,5] + [6,7,8,9]
 *
 * Therefore, we first assume every row can accommodate 2
 * families.
 *
 * For rows containing reserved seats, we need to check the
 * three possible groups.
 *
 * ------------------------------------------------------------
 *
 * If both the left and right groups are available:
 *
 *     [2,3,4,5] [6,7,8,9]
 *
 * We can place 2 families.
 *
 * Otherwise, if at least one of:
 *
 *     left
 *     middle
 *     right
 *
 * is available, we can place 1 family.
 *
 * Otherwise, we cannot place any family in that row.
 *
 * ------------------------------------------------------------
 *
 * Important:
 *
 * We only need to process rows that actually contain reserved
 * seats.
 *
 * If there are R reserved rows, the remaining:
 *
 *     totalRows - R
 *
 * rows are completely empty and contribute:
 *
 *     2 * (totalRows - R)
 *
 * families.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 *     n = 3
 *
 *     reserved = [[1,2]]
 *
 * Row 1:
 *
 *     left group -> unavailable
 *     middle      -> available
 *     right       -> available
 *
 * We can place 1 family in row 1.
 *
 * Rows 2 and 3 are empty:
 *
 *     2 + 2 = 4 families
 *
 * Total:
 *
 *     5
 *
 * ------------------------------------------------------------
 *
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
