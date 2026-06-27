/**
 * Closest Nodes Queries In A Binary Search Tree
 * Intuition: A Binary Search Tree (BST) naturally stores elements in a sorted manner. An in-order traversal of a BST will yield all its node values in ascending order. Once we have a sorted list of all values, finding the closest elements (mini and maxi) for any given query becomes a standard binary search problem on that sorted list.
 * Approach: 1. Perform an in-order traversal of the given binary search tree to collect all node values into a new array. This array will be sorted in ascending order. 2. Initialize an empty 2D array to store the results. 3. For each query in the input `queries` array, execute a binary search on the previously created sorted array of node values. 4. During the binary search for a specific query value:
 *    a. Maintain two variables: `minimumCandidate` initialized to -1 (for the largest value <= query) and `maximumCandidate` initialized to -1 (for the smallest value >= query).
 *    b. If an exact match for the query is found in the sorted array, then both `minimumCandidate` and `maximumCandidate` become the query value, and the search for this query can terminate.
 *    c. If a value in the sorted array is less than the query, it is a potential `minimumCandidate`, so update `minimumCandidate` and continue searching in the right half of the array.
 *    d. If a value in the sorted array is greater than the query, it is a potential `maximumCandidate`, so update `maximumCandidate` and continue searching in the left half of the array.
 * 5. After the binary search for a query completes, add the final `[minimumCandidate, maximumCandidate]` pair to the results array. 6. Return the accumulated results array.
 * Dry Run: root = [6,2,8,0,4,7,9,null,null,3,5], queries = [2,5,16]
 * 1. Initial Call: `closestNodes(treeRoot, inputQueries)`
 * 2. `sortedTreeValues = []`
 * 3. `traverseAndCollect(treeRoot)` starts:
 *    - Calls `traverseAndCollect(treeRoot.left)` -> `traverseAndCollect(2)`
 *      - Calls `traverseAndCollect(2.left)` -> `traverseAndCollect(0)`
 *        - Calls `traverseAndCollect(0.left)` (null) -> returns
 *        - `sortedTreeValues.push(0)` -> `sortedTreeValues = [0]`
 *        - Calls `traverseAndCollect(0.right)` (null) -> returns
 *      - `sortedTreeValues.push(2)` -> `sortedTreeValues = [0, 2]`
 *      - Calls `traverseAndCollect(2.right)` -> `traverseAndCollect(4)`
 *        - Calls `traverseAndCollect(4.left)` -> `traverseAndCollect(3)`
 *          - Calls `traverseAndCollect(3.left)` (null) -> returns
 *          - `sortedTreeValues.push(3)` -> `sortedTreeValues = [0, 2, 3]`
 *          - Calls `traverseAndCollect(3.right)` (null) -> returns
 *        - `sortedTreeValues.push(4)` -> `sortedTreeValues = [0, 2, 3, 4]`
 *        - Calls `traverseAndCollect(4.right)` -> `traverseAndCollect(5)`
 *          - Calls `traverseAndCollect(5.left)` (null) -> returns
 *          - `sortedTreeValues.push(5)` -> `sortedTreeValues = [0, 2, 3, 4, 5]`
 *          - Calls `traverseAndCollect(5.right)` (null) -> returns
 *    - `sortedTreeValues.push(6)` -> `sortedTreeValues = [0, 2, 3, 4, 5, 6]`
 *    - Calls `traverseAndCollect(treeRoot.right)` -> `traverseAndCollect(8)`
 *      - Calls `traverseAndCollect(8.left)` -> `traverseAndCollect(7)`
 *        - Calls `traverseAndCollect(7.left)` (null) -> returns
 *        - `sortedTreeValues.push(7)` -> `sortedTreeValues = [0, 2, 3, 4, 5, 6, 7]`
 *        - Calls `traverseAndCollect(7.right)` (null) -> returns
 *      - `sortedTreeValues.push(8)` -> `sortedTreeValues = [0, 2, 3, 4, 5, 6, 7, 8]`
 *      - Calls `traverseAndCollect(8.right)` -> `traverseAndCollect(9)`
 *        - Calls `traverseAndCollect(9.left)` (null) -> returns
 *        - `sortedTreeValues.push(9)` -> `sortedTreeValues = [0, 2, 3, 4, 5, 6, 7, 8, 9]`
 *        - Calls `traverseAndCollect(9.right)` (null) -> returns
 * 4. `answerCollection = []`
 * 5. Loop through `inputQueries = [2, 5, 16]`
 *    - **`queryIteration = 0`, `valueToSearch = 2`:**
 *      `minimumCandidate = -1`, `maximumCandidate = -1`
 *      `leftSearchBoundary = 0`, `rightSearchBoundary = 8`
 *      - `midPoint = 4`, `midVal = sortedTreeValues[4] = 5`. `midVal > valueToSearch`. `maximumCandidate = 5`. `rightSearchBoundary = 3`.
 *      - `midPoint = 1`, `midVal = sortedTreeValues[1] = 2`. `midVal === valueToSearch`.
 *        `minimumCandidate = 2`, `maximumCandidate = 2`. `break`.
 *      `answerCollection.push([2, 2])` -> `answerCollection = [[2, 2]]`
 *    - **`queryIteration = 1`, `valueToSearch = 5`:**
 *      `minimumCandidate = -1`, `maximumCandidate = -1`
 *      `leftSearchBoundary = 0`, `rightSearchBoundary = 8`
 *      - `midPoint = 4`, `midVal = sortedTreeValues[4] = 5`. `midVal === valueToSearch`.
 *        `minimumCandidate = 5`, `maximumCandidate = 5`. `break`.
 *      `answerCollection.push([5, 5])` -> `answerCollection = [[2, 2], [5, 5]]`
 *    - **`queryIteration = 2`, `valueToSearch = 16`:**
 *      `minimumCandidate = -1`, `maximumCandidate = -1`
 *      `leftSearchBoundary = 0`, `rightSearchBoundary = 8`
 *      - `midPoint = 4`, `midVal = sortedTreeValues[4] = 5`. `midVal < valueToSearch`. `minimumCandidate = 5`. `leftSearchBoundary = 5`.
 *      - `midPoint = 6`, `midVal = sortedTreeValues[6] = 7`. `midVal < valueToSearch`. `minimumCandidate = 7`. `leftSearchBoundary = 7`.
 *      - `midPoint = 7`, `midVal = sortedTreeValues[7] = 8`. `midVal < valueToSearch`. `minimumCandidate = 8`. `leftSearchBoundary = 8`.
 *      - `midPoint = 8`, `midVal = sortedTreeValues[8] = 9`. `midVal < valueToSearch`. `minimumCandidate = 9`. `leftSearchBoundary = 9`.
 *      - `leftSearchBoundary (9)` > `rightSearchBoundary (8)`. Loop ends.
 *      `answerCollection.push([9, -1])` -> `answerCollection = [[2, 2], [5, 5], [9, -1]]`
 * 6. Return `answerCollection`.
 * Time Complexity: O(N + Q log N)
 * Space Complexity: O(N + Q). O(N)
 */
