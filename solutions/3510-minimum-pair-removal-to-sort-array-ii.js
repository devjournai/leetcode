/**
 * Minimum Pair Removal to Sort Array II
 * Intuition: Same merge rule as I, but N is large, so track adjacent pairs in a min-heap and maintain inversion count with a doubly linked index list plus versioned heap entries.
 * Approach: 1. Count adjacent inversions and link prev/next indices. 2. Push each adjacent sum into a min-heap keyed by (sum, index). 3. While inversions remain, pop the valid smallest pair, merge into the left node, update inversion count against prev/next, invalidate stale heap versions, and push the new neighbor pairs. 4. Return the merge count.
 * Dry Run: nums = [1, 3, 2]. One inversion at (3,2). Heap pops 3+2=5, merge to [1, 5], inversions become 0. Answer 1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimumPairRemoval = function (nums) {
  const n = nums.length;
  let ans = 0;

  let inversionsCount = 0;
  for (let i = 0; i < n - 1; i++) {
    if (nums[i + 1] < nums[i]) {
      inversionsCount++;
    }
  }

  const nextIndices = new Int32Array(n);
  const prevIndices = new Int32Array(n);
  for (let i = 0; i < n; i++) {
    nextIndices[i] = i + 1;
    prevIndices[i] = i - 1;
  }

  const versions = new Int32Array(n).fill(0);
  const heap = new PairRemovalMinHeap();

  for (let i = 0; i < n - 1; i++) {
    heap.push({
      val: nums[i] + nums[i + 1],
      idx: i,
      ver: 0,
    });
  }

  while (inversionsCount > 0) {
    const smallestPair = heap.pop();
    if (!smallestPair) break;

    const { val: pairSum, idx: currIndex, ver } = smallestPair;

    if (ver !== versions[currIndex]) {
      continue;
    }

    ans++;

    const nextIndex = nextIndices[currIndex];
    const prevIndex = prevIndices[currIndex];

    if (prevIndex >= 0) {
      const newPairSum = nums[prevIndex] + pairSum;

      versions[prevIndex]++;
      heap.push({ val: newPairSum, idx: prevIndex, ver: versions[prevIndex] });

      if (nums[prevIndex] > nums[currIndex]) inversionsCount--;
      if (nums[prevIndex] > pairSum) inversionsCount++;
    }

    if (nums[nextIndex] < nums[currIndex]) {
      inversionsCount--;
    }

    const nextNextIndex = nextIndex < n ? nextIndices[nextIndex] : n;

    if (nextNextIndex < n) {
      const newPairSum = pairSum + nums[nextNextIndex];

      versions[nextIndex]++;
      versions[currIndex]++;
      heap.push({ val: newPairSum, idx: currIndex, ver: versions[currIndex] });

      if (nums[nextNextIndex] < nums[nextIndex]) inversionsCount--;
      if (nums[nextNextIndex] < pairSum) inversionsCount++;

      prevIndices[nextNextIndex] = currIndex;
    } else {
      versions[currIndex]++;
    }

    nextIndices[currIndex] = nextNextIndex;
    nums[currIndex] = pairSum;
  }

  return ans;
};

class PairRemovalMinHeap {
  constructor() {
    this.heap = [];
  }

  compare(a, b) {
    if (a.val !== b.val) {
      return a.val - b.val;
    }
    return a.idx - b.idx;
  }

  push(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }

  pop() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return min;
  }

  bubbleUp(index) {
    const element = this.heap[index];
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIdx];
      if (this.compare(element, parent) >= 0) break;
      this.heap[index] = parent;
      this.heap[parentIdx] = element;
      index = parentIdx;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let swapIdx = null;

      if (leftChildIdx < length) {
        if (this.compare(this.heap[leftChildIdx], element) < 0) {
          swapIdx = leftChildIdx;
        }
      }

      if (rightChildIdx < length) {
        const rightChild = this.heap[rightChildIdx];
        const currentBest = swapIdx === null ? element : this.heap[swapIdx];
        if (this.compare(rightChild, currentBest) < 0) {
          swapIdx = rightChildIdx;
        }
      }

      if (swapIdx === null) break;
      this.heap[index] = this.heap[swapIdx];
      this.heap[swapIdx] = element;
      index = swapIdx;
    }
  }
}
