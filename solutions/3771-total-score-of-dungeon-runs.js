/**
 * Total Score of Dungeon Runs
 * Intuition: Starting at room j, room i (i >= j) scores iff hp - (damage[j]+...+damage[i]) >= requirement[i], i.e. prefix[i+1] - prefix[j] <= hp - requirement[i].
 * Approach: Build prefix sums of damage. For each room i, binary-search the leftmost start j where prefix[j] >= prefix[i+1] + requirement[i] - hp. Every start in [j, i] scores room i.
 * Dry Run: hp = 11, damage = [3,6,7], requirement = [4,2,5]. Room 0 is scored by 1 start, room 1 by 2 starts, room 2 by 0; total 3.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var totalScore = function (hp, damage, requirement) {
  const prefix = Array(damage.length + 1).fill(0);
  for (let i = 0; i < damage.length; i++) {
    prefix[i + 1] = prefix[i] + damage[i];
  }
  const lowerBound = (target) => {
    let lo = 0;
    let hi = prefix.length;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (prefix[mid] < target) {
        lo = mid + 1;
      } else {
        hi = mid;
      }
    }
    return lo;
  };
  let result = 0;
  for (let i = 0; i < damage.length; i++) {
    const j = lowerBound(prefix[i + 1] + requirement[i] - hp);
    if (j <= i) {
      result += i - j + 1;
    }
  }
  return result;
};
