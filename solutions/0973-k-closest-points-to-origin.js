/**
 * K Closest Points To Origin
 * Intuition: Keep a max-heap of size k keyed by squared distance. A farther point than the heap max is ignored; a closer one replaces the max.
 * Approach: 1. `MaxPriorityQueue` compares the first tuple field (`itemA[0] - itemB[0]`). 2. For each point, compute `computeSquaredDistance`. 3. Offer while size < k; else if closer than peek, poll then offer. 4. Drain the heap into `resultingClosestPoints`.
 * Dry Run: points = [[1,3],[-2,2]], k=1. Distances 10 and 8. Heap holds 8 then 10 is skipped. Return [[-2,2]].
 * Time Complexity: O(N log K)
 * Space Complexity: O(K)
 */
var kClosest = function (points, k) {
  class MaxPriorityQueue {
    constructor(comparisonCriterion) {
      this.heapStorage = [];
      this.comparisonFunction = comparisonCriterion;
    }

    retrieveParentIndex(childPosition) {
      return Math.floor((childPosition - 1) / 2);
    }

    retrieveLeftChildIndex(parentPosition) {
      return 2 * parentPosition + 1;
    }

    retrieveRightChildIndex(parentPosition) {
      return 2 * parentPosition + 2;
    }

    isParentPresent(childPosition) {
      return this.retrieveParentIndex(childPosition) >= 0;
    }

    isLeftChildPresent(parentPosition) {
      return (
        this.retrieveLeftChildIndex(parentPosition) < this.heapStorage.length
      );
    }

    isRightChildPresent(parentPosition) {
      return (
        this.retrieveRightChildIndex(parentPosition) < this.heapStorage.length
      );
    }

    getParentValue(childPosition) {
      return this.heapStorage[this.retrieveParentIndex(childPosition)];
    }

    getLeftChildValue(parentPosition) {
      return this.heapStorage[this.retrieveLeftChildIndex(parentPosition)];
    }

    getRightChildValue(parentPosition) {
      return this.heapStorage[this.retrieveRightChildIndex(parentPosition)];
    }

    exchangeElements(positionA, positionB) {
      [this.heapStorage[positionA], this.heapStorage[positionB]] = [
        this.heapStorage[positionB],
        this.heapStorage[positionA],
      ];
    }

    offerElement(newEntry) {
      this.heapStorage.push(newEntry);
      this.heapifyUp();
    }

    pollElement() {
      if (this.heapStorage.length === 0) return null;
      if (this.heapStorage.length === 1) return this.heapStorage.pop();

      const maxValue = this.heapStorage[0];
      this.heapStorage[0] = this.heapStorage.pop();
      this.heapifyDown();
      return maxValue;
    }

    peekHighestElement() {
      if (this.heapStorage.length === 0) return null;
      return this.heapStorage[0];
    }

    getCurrentSize() {
      return this.heapStorage.length;
    }

    heapifyUp() {
      let currentElementPosition = this.heapStorage.length - 1;
      while (
        this.isParentPresent(currentElementPosition) &&
        this.comparisonFunction(
          this.heapStorage[currentElementPosition],
          this.getParentValue(currentElementPosition)
        ) > 0
      ) {
        this.exchangeElements(
          currentElementPosition,
          this.retrieveParentIndex(currentElementPosition)
        );
        currentElementPosition = this.retrieveParentIndex(
          currentElementPosition
        );
      }
    }

    heapifyDown() {
      let rootPosition = 0;
      while (this.isLeftChildPresent(rootPosition)) {
        let dominantChildPosition = this.retrieveLeftChildIndex(rootPosition);
        if (
          this.isRightChildPresent(rootPosition) &&
          this.comparisonFunction(
            this.getRightChildValue(rootPosition),
            this.getLeftChildValue(rootPosition)
          ) > 0
        ) {
          dominantChildPosition = this.retrieveRightChildIndex(rootPosition);
        }

        if (
          this.comparisonFunction(
            this.heapStorage[rootPosition],
            this.heapStorage[dominantChildPosition]
          ) > 0
        ) {
          break;
        } else {
          this.exchangeElements(rootPosition, dominantChildPosition);
          rootPosition = dominantChildPosition;
        }
      }
    }
  }

  const computeSquaredDistance = (xDimension, yDimension) =>
    xDimension * xDimension + yDimension * yDimension;

  const maxHeapForPoints = new MaxPriorityQueue(
    (itemA, itemB) => itemA[0] - itemB[0]
  );

  const totalInputPoints = points.length;
  for (
    let pointIterator = 0;
    pointIterator < totalInputPoints;
    pointIterator++
  ) {
    const individualPoint = points[pointIterator];
    const pointXCoordinate = individualPoint[0];
    const pointYCoordinate = individualPoint[1];
    const pointSquaredDistanceValue = computeSquaredDistance(
      pointXCoordinate,
      pointYCoordinate
    );

    if (maxHeapForPoints.getCurrentSize() < k) {
      maxHeapForPoints.offerElement([
        pointSquaredDistanceValue,
        individualPoint,
      ]);
    } else if (
      pointSquaredDistanceValue < maxHeapForPoints.peekHighestElement()[0]
    ) {
      maxHeapForPoints.pollElement();
      maxHeapForPoints.offerElement([
        pointSquaredDistanceValue,
        individualPoint,
      ]);
    }
  }

  const resultingClosestPoints = [];
  while (maxHeapForPoints.getCurrentSize() > 0) {
    const extractedTuple = maxHeapForPoints.pollElement();
    resultingClosestPoints.push(extractedTuple[1]);
  }

  return resultingClosestPoints;
};
