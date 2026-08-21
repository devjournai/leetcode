/**
 * Minimum Number Of Refueling Stops
 * Intuition: Treat `currentFuelInCar` as the farthest position reachable so far. Stations inside that range can be used later, so stash their fuel in a max-heap and only refuel the largest unused station when you cannot reach `target` yet.
 * Approach: 1. Build `MaxPriorityQueue` (binary max-heap: `addValue` / `extractHighest`). 2. While `currentFuelInCar < targetDistance`, enqueue every station whose position `<= currentFuelInCar`. 3. If the heap is empty, return -1. 4. Else add `extractHighest()` to fuel and increment `refuelEventCount`. 5. Return the count once the target is reachable.
 * Dry Run: target = 100, startFuel = 10, stations = [[10,60],[20,30],[30,30],[60,40]].
 *   - Reach 10 → heap [60]; must refuel 60 → fuel 70, stops 1.
 *   - Enqueue 30, 30, 40. Fuel 70 < 100, take 40 → fuel 110, stops 2. Return 2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minRefuelStops = function (target, startFuel, stations) {
  class MaxPriorityQueue {
    constructor() {
      this.heapArray = [];
    }

    getPointerParentIndex(childIndex) {
      return Math.floor((childIndex - 1) / 2);
    }

    getPointerLeftChildIndex(parentIndex) {
      return 2 * parentIndex + 1;
    }

    getPointerRightChildIndex(parentIndex) {
      return 2 * parentIndex + 2;
    }

    checkHasParent(index) {
      return this.getPointerParentIndex(index) >= 0;
    }

    checkHasLeftChild(index) {
      return this.getPointerLeftChildIndex(index) < this.heapArray.length;
    }

    checkHasRightChild(index) {
      return this.getPointerRightChildIndex(index) < this.heapArray.length;
    }

    fetchParentValue(index) {
      return this.heapArray[this.getPointerParentIndex(index)];
    }

    fetchLeftChildValue(index) {
      return this.heapArray[this.getPointerLeftChildIndex(index)];
    }

    fetchRightChildValue(index) {
      return this.heapArray[this.getPointerRightChildIndex(index)];
    }

    performSwap(indexA, indexB) {
      const temporaryValue = this.heapArray[indexA];
      this.heapArray[indexA] = this.heapArray[indexB];
      this.heapArray[indexB] = temporaryValue;
    }

    peekHighest() {
      if (this.heapArray.length === 0) {
        return null;
      }
      return this.heapArray[0];
    }

    checkIfEmpty() {
      return this.heapArray.length === 0;
    }

    addValue(item) {
      this.heapArray.push(item);
      this.heapifyUp();
    }

    extractHighest() {
      if (this.heapArray.length === 0) {
        return null;
      }
      if (this.heapArray.length === 1) {
        return this.heapArray.pop();
      }

      const itemToReturn = this.heapArray[0];
      this.heapArray[0] = this.heapArray.pop();
      this.heapifyDown();
      return itemToReturn;
    }

    heapifyUp() {
      let currentElementIndex = this.heapArray.length - 1;
      while (
        this.checkHasParent(currentElementIndex) &&
        this.fetchParentValue(currentElementIndex) <
          this.heapArray[currentElementIndex]
      ) {
        this.performSwap(
          this.getPointerParentIndex(currentElementIndex),
          currentElementIndex
        );
        currentElementIndex = this.getPointerParentIndex(currentElementIndex);
      }
    }

    heapifyDown() {
      let currentElementIndex = 0;
      while (this.checkHasLeftChild(currentElementIndex)) {
        let largerChildCandidateIndex =
          this.getPointerLeftChildIndex(currentElementIndex);
        if (
          this.checkHasRightChild(currentElementIndex) &&
          this.fetchRightChildValue(currentElementIndex) >
            this.fetchLeftChildValue(currentElementIndex)
        ) {
          largerChildCandidateIndex =
            this.getPointerRightChildIndex(currentElementIndex);
        }

        if (
          this.heapArray[currentElementIndex] >
          this.heapArray[largerChildCandidateIndex]
        ) {
          break;
        } else {
          this.performSwap(currentElementIndex, largerChildCandidateIndex);
        }
        currentElementIndex = largerChildCandidateIndex;
      }
    }
  }

  const targetDistance = target;
  let currentFuelInCar = startFuel;
  let refuelEventCount = 0;
  let stationIterator = 0;
  const allStationsList = stations;
  const stationCount = allStationsList.length;

  const availableFuelHeap = new MaxPriorityQueue();

  while (currentFuelInCar < targetDistance) {
    while (
      stationIterator < stationCount &&
      allStationsList[stationIterator][0] <= currentFuelInCar
    ) {
      availableFuelHeap.addValue(allStationsList[stationIterator][1]);
      stationIterator++;
    }

    if (availableFuelHeap.checkIfEmpty()) {
      return -1;
    }

    currentFuelInCar += availableFuelHeap.extractHighest();
    refuelEventCount++;
  }

  return refuelEventCount;
};
