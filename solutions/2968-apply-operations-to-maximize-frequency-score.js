/**
 * Apply Operations to Maximize Frequency Score
 *
 * Intuition:
 *
 * We want to make as many elements as possible equal using at most
 * `k` operations.
 *
 * One operation changes a number by exactly 1, so the cost of
 * changing:
 *
 *     nums[i] -> target
 *
 * is:
 *
 *     |nums[i] - target|
 *
 * ------------------------------------------------------------
 *
 * Step 1:
 *
 * Sort the array.
 *
 *     nums.sort(...)
 *
 * Suppose we choose a group of consecutive elements:
 *
 *     [nums[left], ..., nums[right]]
 *
 * To make all of them equal, the best target is the MEDIAN.
 *
 * For example:
 *
 *     [1, 2, 6]
 *
 * Median = 2
 *
 * Cost:
 *
 *     |1 - 2| + |2 - 2| + |6 - 2|
 *     = 1 + 0 + 4
 *     = 5
 *
 * Any other target costs at least 5.
 *
 * ------------------------------------------------------------
 *
 * Therefore, for every window, we need to know the cost of making
 * all elements equal to its median.
 *
 * ------------------------------------------------------------
 *
 * Prefix Sum:
 *
 * Let:
 *
 *     prefix[i] = sum of nums[0 ... i - 1]
 *
 * For a window:
 *
 *     left ... right
 *
 * let:
 *
 *     mid = floor((left + right) / 2)
 *
 *     target = nums[mid]
 *
 * Cost of changing the LEFT side:
 *
 *     target * (mid - left)
 *     - (prefix[mid] - prefix[left])
 *
 * Cost of changing the RIGHT side:
 *
 *     (prefix[right + 1] - prefix[mid + 1])
 *     - target * (right - mid)
 *
 * Total cost:
 *
 *     leftCost + rightCost
 *
 * ------------------------------------------------------------
 *
 * Step 2:
 *
 * Use a sliding window.
 *
 * For every right position:
 *
 *     Add nums[right] to the window.
 *
 * If the cost of making the entire window equal to its median
 * is greater than k:
 *
 *     Move left forward.
 *
 * Because the array is sorted, removing elements from the left
 * can only reduce the required cost.
 *
 * We continue until:
 *
 *     cost <= k
 *
 * Then the current window is achievable.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 * nums = [1,2,4,6]
 * k = 3
 *
 * Sorted:
 *
 *     [1,2,4,6]
 *
 * Consider:
 *
 *     [1,2,4]
 *
 * Median = 2
 *
 * Cost:
 *
 *     |1-2| + |2-2| + |4-2|
 *     = 1 + 0 + 2
 *     = 3
 *
 * Since:
 *
 *     3 <= k
 *
 * We can make:
 *
 *     [2,2,2]
 *
 * Therefore frequency 3 is possible.
 *
 * ------------------------------------------------------------
 *
 * Why median?
 *
 * For any sorted values:
 *
 *     a1 <= a2 <= ... <= an
 *
 * The value that minimizes:
 *
 *     |a1-x| + |a2-x| + ... + |an-x|
 *
 * is a median.
 *
 * Therefore, for every group of elements we want to make equal,
 * choosing its median always gives the minimum number of
 * operations.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var maxFrequencyScore = function (nums, k) {
  nums.sort((a, b) => a - b);

  const n = nums.length;

  const prefix = new Array(n + 1).fill(0n);

  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + BigInt(nums[i]);
  }

  const limit = BigInt(k);

  const getCost = (left, right) => {
    const mid = Math.floor((left + right) / 2);
    const target = BigInt(nums[mid]);
    const leftCount = BigInt(mid - left);
    const leftSum = prefix[mid] - prefix[left];
    const leftCost = target * leftCount - leftSum;
    const rightCount = BigInt(right - mid);
    const rightSum = prefix[right + 1] - prefix[mid + 1];
    const rightCost = rightSum - target * rightCount;
    return leftCost + rightCost;
  };

  let left = 0;
  let answer = 1;

  for (let right = 0; right < n; right++) {
    while (left <= right && getCost(left, right) > limit) {
      left++;
    }

    answer = Math.max(answer, right - left + 1);
  }

  return answer;
};
