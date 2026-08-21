/**
 * Find The K Sum Of An Array
 * Intuition: Transform the problem of finding the K-th largest subsequence sum into finding the K-th smallest "penalty" sum that deviates from the maximum possible subsequence sum.
 * Approach: 1. Calculate the `totalPositiveSum` by summing all positive numbers in `nums`. This is the largest possible subsequence sum. 2. Create `allAbsoluteValues` array by taking the absolute value of each number in `nums` and then sort it in ascending order. These represent the potential "penalties" or deviations from `totalPositiveSum`. 3. Initialize a min-priority queue (`minHeapOfPenalties`) to store tuples `[currentPenaltySum, lastElementIndexUsed]`. 4. Enqueue the first non-zero penalty: `[allAbsoluteValues[0], 0]`. 5. Iterate `k-1` times (since the 0-penalty corresponding to `totalPositiveSum` is the 1st sum). In each iteration, dequeue the smallest penalty. From this dequeued penalty, generate two new potential penalties: one by adding the next available absolute value, and another by replacing the last absolute value used with the next. Enqueue these back into the priority queue. 6. The `k-1`-th dequeued penalty (which is the `k`-th smallest overall, including 0) is stored. Subtract this final penalty from `totalPositiveSum` to get the K-th largest subsequence sum.
 * Dry Run: nums = [1, -2, 3], k = 3
 * 1. `totalPositiveSum` = 1 (from 1) + 3 (from 3) = 4.
 * 2. `allAbsoluteValues` = [|1|, |-2|, |3|] = [1, 2, 3]. Sorted: [1, 2, 3].
 * 3. `minHeapOfPenalties` initialized.
 * 4. Enqueue `[allAbsoluteValues[0], 0]` -> `minHeapOfPenalties.enqueue([1, 0])`.
 * 5. `finalCalculatedPenalty` = 0.
 * 6. Loop for `count = 0` to `k - 2` (i.e., `0` to `1`):
 *    - `count = 0`:
 *      - Dequeue `[1, 0]`. `currentPenaltySumValue` = 1, `currentIndexPosition` = 0.
 *      - `finalCalculatedPenalty` = 1.
 *      - `nextIndexValue` = 0 + 1 = 1. `nextIndexValue < allAbsoluteValues.length` (1 < 3) is true.
 *        - `newPenaltyOptionOne` = 1 + `allAbsoluteValues[1]` = 1 + 2 = 3. Enqueue `[3, 1]`.
 *        - `newPenaltyOptionTwo` = 1 - `allAbsoluteValues[0]` + `allAbsoluteValues[1]` = 1 - 1 + 2 = 2. Enqueue `[2, 1]`.
 *      - `minHeapOfPenalties` now contains `[[2, 1], [3, 1]]`.
 *    - `count = 1`:
 *      - Dequeue `[2, 1]`. `currentPenaltySumValue` = 2, `currentIndexPosition` = 1.
 *      - `finalCalculatedPenalty` = 2.
 *      - `nextIndexValue` = 1 + 1 = 2. `nextIndexValue < allAbsoluteValues.length` (2 < 3) is true.
 *        - `newPenaltyOptionOne` = 2 + `allAbsoluteValues[2]` = 2 + 3 = 5. Enqueue `[5, 2]`.
 *        - `newPenaltyOptionTwo` = 2 - `allAbsoluteValues[1]` + `allAbsoluteValues[2]` = 2 - 2 + 3 = 3. Enqueue `[3, 2]`.
 *      - `minHeapOfPenalties` now contains `[[3, 1], [3, 2], [5, 2]]`.
 * 7. Loop ends.
 * 8. Return `totalPositiveSum - finalCalculatedPenalty` = 4 - 2 = 2.
 * This matches the 3rd largest sum of subsequences from [1, -2, 3]: [4, 3, 2, 1, 1, 0, -1, -2]. The 3rd largest is 2.
 * Time Complexity: O(N log N + K log K)
 * Space Complexity: O(N + K)
 */

class PriorityQueue {
  constructor(comparator = (a, b) => a[0] - b[0]) {
    this.heapContainer = [];
    this.comparator = comparator;
  }

