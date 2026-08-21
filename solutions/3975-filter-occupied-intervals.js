/**
 * Filter Occupied Intervals
 * Intuition: We first sort all occupied intervals by their left endpoints, and then traverse all intervals. If the left endpoint of the current interval is greater than the right endpoint of the last interval plus 1, we add the current interval to the result. Otherwise, we merge the current interval with the last interval, and update the right endpoint of the last interval to the larger value of the current interval and the last interval.
 * Approach: We first sort all occupied intervals by their left endpoints, and then traverse all intervals. If the left endpoint of the current interval is greater than the right endpoint of the last interval plus 1, we add the current interval to the result. Otherwise, we merge the current interval with the last interval, and update the right endpoint of the last interval to the larger value of the current interval and the last interval. Next, we traverse all occupied intervals. If the right endpoint of the current interval is less than the left endpoint of the free interval or the left endpoint of the current interval is greater than the right endpoint of the free interval, we add the current interval to the result. Otherwise, we check if the left endpoint of the current interval is less than the left endpoint of the free interval. If it is, we update the left endpoint of the current interval to the left endpoint of the free interval minus 1, and add it to the result. Then, we check if the right endpoint of the current interval is greater than the right endpoint of the free interval. If it is, we update the right endpoint of the current interval to the right endpoint of the free interval plus 1, and add it to the result. Finally, we return the result.
 * Dry Run: Input: occupiedIntervals = [[2,6],[4,8],[10,10],[10,12],[14,16]], freeStart = 7, freeEnd = 11. Output: [[2,6],[12,12],[14,16]].
 * Time Complexity: O(nlogn)
 * Space Complexity: O(n)
 */
var filterOccupiedIntervals = function (occupiedIntervals, freeStart, freeEnd) {
  occupiedIntervals.sort((a, b) => a[0] - b[0]);

  const busy = [occupiedIntervals[0]];

  for (let i = 1; i < occupiedIntervals.length; i++) {
    const cur = occupiedIntervals[i];
    const last = busy[busy.length - 1];

    if (last[1] + 1 < cur[0]) {
      busy.push(cur);
    } else {
      last[1] = Math.max(last[1], cur[1]);
    }
  }

  const ans = [];

  for (const [s, e] of busy) {
    if (e < freeStart || s > freeEnd) {
      ans.push([s, e]);
    } else {
      if (s < freeStart) {
        ans.push([s, freeStart - 1]);
      }
      if (e > freeEnd) {
        ans.push([freeEnd + 1, e]);
      }
    }
  }

  return ans;
};
