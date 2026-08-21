/**
 * Minimum Cost for Cutting Cake I
 * Intuition: Each cut is paid once per existing piece in the opposite direction. Costly cuts should happen while there are fewer opposite pieces, so process cuts from largest to smallest.
 * Approach: 1. Sort both cut arrays. 2. Repeatedly take the larger remaining cut: a horizontal cut costs that cut plus the remaining vertical-cut sum (all vertical pieces still uncut add a copy). 3. Add leftover sums at the end.
 * Dry Run:
 *   m=3, n=2, horizontalCut=[1,3], verticalCut=[5]
 *   5 > 3: take vertical 5 + sumH 4 = 9, remaining H [1,3]
 *   leftover 4 -> total 13.
 * Time Complexity: O(m log m + n log n)
 * Space Complexity: O(1)
 */
var minimumCost = function (m, n, horizontalCut, verticalCut) {
  let totalCost = 0;
  let remainingHorizontalSum = horizontalCut.reduce(
    (sum, cutCost) => sum + cutCost,
    0
  );
  let remainingVerticalSum = verticalCut.reduce(
    (sum, cutCost) => sum + cutCost,
    0
  );

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
