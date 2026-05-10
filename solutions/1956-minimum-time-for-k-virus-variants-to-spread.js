/**
 * Minimum Time For K Virus Variants To Spread
 * Intuition: The problem asks for the minimum number of days, which suggests a binary search approach on the answer. We can define a `check` function that, for a given number of days, determines if there exists any point in the infinite grid that is infected by at least `k` unique virus variants.
 * Approach: 1. Initialize a binary search range for the number of days, from `0` (minimum possible days) to `200` (maximum possible Manhattan distance between any two points in the `[0,100]x[0,100]` grid, covering the maximum spread time).
 * 2. Implement a helper function, `canFindKVariants(currentDayEstimate)`, which takes an integer `currentDayEstimate` as input. This function iterates through all possible target cells `(targetXCell, targetYCell)` within the relevant coordinate range (from `0` to `100`, as `points[i]` are constrained to `0 <= x_i, y_i <= 100`).
 * 3. For each `(targetXCell, targetYCell)`, it counts how many virus variants `(virusOriginX, virusOriginY)` from the `points` array can reach this target cell within `currentDayEstimate` days. A virus variant reaches a cell if its Manhattan distance `abs(targetXCell - virusOriginX) + abs(targetYCell - virusOriginY)` is less than or equal to `currentDayEstimate`.
 * 4. If any `(targetXCell, targetYCell)` is found to be infected by `k` or more variants, `canFindKVariants` immediately returns `true`. If no such cell is found after checking all candidate cells, it returns `false`.
 * 5. The binary search loop continuously narrows the range: if `canFindKVariants(midpointDay)` is `true`, it means `midpointDay` is a possible answer, and we might find an even smaller number of days, so we update the upper bound to `midpointDay`. If `canFindKVariants(midpointDay)` is `false`, `midpointDay` is too small, so we update the lower bound to `midpointDay + 1`.
 * 6. The loop continues until the `searchLowBound` and `searchHighBound` converge, and the final `searchLowBound` (or `searchHighBound`) is the minimum number of days required.
 * Dry Run: points = [[0,0], [10,0]], k = 2
 * Initial: searchLowBound = 0, searchHighBound = 200
 * Iteration 1:
 * midCandidateDays = floor((0 + 200) / 2) = 100
 * canFindKVariants(100):
 * Consider targetXCell = 5, targetYCell = 0.
 * For [0,0]: abs(5-0)+abs(0-0) = 5. 5 <= 100. variantCount = 1.
 * For [10,0]: abs(5-10)+abs(0-0) = 5. 5 <= 100. variantCount = 2.
 * Since variantCount (2) >= k (2), return true.
 * resultCheck = true. searchHighBound = 100.
 * (searchLowBound = 0, searchHighBound = 100)
 * Iteration 2:
 * midCandidateDays = floor((0 + 100) / 2) = 50
 * canFindKVariants(50): (Same check for (5,0))
 * For [0,0]: abs(5-0)+abs(0-0) = 5. 5 <= 50. variantCount = 1.
 * For [10,0]: abs(5-10)+abs(0-0) = 5. 5 <= 50. variantCount = 2.
 * Since variantCount (2) >= k (2), return true.
 * resultCheck = true. searchHighBound = 50.
 * (searchLowBound = 0, searchHighBound = 50)
 * ... (continues reducing searchHighBound) ...
 * Iteration X:
 * (searchLowBound = 0, searchHighBound = 5)
 * midCandidateDays = floor((0 + 5) / 2) = 2
 * canFindKVariants(2):
 * Consider targetXCell = 5, targetYCell = 0.
 * For [0,0]: abs(5-0)+abs(0-0) = 5. 5 > 2. Not reached.
 * For [10,0]: abs(5-10)+abs(0-0) = 5. 5 > 2. Not reached.
 * No point (x,y) for day=2 will have 2 variants. Returns false.
 * resultCheck = false. searchLowBound = 2 + 1 = 3.
 * (searchLowBound = 3, searchHighBound = 5)
 * Iteration Y:
 * midCandidateDays = floor((3 + 5) / 2) = 4
 * canFindKVariants(4): (Same check for (5,0))
 * For [0,0]: abs(5-0)+abs(0-0) = 5. 5 > 4. Not reached.
 * For [10,0]: abs(5-10)+abs(0-0) = 5. 5 > 4. Not reached.
 * No point (x,y) for day=4 will have 2 variants. Returns false.
 * resultCheck = false. searchLowBound = 4 + 1 = 5.
 * (searchLowBound = 5, searchHighBound = 5)
 * Loop terminates as searchLowBound (5) is not less than searchHighBound (5).
 * Return searchLowBound (5). Correct result.
 * Time Complexity: O(log(D_max) * (C+1)^2 * N)
 * Space Complexity: O(1)
 */
var minDayskVariants = function (points, k) {
  let searchLowBound = 0;
  let searchHighBound = 200;

  while (searchLowBound < searchHighBound) {
    const midCandidateDays = Math.floor((searchLowBound + searchHighBound) / 2);

    if (canFindKVariants(midCandidateDays)) {
      searchHighBound = midCandidateDays;
    } else {
      searchLowBound = midCandidateDays + 1;
    }
  }

  return searchLowBound;

  function canFindKVariants(currentDayEstimate) {
    const maxCoordValue = 100;
    const totalPointsCount = points.length;

    for (let targetXCell = 0; targetXCell <= maxCoordValue; targetXCell++) {
      for (let targetYCell = 0; targetYCell <= maxCoordValue; targetYCell++) {
        let currentVariantReachCount = 0;
        for (let virusIndex = 0; virusIndex < totalPointsCount; virusIndex++) {
          const virusOriginX = points[virusIndex][0];
          const virusOriginY = points[virusIndex][1];

          const manhattanDistance =
            Math.abs(targetXCell - virusOriginX) +
            Math.abs(targetYCell - virusOriginY);

          if (manhattanDistance <= currentDayEstimate) {
            currentVariantReachCount++;
          }
        }
        if (currentVariantReachCount >= k) {
          return true;
        }
      }
    }
    return false;
  }
};
