/**
 * Take Gifts From the Richest Pile
 *
 * Intuition:
 * In every operation, we always need to choose the largest pile of gifts.
 * Scanning the entire array every time costs O(N), leading to O(N × K).
 *
 * Instead, maintain a Max Heap so that:
 * - Retrieving the largest pile takes O(log N).
 * - Updating the modified pile also takes O(log N).
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build a Max Heap using all gift piles.
 *
 * 2. Compute the initial total number of gifts.
 *
 * 3. Repeat exactly `k` times:
 *
 *      a. Remove the largest pile.
 *      b. Compute:
 *
 *             remaining = floor(sqrt(largest))
 *
 *      c. Update the total:
 *
 *             total -= largest
 *             total += remaining
 *
 *      d. Insert the remaining pile back into the heap.
 *
 * 4. Return the final total.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * gifts = [25,64,9,4,100]
 * k = 4
 *
 * Initial Total:
 *
 * 25 + 64 + 9 + 4 + 100 = 202
 *
 * --------------------
 * Operation 1
 * --------------------
 *
 * Largest = 100
 *
 * Remaining = 10
 *
 * Total
 *
 * = 202 - 100 + 10
 * = 112
 *
 * --------------------
 * Operation 2
 * --------------------
 *
 * Largest = 64
 *
 * Remaining = 8
 *
 * Total
 *
 * = 112 - 64 + 8
 * = 56
 *
 * --------------------
 * Operation 3
 * --------------------
 *
 * Largest = 25
 *
 * Remaining = 5
 *
 * Total
 *
 * = 56 - 25 + 5
 * = 36
 *
 * --------------------
 * Operation 4
 * --------------------
 *
 * Largest = 10
 *
 * Remaining = 3
 *
 * Total
 *
 * = 36 - 10 + 3
 * = 29
 *
 * Return 29.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O((N + K) log N)
 * Space Complexity: O(N)
 */

var pickGifts = function (gifts, k) {
  class MaxHeap {
    constructor() {
      this.heap = [];
    }

    push(value) {
      this.heap.push(value);

      let index = this.heap.length - 1;

      while (index > 0) {
        const parent = (index - 1) >> 1;

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

    pop() {
      if (this.heap.length === 1) {
        return this.heap.pop();
      }

      const top = this.heap[0];
      this.heap[0] = this.heap.pop();

      let index = 0;

      while (true) {
        let largest = index;

        const left = index * 2 + 1;
        const right = index * 2 + 2;

        if (left < this.heap.length && this.heap[left] > this.heap[largest]) {
          largest = left;
        }

        if (right < this.heap.length && this.heap[right] > this.heap[largest]) {
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

      return top;
    }
  }

  const maxHeap = new MaxHeap();

  let total = 0;

  for (const gift of gifts) {
    total += gift;
    maxHeap.push(gift);
  }

  while (k--) {
    const largest = maxHeap.pop();

    const remaining = Math.floor(Math.sqrt(largest));

    total -= largest;
    total += remaining;

    maxHeap.push(remaining);
  }

  return total;
};
