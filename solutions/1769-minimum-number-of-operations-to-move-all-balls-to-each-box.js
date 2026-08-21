/**
 * Minimum Number Of Operations To Move All Balls To Each Box
 * Intuition: The cost at index 0 is the sum of all ball positions. Moving the target one step right changes the cost by (balls already on the left) minus (balls still on the right).
 * Approach: 1. Sum distances of every `'1'` to index 0 as `firstBoxTotalCost` and count balls. 2. Set `computedResults[0]`, `ballsPresentLeft = 0`, `ballsPresentRight = overallBallsCounter`. 3. For later indices, add left minus right, then if the box holds a ball move it from right to left. 4. Return `computedResults`.
 * Dry Run: boxes = "110".
 *   - Cost at 0 is 1. After processing box 0: left=1, right=1. Index 1: 1+1-1=1, then left=2, right=0. Index 2: 1+2-0=3. Return [1,1,3].
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
