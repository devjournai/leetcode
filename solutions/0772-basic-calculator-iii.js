/**
 * Basic Calculator III
 * Intuition: Recursively parse with a shared `globalParseIndex`: expressions are sums of terms, terms are products/quotients of factors, and factors are integers or parenthesized expressions. Division truncates toward zero.
 * Approach: 1. `skipWhitespaceCharacters` advances over spaces. 2. `parseAtomicFactor` either consumes `(`, calls `evaluateCurrentExpression`, and skips `)`, or accumulates a decimal integer. 3. `processMultiplicationDivision` starts with a factor and while `*` or `/` applies `*=` or `Math.trunc` divide. 4. `evaluateCurrentExpression` folds `+`/`-` over those terms. Return the top-level evaluation.
 * Dry Run: s = "2*(5+5*2)/3+(6/2+8)".
 *   - Inner 5+5*2 = 15; 2*15/3 = 10; 6/2+8 = 11; 10+11 = 21.
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
