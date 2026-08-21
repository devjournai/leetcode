/**
 * Choose K Elements With Maximum Sum
 * Intuition: For index i the allowed partners are indices whose nums1 value is strictly smaller. Sorting by nums1 lets a running heap of nums2 values represent the k largest among all strictly smaller keys.
 * Approach: 1. Pair each nums1[i] with i and sort by nums1. 2. The smallest key answers 0. 3. Walk the rest: equal keys copy the previous answer; a larger key takes the current heap sum. 4. Push nums2[i] into a min-heap of size k, dropping the smallest extra.
 * Dry Run: nums1 = [4,2,1,2], nums2 = [5,3,4,1], k = 2.
 *   - Order by nums1: (1,i=2), (2,i=1), (2,i=3), (4,i=0).
 *   - i=2 → 0; heap [4].
 *   - i=1 (2>1) → 4; heap [3,4] sum 7.
 *   - i=3 (2==2) → 4; heap [1,3,4] then drop 1 → sum 7.
 *   - i=0 (4>2) → 7. Answer [7,4,0,4].
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var findMaxSum = function (nums1, nums2, k) {
  const n = nums1.length;
  const answer = new Array(n).fill(0);
  const numAndIndexes = nums1.map((value, index) => [value, index]);
  numAndIndexes.sort((a, b) => a[0] - b[0]);

  const minHeap = [];
  const swapHeap = (i, j) => {
    const temp = minHeap[i];
    minHeap[i] = minHeap[j];
    minHeap[j] = temp;
  };
  const pushHeap = (value) => {
    minHeap.push(value);
    let child = minHeap.length - 1;
    while (child > 0) {
      const parent = Math.floor((child - 1) / 2);
      if (minHeap[parent] <= minHeap[child]) {
        break;
      }
      swapHeap(parent, child);
      child = parent;
    }
  };
  const popHeap = () => {
    const smallest = minHeap[0];
    const last = minHeap.pop();
    if (minHeap.length === 0) {
      return smallest;
    }
    minHeap[0] = last;
    let parent = 0;
    while (true) {
      const left = parent * 2 + 1;
      const right = parent * 2 + 2;
      let smallestIndex = parent;
      if (left < minHeap.length && minHeap[left] < minHeap[smallestIndex]) {
        smallestIndex = left;
      }
      if (right < minHeap.length && minHeap[right] < minHeap[smallestIndex]) {
        smallestIndex = right;
      }
      if (smallestIndex === parent) {
        break;
      }
      swapHeap(parent, smallestIndex);
      parent = smallestIndex;
    }
    return smallest;
  };

  const firstIndex = numAndIndexes[0][1];
  pushHeap(nums2[firstIndex]);
  let currentSum = nums2[firstIndex];

  for (let i = 1; i < n; i++) {
    const currNum = numAndIndexes[i][0];
    const currIndex = numAndIndexes[i][1];
    const prevNum = numAndIndexes[i - 1][0];
    const prevIndex = numAndIndexes[i - 1][1];

    if (currNum === prevNum) {
      answer[currIndex] = answer[prevIndex];
    } else {
      answer[currIndex] = currentSum;
    }

    pushHeap(nums2[currIndex]);
    currentSum += nums2[currIndex];
    if (minHeap.length === k + 1) {
      currentSum -= popHeap();
    }
  }

  return answer;
};
