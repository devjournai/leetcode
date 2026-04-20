/**
 * Gas Station
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canCompleteCircuit = function(gas, cost) {
    let stationsCount = gas.length;
    let overallGasBalance = 0;
    let currentSegmentBalance = 0;
    let potentialStart = 0;

    for (let stationIndex = 0; stationIndex < stationsCount; stationIndex++) {
        let netGasAtStation = gas[stationIndex] - cost[stationIndex];
        currentSegmentBalance += netGasAtStation;
        overallGasBalance += netGasAtStation;

        if (currentSegmentBalance < 0) {
            currentSegmentBalance = 0;
            potentialStart = stationIndex + 1;
        }
    }

    return overallGasBalance >= 0 ? potentialStart : -1;
};