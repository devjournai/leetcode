/**
 * Basic Calculator II
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var calculate = function (s) {
  const numericalStack = [];
  let currentNumberAccumulator = 0;
  let pendingOperator = "+";
  const totalLength = s.length;

  for (let loopIterator = 0; loopIterator < totalLength; loopIterator++) {
    const characterAtIterator = s[loopIterator];

    if (characterAtIterator >= "0" && characterAtIterator <= "9") {
      currentNumberAccumulator =
        currentNumberAccumulator * 10 +
        (characterAtIterator.charCodeAt(0) - "0".charCodeAt(0));
    }

    if (
      (characterAtIterator !== " " &&
        (characterAtIterator < "0" || characterAtIterator > "9")) ||
      loopIterator === totalLength - 1
    ) {
      if (pendingOperator === "+") {
        numericalStack.push(currentNumberAccumulator);
      } else if (pendingOperator === "-") {
        numericalStack.push(-currentNumberAccumulator);
      } else if (pendingOperator === "*") {
        const previousNumberValue = numericalStack.pop();
        numericalStack.push(previousNumberValue * currentNumberAccumulator);
      } else if (pendingOperator === "/") {
        const priorNumericalValue = numericalStack.pop();
        numericalStack.push(
          Math.trunc(priorNumericalValue / currentNumberAccumulator),
        );
      }
      pendingOperator = characterAtIterator;
      currentNumberAccumulator = 0;
    }
  }

  let finalSumResult = 0;
  for (let stackIndex = 0; stackIndex < numericalStack.length; stackIndex++) {
    finalSumResult += numericalStack[stackIndex];
  }

  return finalSumResult;
};
