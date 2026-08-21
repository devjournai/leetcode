/**
 * Minimum Penalty for a Shop
 * Intuition: Closing at hour 0 costs one penalty per 'Y'. Moving the close hour forward by one: a 'Y' hour reduces penalty, an 'N' hour increases it.
 * Approach: 1. Count all 'Y' as the penalty for closing at 0. 2. Scan each hour, decrement on 'Y' and increment on 'N'. 3. Track the hour (index+1) with the smallest penalty.
 * Dry Run: customers = "YYNY". Start penalty 3 at hour 0. After Y: 2 (hour 1). After Y: 1 (hour 2). After N: 2. After Y: 1. First minimum is hour 2.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var bestClosingTime = function (customers) {
  let totalYesCount = 0;

  for (
    let customerLogIndex = 0;
    customerLogIndex < customers.length;
    customerLogIndex++
  ) {
    if (customers[customerLogIndex] === "Y") {
      totalYesCount++;
    }
  }

  let minimumAchievedPenalty = totalYesCount;
  let optimalClosingHour = 0;
  let currentCalculatedPenalty = totalYesCount;

  for (let timePoint = 0; timePoint < customers.length; timePoint++) {
    if (customers[timePoint] === "Y") {
      currentCalculatedPenalty--;
    } else {
      currentCalculatedPenalty++;
    }

    if (currentCalculatedPenalty < minimumAchievedPenalty) {
      minimumAchievedPenalty = currentCalculatedPenalty;
      optimalClosingHour = timePoint + 1;
    }
  }

  return optimalClosingHour;
};
