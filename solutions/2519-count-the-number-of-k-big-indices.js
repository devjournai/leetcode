/**
 * Count The Number Of K Big Indices
 * Intuition: An index is k-big if it has at least k smaller elements to its left and k smaller elements to its right. We can use a two-pass approach. In the first pass (left-to-right), identify indices with k smaller elements to their left. In the second pass (right-to-left), identify indices with k smaller elements to their right, and combine with the left condition to count k-big indices. Priority queues (max-heaps) of size k efficiently track the k smallest elements encountered in a sliding window fashion.
 * Approach: 1. Initialize a boolean array `leftSatisfied` of size `n` to store if an index `i` has `k` smaller elements to its left. 2. Create a max-priority queue `leftSmallestElements` to store the `k` smallest elements encountered from the left. 3. Iterate from `leftIdx = 0` to `n-1`: if `leftSmallestElements` has `k` elements and its largest element is smaller than `nums[leftIdx]`, mark `leftSatisfied[leftIdx]` as true. Then, add `nums[leftIdx]` to `leftSmallestElements`, and if its size exceeds `k`, remove the largest element. 4. Initialize `kBigIndicesCount = 0`. 5. Create another max-priority queue `rightSmallestElements` for the right pass. 6. Iterate from `rightIdx = n-1` down to `0`: if `rightSmallestElements` has `k` elements, its largest element is smaller than `nums[rightIdx]`, AND `leftSatisfied[rightIdx]` is true, increment `kBigIndicesCount`. Then, add `nums[rightIdx]` to `rightSmallestElements`, and if its size exceeds `k`, remove the largest element. 7. Return `kBigIndicesCount`.
 * Dry Run:
 * nums = [2, 1, 4, 3, 5], k = 2
 * n = 5
 * leftSatisfied = [F, F, F, F, F]
 * kBigIndicesCount = 0
 *
 * Left Pass:
 * leftSmallestElements (max-PQ, stores k smallest elements seen so far)
 * leftIdx = 0, nums[0] = 2: enqueue(2). leftSmallestElements = [2].
 * leftIdx = 1, nums[1] = 1: enqueue(1). leftSmallestElements = [2, 1].
 * leftIdx = 2, nums[2] = 4:
 *   leftSmallestElements.size() == k (2==2) is true.
 *   leftSmallestElements.front() (2) < nums[2] (4) is true.
 *   leftSatisfied[2] = true. (leftSatisfied = [F, F, T, F, F])
 *   enqueue(4). leftSmallestElements = [4, 2, 1].
 *   dequeue() (removes 4). leftSmallestElements = [2, 1].
 * leftIdx = 3, nums[3] = 3:
 *   leftSmallestElements.size() == k (2==2) is true.
 *   leftSmallestElements.front() (2) < nums[3] (3) is true.
 *   leftSatisfied[3] = true. (leftSatisfied = [F, F, T, T, F])
 *   enqueue(3). leftSmallestElements = [3, 2, 1].
 *   dequeue() (removes 3). leftSmallestElements = [2, 1].
 * leftIdx = 4, nums[4] = 5:
 *   leftSmallestElements.size() == k (2==2) is true.
 *   leftSmallestElements.front() (2) < nums[4] (5) is true.
 *   leftSatisfied[4] = true. (leftSatisfied = [F, F, T, T, T])
 *   enqueue(5). leftSmallestElements = [5, 2, 1].
 *   dequeue() (removes 5). leftSmallestElements = [2, 1].
 *
 * After Left Pass: leftSatisfied = [F, F, T, T, T]
 *
 * Right Pass:
 * rightSmallestElements (max-PQ, stores k smallest elements seen so far from right)
 * rightIdx = 4, nums[4] = 5: enqueue(5). rightSmallestElements = [5].
 * rightIdx = 3, nums[3] = 3: enqueue(3). rightSmallestElements = [5, 3].
 * rightIdx = 2, nums[2] = 4:
 *   rightSmallestElements.size() == k (2==2) is true.
 *   rightSmallestElements.front() (5) < nums[2] (4) is false.
 *   (Condition not met for kBigIndicesCount increment)
 *   enqueue(4). rightSmallestElements = [5, 4, 3].
 *   dequeue() (removes 5). rightSmallestElements = [4, 3].
 * rightIdx = 1, nums[1] = 1:
 *   rightSmallestElements.size() == k (2==2) is true.
 *   rightSmallestElements.front() (4) < nums[1] (1) is false.
 *   (Condition not met for kBigIndicesCount increment)
 *   enqueue(1). rightSmallestElements = [4, 3, 1].
 *   dequeue() (removes 4). rightSmallestElements = [3, 1].
 * rightIdx = 0, nums[0] = 2:
 *   rightSmallestElements.size() == k (2==2) is true.
 *   rightSmallestElements.front() (3) < nums[0] (2) is false.
 *   (Condition not met for kBigIndicesCount increment)
 *   enqueue(2). rightSmallestElements = [3, 2, 1].
 *   dequeue() (removes 3). rightSmallestElements = [2, 1].
 *
 * Final kBigIndicesCount = 0.
 *
 * Time Complexity: O(N log K)
 * Space Complexity: O(N + K)
 */
var kBigIndices = function (nums, k) {
  const arrayLength = nums.length;
  const leftSatisfied = new Array(arrayLength).fill(false);

  const leftSmallestElements = new PriorityQueue((a, b) => b - a);
  for (let leftIdx = 0; leftIdx < arrayLength; leftIdx++) {
    if (
      leftSmallestElements.size() === k &&
      leftSmallestElements.front() < nums[leftIdx]
    ) {
      leftSatisfied[leftIdx] = true;
    }
    leftSmallestElements.enqueue(nums[leftIdx]);
    if (leftSmallestElements.size() > k) {
      leftSmallestElements.dequeue();
    }
  }

  let kBigIndicesCount = 0;
  const rightSmallestElements = new PriorityQueue((a, b) => b - a);
  for (let rightIdx = arrayLength - 1; rightIdx >= 0; rightIdx--) {
    if (
      rightSmallestElements.size() === k &&
      rightSmallestElements.front() < nums[rightIdx] &&
      leftSatisfied[rightIdx]
    ) {
      kBigIndicesCount++;
    }
    rightSmallestElements.enqueue(nums[rightIdx]);
    if (rightSmallestElements.size() > k) {
      rightSmallestElements.dequeue();
    }
  }

  return kBigIndicesCount;
};
