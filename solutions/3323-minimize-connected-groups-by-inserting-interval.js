/**
 * Minimize Connected Groups by Inserting Interval
 * Intuition: After merging overlaps, inserting one interval of length k can bridge a streak of consecutive groups whose starts lie within k of some group’s end. Maximize that streak, then remaining groups are n - maxMerged.
 * Approach: 1. Merge overlapping intervals. 2. Two pointers: for each merged interval end, advance i while end + k >= next start. 3. Track the maximum number of extra intervals absorbed. 4. Answer is mergedCount - that maximum.
 * Dry Run: intervals = [[1,3],[4,6],[10,12]], k = 3
 *   - [1,3] can reach [4,6] but not [10,12]; max absorb 1 → 3-1 = 2
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minConnectedGroups = function (intervals, k) {
  const merge = (arr) => {
    arr.sort((a, b) => a[0] - b[0]);
    const res = [];
    for (const interval of arr) {
      if (res.length === 0 || res[res.length - 1][1] < interval[0]) {
        res.push([interval[0], interval[1]]);
      } else {
        res[res.length - 1][1] = Math.max(res[res.length - 1][1], interval[1]);
      }
    }
    return res;
  };

  intervals = merge(intervals);
  let mergedIntervals = 0;
  let maxMergedIntervals = 0;
  let i = 0;

  for (const interval of intervals) {
    const end = interval[1];
    while (i < intervals.length && end + k >= intervals[i][0]) {
      mergedIntervals++;
      i++;
    }
    mergedIntervals--;
    maxMergedIntervals = Math.max(maxMergedIntervals, mergedIntervals);
  }

  return intervals.length - maxMergedIntervals;
};
