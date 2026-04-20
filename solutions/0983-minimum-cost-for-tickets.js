/**
 * Minimum Cost For Tickets
 * Time Complexity: O(max(days))
 * Space Complexity: O(max(days))
 */
var mincostTickets = function (days, costs) {
  const finalTravelDay = days[days.length - 1];
  const tripDaysSet = new Set(days);
  const minimumPayment = new Array(finalTravelDay + 1).fill(0);

  for (
    let currentJourneyDay = 1;
    currentJourneyDay <= finalTravelDay;
    currentJourneyDay++
  ) {
    if (!tripDaysSet.has(currentJourneyDay)) {
      minimumPayment[currentJourneyDay] = minimumPayment[currentJourneyDay - 1];
      continue;
    }

    const costForOneDay = minimumPayment[currentJourneyDay - 1] + costs[0];
    const costForSevenDays =
      minimumPayment[Math.max(0, currentJourneyDay - 7)] + costs[1];
    const costForThirtyDays =
      minimumPayment[Math.max(0, currentJourneyDay - 30)] + costs[2];

    minimumPayment[currentJourneyDay] = Math.min(
      costForOneDay,
      costForSevenDays,
      costForThirtyDays,
    );
  }

  return minimumPayment[finalTravelDay];
};
