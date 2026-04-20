/**
 * House Robber
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var rob = function (nums) {
    let maxMoneyFromTwoHousesAgo = 0;
    let maxMoneyFromOneHouseAgo = 0;

    for (const currentHouseValue of nums) {
        let amountIfRobbedCurrent = currentHouseValue + maxMoneyFromTwoHousesAgo;
        let amountIfSkippedCurrent = maxMoneyFromOneHouseAgo;

        let currentMaxAchieved = Math.max(amountIfRobbedCurrent, amountIfSkippedCurrent);

        maxMoneyFromTwoHousesAgo = maxMoneyFromOneHouseAgo;
        maxMoneyFromOneHouseAgo = currentMaxAchieved;
    }

    return maxMoneyFromOneHouseAgo;
};