/**
 * Zero Array Transformation III
 * Intuition: Queries may be dropped, so keep the ones that cover the current index for as long as possible. Sort by left endpoint; at index `i` take unused queries that start here, then greedily activate the one with the largest right end until `nums[i]` is covered.
 * Approach: 1. Sort queries by `l`. 2. `available` max-heap of unused `r` values whose `l <= i`. 3. `running` min-heap of active `r` values; pop those with `r < i`. 4. While `running.size < nums[i]`, move the farthest `available` into `running` (fail if none cover `i`). 5. Unused queries left in `available` are the maximum we can remove.
 * Dry Run: nums = [2, 0, 2], queries = [[0,2],[0,2],[1,1]]. At i=0 take two [0,2]; i=2 already covered. One query unused → 1.
 * Time Complexity: O(N + Q log Q)
 * Space Complexity: O(Q)
 */
var maxRemoval = function (nums, queries) {
  queries.sort((queryA, queryB) => queryA[0] - queryB[0]);
  const availableRights = new MaxPriorityQueue();
  const runningRights = new MinPriorityQueue();
  let queryIndex = 0;

  for (let index = 0; index < nums.length; index++) {
    while (queryIndex < queries.length && queries[queryIndex][0] <= index) {
      availableRights.enqueue(queries[queryIndex][1]);
      queryIndex++;
    }
    while (runningRights.size() > 0 && runningRights.front().element < index) {
      runningRights.dequeue();
    }
    while (nums[index] > runningRights.size()) {
      if (
        availableRights.size() === 0 ||
        availableRights.front().element < index
      ) {
        return -1;
      }
      runningRights.enqueue(availableRights.dequeue().element);
    }
  }

  return availableRights.size();
};
