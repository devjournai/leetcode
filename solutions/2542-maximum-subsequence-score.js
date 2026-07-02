/**
* Maximum Subsequence Score
* Intuition: To maximize the product `(sum of k nums1 values) * (minimum of k nums2 values)`, we can fix the minimum `nums2` value and try to maximize the sum of `nums1` values. By sorting the pairs `(nums1[i], nums2[i])` in descending order of `nums2[i]`, we can iterate through the elements. For each `nums2[i]` as a potential minimum multiplier, all previously processed elements (and the current one) have `nums2` values greater than or equal to `nums2[i]`. We maintain a min-priority queue of size `k` to keep track of the `k` largest `nums1` values encountered so far from the eligible candidates, thereby maximizing their sum for the current `nums2[i]` multiplier.
* Approach: 1. Create an array of pairs `[nums1[i], nums2[i]]`. 2. Sort this array in descending order based on the `nums2` values. 3. Initialize a min-priority queue to store `nums1` values and a variable `currentSumOfNums1` to track their sum. 4. Initialize `maximumAchievedScore` to 0. 5. Iterate through the sorted pairs: a. Add the current `nums1` value to `currentSumOfNums1` and enqueue it into the min-priority queue. b. If the min-priority queue's size exceeds `k`, dequeue the smallest `nums1` value and subtract it from `currentSumOfNums1`. This ensures `currentSumOfNums1` always holds the sum of the `k` largest `nums1` values in the queue. c. If the min-priority queue's size is exactly `k`, calculate a `candidateScore` by multiplying `currentSumOfNums1` with the current `nums2` value (which is the minimum among the `k` selected elements). Update `maximumAchievedScore` with the maximum between itself and `candidateScore`. 6. Return `maximumAchievedScore`.
* Dry Run: nums1 = [1, 3, 2], nums2 = [2, 3, 3], k = 2
      1. Pairs: [[1,2], [3,3], [2,3]]. Sorted by nums2 desc: [[3,3], [2,3], [1,2]].
      2. Init: maximumAchievedScore = 0, currentSumOfNums1 = 0, minPriorityQueueForValues = [].
      3. Iterate:
         - Pair [3,3]:
           - currentSumOfNums1 = 3. minPriorityQueueForValues.enqueue(3) -> [3].
           - Queue size (1) < k (2). No score update.
         - Pair [2,3]:
           - currentSumOfNums1 = 3 + 2 = 5. minPriorityQueueForValues.enqueue(2) -> [2,3].
           - Queue size (2) == k (2).
           - candidateScore = 5 * 3 = 15. maximumAchievedScore = max(0, 15) = 15.
         - Pair [1,2]:
           - currentSumOfNums1 = 5 + 1 = 6. minPriorityQueueForValues.enqueue(1) -> [1,2,3].
           - Queue size (3) > k (2).
           - Dequeue smallest: 1. currentSumOfNums1 = 6 - 1 = 5. minPriorityQueueForValues -> [2,3].
           - Queue size (2) == k (2).
           - candidateScore = 5 * 2 = 10. maximumAchievedScore = max(15, 10) = 15.
      4. Return 15.
* Time Complexity: O(N log N)
* Space Complexity: O(N)
*/
var maxScore = function (nums1, nums2, k) {
  const combinedElements = nums1
    .map((valueOne, indexNumber) => [valueOne, nums2[indexNumber]])
    .sort((pairA, pairB) => pairB[1] - pairA[1]);

  const minPriorityQueueForValues = new MinPriorityQueue();
  let maximumAchievedScore = 0;
  let currentSumOfNums1 = 0;

  for (const [currentNum1Value, currentNum2Value] of combinedElements) {
    minPriorityQueueForValues.enqueue(currentNum1Value);
    currentSumOfNums1 += currentNum1Value;

    if (minPriorityQueueForValues.size() > k) {
      currentSumOfNums1 -= minPriorityQueueForValues.dequeue();
    }

    if (minPriorityQueueForValues.size() === k) {
      const candidateScore = currentSumOfNums1 * currentNum2Value;
      maximumAchievedScore = Math.max(maximumAchievedScore, candidateScore);
    }
  }

  return maximumAchievedScore;
};