  size() {
    return this.heapContainer.length;
  }

  enqueue(value) {
    this.heapContainer.push(value);
    this.bubbleUp();
  }

  dequeue() {
    if (this.size() === 0) return undefined;
    if (this.size() === 1) return this.heapContainer.pop();
    const rootElement = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    this.bubbleDown();
    return rootElement;
  }

  peek() {
    if (this.size() === 0) return undefined;
    return this.heapContainer[0];
  }

  bubbleUp() {
    let currentElementIndex = this.heapContainer.length - 1;
    while (currentElementIndex > 0) {
      let parentElementIndex = Math.floor((currentElementIndex - 1) / 2);
      if (
        this.comparator(
          this.heapContainer[currentElementIndex],
          this.heapContainer[parentElementIndex]
        ) < 0
      ) {
        [
          this.heapContainer[currentElementIndex],
          this.heapContainer[parentElementIndex],
        ] = [
          this.heapContainer[parentElementIndex],
          this.heapContainer[currentElementIndex],
        ];
        currentElementIndex = parentElementIndex;
      } else {
        break;
      }
    }
  }

  bubbleDown() {
    let currentIndexForDown = 0;
    let leftChildCandidateIndex,
      rightChildCandidateIndex,
      smallestChildCandidateIndex;
    while (true) {
      leftChildCandidateIndex = 2 * currentIndexForDown + 1;
      rightChildCandidateIndex = 2 * currentIndexForDown + 2;
      smallestChildCandidateIndex = currentIndexForDown;

      if (
        leftChildCandidateIndex < this.size() &&
        this.comparator(
          this.heapContainer[leftChildCandidateIndex],
          this.heapContainer[smallestChildCandidateIndex]
        ) < 0
      ) {
        smallestChildCandidateIndex = leftChildCandidateIndex;
      }

      if (
        rightChildCandidateIndex < this.size() &&
        this.comparator(
          this.heapContainer[rightChildCandidateIndex],
          this.heapContainer[smallestChildCandidateIndex]
        ) < 0
      ) {
        smallestChildCandidateIndex = rightChildCandidateIndex;
      }

      if (smallestChildCandidateIndex !== currentIndexForDown) {
        [
          this.heapContainer[currentIndexForDown],
          this.heapContainer[smallestChildCandidateIndex],
        ] = [
          this.heapContainer[smallestChildCandidateIndex],
          this.heapContainer[currentIndexForDown],
        ];
        currentIndexForDown = smallestChildCandidateIndex;
      } else {
        break;
      }
    }
  }
}

var kSum = function (nums, k) {
  let currentPositiveSum = 0;
  for (let currentNum of nums) {
    currentPositiveSum += Math.max(0, currentNum);
  }

  const allAbsoluteValues = nums
    .map((valueElement) => Math.abs(valueElement))
    .sort((a, b) => a - b);

  const minHeapOfPenalties = new PriorityQueue((a, b) => a[0] - b[0]);

  let finalCalculatedPenalty = 0;

  if (k === 1) {
    return currentPositiveSum;
  }

  if (allAbsoluteValues.length > 0) {
    minHeapOfPenalties.enqueue([allAbsoluteValues[0], 0]);
  }

  for (let loopCounter = 0; loopCounter < k - 1; loopCounter++) {
    const dequeuedTuple = minHeapOfPenalties.dequeue();
    const penaltyValue = dequeuedTuple[0];
    const currentIndexPosition = dequeuedTuple[1];

    finalCalculatedPenalty = penaltyValue;

    const nextIndexValue = currentIndexPosition + 1;
    if (nextIndexValue < allAbsoluteValues.length) {
      const newPenaltyOptionOne =
        penaltyValue + allAbsoluteValues[nextIndexValue];
      minHeapOfPenalties.enqueue([newPenaltyOptionOne, nextIndexValue]);

      const newPenaltyOptionTwo =
        penaltyValue -
        allAbsoluteValues[currentIndexPosition] +
        allAbsoluteValues[nextIndexValue];
      minHeapOfPenalties.enqueue([newPenaltyOptionTwo, nextIndexValue]);
    }
  }

  return currentPositiveSum - finalCalculatedPenalty;
};
