/**
 * Average Waiting Time
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
      chefAvailabilityMoment,
    );
    const orderCompletionInstant = actualServiceStart + orderPreparationTime;

    totalAccumulatedWait += orderCompletionInstant - clientArrivalInstant;
    chefAvailabilityMoment = orderCompletionInstant;
  }

  const totalClientCount = customers.length;
  return totalAccumulatedWait / totalClientCount;
};
