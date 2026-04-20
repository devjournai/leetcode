/**
 * Can You Eat Your Favorite Candy On Your Favorite Day
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N + Q)
 */
var canEat = function (candiesCount, queries) {
  const cumulativeCandies = new Array(candiesCount.length + 1);
  cumulativeCandies[0] = 0;

  for (
    let prefixSumIndex = 0;
    prefixSumIndex < candiesCount.length;
    prefixSumIndex++
  ) {
    const currentCount = candiesCount[prefixSumIndex];
    const previousSumValue = cumulativeCandies[prefixSumIndex];
    cumulativeCandies[prefixSumIndex + 1] = previousSumValue + currentCount;
  }

  const queryResults = new Array(queries.length);

  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    const currentQueryEntry = queries[queryIndex];
    const favoriteCandyType = currentQueryEntry[0];
    const favoriteCalendarDay = currentQueryEntry[1];
    const maxDailyConsumption = currentQueryEntry[2];
    const minimumTotalConsumedToStartDay = favoriteCalendarDay;
    const maximumTotalConsumedByEndOfDay =
      (favoriteCalendarDay + 1) * maxDailyConsumption;
    const typeStartBoundary = cumulativeCandies[favoriteCandyType];
    const typeEndBoundary = cumulativeCandies[favoriteCandyType + 1] - 1;
    const canReachType = maximumTotalConsumedByEndOfDay > typeStartBoundary;
    const notFinishedTypeTooEarly =
      minimumTotalConsumedToStartDay <= typeEndBoundary;

    const canAchieveQuery = canReachType && notFinishedTypeTooEarly;
    queryResults[queryIndex] = canAchieveQuery;
  }

  return queryResults;
};
