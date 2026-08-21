/**
 * Minimum Time To Build Blocks
 * Intuition: Huffman-style combining: repeatedly merge the two cheapest remaining times, paying split plus the max of the two.
 * Approach: 1. Put all block times in a min-heap. 2. While more than one remains, pop two, push split + max(a,b). 3. The last value is the total time.
 * Dry Run: blocks=[1,2,3], split=1. Merge 1 and 2 → 1+max(1,2)=3. Heap [3,3]. Merge → 1+3=4.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minBuildTime = function (blocksInput, splitValue) {
  class MinPriorityQueue {
    constructor(compareFunction) {
      this.heapElements = [];
      this.heapComparator = compareFunction;
    }

    getSize() {
      return this.heapElements.length;
    }

    enqueueValue(newValue) {
      this.heapElements.push(newValue);
      this.bubbleUpElement();
    }

    dequeueValue() {
      if (this.getSize() === 0) return undefined;
      if (this.getSize() === 1) return this.heapElements.pop();

      const extractedRoot = this.heapElements[0];
      this.heapElements[0] = this.heapElements.pop();
      this.sinkDownElement();
      return extractedRoot;
    }

    bubbleUpElement() {
      let currentElementIndex = this.heapElements.length - 1;
      while (currentElementIndex > 0) {
        let parentElementIndex = Math.floor((currentElementIndex - 1) / 2);
        if (
          this.heapComparator(
            this.heapElements[currentElementIndex],
            this.heapElements[parentElementIndex]
          ) < 0
        ) {
          [
            this.heapElements[currentElementIndex],
            this.heapElements[parentElementIndex],
          ] = [
            this.heapElements[parentElementIndex],
            this.heapElements[currentElementIndex],
          ];
          currentElementIndex = parentElementIndex;
        } else {
          break;
        }
      }
    }

    sinkDownElement() {
      let currentParentIndex = 0;
      const totalElementsCount = this.heapElements.length;
      while (true) {
        let leftChildNodeIndex = 2 * currentParentIndex + 1;
        let rightChildNodeIndex = 2 * currentParentIndex + 2;
        let smallestNodeIndex = currentParentIndex;

        if (
          leftChildNodeIndex < totalElementsCount &&
          this.heapComparator(
            this.heapElements[leftChildNodeIndex],
            this.heapElements[smallestNodeIndex]
          ) < 0
        ) {
          smallestNodeIndex = leftChildNodeIndex;
        }

        if (
          rightChildNodeIndex < totalElementsCount &&
          this.heapComparator(
            this.heapElements[rightChildNodeIndex],
            this.heapElements[smallestNodeIndex]
          ) < 0
        ) {
          smallestNodeIndex = rightChildNodeIndex;
        }

        if (smallestNodeIndex !== currentParentIndex) {
          [
            this.heapElements[currentParentIndex],
            this.heapElements[smallestNodeIndex],
          ] = [
            this.heapElements[smallestNodeIndex],
            this.heapElements[currentParentIndex],
          ];
          currentParentIndex = smallestNodeIndex;
        } else {
          break;
        }
      }
    }
  }

  const taskPriorityQueue = new MinPriorityQueue((a, b) => a - b);

  for (const blockBuildTime of blocksInput) {
    taskPriorityQueue.enqueueValue(blockBuildTime);
  }

  while (taskPriorityQueue.getSize() > 1) {
    const firstSmallestTime = taskPriorityQueue.dequeueValue();
    const secondSmallestTime = taskPriorityQueue.dequeueValue();

    const calculatedCombinedTime =
      splitValue + Math.max(firstSmallestTime, secondSmallestTime);
    taskPriorityQueue.enqueueValue(calculatedCombinedTime);
  }

  return taskPriorityQueue.dequeueValue();
};
