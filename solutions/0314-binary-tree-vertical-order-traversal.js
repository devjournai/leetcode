/**
 * Binary Tree Vertical Order Traversal
 * Intuition: A node's column is parentColumn - 1 on the left and + 1 on the right. Level-order BFS visits top-to-bottom and left-to-right within a column.
 * Approach: 1. If root is null, return []. 2. BFS tuples [node, column]; record values in a map keyed by column and track min/max columns. 3. Enqueue left (column - 1) then right (column + 1). 4. Emit map lists from min column to max column.
 * Dry Run: root = [3, 9, 20, null, null, 15, 7].
 *   - (3, 0) then (9, -1), (20, 1), then (15, 0), (7, 2).
 *   - Columns -1..2 → [[9], [3, 15], [20], [7]].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var verticalOrder = function (root) {
  if (!root) {
    return [];
  }

  const columnValuesMap = new Map();
  const bfsQueue = [[root, 0]];
  let minColumnIndex = 0;
  let maxColumnIndex = 0;

  while (bfsQueue.length > 0) {
    const currentTuple = bfsQueue.shift();
    const currentNode = currentTuple[0];
    const currentColumn = currentTuple[1];
    const nodeValue = currentNode.val;

    if (!columnValuesMap.has(currentColumn)) {
      columnValuesMap.set(currentColumn, []);
    }
    columnValuesMap.get(currentColumn).push(nodeValue);

    if (currentNode.left) {
      const leftChildColumn = currentColumn - 1;
      const leftChildTuple = [currentNode.left, leftChildColumn];
      bfsQueue.push(leftChildTuple);
      minColumnIndex = Math.min(minColumnIndex, leftChildColumn);
    }

    if (currentNode.right) {
      const rightChildColumn = currentColumn + 1;
      const rightChildTuple = [currentNode.right, rightChildColumn];
      bfsQueue.push(rightChildTuple);
      maxColumnIndex = Math.max(maxColumnIndex, rightChildColumn);
    }
  }

  const finalResultArray = [];
  for (
    let columnIndexIterator = minColumnIndex;
    columnIndexIterator <= maxColumnIndex;
    columnIndexIterator++
  ) {
    if (columnValuesMap.has(columnIndexIterator)) {
      finalResultArray.push(columnValuesMap.get(columnIndexIterator));
    }
  }

  return finalResultArray;
};
