/**
 * Fraction Addition And Subtraction
 * Time Complexity: O(L)
 * Space Complexity: O(1)
 */
var fractionAddition = function (expression) {
  const computeGcd = (valueA, valueB) => {
    if (valueB === 0) {
      return valueA;
    }
    return computeGcd(valueB, valueA % valueB);
  };

  const allFractionParts = expression.match(/[+-]?\d+\/\d+/g);

  let resultNumerator = 0;
  let resultDenominator = 1;

  for (
    let currentFractionIndex = 0;
    currentFractionIndex < allFractionParts.length;
    currentFractionIndex++
  ) {
    let individualFraction = allFractionParts[currentFractionIndex];
    let fractionComponents = individualFraction.split("/");

    let currentFractionNumerator = Number(fractionComponents[0]);
    let currentFractionDenominator = Number(fractionComponents[1]);

    let newCalculatedNumerator =
      resultNumerator * currentFractionDenominator +
      currentFractionNumerator * resultDenominator;
    let newCalculatedDenominator =
      resultDenominator * currentFractionDenominator;

    resultNumerator = newCalculatedNumerator;
    resultDenominator = newCalculatedDenominator;

    let simplificationGcd = Math.abs(
      computeGcd(resultNumerator, resultDenominator),
    );
    resultNumerator /= simplificationGcd;
    resultDenominator /= simplificationGcd;
  }

  return `${resultNumerator}/${resultDenominator}`;
};
