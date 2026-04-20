/**
 * Decrease Elements To Make Array Zigzag
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var movesToMakeZigzag = function (nums) {
  function calculateMovesForEvenPeaks(initialNumbers) {
    let totalMovesFirstType = 0;
    let tempArrayFirstType = [...initialNumbers];

    for (
      let currentPositionFirst = 0;
      currentPositionFirst < tempArrayFirstType.length;
      currentPositionFirst++
    ) {
      if (currentPositionFirst % 2 === 0) {
        if (currentPositionFirst > 0) {
          let valueNeededLeft = tempArrayFirstType[currentPositionFirst] - 1;
          if (tempArrayFirstType[currentPositionFirst - 1] >= valueNeededLeft) {
            totalMovesFirstType +=
              tempArrayFirstType[currentPositionFirst - 1] - valueNeededLeft;
            tempArrayFirstType[currentPositionFirst - 1] = valueNeededLeft;
          }
        }

        if (currentPositionFirst < tempArrayFirstType.length - 1) {
          let valueNeededRight = tempArrayFirstType[currentPositionFirst] - 1;
          if (
            tempArrayFirstType[currentPositionFirst + 1] >= valueNeededRight
          ) {
            totalMovesFirstType +=
              tempArrayFirstType[currentPositionFirst + 1] - valueNeededRight;
            tempArrayFirstType[currentPositionFirst + 1] = valueNeededRight;
          }
        }
      } else {
        let leftComparisonValue =
          currentPositionFirst > 0
            ? tempArrayFirstType[currentPositionFirst - 1]
            : Infinity;
        let rightComparisonValue =
          currentPositionFirst < tempArrayFirstType.length - 1
            ? tempArrayFirstType[currentPositionFirst + 1]
            : Infinity;

        let minimumTargetValue =
          Math.min(leftComparisonValue, rightComparisonValue) - 1;
        if (tempArrayFirstType[currentPositionFirst] >= minimumTargetValue) {
          totalMovesFirstType +=
            tempArrayFirstType[currentPositionFirst] - minimumTargetValue;
          tempArrayFirstType[currentPositionFirst] = minimumTargetValue;
        }
      }
    }
    return totalMovesFirstType;
  }

  function calculateMovesForOddPeaks(initialNumbers) {
    let totalMovesSecondType = 0;
    let tempArraySecondType = [...initialNumbers];

    for (
      let currentPositionSecond = 0;
      currentPositionSecond < tempArraySecondType.length;
      currentPositionSecond++
    ) {
      if (currentPositionSecond % 2 !== 0) {
        if (currentPositionSecond > 0) {
          let requiredLeftAmount =
            tempArraySecondType[currentPositionSecond] - 1;
          if (
            tempArraySecondType[currentPositionSecond - 1] >= requiredLeftAmount
          ) {
            totalMovesSecondType +=
              tempArraySecondType[currentPositionSecond - 1] -
              requiredLeftAmount;
            tempArraySecondType[currentPositionSecond - 1] = requiredLeftAmount;
          }
        }

        if (currentPositionSecond < tempArraySecondType.length - 1) {
          let requiredRightAmount =
            tempArraySecondType[currentPositionSecond] - 1;
          if (
            tempArraySecondType[currentPositionSecond + 1] >=
            requiredRightAmount
          ) {
            totalMovesSecondType +=
              tempArraySecondType[currentPositionSecond + 1] -
              requiredRightAmount;
            tempArraySecondType[currentPositionSecond + 1] =
              requiredRightAmount;
          }
        }
      } else {
        let neighborCheckLeft =
          currentPositionSecond > 0
            ? tempArraySecondType[currentPositionSecond - 1]
            : Infinity;
        let neighborCheckRight =
          currentPositionSecond < tempArraySecondType.length - 1
            ? tempArraySecondType[currentPositionSecond + 1]
            : Infinity;

        let optimalValueSecond =
          Math.min(neighborCheckLeft, neighborCheckRight) - 1;
        if (tempArraySecondType[currentPositionSecond] >= optimalValueSecond) {
          totalMovesSecondType +=
            tempArraySecondType[currentPositionSecond] - optimalValueSecond;
          tempArraySecondType[currentPositionSecond] = optimalValueSecond;
        }
      }
    }
    return totalMovesSecondType;
  }

  const movesWhenEvenArePeaks = calculateMovesForEvenPeaks(nums);
  const movesWhenOddArePeaks = calculateMovesForOddPeaks(nums);

  return Math.min(movesWhenEvenArePeaks, movesWhenOddArePeaks);
};
