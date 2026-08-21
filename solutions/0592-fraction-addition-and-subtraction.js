/**
 * Fraction Addition And Subtraction
 * Intuition: Parse every signed `num/den` token, add them with a common denominator, and reduce by GCD after each addition so the running fraction stays simplified.
 * Approach: 1. `computeGcd` is Euclidean recursion. 2. `expression.match(/[+-]?\d+\/\d+/g)` yields `allFractionParts`. 3. Start at 0/1. For each part, split `/`, convert with `Number`, set numerator to `resultNumerator * currentFractionDenominator + currentFractionNumerator * resultDenominator` and denominator to the product. 4. Divide both by `Math.abs(computeGcd(...))`. 5. Return `` `${resultNumerator}/${resultDenominator}` ``.
 * Dry Run: expression = "-1/2+1/2".
 *   - First token: result = -1/2. Second: num = -1*2 + 1*2 = 0, den = 4; gcd 4 → 0/1. Return "0/1".
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
      computeGcd(resultNumerator, resultDenominator)
    );
    resultNumerator /= simplificationGcd;
    resultDenominator /= simplificationGcd;
  }

  return `${resultNumerator}/${resultDenominator}`;
};
