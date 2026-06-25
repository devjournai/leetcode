/**
 * Minimum Cost To Make Array Equal
 * Intuition: The cost function `f(X) = sum(cost[i] * abs(nums[i] - X))` is convex. For a convex function, its minimum can be efficiently found using binary search on the domain of X. The optimal target value X will lie between the minimum and maximum values in the `nums` array.
 * Approach: 1. Determine the search range for the target value X by finding the minimum and maximum values in the `nums` array. 2. Implement a helper function `calculateCostFunction` that computes the total cost for a given target value. 3. Perform a binary search within the determined range. In each step, calculate the cost for the `midpointValue` and `midpointValue + 1`. If `costAtMid` is less than `costAtMidPlusOne`, it implies the minimum is to the left or at `midpointValue`, so adjust the `endRange`. Otherwise, adjust the `startRange`. Keep track of the `lowestCostFound` during the search.
 * Dry Run:
 * nums = [1,2,3], cost = [1,1,1]
 * 1. Initialize: `minimumVal = 1`, `maximumVal = 3`, `lowestCostFound = Infinity`, `startRange = 1`, `endRange = 3`.
 * 2. Loop 1 (`startRange = 1`, `endRange = 3`):
 *    `midpointValue = floor((1+3)/2) = 2`.
 *    `costAtMid = calculateCostFunction(2, [1,2,3], [1,1,1])` = `1*abs(1-2) + 1*abs(2-2) + 1*abs(3-2)` = `1 + 0 + 1 = 2`.
 *    `costAtMidPlusOne = calculateCostFunction(3, [1,2,3], [1,1,1])` = `1*abs(1-3) + 1*abs(2-3) + 1*abs(3-3)` = `2 + 1 + 0 = 3`.
 *    `lowestCostFound = Math.min(Infinity, 2) = 2`.
 *    Since `costAtMid (2) < costAtMidPlusOne (3)`, set `endRange = 2 - 1 = 1`.
 *    Current state: `startRange = 1`, `endRange = 1`.
 * 3. Loop 2 (`startRange = 1`, `endRange = 1`):
 *    `midpointValue = floor((1+1)/2) = 1`.
 *    `costAtMid = calculateCostFunction(1, [1,2,3], [1,1,1])` = `1*abs(1-1) + 1*abs(2-1) + 1*abs(3-1)` = `0 + 1 + 2 = 3`.
 *    `costAtMidPlusOne = calculateCostFunction(2, [1,2,3], [1,1,1])` = (already computed as 2).
 *    `lowestCostFound = Math.min(2, 3) = 2`.
 *    Since `costAtMid (3) < costAtMidPlusOne (2)` is false, set `startRange = 1 + 1 = 2`.
 *    Current state: `startRange = 2`, `endRange = 1`.
 * 4. Loop 3 (`startRange = 2`, `endRange = 1`):
 *    `startRange <= endRange` (2 <= 1) is false. The loop terminates.
 * 5. Return `lowestCostFound = 2`.
 * Time Complexity: O(N * log(MaxVal - MinVal))
 * Space Complexity: O(1)
 */
var minCost = function (nums, cost) {
  const calculateCostFunction = (targetVal, numberArray, priceArray) => {
    let totalAccumulatedCost = 0;
    for (
      let indexIterator = 0;
      indexIterator < numberArray.length;
      indexIterator++
    ) {
      totalAccumulatedCost +=
        priceArray[indexIterator] *
        Math.abs(numberArray[indexIterator] - targetVal);
    }
    return totalAccumulatedCost;
  };

  let minimumVal = nums[0];
  let maximumVal = nums[0];

  for (let initialIndex = 1; initialIndex < nums.length; initialIndex++) {
    minimumVal = Math.min(minimumVal, nums[initialIndex]);
    maximumVal = Math.max(maximumVal, nums[initialIndex]);
  }

  let lowestCostFound = Infinity;
  let startRange = minimumVal;
  let endRange = maximumVal;

  while (startRange <= endRange) {
    let midpointValue = Math.floor((startRange + endRange) / 2);
    let costAtMid = calculateCostFunction(midpointValue, nums, cost);
    let costAtMidPlusOne = calculateCostFunction(midpointValue + 1, nums, cost);

    lowestCostFound = Math.min(lowestCostFound, costAtMid);

    if (costAtMid < costAtMidPlusOne) {
      endRange = midpointValue - 1;
    } else {
      startRange = midpointValue + 1;
    }
  }

  return lowestCostFound;
};
