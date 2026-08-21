/**
 * Maximum Number Of Eaten Apples
 * Intuition: Each day eat one apple from the batch that expires soonest (min-heap on last edible day). Keep processing after harvest ends while apples remain.
 * Approach: 1. `ExpiryMinHeap` stores [lastEdibleDay, count]. 2. Each `currentMoment`, offer today's apples with expiry `currentMoment + rotDurations - 1`. 3. Poll expired batches; eat one from `peekEarliest`. 4. Return `totalEatenCount`.
 * Dry Run: fruitQuantities = [1,2,3,5,2], rotDurations = [3,2,1,4,2]
 * Day0: batch exp 2 qty1, eat 1. Continue preferring earliest expiry; total eaten = 7.
 * Time Complexity: O((N + D_max) * log N)
 * Space Complexity: O(N)
 */
class ExpiryMinHeap {
  constructor() {
    this.heapContent = [];
  }

  offerItem(newExpirationDay, freshAppleQuantity) {
    if (freshAppleQuantity <= 0) return;

    this.heapContent.push([newExpirationDay, freshAppleQuantity]);
    this.bubbleUpElement(this.heapContent.length - 1);
  }

  peekEarliest() {
    if (this.isEmpty()) return null;
    return this.heapContent[0];
  }

  pollEarliest() {
    if (this.isEmpty()) return null;

    const earliestEntry = this.heapContent[0];
    const lastEntry = this.heapContent.pop();

    if (!this.isEmpty()) {
      this.heapContent[0] = lastEntry;
      this.sinkDownElement(0);
    }
    return earliestEntry;
  }

  isEmpty() {
    return this.heapContent.length === 0;
  }

  bubbleUpElement(childIndexValue) {
    let currentChild = childIndexValue;
    while (currentChild > 0) {
      const parentIndexPosition = Math.floor((currentChild - 1) / 2);
      if (
        this.heapContent[parentIndexPosition][0] <=
        this.heapContent[currentChild][0]
      ) {
        break;
      }
      [this.heapContent[parentIndexPosition], this.heapContent[currentChild]] =
        [this.heapContent[currentChild], this.heapContent[parentIndexPosition]];
      currentChild = parentIndexPosition;
    }
  }

  sinkDownElement(parentIndexValue) {
    let currentParent = parentIndexValue;
    const totalNodes = this.heapContent.length;
    while (true) {
      let leftChildIndexPosition = 2 * currentParent + 1;
      let rightChildIndexPosition = 2 * currentParent + 2;
      let smallestIndexPosition = currentParent;

      if (
        leftChildIndexPosition < totalNodes &&
        this.heapContent[leftChildIndexPosition][0] <
          this.heapContent[smallestIndexPosition][0]
      ) {
        smallestIndexPosition = leftChildIndexPosition;
      }

      if (
        rightChildIndexPosition < totalNodes &&
        this.heapContent[rightChildIndexPosition][0] <
          this.heapContent[smallestIndexPosition][0]
      ) {
        smallestIndexPosition = rightChildIndexPosition;
      }

      if (smallestIndexPosition === currentParent) {
        break;
      }

      [
        this.heapContent[currentParent],
        this.heapContent[smallestIndexPosition],
      ] = [
        this.heapContent[smallestIndexPosition],
        this.heapContent[currentParent],
      ];
      currentParent = smallestIndexPosition;
    }
  }
}

/**
 * @param {number[]} fruitQuantities
 * @param {number[]} rotDurations
 * @return {number}
 */
var eatenApples = function (fruitQuantities, rotDurations) {
  const availableApples = new ExpiryMinHeap();
  let totalEatenCount = 0;
  const orchardHarvestDays = fruitQuantities.length;
  let currentMoment = 0;

  while (currentMoment < orchardHarvestDays || !availableApples.isEmpty()) {
    if (
      currentMoment < orchardHarvestDays &&
      fruitQuantities[currentMoment] > 0
    ) {
      const decayDay = currentMoment + rotDurations[currentMoment];
      const actualRottenThreshold = decayDay - 1;
      availableApples.offerItem(
        actualRottenThreshold,
        fruitQuantities[currentMoment]
      );
    }

    while (
      !availableApples.isEmpty() &&
      availableApples.peekEarliest()[0] < currentMoment
    ) {
      availableApples.pollEarliest();
    }

    if (!availableApples.isEmpty()) {
      const earliestBatch = availableApples.peekEarliest();
      earliestBatch[1]--;
      totalEatenCount++;

      if (earliestBatch[1] === 0) {
        availableApples.pollEarliest();
      }
    }
    currentMoment++;
  }

  return totalEatenCount;
};
