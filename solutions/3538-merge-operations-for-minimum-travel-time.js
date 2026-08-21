/**
 * Merge Operations for Minimum Travel Time
 * Intuition: Merging consecutive segments changes the time-rate for later hops. DP on current stop, remaining merges, and the start of the current combined rate window.
 * Approach: 1. Prefix-sum the time array for O(1) rate of a merged block. 2. dp(i, skips, last) = min over next stop j of distance * rate + dp(j, leftover skips). 3. skips consume how many intermediate stops you merge away.
 * Dry Run: n=3, k=1, positions and times such that merging the middle two rates reduces total travel versus no merge.
 * Time Complexity: O(K^2 * N^2)
 * Space Complexity: O(K * N^2)
 */
var minTravelTime = function (l, n, k, position, time) {
  const prefix = new Array(n);
  prefix[0] = time[0];
  for (let i = 1; i < n; i++) prefix[i] = prefix[i - 1] + time[i];

  const memo = new Map();

  const dp = (i, skips, last) => {
    const key = `${i},${skips},${last}`;
    if (memo.has(key)) return memo.get(key);
    if (i === n - 1) {
      const value = skips === 0 ? 0 : Infinity;
      memo.set(key, value);
      return value;
    }
    let result = Infinity;
    const rate = prefix[i] - (last > 0 ? prefix[last - 1] : 0);
    const end = Math.min(n - 1, i + skips + 1);
    for (let j = i + 1; j <= end; j++) {
      const distance = position[j] - position[i];
      result = Math.min(
        result,
        distance * rate + dp(j, skips - (j - i - 1), i + 1)
      );
    }
    memo.set(key, result);
    return result;
  };

  return dp(0, k, 0);
};
