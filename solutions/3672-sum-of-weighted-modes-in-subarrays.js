/**
 * Sum Of Weighted Modes In Subarrays
 * Intuition: For every window of length k the mode is the highest-frequency value, ties going to the smaller value. Weight is mode * frequency. A lazy heap tracks (frequency, value) while a map holds live counts.
 * Approach: 1. Count the first k elements and push each (freq, value) into a max-heap by frequency then min value. 2. Peek until the top frequency matches the map; that pair is the mode. 3. Slide: increment the entering value, decrement the leaving value, push both snapshots, add the new weight.
 * Dry Run: nums = [1, 2, 2, 3], k = 3. Window [1, 2, 2] mode 2 freq 2 weight 4. Window [2, 2, 3] same weight 4. Sum 8.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var modeWeight = function (nums, k) {
  const frequency = new Map();
  const heap = [];

  function compare(left, right) {
    if (left.freq !== right.freq) {
      return right.freq - left.freq;
    }
    return left.value - right.value;
  }

  function siftUp(index) {
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      if (compare(heap[index], heap[parent]) >= 0) {
        break;
      }
      const swap = heap[index];
      heap[index] = heap[parent];
      heap[parent] = swap;
      index = parent;
    }
  }

  function siftDown(index) {
    const n = heap.length;
    while (true) {
      let best = index;
      const leftChild = index * 2 + 1;
      const rightChild = index * 2 + 2;
      if (leftChild < n && compare(heap[leftChild], heap[best]) < 0) {
        best = leftChild;
      }
      if (rightChild < n && compare(heap[rightChild], heap[best]) < 0) {
        best = rightChild;
      }
      if (best === index) {
        break;
      }
      const swap = heap[index];
      heap[index] = heap[best];
      heap[best] = swap;
      index = best;
    }
  }

  function pushHeap(freq, value) {
    heap.push({ freq, value });
    siftUp(heap.length - 1);
  }

  function currentWeight() {
    while (heap.length > 0) {
      const top = heap[0];
      if ((frequency.get(top.value) || 0) === top.freq && top.freq > 0) {
        return top.freq * top.value;
      }
      const last = heap.pop();
      if (heap.length > 0) {
        heap[0] = last;
        siftDown(0);
      }
    }
    return 0;
  }

  for (let i = 0; i < k; i++) {
    const value = nums[i];
    const nextFreq = (frequency.get(value) || 0) + 1;
    frequency.set(value, nextFreq);
    pushHeap(nextFreq, value);
  }

  let answer = currentWeight();

  for (let i = k; i < nums.length; i++) {
    const incoming = nums[i];
    const outgoing = nums[i - k];
    const incomingFreq = (frequency.get(incoming) || 0) + 1;
    frequency.set(incoming, incomingFreq);
    pushHeap(incomingFreq, incoming);

    const outgoingFreq = frequency.get(outgoing) - 1;
    frequency.set(outgoing, outgoingFreq);
    pushHeap(outgoingFreq, outgoing);

    answer += currentWeight();
  }

  return answer;
};
