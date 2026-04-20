/**
 * Binary Tree Vertical Order Traversal
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
    for (let columnIndexIterator = minColumnIndex; columnIndexIterator <= maxColumnIndex; columnIndexIterator++) {
        if (columnValuesMap.has(columnIndexIterator)) {
            finalResultArray.push(columnValuesMap.get(columnIndexIterator));
        }
    }

    return finalResultArray;
};