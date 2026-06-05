/**
 * Minimize Result By Adding Parentheses To Expression
 * Intuition: The problem constraints are very small (expression length up to 10), allowing for a brute-force approach. We need to find the optimal placement for a pair of parentheses, where the left parenthesis is before the '+' sign and the right parenthesis is after the '+' sign. This means we can split the first number into a prefix and a suffix (the suffix is inside parentheses), and similarly split the second number into a prefix and a suffix (the prefix is inside parentheses).
 * Approach: 1. First, locate the '+' operator to split the expression into two number strings, let's call them `firstNumberStr` and `secondNumberStr`. 2. Initialize a `minimumCalculatedValue` to infinity and an empty string `bestResultExpression`. 3. Iterate through all possible split points for `firstNumberStr`. Let `leftSplitIndex` be the index where `firstNumberStr` is split. The part before `leftSplitIndex` becomes the `outerLeftMultiplier`, and the part from `leftSplitIndex` onwards becomes `innerLeftOperand`. 4. For each `leftSplitIndex`, iterate through all possible split points for `secondNumberStr`. Let `rightSplitIndex` be the index where `secondNumberStr` is split. The part up to `rightSplitIndex` (exclusive) becomes `innerRightOperand`, and the part from `rightSplitIndex` onwards becomes `outerRightMultiplier`. 5. Calculate the current expression's value: `outerLeftMultiplier * (innerLeftOperand + innerRightOperand) * outerRightMultiplier`. Remember to handle cases where `outerLeftMultiplier` or `outerRightMultiplier` are empty strings by treating them as `1`. 6. If the `currentCalculatedValue` is less than `minimumCalculatedValue`, update `minimumCalculatedValue` and store the corresponding formatted expression string in `bestResultExpression`. 7. After checking all combinations, return `bestResultExpression`.
 * Dry Run: expression = "12+34"
 *   additionOperatorIndex = 2
 *   firstNumberStr = "12"
 *   secondNumberStr = "34"
 *   minimumCalculatedValue = Infinity
 *   bestResultExpression = ""
 *
 *   leftSplitIndex = 0: (parentheses start before '1')
 *     rightSplitIndex = 1: (parentheses end after '3')
 *       outerLeftMultiplier = 1 (from "12".slice(0,0))
 *       innerLeftOperand = 12 (from "12".slice(0))
 *       innerRightOperand = 3 (from "34".slice(0,1))
 *       outerRightMultiplier = 4 (from "34".slice(1))
 *       currentCalculatedValue = 1 * (12 + 3) * 4 = 1 * 15 * 4 = 60
 *       minimumCalculatedValue = 60, bestResultExpression = "(12+3)4"
 *     rightSplitIndex = 2: (parentheses end after '34')
 *       outerLeftMultiplier = 1
 *       innerLeftOperand = 12
 *       innerRightOperand = 34 (from "34".slice(0,2))
 *       outerRightMultiplier = 1 (from "34".slice(2))
 *       currentCalculatedValue = 1 * (12 + 34) * 1 = 1 * 46 * 1 = 46
 *       minimumCalculatedValue = 46, bestResultExpression = "(12+34)"
 *
 *   leftSplitIndex = 1: (parentheses start after '1')
 *     rightSplitIndex = 1: (parentheses end after '3')
 *       outerLeftMultiplier = 1 (from "12".slice(0,1))
 *       innerLeftOperand = 2 (from "12".slice(1))
 *       innerRightOperand = 3
 *       outerRightMultiplier = 4
 *       currentCalculatedValue = 1 * (2 + 3) * 4 = 1 * 5 * 4 = 20
 *       minimumCalculatedValue = 20, bestResultExpression = "1(2+3)4"
 *     rightSplitIndex = 2: (parentheses end after '34')
 *       outerLeftMultiplier = 1
 *       innerLeftOperand = 2
 *       innerRightOperand = 34
 *       outerRightMultiplier = 1
 *       currentCalculatedValue = 1 * (2 + 34) * 1 = 1 * 36 * 1 = 36
 *       minimumCalculatedValue = 20 (still 20), bestResultExpression = "1(2+3)4"
 *
 *   Return "1(2+3)4"
 * Time Complexity: O(L^3)
 * Space Complexity: O(L)
 */
var minimizeResult = function (expression) {
  const additionOperatorIndex = expression.indexOf("+");
  const firstNumberStr = expression.slice(0, additionOperatorIndex);
  const secondNumberStr = expression.slice(additionOperatorIndex + 1);

  let minimumCalculatedValue = Infinity;
  let bestResultExpression = "";

  for (
    let leftSplitIndex = 0;
    leftSplitIndex < firstNumberStr.length;
    leftSplitIndex++
  ) {
    for (
      let rightSplitIndex = 1;
      rightSplitIndex <= secondNumberStr.length;
      rightSplitIndex++
    ) {
      const outerLeftMultiplierStr = firstNumberStr.slice(0, leftSplitIndex);
      const innerLeftOperandStr = firstNumberStr.slice(leftSplitIndex);
      const innerRightOperandStr = secondNumberStr.slice(0, rightSplitIndex);
      const outerRightMultiplierStr = secondNumberStr.slice(rightSplitIndex);

      const outerLeftValue =
        outerLeftMultiplierStr === ""
          ? 1
          : parseInt(outerLeftMultiplierStr, 10);
      const innerLeftValue = parseInt(innerLeftOperandStr, 10);
      const innerRightValue = parseInt(innerRightOperandStr, 10);
      const outerRightValue =
        outerRightMultiplierStr === ""
          ? 1
          : parseInt(outerRightMultiplierStr, 10);

      const currentCalculatedValue =
        outerLeftValue * (innerLeftValue + innerRightValue) * outerRightValue;

      if (currentCalculatedValue < minimumCalculatedValue) {
        minimumCalculatedValue = currentCalculatedValue;
        bestResultExpression = `${outerLeftMultiplierStr}(${innerLeftOperandStr}+${innerRightOperandStr})${outerRightMultiplierStr}`;
      }
    }
  }

  return bestResultExpression;
};
