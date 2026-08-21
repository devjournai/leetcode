/**
 * Diet Plan Performance
 * Intuition: Score each consecutive k-day calorie window: -1 if below lower, +1 if above upper, else 0. A sliding window maintains the k-sum.
 * Approach: 1. Expand the right end adding calories. 2. When the window length is k, adjust points, subtract the left calorie, and advance left. 3. Return the total points.
 * Dry Run: calories = [1,2,3,4,5], k = 1, lower = 3, upper = 3.
 *   - Windows: 1->-1, 2->-1, 3->0, 4->+1, 5->+1. Answer 0.
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
