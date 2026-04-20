/**
 * Range Addition II
 * Time Complexity: O(ops.length)
 * Space Complexity: O(1)
 */
var maxCount = function (m, n, ops) {
  let currentMinimumRow = m;
  let currentMinimumCol = n;

  for (
    let operationIterator = 0;
    operationIterator < ops.length;
    operationIterator++
  ) {
    let currentOperationPair = ops[operationIterator];
    let operationRowLimit = currentOperationPair[0];
    let operationColLimit = currentOperationPair[1];

    currentMinimumRow = Math.min(currentMinimumRow, operationRowLimit);
    currentMinimumCol = Math.min(currentMinimumCol, operationColLimit);
  }

  let resultArea = currentMinimumRow * currentMinimumCol;
  return resultArea;
};
