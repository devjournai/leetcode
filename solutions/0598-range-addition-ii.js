/**
 * Range Addition II
 * Intuition: Every op increments the top-left `a×b` block. Cells that receive every increment form the intersection of those rectangles, i.e. min a by min b, so the max count is that area (or full m×n if ops is empty).
 * Approach: 1. Start `currentMinimumRow = m`, `currentMinimumCol = n`. 2. For each `currentOperationPair`, take min with `[0]` and `[1]`. 3. Return `currentMinimumRow * currentMinimumCol`.
 * Dry Run: m=3, n=3, ops=[[2,2],[3,3]].
 *   - Row min(3,2,3)=2, col min(3,2,3)=2. Area 4.
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
