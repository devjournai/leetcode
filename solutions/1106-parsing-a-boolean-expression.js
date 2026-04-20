/**
 * Parsing A Boolean Expression
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
