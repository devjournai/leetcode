/**
 * Maximize the Total Height of Unique Towers
 * Intuition: Unique positive heights that maximize the sum should stay as large as possible. After sorting maxima descending, each tower can take at most one less than the previous assignment.
 * Approach: 1. Sort `maximumHeight` descending. 2. Track `mn`, the last assigned height (start at Infinity). 3. For each tower, assign `min(height, mn - 1)`. 4. If that value is 0, return -1. 5. Add it to the answer and set `mn` to the assignment.
 * Dry Run: maximumHeight = [2, 2, 1]
 *   - Sort desc: [2, 2, 1]
 *   - 2 → min(2, Inf-1) = 2, sum = 2, mn = 2
 *   - 2 → min(2, 1) = 1, sum = 3, mn = 1
 *   - 1 → min(1, 0) = 0 → -1
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var maximumTotalSum = function (maximumHeight) {
  maximumHeight.sort((a, b) => b - a);
  let ans = 0;
  let mn = Infinity;

  for (const height of maximumHeight) {
    const assigned = Math.min(height, mn - 1);
    if (assigned === 0) {
      return -1;
    }
    ans += assigned;
    mn = assigned;
  }

  return ans;
};
