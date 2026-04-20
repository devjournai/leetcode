/**
 * Minimum Penalty for a Shop
 * Time Complexity: O(N)
 * Space Complexity: O(1)
*/
var bestClosingTime = function (customers) {
    let totalYesCount = 0;

    for (let customerLogIndex = 0; customerLogIndex < customers.length; customerLogIndex++) {
        if (customers[customerLogIndex] === 'Y') {
            totalYesCount++;
        }
    }

    let minimumAchievedPenalty = totalYesCount;
    let optimalClosingHour = 0;
    let currentCalculatedPenalty = totalYesCount;

    for (let timePoint = 0; timePoint < customers.length; timePoint++) {
        if (customers[timePoint] === 'Y') {
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