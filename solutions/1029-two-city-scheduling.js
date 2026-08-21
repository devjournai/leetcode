/**
 * Two City Scheduling
 * Intuition: Sending everyone to B then refunding A-B for the n people with smallest A-B (most relative A savings) is optimal. Sorting by A-B does that.
 * Approach: 1. Sort costs by (costA-costB). 2. First n people take city A, last n take city B. 3. Sum those costs.
 * Dry Run: costs = [[10,20],[30,200],[400,50],[30,20]].
 *   - A-B: -10, -170, 350, 10. Sorted [30,200],[10,20],[30,20],[400,50]. First two A: 30+10, last two B: 20+50. Total 110.
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
