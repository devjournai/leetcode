/**
 * Delete And Earn
 * Time Complexity: O(N + M)
 * Space Complexity: O(M)
 */
var deleteAndEarn = function (nums) {
  const maxNumberValue = 10000;
  const aggregatedPoints = new Array(maxNumberValue + 1).fill(0);

  for (const numberItem of nums) {
    aggregatedPoints[numberItem] += numberItem;
  }

  let maxPointsPreviousTwo = 0;
  let maxPointsPreviousOne = 0;

  for (
    let currentNumberIndex = 0;
    currentNumberIndex < aggregatedPoints.length;
    currentNumberIndex++
  ) {
    const currentPointsValue = aggregatedPoints[currentNumberIndex];
    const temporaryMaxStore = maxPointsPreviousOne;
    maxPointsPreviousOne = Math.max(
      maxPointsPreviousOne,
      maxPointsPreviousTwo + currentPointsValue,
    );
    maxPointsPreviousTwo = temporaryMaxStore;
  }

  return maxPointsPreviousOne;
};
