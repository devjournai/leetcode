/**
 * Aggregate Two Time Series
 * Intuition: Both series are strictly increasing by  * tamp, so they can be merged with two pointers. Taking the value of the next later  * tamp for a missing  * tamp is equivalent to: the value at the current pointer can be used directly for earlier missing  * tamps in that series.
 * Approach: Both series are strictly increasing by  * tamp, so they can be merged with two pointers. Taking the value of the next later  * tamp for a missing  * tamp is equivalent to: the value at the current pointer can be used directly for earlier missing  * tamps in that series. Let pointers i and j point to the two series. While both are not exhausted: - If t_1 = t_2, output [t_1, v_1 + v_2] and advance both pointers; - If t_1 < t_2, output [t_1, v_1 + v_2] (series2 uses the current later v_2) and advance only i; - If t_2 < t_1, handle symmetrically.
 * Dry Run: Input: series1 = [[1,3],[4,1]], series2 = [[2,2],[5,2]]. Output: [[1,5],[2,3],[4,3],[5,2]].
 * Time Complexity: O(m+n)
 * Space Complexity: O(m+n)
 */
var aggregateTimeSeries = function (series1, series2) {
  const m = series1.length;
  const n = series2.length;
  let i = 0;
  let j = 0;
  const ans = [];

  while (i < m && j < n) {
    const [t1, v1] = series1[i];
    const [t2, v2] = series2[j];

    if (t1 === t2) {
      ans.push([t1, v1 + v2]);
      i++;
      j++;
    } else if (t1 < t2) {
      ans.push([t1, v1 + v2]);
      i++;
    } else {
      ans.push([t2, v1 + v2]);
      j++;
    }
  }

  while (i < m) {
    ans.push(series1[i]);
    i++;
  }

  while (j < n) {
    ans.push(series2[j]);
    j++;
  }

  return ans;
};
