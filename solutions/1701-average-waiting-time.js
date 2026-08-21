/**
 * Average Waiting Time
 * Intuition: The chef starts each order at max(arrival, previous finish). Wait is finish − arrival; average is total wait / n.
 * Approach: 1. Track `chefAvailabilityMoment`. 2. For each customer, `actualServiceStart = max(arrival, chef)`, finish = start + prep, add wait, set chef to finish. 3. Return `totalAccumulatedWait / totalClientCount`.
 * Dry Run: customers = [[1,2],[2,5],[4,3]]
 * Finish 3 wait 2; start 3 finish 8 wait 6; start 8 finish 11 wait 7. Average (2+6+7)/3 = 5.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var averageWaitingTime = function (customers) {
  let totalAccumulatedWait = 0;
  let chefAvailabilityMoment = 0;

  for (
    let customerSequence = 0;
    customerSequence < customers.length;
    customerSequence++
  ) {
    const currentCustomerEntry = customers[customerSequence];
    const clientArrivalInstant = currentCustomerEntry[0];
    const orderPreparationTime = currentCustomerEntry[1];

    const actualServiceStart = Math.max(
      clientArrivalInstant,
      chefAvailabilityMoment
    );
    const orderCompletionInstant = actualServiceStart + orderPreparationTime;

    totalAccumulatedWait += orderCompletionInstant - clientArrivalInstant;
    chefAvailabilityMoment = orderCompletionInstant;
  }

  const totalClientCount = customers.length;
  return totalAccumulatedWait / totalClientCount;
};
