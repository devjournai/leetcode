/**
 * Capacity To Ship Packages Within D Days
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
      (capacityLowerBound + capacityUpperBound) / 2,
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
