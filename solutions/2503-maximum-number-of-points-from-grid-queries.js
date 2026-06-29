/**
 * Maximum Number Of Points From Grid Queries
 * Intuition: The problem involves finding reachable cells based on query thresholds. Since a larger query value allows more cells to be visited (monotonically), processing queries in increasing order of their values, while incrementally expanding the set of reachable cells using a min-priority queue (similar to Dijkstra's algorithm or a multi-source BFS on cell values), is an efficient approach. Cells with smaller values in the grid are prioritized, ensuring that for a given query, all cells whose values are strictly less than the query value and are reachable from (0,0) are considered.
 * Approach: 1. Initialize an array to store results for each query. Map the original queries to objects containing their value and original index, then sort these objects by query value. 2. Set up a Min-Priority Queue to store `[row, col]` pairs, prioritized by `grid[row][col]`. Initialize it with the starting cell `[0,0]` and add `"0,0"` to a `Set` for visited cells. 3. Maintain `currentPoints` (count of cells processed so far) and `currentQueryIterator` (index for the sorted queries). 4. In a main loop, while the priority queue is not empty: a. Dequeue the cell `[currentRow, currentCol]` with the smallest `grid[currentRow][currentCol]` value. b. While `currentQueryIterator` points to a query whose value is less than or equal to `grid[currentRow][currentCol]`: assign `currentPoints` to its result position and advance `currentQueryIterator`. This means these queries cannot strictly exceed the current cell's value. c. If all queries have been processed, break the loop. d. Increment `currentPoints` (as the current cell now qualifies for the active query and subsequent ones). e. Explore neighbors of `[currentRow, currentCol]`: if a neighbor is within bounds and unvisited, add it to the `visitedCells` set and enqueue it into the priority queue. 5. After the main loop, if any queries remain unprocessed, assign them the final `currentPoints` count. 6. Return the result array.
 * Dry Run: grid = [[1,2],[3,4]], queries = [2, 1, 5]
 * 1. Initialize: `resultArray = [0,0,0]`. `sortedQueryObjects = [{queryItemValue: 1, originalQueryIndex: 1}, {queryItemValue: 2, originalQueryIndex: 0}, {queryItemValue: 5, originalQueryIndex: 2}]`. `priorityQueue` contains `([0,0] -> value 1)`. `visitedCells = {'0,0'}`. `currentPoints = 0`, `currentQueryIterator = 0`.
 * 2. Main Loop:
 *    - Dequeue `[0,0]` (`cellValue = 1`).
 *      - `currentQueryIterator = 0`, `sortedQueryObjects[0]` is `{1,1}`. `cellValue (1) >= sortedQueryObjects[0].queryItemValue (1)` is true. `resultArray[1] = 0`. `currentQueryIterator = 1`.
 *      - `currentQueryIterator = 1`, `sortedQueryObjects[1]` is `{2,0}`. `cellValue (1) >= sortedQueryObjects[1].queryItemValue (2)` is false.
 *      - `currentPoints = 1`. Explore neighbors of `[0,0]`: Enqueue `[0,1]` (val 2), `[1,0]` (val 3). `visitedCells = {'0,0', '0,1', '1,0'}`.
 *    - Dequeue `[0,1]` (`cellValue = 2`).
 *      - `currentQueryIterator = 1`, `sortedQueryObjects[1]` is `{2,0}`. `cellValue (2) >= sortedQueryObjects[1].queryItemValue (2)` is true. `resultArray[0] = 1`. `currentQueryIterator = 2`.
 *      - `currentQueryIterator = 2`, `sortedQueryObjects[2]` is `{5,2}`. `cellValue (2) >= sortedQueryObjects[2].queryItemValue (5)` is false.
 *      - `currentPoints = 2`. Explore neighbors of `[0,1]`: Enqueue `[1,1]` (val 4). `visitedCells = {'0,0', '0,1', '1,0', '1,1'}`.
 *    - Dequeue `[1,0]` (`cellValue = 3`).
 *      - `currentQueryIterator = 2`, `sortedQueryObjects[2]` is `{5,2}`. `cellValue (3) >= sortedQueryObjects[2].queryItemValue (5)` is false.
 *      - `currentPoints = 3`. Explore neighbors of `[1,0]`: All visited or out of bounds.
 *    - Dequeue `[1,1]` (`cellValue = 4`).
 *      - `currentQueryIterator = 2`, `sortedQueryObjects[2]` is `{5,2}`. `cellValue (4) >= sortedQueryObjects[2].queryItemValue (5)` is false.
 *      - `currentPoints = 4`. Explore neighbors of `[1,1]`: All visited or out of bounds.
 *    - Priority queue is empty. Main loop ends.
 * 3. Handle Remaining Queries: `currentQueryIterator = 2 < sortedQueryObjects.length (3)`.
 *    - `resultArray[2] = currentPoints (4)`. `currentQueryIterator = 3`.
 * 4. Return `resultArray = [1,0,4]`.
 * Time Complexity: O(K log K + MN log(MN))
 * Space Complexity: O(K + MN)
 */
