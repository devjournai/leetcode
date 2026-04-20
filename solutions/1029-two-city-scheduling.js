/**
 * Two City Scheduling
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var twoCitySchedCost = function (costs) {
  const totalTravelers = costs.length;
  const travelersPerCity = totalTravelers / 2;

  costs.sort((firstPersonData, secondPersonData) => {
    const differenceForFirst = firstPersonData[0] - firstPersonData[1];
    const differenceForSecond = secondPersonData[0] - secondPersonData[1];
    return differenceForFirst - differenceForSecond;
  });

  let accumulatedCost = 0;
  for (
    let currentTravelerIndex = 0;
    currentTravelerIndex < totalTravelers;
    currentTravelerIndex++
  ) {
    const currentTravelerCosts = costs[currentTravelerIndex];
    const cityACost = currentTravelerCosts[0];
    const cityBCost = currentTravelerCosts[1];

    if (currentTravelerIndex < travelersPerCity) {
      accumulatedCost += cityACost;
    } else {
      accumulatedCost += cityBCost;
    }
  }

  return accumulatedCost;
};
