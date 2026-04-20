/**
 * Basic Calculator III
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var calculate = function (s) {
  let globalParseIndex = 0;
  const inputExpressionString = s;

  const skipWhitespaceCharacters = () => {
    while (
      globalParseIndex < inputExpressionString.length &&
      inputExpressionString[globalParseIndex] === " "
    ) {
      globalParseIndex++;
    }
  };

  const parseAtomicFactor = () => {
    skipWhitespaceCharacters();
    let currentFactorValue = 0;

    if (inputExpressionString[globalParseIndex] === "(") {
      globalParseIndex++;
      const recursiveExpressionResult = evaluateCurrentExpression();
      globalParseIndex++;
      return recursiveExpressionResult;
    }

    while (
      globalParseIndex < inputExpressionString.length &&
      inputExpressionString[globalParseIndex] >= "0" &&
      inputExpressionString[globalParseIndex] <= "9"
    ) {
      currentFactorValue =
        currentFactorValue * 10 +
        parseInt(inputExpressionString[globalParseIndex]);
      globalParseIndex++;
    }
    return currentFactorValue;
  };

  const processMultiplicationDivision = () => {
    let termSubtotal = parseAtomicFactor();

    while (globalParseIndex < inputExpressionString.length) {
      skipWhitespaceCharacters();
      const operationSign = inputExpressionString[globalParseIndex];
      if (operationSign !== "*" && operationSign !== "/") {
        break;
      }
      globalParseIndex++;

      const subsequentFactor = parseAtomicFactor();
      if (operationSign === "*") {
        termSubtotal *= subsequentFactor;
      } else {
        termSubtotal = Math.trunc(termSubtotal / subsequentFactor);
      }
    }
    return termSubtotal;
  };

  const evaluateCurrentExpression = () => {
    let expressionRunningTotal = processMultiplicationDivision();

    while (globalParseIndex < inputExpressionString.length) {
      skipWhitespaceCharacters();
      const expressionOperationChar = inputExpressionString[globalParseIndex];
      if (expressionOperationChar !== "+" && expressionOperationChar !== "-") {
        break;
      }
      globalParseIndex++;

      const nextTermComponent = processMultiplicationDivision();
      if (expressionOperationChar === "+") {
        expressionRunningTotal += nextTermComponent;
      } else {
        expressionRunningTotal -= nextTermComponent;
      }
    }
    return expressionRunningTotal;
  };

  return evaluateCurrentExpression();
};
