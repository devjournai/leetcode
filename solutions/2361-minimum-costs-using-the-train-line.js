/**
 * Minimum Costs Using The Train Line
 * Intuition: To find the minimum cost to reach any stop, we must consider the optimal path to the previous stop and the cost of the current segment. Since there are two routes, regular and express, we need to track the minimum cost to reach the current stop on each route independently, considering the option to switch routes.
 * Approach: 1. Initialize `costRegularRouteCurrent` to 0 (starting at stop 0 on the regular route) and `costExpressRouteCurrent` to `expressCost` (cost to switch to express at stop 0). 2. Create an array `allCosts` of length `n` to store the minimum cost to reach each stop from 1 to `n`. 3. Iterate from `stopIndex = 0` to `n-1` (representing segments `stopIndex` to `stopIndex+1`). 4. For each `stopIndex`, calculate `nextCostRegularRoute`: the minimum cost to reach `stopIndex+1` on the regular route by taking the regular segment (`regular[stopIndex]`) from either `costRegularRouteCurrent` or `costExpressRouteCurrent`. 5. Calculate `nextCostExpressRoute`: the minimum cost to reach `stopIndex+1` on the express route by taking the express segment (`express[stopIndex]`) from either `costRegularRouteCurrent` (plus `expressCost` for transfer) or `costExpressRouteCurrent` (staying on express). 6. Update `costRegularRouteCurrent` to `nextCostRegularRoute` and `costExpressRouteCurrent` to `nextCostExpressRoute`. 7. Store the minimum of `costRegularRouteCurrent` and `costExpressRouteCurrent` into `allCosts[stopIndex]`. 8. Return `allCosts`.
 * Dry Run: regular = [1,6,9], express = [10,4,6], expressCost = 8
 * segmentCount = 3
 * allCosts = [undefined, undefined, undefined]
 * costRegularRouteCurrent = 0
 * costExpressRouteCurrent = 8
 *
 * stopIndex = 0 (Corresponds to segments regular[0], express[0] for stop 1)
 *   nextCostRegularRoute = Math.min(costRegularRouteCurrent, costExpressRouteCurrent) + regular[0]
 *                        = Math.min(0, 8) + 1 = 0 + 1 = 1
 *   nextCostExpressRoute = Math.min(costRegularRouteCurrent + expressCost, costExpressRouteCurrent) + express[0]
 *                        = Math.min(0 + 8, 8) + 10 = Math.min(8, 8) + 10 = 8 + 10 = 18
 *   costRegularRouteCurrent = 1
 *   costExpressRouteCurrent = 18
 *   allCosts[0] = Math.min(1, 18) = 1
 *
 * stopIndex = 1 (Corresponds to segments regular[1], express[1] for stop 2)
 *   nextCostRegularRoute = Math.min(costRegularRouteCurrent, costExpressRouteCurrent) + regular[1]
 *                        = Math.min(1, 18) + 6 = 1 + 6 = 7
 *   nextCostExpressRoute = Math.min(costRegularRouteCurrent + expressCost, costExpressRouteCurrent) + express[1]
 *                        = Math.min(1 + 8, 18) + 4 = Math.min(9, 18) + 4 = 9 + 4 = 13
 *   costRegularRouteCurrent = 7
 *   costExpressRouteCurrent = 13
 *   allCosts[1] = Math.min(7, 13) = 7
 *
 * stopIndex = 2 (Corresponds to segments regular[2], express[2] for stop 3)
 *   nextCostRegularRoute = Math.min(costRegularRouteCurrent, costExpressRouteCurrent) + regular[2]
 *                        = Math.min(7, 13) + 9 = 7 + 9 = 16
 *   nextCostExpressRoute = Math.min(costRegularRouteCurrent + expressCost, costExpressRouteCurrent) + express[2]
 *                        = Math.min(7 + 8, 13) + 6 = Math.min(15, 13) + 6 = 13 + 6 = 19
 *   costRegularRouteCurrent = 16
 *   costExpressRouteCurrent = 19
 *   allCosts[2] = Math.min(16, 19) = 16
 *
 * Return allCosts = [1, 7, 16]
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var minimumCosts = function (regularSegments, expressSegments, transferCost) {
  const segmentCount = regularSegments.length;
  const allCosts = new Array(segmentCount);

  let costRegularRouteCurrent = 0;
  let costExpressRouteCurrent = transferCost;

  for (let stopIndex = 0; stopIndex < segmentCount; stopIndex++) {
    const nextCostRegularRoute =
      Math.min(costRegularRouteCurrent, costExpressRouteCurrent) +
      regularSegments[stopIndex];
    const nextCostExpressRoute =
      Math.min(
        costRegularRouteCurrent + transferCost,
        costExpressRouteCurrent,
      ) + expressSegments[stopIndex];

    costRegularRouteCurrent = nextCostRegularRoute;
    costExpressRouteCurrent = nextCostExpressRoute;
    allCosts[stopIndex] = Math.min(
      costRegularRouteCurrent,
      costExpressRouteCurrent,
    );
  }

  return allCosts;
};
