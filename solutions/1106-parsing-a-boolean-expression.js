/**
 * Parsing A Boolean Expression
 * Intuition: Nested ! & | expressions evaluate with a stack: on ')' pop operands back to '(', then apply the operator just below. t/f become booleans; commas are ignored.
 * Approach: 1. Scan chars. 2. On ')', collect operands until '(', pop the operator. 3. Apply NOT/AND/OR and push the boolean. 4. Otherwise push t/f/operator/'('. 5. Return the last stack value.
 * Dry Run: &(t,f). Push &, (, t, f; on ')' AND them → false.
 * Time Complexity: O(L)
 * Space Complexity: O(L)
 */
var parseBoolExpr = function (expression) {
  const currentResultStack = [];

  for (let currentIndex = 0; currentIndex < expression.length; currentIndex++) {
    const characterAtCurrent = expression[currentIndex];

    if (characterAtCurrent === ")") {
      const poppedOperandsStorage = [];

      while (currentResultStack[currentResultStack.length - 1] !== "(") {
        const operandValue = currentResultStack.pop();
        poppedOperandsStorage.push(operandValue);
      }
      currentResultStack.pop();

      const operatorFromStack = currentResultStack.pop();

      if (operatorFromStack === "!") {
        const notExpressionResult = !poppedOperandsStorage[0];
        currentResultStack.push(notExpressionResult);
      } else if (operatorFromStack === "&") {
        let andEvaluationResult = true;
        for (
          let andOperandWalker = 0;
          andOperandWalker < poppedOperandsStorage.length;
          andOperandWalker++
        ) {
          const currentOperandValueAnd =
            poppedOperandsStorage[andOperandWalker];
          if (!currentOperandValueAnd) {
            andEvaluationResult = false;
            break;
          }
        }
        currentResultStack.push(andEvaluationResult);
      } else if (operatorFromStack === "|") {
        let orEvaluationResult = false;
        for (
          let orOperandWalker = 0;
          orOperandWalker < poppedOperandsStorage.length;
          orOperandWalker++
        ) {
          const currentOperandValueOr = poppedOperandsStorage[orOperandWalker];
          if (currentOperandValueOr) {
            orEvaluationResult = true;
            break;
          }
        }
        currentResultStack.push(orEvaluationResult);
      }
    } else if (characterAtCurrent !== ",") {
      if (characterAtCurrent === "t") {
        currentResultStack.push(true);
      } else if (characterAtCurrent === "f") {
        currentResultStack.push(false);
      } else {
        currentResultStack.push(characterAtCurrent);
      }
    }
  }

  return currentResultStack[0];
};
