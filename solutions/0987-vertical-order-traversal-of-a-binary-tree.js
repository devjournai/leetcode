/**
 * Vertical Order Traversal Of A Binary Tree
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
