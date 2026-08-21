/**
 * Can You Eat Your Favorite Candy On Your Favorite Day
 * Intuition: You eat 1..cap candies per day in type order. Favorite type occupies prefix-sum interval [S[t], S[t+1]). You can still be eating it on day d iff you have not finished it in the first d days (eat 1/day) and you can reach it by day d (eat cap/day).
 * Approach: 1. Build `cumulativeCandies`. 2. For each query, `canReachType` = (d+1)*cap > typeStart; `notFinishedTypeTooEarly` = d ≤ typeEnd. 3. AND them into `queryResults`.
 * Dry Run: candiesCount = [7,4,5,3,8], query [0,2,2]
 * type 0 occupies [0,6]; day 2 max eat 6, min eat 2; 6>0 and 2≤6 → true.
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
