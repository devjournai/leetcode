/**
 * Solve The Equation
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var solveEquation = function (equationInput) {
  const equationParts = equationInput.split("=");
  const leftPartStr = equationParts[0];
  const rightPartStr = equationParts[1];

  function processEquationPart(segmentToProcess) {
    let xCountCurrent = 0;
    let numberSumCurrent = 0;
    let currentDigitsValue = 0;
    let termSignFactor = 1;

    for (
      let iterationIdx = 0;
      iterationIdx < segmentToProcess.length;
      iterationIdx++
    ) {
      const currentCharInSegment = segmentToProcess[iterationIdx];

      if (currentCharInSegment === "x") {
        const isImplicitOneCoefficient =
          iterationIdx === 0 ||
          segmentToProcess[iterationIdx - 1] === "+" ||
          segmentToProcess[iterationIdx - 1] === "-";
        xCountCurrent +=
          termSignFactor *
          (currentDigitsValue === 0 && isImplicitOneCoefficient
            ? 1
            : currentDigitsValue);
        currentDigitsValue = 0;
      } else if (currentCharInSegment === "+" || currentCharInSegment === "-") {
        numberSumCurrent += termSignFactor * currentDigitsValue;
        termSignFactor = currentCharInSegment === "+" ? 1 : -1;
        currentDigitsValue = 0;
      } else {
        currentDigitsValue =
          currentDigitsValue * 10 + parseInt(currentCharInSegment, 10);
      }
    }
    numberSumCurrent += termSignFactor * currentDigitsValue;

    return { xAccumulator: xCountCurrent, numAccumulator: numberSumCurrent };
  }

  const leftResultObj = processEquationPart(leftPartStr);
  const rightResultObj = processEquationPart(rightPartStr);

  const lhsXTotal = leftResultObj.xAccumulator;
  const lhsNumberTotal = leftResultObj.numAccumulator;

  const rhsXTotal = rightResultObj.xAccumulator;
  const rhsNumberTotal = rightResultObj.numAccumulator;

  const combinedXCoeff = lhsXTotal - rhsXTotal;
  const combinedNumberValue = rhsNumberTotal - lhsNumberTotal;

  if (combinedXCoeff === 0) {
    if (combinedNumberValue === 0) {
      return "Infinite solutions";
    } else {
      return "No solution";
    }
  } else {
    const solutionResult = combinedNumberValue / combinedXCoeff;
    return `x=${solutionResult}`;
  }
};
