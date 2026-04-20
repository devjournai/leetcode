/**
 * Minimum Cost To Connect Sticks
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var connectSticks = function (sticks) {
  class MinPriorityQueue {
    constructor() {
      this.heapElements = [];
    }

    offer(valueToAdd) {
      this.heapElements.push(valueToAdd);
      this.bubbleUpElement();
    }

    poll() {
      if (this.heapElements.length === 0) return undefined;
      if (this.heapElements.length === 1) return this.heapElements.pop();

      const smallestItem = this.heapElements[0];
      this.heapElements[0] = this.heapElements.pop();
      this.sinkDownElement();
      return smallestItem;
    }

    getCurrentSize() {
      return this.heapElements.length;
    }

    bubbleUpElement() {
      let childPosition = this.heapElements.length - 1;
      while (childPosition > 0) {
        let parentPosition = Math.floor((childPosition - 1) / 2);
        if (
          this.heapElements[parentPosition] <= this.heapElements[childPosition]
        )
          break;
        [this.heapElements[parentPosition], this.heapElements[childPosition]] =
          [this.heapElements[childPosition], this.heapElements[parentPosition]];
        childPosition = parentPosition;
      }
    }

    sinkDownElement() {
      let rootIndex = 0;
      const currentHeapLength = this.heapElements.length;
      const elementToAdjust = this.heapElements[0];

      while (true) {
        let leftChildPosition = 2 * rootIndex + 1;
        let rightChildPosition = 2 * rootIndex + 2;
        let swapCandidateIndex = null;

        if (leftChildPosition < currentHeapLength) {
          if (this.heapElements[leftChildPosition] < elementToAdjust) {
            swapCandidateIndex = leftChildPosition;
          }
        }

        if (rightChildPosition < currentHeapLength) {
          if (
            (swapCandidateIndex === null &&
              this.heapElements[rightChildPosition] < elementToAdjust) ||
            (swapCandidateIndex !== null &&
              this.heapElements[rightChildPosition] <
                this.heapElements[leftChildPosition])
          ) {
            swapCandidateIndex = rightChildPosition;
          }
        }

        if (swapCandidateIndex === null) break;
        [this.heapElements[rootIndex], this.heapElements[swapCandidateIndex]] =
          [this.heapElements[swapCandidateIndex], this.heapElements[rootIndex]];
        rootIndex = swapCandidateIndex;
      }
    }
  }

  const stickCollection = new MinPriorityQueue();
  for (let currentStickLength of sticks) {
    stickCollection.offer(currentStickLength);
  }

  let finalTotalCost = 0;

  while (stickCollection.getCurrentSize() > 1) {
    const smallestLengthOne = stickCollection.poll();
    const smallestLengthTwo = stickCollection.poll();
    const costForCombine = smallestLengthOne + smallestLengthTwo;

    finalTotalCost += costForCombine;
    stickCollection.offer(costForCombine);
  }

  return finalTotalCost;
};
