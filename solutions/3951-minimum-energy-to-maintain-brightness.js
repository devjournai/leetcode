/**
 * Minimum Energy to Maintain Brightness
 * Intuition: A single bulb can illuminate at most 3 positions. To ensure the total brightness is at least brightness, the number of bulbs required to be turned on is lceil frac{brightness}{3} rceil. In programming, this is commonly written in integer division form as (brightness + 2) / 3.
 * Approach: A single bulb can illuminate at most 3 positions. To ensure the total brightness is at least brightness, the number of bulbs required to be turned on is lceil frac{brightness}{3} rceil. In programming, this is commonly written in integer division form as (brightness + 2) / 3. This problem can be solved through the following steps: 1. Merge Overlapping Intervals: Merge all intervals that intersect with each other to obtain a set of mutually disjoint continuous intervals. 2. Calculate Length Contribution: For each merged interval [start, end], the number of integer points (i.e., positions) it covers is m = end - start + 1. Since every position within the interval must satisfy the minimum brightness, the total energy required for this interval is: $text{Energy} = lceil frac{brightness}{3} rceil  *  m$ 3. Accumulate and Sum: Accumulate the energy of all disjoint intervals to get the final answer ans.
 * Dry Run: Input: n = 5, brightness = 5, intervals = [[6,12]]. Output: 14.
 * Time Complexity: O(nlogn)
 * Space Complexity: O(n)
 */
var minEnergy = function (n, brightness, intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const merged = [intervals[0]];
  for (let i = 1; i < intervals.length; i++) {
    const x = intervals[i];
    if (merged[merged.length - 1][1] < x[0]) {
      merged.push(x);
    } else {
      merged[merged.length - 1][1] = Math.max(
        merged[merged.length - 1][1],
        x[1]
      );
    }
  }
  let ans = 0;
  for (const [start, end] of merged) {
    const m = end - start + 1;
    ans += Math.ceil(brightness / 3) * m;
  }
  return ans;
};
