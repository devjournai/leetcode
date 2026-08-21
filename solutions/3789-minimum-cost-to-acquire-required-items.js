/**
 * Minimum Cost to Acquire Required Items
 * Intuition: We can divide the purchasing strategy into three cases:
 * Approach: 1. Only buy Type 1 and Type 2 items. The total cost is a = \textit{need1} \times \textit{cost1} + \textit{need2} \times \textit{cost2}. 2. Only buy Type 3 items. The total cost is b = \textit{costBoth} \times \max(\textit{need1}, \textit{need2}). 3. Buy some Type 3 items, and purchase Type 1 and Type 2 items separately for the remaining needs. Let \textit{mn} = \min(\textit{need1}, \textit{need2}), then the total cost is c = \textit{costBoth} \times \textit{mn} + (\textit{need1} - \textit{mn}) \times \textit{cost1} + (\textit{need2} - \textit{mn}) \times \textit{cost2}. Finally, we return the minimum value among the three cases, \min(a, b, c). The time complexity is O(1), and the space complexity is O(1).
 * Dry Run: Input cost1 = 3, cost2 = 2, costBoth = 1, need1 = 3, need2 = 2. Output 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var minimumCost = function (cost1, cost2, costBoth, need1, need2) {
  const a = need1 * cost1 + need2 * cost2;
  const b = costBoth * Math.max(need1, need2);
  const mn = Math.min(need1, need2);
  const c = costBoth * mn + (need1 - mn) * cost1 + (need2 - mn) * cost2;
  return Math.min(a, b, c);
};
