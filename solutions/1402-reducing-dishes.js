/**
 * Reducing Dishes
 * Time Complexity: O(N log N)
 * Space Complexity: O(1)
 */
var maxSatisfaction = function (satisfaction) {
  satisfaction.sort((valueOne, valueTwo) => valueOne - valueTwo);

  let maximumLikeTimeCoefficient = 0;
  let currentSatisfactionSum = 0;
  let runningLikeTimeCoefficient = 0;

  for (
    let dishIterator = satisfaction.length - 1;
    dishIterator >= 0;
    dishIterator--
  ) {
    let currentDishSatisfaction = satisfaction[dishIterator];
    currentSatisfactionSum += currentDishSatisfaction;
    runningLikeTimeCoefficient += currentSatisfactionSum;
    maximumLikeTimeCoefficient = Math.max(
      maximumLikeTimeCoefficient,
      runningLikeTimeCoefficient,
    );
  }

  return maximumLikeTimeCoefficient;
};
