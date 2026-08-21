/**
 * Sort Array Using Prefix Reversals
 * Intuition: Since n le 8, the number of permutations is at most 8! = 40320, so we can use BFS to find the minimum number of operations.
 * Approach: Since n le 8, the number of permutations is at most 8! = 40320, so we can use BFS to find the minimum number of operations. Treat the current array as a state, and the target state is [0, 1, ldots, n - 1]. If the initial state is already the target, return 0. Otherwise, start BFS from the initial state: each time take a state from the queue, enumerate every prefix length x in pre, and reverse the first x elements to obtain a new state. If the new state equals the target, return the current number of steps; otherwise, if it has not been visited, enqueue it. If the search finishes without reaching the target, return -1. For convenience of deduplication, encode each permutation as an integer in base 8 (every element lies in [0, 7]).
 * Dry Run: Input: nums = [2,0,1], pre = [2,3]. Output: 2.
 * Time Complexity: O(n!cdotmcdotn)
 * Space Complexity: O(n!cdotn)
 */
var sortArray = function (nums, pre) {
  const n = nums.length;

  let target = 0;
  for (let i = 0; i < n; i++) {
    target = target * 8 + i;
  }

  let start = 0;
  for (const x of nums) {
    start = start * 8 + x;
  }

  if (start === target) {
    return 0;
  }

  const vis = new Set();
  vis.add(start);

  const q = [[nums.slice(), 0]];

  while (q.length) {
    const [state, dist] = q.shift();
    const nd = dist + 1;

    for (const x of pre) {
      const nxt = state.slice();

      for (let l = 0, r = x - 1; l < r; l++, r--) {
        [nxt[l], nxt[r]] = [nxt[r], nxt[l]];
      }

      let key = 0;
      for (const v of nxt) {
        key = key * 8 + v;
      }

      if (key === target) {
        return nd;
      }

      if (!vis.has(key)) {
        vis.add(key);
        q.push([nxt, nd]);
      }
    }
  }

  return -1;
};
