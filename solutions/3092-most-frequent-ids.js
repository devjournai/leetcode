/**
 * Most Frequent IDs
 * Intuition: Maintain frequencies of IDs and the current maximum frequency after each update. A max-heap of (freq, id) lazy-stale works: after adding freqChange, push new freq and pop heap while top doesn't match map.
 * Approach: 1. Map id -> freq. 2. Max heap of [freq, id]. 3. After each nums[i] += freq[i], push. 4. Answer is heap top freq or 0.
 * Dry Run:
 *   nums = [2,3,2,1], freq = [3,2,-3,1] frequencies evolve max 3,3,2,2.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var mostFrequentIDs = function (nums, freq) {
  const frequencyById = new Map();
  const maxHeap = [];
  const answers = [];

  const pushHeap = (frequency, id) => {
    maxHeap.push([frequency, id]);
    let childIndex = maxHeap.length - 1;
    while (childIndex > 0) {
      const parentIndex = Math.floor((childIndex - 1) / 2);
      if (maxHeap[parentIndex][0] >= maxHeap[childIndex][0]) {
        break;
      }
      [maxHeap[parentIndex], maxHeap[childIndex]] = [
        maxHeap[childIndex],
        maxHeap[parentIndex],
      ];
      childIndex = parentIndex;
    }
  };

  const popHeap = () => {
    const topEntry = maxHeap[0];
    const lastEntry = maxHeap.pop();
    if (maxHeap.length > 0) {
      maxHeap[0] = lastEntry;
      let parentIndex = 0;
      while (true) {
        let largestIndex = parentIndex;
        const leftIndex = parentIndex * 2 + 1;
        const rightIndex = parentIndex * 2 + 2;
        if (
          leftIndex < maxHeap.length &&
          maxHeap[leftIndex][0] > maxHeap[largestIndex][0]
        ) {
          largestIndex = leftIndex;
        }
        if (
          rightIndex < maxHeap.length &&
          maxHeap[rightIndex][0] > maxHeap[largestIndex][0]
        ) {
          largestIndex = rightIndex;
        }
        if (largestIndex === parentIndex) {
          break;
        }
        [maxHeap[parentIndex], maxHeap[largestIndex]] = [
          maxHeap[largestIndex],
          maxHeap[parentIndex],
        ];
        parentIndex = largestIndex;
      }
    }
    return topEntry;
  };

  for (let index = 0; index < nums.length; index++) {
    const currentId = nums[index];
    const nextFrequency = (frequencyById.get(currentId) || 0) + freq[index];
    frequencyById.set(currentId, nextFrequency);
    if (nextFrequency > 0) {
      pushHeap(nextFrequency, currentId);
    }
    while (
      maxHeap.length > 0 &&
      frequencyById.get(maxHeap[0][1]) !== maxHeap[0][0]
    ) {
      popHeap();
    }
    answers.push(maxHeap.length === 0 ? 0 : maxHeap[0][0]);
  }
  return answers;
};
