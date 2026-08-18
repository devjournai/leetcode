/**
 * Earliest Second to Mark Indices II
 * Intuition: Besides decrementing by 1, the first occurrence of an index in changeIndices can set that nums[i] to 0. Binary search the deadline. Going backwards, greedily keep the largest zero-ops in a min-heap and drop the cheapest when a second must be spent marking instead.
 * Approach: 1. Map each index with nums[i] > 0 to its first change second. 2. Binary search maxSecond. 3. Scan seconds from maxSecond-1 down to 0. If this second is a first-zero candidate, push nums[index] onto a min-heap; if no spare mark slots remain, pop the smallest (do not zero it). Otherwise bank a mark slot. 4. Cost is (sum of non-zeroed values + their marks) plus 2 per zeroed index. Feasible if cost <= maxSecond.
 * Dry Run: nums = [3, 2, 3], changeIndices = [1, 3, 2, 2, 2, 2, 3]. First zeros: index 0 at second 0, index 2 at second 1, index 1 at second 2. Binary search finds 6: zero the large 3s and decrement/mark the rest within 6 seconds.
 * Time Complexity: O(m log m)
 * Space Complexity: O(m)
 */
var earliestSecondToMarkIndices = function (nums, changeIndices) {
  const secondToIndex = getFirstZeroSecondToIndex(nums, changeIndices);
  const numsSum = nums.reduce((runningSum, value) => runningSum + value, 0);

  let lowSecond = 0;
  let highSecond = changeIndices.length + 1;

  while (lowSecond < highSecond) {
    const midSecond = Math.floor((lowSecond + highSecond) / 2);
    if (canMarkAllIndices(nums, secondToIndex, midSecond, numsSum)) {
      highSecond = midSecond;
    } else {
      lowSecond = midSecond + 1;
    }
  }

  return lowSecond <= changeIndices.length ? lowSecond : -1;
};

function getFirstZeroSecondToIndex(nums, changeIndices) {
  const indexToFirstSecond = new Map();

  for (
    let zeroIndexedSecond = 0;
    zeroIndexedSecond < changeIndices.length;
    zeroIndexedSecond++
  ) {
    const numsIndex = changeIndices[zeroIndexedSecond] - 1;
    if (nums[numsIndex] > 0 && !indexToFirstSecond.has(numsIndex)) {
      indexToFirstSecond.set(numsIndex, zeroIndexedSecond);
    }
  }

  const secondToIndex = new Map();
  for (const [numsIndex, firstSecond] of indexToFirstSecond) {
    secondToIndex.set(firstSecond, numsIndex);
  }
  return secondToIndex;
}

function canMarkAllIndices(nums, secondToIndex, maxSecond, numsSum) {
  const minHeap = new MinHeap();
  let spareMarkCount = 0;

  for (let second = maxSecond - 1; second >= 0; second--) {
    if (secondToIndex.has(second)) {
      const numsIndex = secondToIndex.get(second);
      minHeap.push(nums[numsIndex]);
      if (spareMarkCount === 0) {
        minHeap.pop();
        spareMarkCount++;
      } else {
        spareMarkCount--;
      }
    } else {
      spareMarkCount++;
    }
  }

  const zeroedCount = minHeap.size();
  const decrementAndMarkCost =
    numsSum - minHeap.sum() + (nums.length - zeroedCount);
  const zeroAndMarkCost = zeroedCount + zeroedCount;
  return decrementAndMarkCost + zeroAndMarkCost <= maxSecond;
}

function MinHeap() {
  this.values = [];
}

MinHeap.prototype.size = function () {
  return this.values.length;
};

MinHeap.prototype.sum = function () {
  return this.values.reduce((runningSum, value) => runningSum + value, 0);
};

MinHeap.prototype.push = function (value) {
  this.values.push(value);
  this.siftUp(this.values.length - 1);
};

MinHeap.prototype.pop = function () {
  const smallestValue = this.values[0];
  const lastValue = this.values.pop();
  if (this.values.length > 0) {
    this.values[0] = lastValue;
    this.siftDown(0);
  }
  return smallestValue;
};

MinHeap.prototype.siftUp = function (index) {
  while (index > 0) {
    const parentIndex = Math.floor((index - 1) / 2);
    if (this.values[parentIndex] <= this.values[index]) {
      break;
    }
    const temporaryValue = this.values[parentIndex];
    this.values[parentIndex] = this.values[index];
    this.values[index] = temporaryValue;
    index = parentIndex;
  }
};

MinHeap.prototype.siftDown = function (index) {
  const heapSize = this.values.length;
  while (true) {
    let smallestIndex = index;
    const leftChildIndex = 2 * index + 1;
    const rightChildIndex = 2 * index + 2;
    if (
      leftChildIndex < heapSize &&
      this.values[leftChildIndex] < this.values[smallestIndex]
    ) {
      smallestIndex = leftChildIndex;
    }
    if (
      rightChildIndex < heapSize &&
      this.values[rightChildIndex] < this.values[smallestIndex]
    ) {
      smallestIndex = rightChildIndex;
    }
    if (smallestIndex === index) {
      break;
    }
    const temporaryValue = this.values[index];
    this.values[index] = this.values[smallestIndex];
    this.values[smallestIndex] = temporaryValue;
    index = smallestIndex;
  }
};