var closestNodes = function (treeRoot, inputQueries) {
  const sortedTreeValues = [];

  function traverseAndCollect(currentNode) {
    if (!currentNode) {
      return;
    }
    traverseAndCollect(currentNode.left);
    sortedTreeValues.push(currentNode.val);
    traverseAndCollect(currentNode.right);
  }

  traverseAndCollect(treeRoot);

  const answerCollection = [];

  for (
    let queryIteration = 0;
    queryIteration < inputQueries.length;
    ++queryIteration
  ) {
    const valueToSearch = inputQueries[queryIteration];
    let minimumCandidate = -1;
    let maximumCandidate = -1;

    let leftSearchBoundary = 0;
    let rightSearchBoundary = sortedTreeValues.length - 1;

    while (leftSearchBoundary <= rightSearchBoundary) {
      const midPoint = Math.floor(
        (leftSearchBoundary + rightSearchBoundary) / 2,
      );
      const midVal = sortedTreeValues[midPoint];

      if (midVal === valueToSearch) {
        minimumCandidate = valueToSearch;
        maximumCandidate = valueToSearch;
        break;
      } else {
        if (midVal < valueToSearch) {
          minimumCandidate = midVal;
          leftSearchBoundary = midPoint + 1;
        } else {
          // midVal > valueToSearch
          maximumCandidate = midVal;
          rightSearchBoundary = midPoint - 1;
        }
      }
    }
    answerCollection.push([minimumCandidate, maximumCandidate]);
  }

  return answerCollection;
};
