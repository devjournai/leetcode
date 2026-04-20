/**
 * Minimum Number Of Operations To Move All Balls To Each Box
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minOperations = function (boxes) {
  const inputStringLength = boxes.length;
  let firstBoxTotalCost = 0;
  let overallBallsCounter = 0;

  for (let loopIndex = 0; loopIndex < inputStringLength; loopIndex++) {
    if (boxes[loopIndex] === "1") {
      firstBoxTotalCost += loopIndex;
      overallBallsCounter += 1;
    }
  }

  const computedResults = new Array(inputStringLength);
  computedResults[0] = firstBoxTotalCost;

  let ballsPresentLeft = 0;
  let ballsPresentRight = overallBallsCounter;

  for (
    let currentPositionIndex = 0;
    currentPositionIndex < inputStringLength;
    currentPositionIndex++
  ) {
    if (currentPositionIndex > 0) {
      computedResults[currentPositionIndex] =
        computedResults[currentPositionIndex - 1] +
        ballsPresentLeft -
        ballsPresentRight;
    }

    if (boxes[currentPositionIndex] === "1") {
      ballsPresentLeft += 1;
      ballsPresentRight -= 1;
    }
  }

  return computedResults;
};
