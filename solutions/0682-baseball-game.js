/**
 * Baseball Game
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
