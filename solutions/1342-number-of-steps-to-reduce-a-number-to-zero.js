/**
 * Number Of Steps To Reduce A Number To Zero
 * Intuition: Even → divide by 2; odd → subtract 1. Recurse until 0.
 * Approach: 1. Base 0 is 0 steps. 2. Recurse: even halves, odd decrements, incrementing the step count. 3. Return the count.
 * Dry Run: num = 14 → 7 → 6 → 3 → 2 → 1 → 0, six steps.
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
