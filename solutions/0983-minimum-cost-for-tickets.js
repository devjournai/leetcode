/**
 * Minimum Cost For Tickets
 * Intuition: DP by calendar day: on a travel day take min of a 1/7/30-day pass bought to cover today; on other days copy yesterday's cost.
 * Approach: 1. `tripDaysSet` from `days`; `minimumPayment[0]=0`. 2. For day 1..`finalTravelDay`, if not traveling copy previous. 3. Else min of `costs[0]` from day-1, `costs[1]` from day-7, `costs[2]` from day-30. 4. Return `minimumPayment[finalTravelDay]`.
 * Dry Run: days = [1,4,6,7,8,20], costs = [2,7,15]. Day 1 buys 1-day (2). Around 4–8 a 7-day pass (7) wins vs many 1-days. Total 11.
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
      costForThirtyDays
    );
  }

  return minimumPayment[finalTravelDay];
};
