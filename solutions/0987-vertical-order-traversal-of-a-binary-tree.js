/**
 * Vertical Order Traversal Of A Binary Tree
 * Intuition: BFS records (column, row, val), then sort by column, row, value and group into column lists.
 * Approach: 1. Queue `[node, row, col]` from root at (0,0). 2. Push left as col-1, right as col+1. 3. Sort `collectedNodesInfo` by those three keys. 4. Bucket consecutive same columns into `finalOutput`.
 * Dry Run: [3,9,20,null,null,15,7]. Nodes (col -1:9), (0:3 then 15), (1:20), (2:7). Output [[9],[3,15],[20],[7]].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var verticalTraversal = function (root) {
  if (!root) {
    return [];
  }

  const collectedNodesInfo = [];
  const traversalQueue = [[root, 0, 0]];

  while (traversalQueue.length > 0) {
    const currentItem = traversalQueue.shift();
    const currentTreeNode = currentItem[0];
    const currentRowPosition = currentItem[1];
    const currentColumnPosition = currentItem[2];

    collectedNodesInfo.push([
      currentColumnPosition,
      currentRowPosition,
      currentTreeNode.val,
    ]);

    if (currentTreeNode.left) {
      traversalQueue.push([
        currentTreeNode.left,
        currentRowPosition + 1,
        currentColumnPosition - 1,
      ]);
    }
    if (currentTreeNode.right) {
      traversalQueue.push([
        currentTreeNode.right,
        currentRowPosition + 1,
        currentColumnPosition + 1,
      ]);
    }
  }

  collectedNodesInfo.sort((firstElement, secondElement) => {
    if (firstElement[0] !== secondElement[0]) {
      return firstElement[0] - secondElement[0];
    }
    if (firstElement[1] !== secondElement[1]) {
      return firstElement[1] - secondElement[1];
    }
    return firstElement[2] - secondElement[2];
  });

  const finalOutput = [];
  let currentColumnData = [];
  let lastProcessedColumn = collectedNodesInfo[0][0];

  for (
    let indexValue = 0;
    indexValue < collectedNodesInfo.length;
    indexValue++
  ) {
    const nodeDetail = collectedNodesInfo[indexValue];
    const detailColumn = nodeDetail[0];
    const detailValue = nodeDetail[2];

    if (detailColumn !== lastProcessedColumn) {
      finalOutput.push(currentColumnData);
      currentColumnData = [detailValue];
      lastProcessedColumn = detailColumn;
    } else {
      currentColumnData.push(detailValue);
    }
  }

  finalOutput.push(currentColumnData);

  return finalOutput;
};
