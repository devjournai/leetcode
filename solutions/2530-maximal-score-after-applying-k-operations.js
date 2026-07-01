/**
 * Maximal Score After Applying K Operations
 *
 * Intuition:
 * To maximize the score, we should always choose the current largest number.
 * After selecting a number, it is replaced with ceil(num / 3), which may still
 * be useful in future operations. Therefore, after every operation we insert the
 * updated value back into a Max Heap.
 *
 * A Max Heap allows us to efficiently retrieve and update the largest element
 * in O(log N) time.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build a Max Heap containing all elements of `nums`.
 *
 * 2. Initialize:
 *      score = 0
 *
 * 3. Repeat exactly `k` times:
 *      a. Extract the maximum element from the heap.
 *      b. Add it to the score.
 *      c. Compute:
 *             newValue = ceil(maxValue / 3)
 *      d. Insert the new value back into the heap.
 *
 * 4. Return the final score.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [1,10,3,3,3]
 * k = 3
 *
 * Max Heap:
 * [10,3,3,3,1]
 *
 * -------------------
 * Operation 1
 * -------------------
 *
 * Extract 10
 *
 * score = 10
 *
 * New value:
 * ceil(10/3)=4
 *
 * Heap:
 * [4,3,3,3,1]
 *
 * -------------------
 * Operation 2
 * -------------------
 *
 * Extract 4
 *
 * score = 14
 *
 * New value:
 * ceil(4/3)=2
 *
 * Heap:
 * [3,3,3,2,1]
 *
 * -------------------
 * Operation 3
 * -------------------
 *
 * Extract 3
 *
 * score = 17
 *
 * New value:
 * ceil(3/3)=1
 *
 * Heap:
 * [3,3,2,1,1]
 *
 * Final Answer:
 * 17
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O((N + K) log N)
 * Space Complexity: O(N)
 */

var maxKelements = function (nums, k) {
  class MaxHeap {
    constructor() {
      this.heap = [];
    }

    size() {
      return this.heap.length;
    }

    push(value) {
      this.heap.push(value);
      this.bubbleUp(this.heap.length - 1);
    }

    pop() {
      if (this.heap.length === 1) {
        return this.heap.pop();
      }

      const maxValue = this.heap[0];
      this.heap[0] = this.heap.pop();
      this.bubbleDown(0);

      return maxValue;
    }

    bubbleUp(index) {
      while (index > 0) {
        const parent = Math.floor((index - 1) / 2);

        if (this.heap[parent] >= this.heap[index]) {
          break;
        }

        [this.heap[parent], this.heap[index]] = [
          this.heap[index],
          this.heap[parent],
        ];

        index = parent;
      }
    }

    bubbleDown(index) {
      const n = this.heap.length;

      while (true) {
        let largest = index;

        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (left < n && this.heap[left] > this.heap[largest]) {
          largest = left;
        }

        if (right < n && this.heap[right] > this.heap[largest]) {
          largest = right;
        }

        if (largest === index) {
          break;
        }

        [this.heap[index], this.heap[largest]] = [
          this.heap[largest],
          this.heap[index],
        ];

        index = largest;
      }
    }
  }

  const maxHeap = new MaxHeap();

  for (const num of nums) {
    maxHeap.push(num);
  }

  let score = 0n;

  while (k--) {
    const value = maxHeap.pop();

    score += BigInt(value);

    maxHeap.push(Math.ceil(value / 3));
  }

  return Number(score);
};
