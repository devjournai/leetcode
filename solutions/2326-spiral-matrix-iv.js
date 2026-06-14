/**
 * Spiral Matrix Iv
 * Intuition: Simulate the spiral traversal by maintaining four boundary pointers (top, bottom, left, right) and iteratively filling the matrix in four directions (right, down, left, up). After each direction, update the corresponding boundary. Stop when boundaries cross or the linked list is exhausted.
 * Approach: 1. Initialize an m x n matrix with -1s. 2. Define `topBoundary`, `bottomBoundary`, `leftBoundary`, and `rightBoundary` to represent the current fillable area. 3. Iterate as long as the current boundaries define a valid area and there are nodes in the linked list. 4. In each iteration, fill the `topBoundary` row from left to right, then increment `topBoundary`. 5. Fill the `rightBoundary` column from top to bottom, then decrement `rightBoundary`. 6. If `topBoundary` is still less than or equal to `bottomBoundary`, fill the `bottomBoundary` row from right to left, then decrement `bottomBoundary`. 7. If `leftBoundary` is still less than or equal to `rightBoundary`, fill the `leftBoundary` column from bottom to top, then increment `leftBoundary`. 8. Crucially, in each step of filling, check if the current linked list node exists and advance it. 9. Return the filled matrix.
 * Dry Run: For m=3, n=3, head=[1,2,3,4,5,6,7,8,9]:
 *   Initial `resultMatrix = [[-1,-1,-1],[-1,-1,-1],[-1,-1,-1]]`.
 *   `topBoundary=0, bottomBoundary=2, leftBoundary=0, rightBoundary=2`. `currentLinkedListNode = Node(1)`.
 *   **Loop 1:** (`0<=2 && 0<=2 && Node(1)` is true)
 *     1. Right: `columnAdvance` from 0 to 2. `resultMatrix[0][0]=1, [0][1]=2, [0][2]=3`. `currentLinkedListNode=Node(4)`. `topBoundary` becomes 1.
 *        `resultMatrix = [[1,2,3],[-1,-1,-1],[-1,-1,-1]]`.
 *     2. Down: `rowDescent` from 1 to 2. `resultMatrix[1][2]=4, [2][2]=5`. `currentLinkedListNode=Node(6)`. `rightBoundary` becomes 1.
 *        `resultMatrix = [[1,2,3],[-1,-1,4],[-1,-1,5]]`.
 *     3. Left: (`1<=2` is true). `columnRetreat` from 1 to 0. `resultMatrix[2][1]=6, [2][0]=7`. `currentLinkedListNode=Node(8)`. `bottomBoundary` becomes 1.
 *        `resultMatrix = [[1,2,3],[-1,-1,4],[7,6,5]]`.
 *     4. Up: (`0<=1` is true). `rowAscent` from 1 to 1. `resultMatrix[1][0]=8`. `currentLinkedListNode=Node(9)`. `leftBoundary` becomes 1.
 *        `resultMatrix = [[1,2,3],[8,-1,4],[7,6,5]]`.
 *   **Loop 2:** (`1<=1 && 1<=1 && Node(9)` is true)
 *     1. Right: `columnAdvance` from 1 to 1. `resultMatrix[1][1]=9`. `currentLinkedListNode=null`. `topBoundary` becomes 2.
 *        `resultMatrix = [[1,2,3],[8,9,4],[7,6,5]]`.
 *     2. Down: (`rowDescent` from 2 to 1). Loop condition `rowDescent <= bottomBoundary` (2 <= 1) is false. Skip. `rightBoundary` becomes 0.
 *     3. Left: (`topBoundary <= bottomBoundary` (2 <= 1) is false). Skip.
 *     4. Up: (`leftBoundary <= rightBoundary` (1 <= 0) is false). Skip.
 *   **Loop 3:** (`topBoundary <= bottomBoundary` (2 <= 1) is false). Loop terminates.
 *   Return `[[1,2,3],[8,9,4],[7,6,5]]`.
 * Time Complexity: O(m * n)
 * Space Complexity: O(m * n)
 */
var spiralMatrix = function (m, n, head) {
  const resultMatrix = new Array(m).fill().map(() => new Array(n).fill(-1));

  let topBoundary = 0;
  let bottomBoundary = m - 1;
  let leftBoundary = 0;
  let rightBoundary = n - 1;

  let currentLinkedListNode = head;

  while (
    topBoundary <= bottomBoundary &&
    leftBoundary <= rightBoundary &&
    currentLinkedListNode
  ) {
    // Traverse right
    for (
      let columnAdvance = leftBoundary;
      columnAdvance <= rightBoundary && currentLinkedListNode;
      columnAdvance++
    ) {
      resultMatrix[topBoundary][columnAdvance] = currentLinkedListNode.val;
      currentLinkedListNode = currentLinkedListNode.next;
    }
    topBoundary++;

    // Traverse down
    for (
      let rowDescent = topBoundary;
      rowDescent <= bottomBoundary && currentLinkedListNode;
      rowDescent++
    ) {
      resultMatrix[rowDescent][rightBoundary] = currentLinkedListNode.val;
      currentLinkedListNode = currentLinkedListNode.next;
    }
    rightBoundary--;

    // Traverse left
    if (topBoundary <= bottomBoundary) {
      for (
        let columnRetreat = rightBoundary;
        columnRetreat >= leftBoundary && currentLinkedListNode;
        columnRetreat--
      ) {
        resultMatrix[bottomBoundary][columnRetreat] = currentLinkedListNode.val;
        currentLinkedListNode = currentLinkedListNode.next;
      }
      bottomBoundary--;
    }

    // Traverse up
    if (leftBoundary <= rightBoundary) {
      for (
        let rowAscent = bottomBoundary;
        rowAscent >= topBoundary && currentLinkedListNode;
        rowAscent--
      ) {
        resultMatrix[rowAscent][leftBoundary] = currentLinkedListNode.val;
        currentLinkedListNode = currentLinkedListNode.next;
      }
      leftBoundary++;
    }
  }

  return resultMatrix;
};