var maxPoints = function (gridInput, queryInput) {
  class MinPriorityQueue {
    constructor(accessorFunc) {
      this.heapArray = [];
      this.valueAccessor = accessorFunc || ((element) => element);
    }

    getHeapParentIndex(idxCurrent) {
      return Math.floor((idxCurrent - 1) / 2);
    }

    getHeapLeftChildIndex(idxCurrent) {
      return 2 * idxCurrent + 1;
    }

    getHeapRightChildIndex(idxCurrent) {
      return 2 * idxCurrent + 2;
    }

    checkHasParent(idxCurrent) {
      return this.getHeapParentIndex(idxCurrent) >= 0;
    }

    checkHasLeftChild(idxCurrent) {
      return this.getHeapLeftChildIndex(idxCurrent) < this.heapArray.length;
    }

    checkHasRightChild(idxCurrent) {
      return this.getHeapRightChildIndex(idxCurrent) < this.heapArray.length;
    }

    getHeapParent(idxCurrent) {
      return this.heapArray[this.getHeapParentIndex(idxCurrent)];
    }

    getHeapLeftChild(idxCurrent) {
      return this.heapArray[this.getHeapLeftChildIndex(idxCurrent)];
    }

    getHeapRightChild(idxCurrent) {
      return this.heapArray[this.getHeapRightChildIndex(idxCurrent)];
    }

    swapHeapElements(idxOne, idxTwo) {
      [this.heapArray[idxOne], this.heapArray[idxTwo]] = [
        this.heapArray[idxTwo],
        this.heapArray[idxOne],
      ];
    }

    queueSize() {
      return this.heapArray.length;
    }

    peekMin() {
      if (this.heapArray.length === 0) return null;
      return this.heapArray[0];
    }

    enqueueElement(elementToadd) {
      this.heapArray.push(elementToadd);
      this.heapifyUpward();
    }

    dequeueMinElement() {
      if (this.heapArray.length === 0) return null;
      if (this.heapArray.length === 1) return this.heapArray.pop();

      const minimumElement = this.heapArray[0];
      this.heapArray[0] = this.heapArray.pop();
      this.heapifyDownward();
      return minimumElement;
    }

    heapifyUpward() {
      let currentElementIndex = this.heapArray.length - 1;
      while (
        this.checkHasParent(currentElementIndex) &&
        this.valueAccessor(this.getHeapParent(currentElementIndex)) >
          this.valueAccessor(this.heapArray[currentElementIndex])
      ) {
        this.swapHeapElements(
          this.getHeapParentIndex(currentElementIndex),
          currentElementIndex,
        );
        currentElementIndex = this.getHeapParentIndex(currentElementIndex);
      }
    }

    heapifyDownward() {
      let currentElementIndex = 0;
      while (this.checkHasLeftChild(currentElementIndex)) {
        let smallerChildIndex = this.getHeapLeftChildIndex(currentElementIndex);
        if (
          this.checkHasRightChild(currentElementIndex) &&
          this.valueAccessor(this.getHeapRightChild(currentElementIndex)) <
            this.valueAccessor(this.getHeapLeftChild(currentElementIndex))
        ) {
          smallerChildIndex = this.getHeapRightChildIndex(currentElementIndex);
        }

        if (
          this.valueAccessor(this.heapArray[currentElementIndex]) <
          this.valueAccessor(this.heapArray[smallerChildIndex])
        ) {
          break;
        } else {
          this.swapHeapElements(currentElementIndex, smallerChildIndex);
        }
        currentElementIndex = smallerChildIndex;
      }
    }
  }

  const numRows = gridInput.length;
  const numCols = gridInput[0].length;
  const resultArray = new Array(queryInput.length);

  const sortedQueryObjects = queryInput
    .map((queryItemValue, originalQueryIndex) => ({
      queryItemValue,
      originalQueryIndex,
    }))
    .sort((itemA, itemB) => itemA.queryItemValue - itemB.queryItemValue);

  const movementDirections = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];
  const priorityQueue = new MinPriorityQueue(
    ([rowIdx, colIdx]) => gridInput[rowIdx][colIdx],
  );
  const visitedCells = new Set();

  priorityQueue.enqueueElement([0, 0]);
  visitedCells.add("0,0");

  let currentQueryIterator = 0;
  let currentPoints = 0;

  while (priorityQueue.queueSize() > 0) {
    const [currentRow, currentCol] = priorityQueue.dequeueMinElement();
    const cellValue = gridInput[currentRow][currentCol];

    while (
      currentQueryIterator < sortedQueryObjects.length &&
      cellValue >= sortedQueryObjects[currentQueryIterator].queryItemValue
    ) {
      resultArray[sortedQueryObjects[currentQueryIterator].originalQueryIndex] =
        currentPoints;
      currentQueryIterator++;
    }

    if (currentQueryIterator === sortedQueryObjects.length) {
      break;
    }

    currentPoints++;

    for (const [rowChange, colChange] of movementDirections) {
      const nextRowCoordinate = currentRow + rowChange;
      const nextColCoordinate = currentCol + colChange;
      const cellKey = `${nextRowCoordinate},${nextColCoordinate}`;

      if (
        nextRowCoordinate >= 0 &&
        nextRowCoordinate < numRows &&
        nextColCoordinate >= 0 &&
        nextColCoordinate < numCols &&
        !visitedCells.has(cellKey)
      ) {
        visitedCells.add(cellKey);
        priorityQueue.enqueueElement([nextRowCoordinate, nextColCoordinate]);
      }
    }
  }

  while (currentQueryIterator < sortedQueryObjects.length) {
    resultArray[sortedQueryObjects[currentQueryIterator].originalQueryIndex] =
      currentPoints;
    currentQueryIterator++;
  }

  return resultArray;
};
