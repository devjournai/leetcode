/**
 * Paint House
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var minCost = function (costs) {
    if (!costs || costs.length === 0) {
        return 0;
    }

    let previousHouseMinCosts = [...costs[0]];

    let totalHouses = costs.length;
    for (let currentHouseIndex = 1; currentHouseIndex < totalHouses; currentHouseIndex++) {
        let currentHouseRedCost = costs[currentHouseIndex][0] + Math.min(previousHouseMinCosts[1], previousHouseMinCosts[2]);
        let currentHouseBlueCost = costs[currentHouseIndex][1] + Math.min(previousHouseMinCosts[0], previousHouseMinCosts[2]);
        let currentHouseGreenCost = costs[currentHouseIndex][2] + Math.min(previousHouseMinCosts[0], previousHouseMinCosts[1]);

        previousHouseMinCosts = [currentHouseRedCost, currentHouseBlueCost, currentHouseGreenCost];
    }

    return Math.min(previousHouseMinCosts[0], previousHouseMinCosts[1], previousHouseMinCosts[2]);
};