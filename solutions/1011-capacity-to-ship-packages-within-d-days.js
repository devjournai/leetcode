/**
 * Capacity To Ship Packages Within D Days
 * Intuition: Feasible capacity is monotonic: if C works in D days, any larger C also works. Binary search between the heaviest package and the total weight.
 * Approach: 1. Lower bound = max package, upper = sum. 2. Mid = candidate capacity; greedy pack days needed. 3. If daysNeeded <= days, search smaller; else search larger. 4. Track the smallest feasible mid.
 * Dry Run: weights = [1,2,3,4,5,6,7,8,9,10], days = 5.
 *   - Capacity 15: packing uses 5 days. Smaller 14 still works; 10 needs more than 5. Answer 15.
 * Time Complexity: O(N * log(TotalWeight))
 * Space Complexity: O(1)
 */
var shipWithinDays = function (weights, days) {
  let maxSingleWeight = 0;
  let totalAllWeights = 0;

  for (let packageIdx = 0; packageIdx < weights.length; packageIdx++) {
    let currentItemWeight = weights[packageIdx];
    if (currentItemWeight > maxSingleWeight) {
      maxSingleWeight = currentItemWeight;
    }
    totalAllWeights += currentItemWeight;
  }

  let capacityLowerBound = maxSingleWeight;
  let capacityUpperBound = totalAllWeights;

  let minimumShipCapacity = totalAllWeights;

  while (capacityLowerBound <= capacityUpperBound) {
    let potentialShipCapacity = Math.floor(
      (capacityLowerBound + capacityUpperBound) / 2
    );
    let daysNeeded = 1;
    let currentDayWeight = 0;

    let packageIterator = 0;
    let packagesLength = weights.length;

    while (packageIterator < packagesLength) {
      let currentPackageMass = weights[packageIterator];
      if (currentDayWeight + currentPackageMass <= potentialShipCapacity) {
        currentDayWeight += currentPackageMass;
      } else {
        daysNeeded++;
        currentDayWeight = currentPackageMass;
      }
      packageIterator++;
    }

    if (daysNeeded <= days) {
      minimumShipCapacity = potentialShipCapacity;
      capacityUpperBound = potentialShipCapacity - 1;
    } else {
      capacityLowerBound = potentialShipCapacity + 1;
    }
  }

  return minimumShipCapacity;
};
