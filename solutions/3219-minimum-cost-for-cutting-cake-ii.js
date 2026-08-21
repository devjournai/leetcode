/**
 * Minimum Cost for Cutting Cake II
 * Intuition: Same greedy as cake cutting I: process the most expensive remaining cut first so it is duplicated as few times as possible.
 * Approach: 1. Sort both cut arrays. 2. Always apply the larger remaining cut, adding the opposite remaining-cut sum. 3. Add leftover sums. Use 64-bit-safe numbers via JS numbers (values fit).
 * Dry Run:
 *   m=3, n=2, horizontalCut=[1,3], verticalCut=[5]
 *   Take 5 first (cost 5+4=9), leftover 4 -> 13.
 * Time Complexity: O(m log m + n log n)
 * Space Complexity: O(1)
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
  let totalCost = 0;
  let remainingHorizontalSum = 0;
  let remainingVerticalSum = 0;
  for (const cutCost of horizontalCut) {
    remainingHorizontalSum += cutCost;
  }
  for (const cutCost of verticalCut) {
    remainingVerticalSum += cutCost;
  }

  horizontalCut.sort((leftCost, rightCost) => leftCost - rightCost);
  verticalCut.sort((leftCost, rightCost) => leftCost - rightCost);

  while (horizontalCut.length > 0 && verticalCut.length > 0) {
    if (
      horizontalCut[horizontalCut.length - 1] >
      verticalCut[verticalCut.length - 1]
    ) {
      const horizontalCutCost = horizontalCut.pop();
      totalCost += horizontalCutCost + remainingVerticalSum;
      remainingHorizontalSum -= horizontalCutCost;
    } else {
      const verticalCutCost = verticalCut.pop();
      totalCost += verticalCutCost + remainingHorizontalSum;
      remainingVerticalSum -= verticalCutCost;
    }
  }

  return totalCost + remainingHorizontalSum + remainingVerticalSum;
};
