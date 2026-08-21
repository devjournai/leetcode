/**
 * Maximum Students Taking Exam
 * Intuition: Seats in a row are a bitmask. No adjacent seats in-row or diagonally to the previous row. DP over row and previous mask.
 * Approach: 1. Valid mask: no '#', no neighboring 1s, no diagonal clash with previous mask. 2. Recurse row by row trying all 2^cols masks, add popcount. 3. Memo (row, prevMask). 4. Start from row 0 with prev 0.
 * Dry Run: seats = [["#",".","#","#",".","#"],[".","#","#","#","#","."],["#",".","#","#",".","#"]]. Max students 4.
 * Time Complexity: O(m * 4^n * n)
 * Space Complexity: O(m * 2^n)
 */
var maxStudents = function (seats) {
  const totalRows = seats.length;
  const totalCols = seats[0].length;
  const memoStore = new Map();

  const checkConfigurationValidity = (
    rowUnderValidation,
    currentMaskToCheck,
    previousMaskUsed
  ) => {
    for (let columnIndex = 0; columnIndex < totalCols; columnIndex++) {
      if (!(currentMaskToCheck & (1 << columnIndex))) {
        continue;
      }

      if (seats[rowUnderValidation][columnIndex] === "#") {
        return false;
      }

      const leftNeighborCheck =
        columnIndex > 0 && currentMaskToCheck & (1 << (columnIndex - 1));
      const rightNeighborCheck =
        columnIndex < totalCols - 1 &&
        currentMaskToCheck & (1 << (columnIndex + 1));

      if (leftNeighborCheck || rightNeighborCheck) {
        return false;
      }

      const upperLeftCheck =
        columnIndex > 0 && previousMaskUsed & (1 << (columnIndex - 1));
      const upperRightCheck =
        columnIndex < totalCols - 1 &&
        previousMaskUsed & (1 << (columnIndex + 1));

      if (upperLeftCheck || upperRightCheck) {
        return false;
      }
    }
    return true;
  };

  const countOnesInMask = (inputMask) => {
    let onesCount = 0;
    let temporaryMask = inputMask;
    while (temporaryMask > 0) {
      if (temporaryMask & 1) {
        onesCount++;
      }
      temporaryMask >>= 1;
    }
    return onesCount;
  };

  const calculateMax = (currentProcessingRowIdx, previousRowConfiguration) => {
    if (currentProcessingRowIdx === totalRows) {
      return 0;
    }

    const memoizationKey = `${currentProcessingRowIdx},${previousRowConfiguration}`;
    if (memoStore.has(memoizationKey)) {
      return memoStore.get(memoizationKey);
    }

    let maximumCountForSubproblem = 0;
    const maxMaskValue = 1 << totalCols;

    for (
      let currentMaskOption = 0;
      currentMaskOption < maxMaskValue;
      currentMaskOption++
    ) {
      if (
        !checkConfigurationValidity(
          currentProcessingRowIdx,
          currentMaskOption,
          previousRowConfiguration
        )
      ) {
        continue;
      }

      const currentStudentsInRow = countOnesInMask(currentMaskOption);
      const recursiveOutcome = calculateMax(
        currentProcessingRowIdx + 1,
        currentMaskOption
      );
      maximumCountForSubproblem = Math.max(
        maximumCountForSubproblem,
        currentStudentsInRow + recursiveOutcome
      );
    }

    memoStore.set(memoizationKey, maximumCountForSubproblem);
    return maximumCountForSubproblem;
  };

  const ultimateResult = calculateMax(0, 0);
  return ultimateResult;
};
