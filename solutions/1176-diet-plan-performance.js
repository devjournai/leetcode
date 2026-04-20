/**
 * Diet Plan Performance
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var dietPlanPerformance = function (calories, k, lower, upper) {
  let totalPerformancePoints = 0;
  let windowTotalCalories = 0;
  let startWindowIndex = 0;

  for (
    let endWindowIndex = 0;
    endWindowIndex < calories.length;
    endWindowIndex++
  ) {
    windowTotalCalories += calories[endWindowIndex];

    if (endWindowIndex - startWindowIndex + 1 === k) {
      if (windowTotalCalories < lower) {
        totalPerformancePoints--;
      } else if (windowTotalCalories > upper) {
        totalPerformancePoints++;
      }

      windowTotalCalories -= calories[startWindowIndex];
      startWindowIndex++;
    }
  }

  return totalPerformancePoints;
};
