/**
 * Minimum Cost Tree From Leaf Values
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var mctFromLeafValues = function (arrInput) {
  let containerStack = [];
  let cumulativeSum = 0;

  for (let loopIndex = 0; loopIndex < arrInput.length; loopIndex++) {
    let arrayElement = arrInput[loopIndex];

    while (
      containerStack.length > 0 &&
      containerStack[containerStack.length - 1] <= arrayElement
    ) {
      let extractedValue = containerStack.pop();
      let leftBoundary = containerStack[containerStack.length - 1];
      let rightBoundary = arrayElement;
      let productFactor = Math.min(leftBoundary || Infinity, rightBoundary);
      cumulativeSum += extractedValue * productFactor;
    }
    containerStack.push(arrayElement);
  }

  if (containerStack.length > 1) {
    do {
      let finalPopped = containerStack.pop();
      let stackTopRemaining = containerStack[containerStack.length - 1];
      cumulativeSum += finalPopped * stackTopRemaining;
    } while (containerStack.length > 1);
  }

  return cumulativeSum;
};
