/**
 * Minimum Cost Tree From Leaf Values
 * Intuition: Each internal node costs max(left leaves)*max(right leaves). Greedily combine a leaf with the smaller of its nearest greater neighbors using a monotonic decreasing stack so expensive products are avoided.
 * Approach: 1. Push leaves onto a decreasing stack. 2. When the new leaf is >= stack top, pop the top and multiply it by min(new leaf, new stack top). 3. After the scan, drain the stack multiplying each popped value by the new top. 4. Sum of those products is the answer.
 * Dry Run: arr = [6,2,4].
 *   - Push 6, then 2. At 4, pop 2 and multiply by min(6,4)=4; cost 8. Stack [6,4].
 *   - Drain: pop 4 * 6 = 24. Total 32.
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
