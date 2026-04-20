/**
 * Number Of Steps To Reduce A Number To Zero
 * Time Complexity: O(log(num))
 * Space Complexity: O(log(num))
 */
var numberOfSteps = function (num) {
  if (num === 0) {
    return 0;
  }

  function countReductionSteps(currentValue, totalAccumulatedSteps) {
    if (currentValue === 0) {
      return totalAccumulatedSteps;
    }

    let nextNumericalValue;
    let incrementedSteps = totalAccumulatedSteps + 1;

    if (currentValue % 2 === 0) {
      nextNumericalValue = currentValue / 2;
    } else {
      nextNumericalValue = currentValue - 1;
    }

    return countReductionSteps(nextNumericalValue, incrementedSteps);
  }

  return countReductionSteps(num, 0);
};
