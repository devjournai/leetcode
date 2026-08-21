/**
 * Trapping Rain Water II
 * Intuition: Water height for an inner cell is limited by the lowest surrounding “wall”. Grow inward from the border with a min-heap of boundary heights; a neighbor traps `max(0, currentCellHeight - neighborHeight)` and then becomes a wall of `max(current, neighbor)`.
 * Approach: 1. Empty map → 0. 2. Push all border cells into `PriorityQueueMin` (by height) and mark visited. 3. Pop the lowest wall, visit unvisited neighbors, add trapped water, push the updated boundary height. 4. Return `totalWaterTrapped`.
 * Dry Run: 3×3 with center 1 and border 2s.
 *   - Borders at height 2 in the heap; pop 2, neighbor center 1 traps 1, new wall 2. Return 1.
 * Time Complexity: O(M*N*log(M*N))
 * Space Complexity: O(M*N)
 */
var trapRainWater = function (heightMap) {
  const mapRowsCount = heightMap.length;
  if (mapRowsCount === 0) return 0;
  const mapColsCount = heightMap[0].length;
  if (mapColsCount === 0) return 0;

  class PriorityQueueMin {
    constructor() {
      this.heapDataArray = [];
    }

    push(newValue) {
      this.heapDataArray.push(newValue);
      this.siftUp(this.heapDataArray.length - 1);
    }

    pop() {
      if (this.heapDataArray.length === 0) return null;
      const poppedElement = this.heapDataArray[0];
      const lastElement = this.heapDataArray.pop();
      if (this.heapDataArray.length > 0) {
        this.heapDataArray[0] = lastElement;
        this.siftDown(0);
      }
      return poppedElement;
    }

    siftUp(initialIndex) {
      let currentElementIndex = initialIndex;
      while (currentElementIndex > 0) {
        const parentIndex = Math.floor((currentElementIndex - 1) / 2);
        if (
          this.heapDataArray[parentIndex][2] <=
          this.heapDataArray[currentElementIndex][2]
        ) {
          break;
        }
        [
          this.heapDataArray[parentIndex],
          this.heapDataArray[currentElementIndex],
        ] = [
          this.heapDataArray[currentElementIndex],
          this.heapDataArray[parentIndex],
        ];
        currentElementIndex = parentIndex;
      }
    }

    siftDown(startIndex) {
      let currentRootIndex = startIndex;
      const dataLength = this.heapDataArray.length;
      while (true) {
        let smallestChildIndex = currentRootIndex;
        const leftChildIndex = 2 * currentRootIndex + 1;
        const rightChildIndex = 2 * currentRootIndex + 2;

        if (
          leftChildIndex < dataLength &&
          this.heapDataArray[leftChildIndex][2] <
            this.heapDataArray[smallestChildIndex][2]
        ) {
          smallestChildIndex = leftChildIndex;
        }
        if (
          rightChildIndex < dataLength &&
          this.heapDataArray[rightChildIndex][2] <
            this.heapDataArray[smallestChildIndex][2]
        ) {
          smallestChildIndex = rightChildIndex;
        }
        if (smallestChildIndex === currentRootIndex) {
          break;
        }
        [
          this.heapDataArray[smallestChildIndex],
          this.heapDataArray[currentRootIndex],
        ] = [
          this.heapDataArray[currentRootIndex],
          this.heapDataArray[smallestChildIndex],
        ];
        currentRootIndex = smallestChildIndex;
      }
    }

    isEmpty() {
      return this.heapDataArray.length === 0;
    }
  }

  const minPriorityQueue = new PriorityQueueMin();
  const cellVisitedStatus = Array.from({ length: mapRowsCount }, () =>
    Array(mapColsCount).fill(false)
  );

  let rowIter = 0;
  while (rowIter < mapRowsCount) {
    let colIter = 0;
    while (colIter < mapColsCount) {
      const isBorderCell =
        rowIter === 0 ||
        colIter === 0 ||
        rowIter === mapRowsCount - 1 ||
        colIter === mapColsCount - 1;
      if (isBorderCell) {
        minPriorityQueue.push([rowIter, colIter, heightMap[rowIter][colIter]]);
        cellVisitedStatus[rowIter][colIter] = true;
      }
      colIter++;
    }
    rowIter++;
  }

  const neighborDirections = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  let totalWaterTrapped = 0;

  while (!minPriorityQueue.isEmpty()) {
    const [currentRowCoordinate, currentColCoordinate, currentCellHeight] =
      minPriorityQueue.pop();

    let directionIndex = 0;
    while (directionIndex < neighborDirections.length) {
      const [directionChangeX, directionChangeY] =
        neighborDirections[directionIndex];
      const nextCellRow = currentRowCoordinate + directionChangeX;
      const nextCellCol = currentColCoordinate + directionChangeY;

      const isOutOfBounds =
        nextCellRow < 0 ||
        nextCellRow >= mapRowsCount ||
        nextCellCol < 0 ||
        nextCellCol >= mapColsCount;

      if (isOutOfBounds) {
        directionIndex++;
        continue;
      }

      const hasBeenVisited = cellVisitedStatus[nextCellRow][nextCellCol];
      if (hasBeenVisited) {
        directionIndex++;
        continue;
      }

      cellVisitedStatus[nextCellRow][nextCellCol] = true;

      const waterVolume = Math.max(
        0,
        currentCellHeight - heightMap[nextCellRow][nextCellCol]
      );
      totalWaterTrapped += waterVolume;

      const nextCellBoundaryHeight = Math.max(
        currentCellHeight,
        heightMap[nextCellRow][nextCellCol]
      );
      minPriorityQueue.push([nextCellRow, nextCellCol, nextCellBoundaryHeight]);
      directionIndex++;
    }
  }

  return totalWaterTrapped;
};
