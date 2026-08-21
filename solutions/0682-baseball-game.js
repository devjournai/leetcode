/**
 * Baseball Game
 * Intuition: Scores are a stack: integers push, "C" pops, "D" doubles the last, "+" sums the last two. The answer is the final stack sum.
 * Approach: 1. Walk `operationsList` mutating `scoreRecord`. 2. After all ops, sum every remaining score.
 * Dry Run: ops=["5","2","C","D","+"]. stack: [5]→[5,2]→[5]→[5,10]→[5,10,15]. totalScore=30.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var calPoints = function (operationsList) {
  const scoreRecord = [];

  for (
    let currentOperationIndex = 0;
    currentOperationIndex < operationsList.length;
    currentOperationIndex++
  ) {
    const currentOperation = operationsList[currentOperationIndex];

    if (currentOperation === "C") {
      scoreRecord.pop();
    } else if (currentOperation === "D") {
      const previousScore = scoreRecord[scoreRecord.length - 1];
      scoreRecord.push(previousScore * 2);
    } else if (currentOperation === "+") {
      const firstPreviousScore = scoreRecord[scoreRecord.length - 1];
      const secondPreviousScore = scoreRecord[scoreRecord.length - 2];
      scoreRecord.push(firstPreviousScore + secondPreviousScore);
    } else {
      scoreRecord.push(parseInt(currentOperation));
    }
  }

  let totalScore = 0;
  for (
    let currentScoreIndex = 0;
    currentScoreIndex < scoreRecord.length;
    currentScoreIndex++
  ) {
    const currentScoreValue = scoreRecord[currentScoreIndex];
    totalScore += currentScoreValue;
  }

  return totalScore;
};
