/**
 * Maximum Total Sum with Threshold Constraints
 * Intuition: We observe that at each step, we want to select the largest number among those that satisfy the condition to add to the total sum. Therefore, we can use a greedy approach to solve this problem.
 * Approach: We first sort an index array \textit{idx} of length n in ascending order by their corresponding thresholds. Then, we use a sorted set or priority queue (max heap) to maintain the numbers that currently satisfy the condition. At each step, we add all numbers whose thresholds are less than or equal to the current step number into the sorted set or priority queue, and then select the largest number among them to add to the total sum. If the sorted set or priority queue is empty at this point, it means there are no numbers that satisfy the condition, and we end the process. The time complexity is O(n \times \log n), and the space complexity is O(n), where n is the length of the array \textit{nums}.
 * Dry Run: Input nums = [1,10,4,2,1,6], threshold = [5,1,5,5,2,2]. Output 17.
 * Time Complexity: O(n \times \log n)
 * Space Complexity: O(n)
 */
var maxSum = function (nums, threshold) {
  const n = nums.length;
  const idx = Array.from({ length: n }, (_, i) => i).sort(
    (a, b) => threshold[a] - threshold[b]
  );
  const pq = new MaxPriorityQueue();
  let ans = 0;
  for (let i = 0, step = 1; ; ++step) {
    while (i < n && threshold[idx[i]] <= step) {
      pq.enqueue(nums[idx[i]]);
      ++i;
    }
    if (pq.isEmpty()) {
      break;
    }
    ans += pq.dequeue();
  }
  return ans;
};
