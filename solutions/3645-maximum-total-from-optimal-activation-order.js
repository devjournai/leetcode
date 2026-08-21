/**
 * Maximum Total from Optimal Activation Order
 * Intuition: Values sharing the same limit compete: at most `limit` of them may be taken, so keep the largest `limit` in that group.
 * Approach: 1. Group values by limit[i]. 2. Sort each group descending. 3. Add the first lim entries.
 * Dry Run: value=[1,2,3], limit=[2,2,2] → take top 2: 3+2=5.
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
var maxTotal = function (value, limit) {
  const groups = new Map();
  for (let index = 0; index < value.length; index++) {
    if (!groups.has(limit[index])) {
      groups.set(limit[index], []);
    }
    groups.get(limit[index]).push(value[index]);
  }

  let answer = 0;
  for (const [groupLimit, values] of groups) {
    values.sort((left, right) => right - left);
    const take = Math.min(groupLimit, values.length);
    for (let index = 0; index < take; index++) {
      answer += values[index];
    }
  }
  return answer;
};
