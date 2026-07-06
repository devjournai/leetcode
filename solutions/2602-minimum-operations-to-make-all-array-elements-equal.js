/**
 * Minimum Operations to Make All Array Elements Equal
 *
 * Intuition:
 * To make every element equal to a target value `x`,
 * each element contributes:
 *
 *      |nums[i] - x|
 *
 * Sorting the array allows us to split it into:
 *
 * • Elements smaller than x
 * • Elements greater than or equal to x
 *
 * Using prefix sums, the total operations for both parts can be computed
 * in O(1) after locating the split position with binary search.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Sort the array in ascending order.
 *
 * 2. Build a prefix sum array.
 *
 *      prefix[i]
 *      =
 *      sum of first i elements.
 *
 * 3. For every query:
 *
 *      Use binary search to find the first index where:
 *
 *          nums[index] >= query
 *
 *      Let:
 *
 *          leftCount = index
 *          rightCount = n - index
 *
 * 4. Cost to increase left part:
 *
 *      query × leftCount
 *      -
 *      prefix[leftCount]
 *
 * 5. Cost to decrease right part:
 *
 *      (prefix[n] - prefix[leftCount])
 *      -
 *      query × rightCount
 *
 * 6. Add both costs and store the answer.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums =
 * [3,1,6,8]
 *
 * Sorted:
 *
 * [1,3,6,8]
 *
 * Prefix:
 *
 * [0,1,4,10,18]
 *
 * Query = 5
 *
 * Binary Search:
 *
 * first >=5
 *
 * index = 2
 *
 * Left Cost:
 *
 * 5×2-4
 *
 * =6
 *
 * Right Cost:
 *
 * (18-4)-5×2
 *
 * =4
 *
 * Total:
 *
 * 6+4
 *
 * =10
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N + M log N)
 * Space Complexity: O(N)
 */

var minOperations = function (nums, queries) {
  nums.sort((a, b) => a - b);

  const n = nums.length;

  const prefix = new Array(n + 1).fill(0n);

  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + BigInt(nums[i]);
  }

  const answer = [];

  for (const query of queries) {
    let left = 0;
    let right = n;

    while (left < right) {
      const mid = (left + right) >> 1;

      if (nums[mid] < query) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    const index = left;

    const leftCost = BigInt(query) * BigInt(index) - prefix[index];

    const rightCost =
      prefix[n] - prefix[index] - BigInt(query) * BigInt(n - index);

    answer.push(Number(leftCost + rightCost));
  }

  return answer;
};
