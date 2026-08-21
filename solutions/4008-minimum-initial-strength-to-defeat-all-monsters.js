/**
 * Minimum Initial Strength to Defeat All Monsters
 * Intuition: Each boost adds a value to an entire index range [l, r], so we first apply all boosts using a difference array d. The bonus when fighting the i-th monster is then the prefix sum sum_{j=0}^{i} d[j].
 * Approach: Each boost adds a value to an entire index range [l, r], so we first apply all boosts using a difference array d. The bonus when fighting the i-th monster is then the prefix sum sum_{j=0}^{i} d[j]. Next, we binary search the initial strength v. For a given v, we simulate the fights from left to right: maintain the current bonus (the prefix sum of the difference array); if v + bonus < monsters[i], the monster cannot be defeated and v is infeasible; otherwise, we defeat it, decrease v by monsters[i], and reset v to 0 if it becomes negative. If all monsters can be defeated, v is feasible. A larger initial strength never makes it harder to defeat all monsters, so feasibility is monotonic in v, and we can binary search the minimum feasible initial strength. The upper bound of the search is set to 10^{15} (the total strength of all monsters is at most 5  *  10^4  *  10^9 = 5  *  10^{13}).
 * Dry Run: Input: monsters = [5,10,15], boosts = [[1,1,10]]. Output: 30.
 * Time Complexity: O((n+m) * logM)
 * Space Complexity: O(n)
 */
var minInitialStrength = function (monsters, boosts) {
  const n = monsters.length;
  const d = new Array(n + 1).fill(0);

  for (const [l, r, v] of boosts) {
    d[l] += v;
    d[r + 1] -= v;
  }

  const check = (v) => {
    let bonus = 0;
    for (let i = 0; i < n; i++) {
      bonus += d[i];
      if (v + bonus < monsters[i]) {
        return false;
      }
      v -= monsters[i];
      if (v < 0) {
        v = 0;
      }
    }
    return true;
  };

  let left = 0;
  let right = 1e15;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (check(mid)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
