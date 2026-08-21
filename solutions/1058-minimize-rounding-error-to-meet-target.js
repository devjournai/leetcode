/**
 * Minimize Rounding Error To Meet Target
 * Intuition: Floor every price then ceil exactly (target-sumFloors) of them. Prefer ceiling the prices where ceil-error minus floor-error is smallest.
 * Approach: 1. Parse floats; compute floor/ceil sums; return "-1" if target is outside. 2. Need ceilCount = target-sumFloors. 3. Sort items by (ceilError-floorError). 4. Sum ceilError for the first ceilCount and floorError for the rest; format to 3 decimals.
 * Dry Run: prices=["0.700","2.800","4.900"], target=8.
 *   - Floors sum 6, need 2 ceils. Best ceils yield error 1.000.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var minimizeError = function (priceStrings, targetSum) {
  const parsedFloats = priceStrings.map((aPrice) => parseFloat(aPrice));
  const floorResults = parsedFloats.map((aNum) => Math.floor(aNum));
  const ceilResults = parsedFloats.map((anotherNum) => Math.ceil(anotherNum));

  const minimumPossibleSum = floorResults.reduce(
    (sumAccumulator, currentFloor) => sumAccumulator + currentFloor,
    0
  );
  const maximumPossibleSum = ceilResults.reduce(
    (summationValue, currentCeil) => summationValue + currentCeil,
    0
  );

  if (targetSum < minimumPossibleSum || targetSum > maximumPossibleSum) {
    return "-1";
  }

  const numCeilSelectionsRequired = targetSum - minimumPossibleSum;

  const roundingAdjustments = parsedFloats.map(
    (originalValue, indexIndicator) => {
      const individualFloorError = originalValue - floorResults[indexIndicator];
      const individualCeilError = ceilResults[indexIndicator] - originalValue;
      const errorTransformationDelta =
        individualCeilError - individualFloorError;
      return {
        individualFloorError,
        individualCeilError,
        errorTransformationDelta,
      };
    }
  );

  roundingAdjustments.sort(
    (detailA, detailB) =>
      detailA.errorTransformationDelta - detailB.errorTransformationDelta
  );

  let aggregatedError = 0;

  let firstLoopIterator = 0;
  for (
    firstLoopIterator = 0;
    firstLoopIterator < numCeilSelectionsRequired;
    firstLoopIterator++
  ) {
    aggregatedError +=
      roundingAdjustments[firstLoopIterator].individualCeilError;
  }

  let secondLoopIterator = firstLoopIterator;
  for (
    ;
    secondLoopIterator < roundingAdjustments.length;
    secondLoopIterator++
  ) {
    aggregatedError +=
      roundingAdjustments[secondLoopIterator].individualFloorError;
  }

  return aggregatedError.toFixed(3);
};
