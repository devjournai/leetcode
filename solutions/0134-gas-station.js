/**
 * Gas Station
 * Intuition: If total gas < total cost the circuit is impossible. Otherwise the unique start is the station after the last prefix whose running gas-cost went negative.
 * Approach: 1. Track overallBalance, segmentBalance, potentialStart. 2. For each station add gas-cost to both. 3. If segmentBalance < 0, reset it and set potentialStart to i+1. 4. Return potentialStart if overallBalance ≥ 0 else -1.
 * Dry Run: gas=[1,2,3,4,5], cost=[3,4,5,1,2]. Segment dies at stations 0–2; start becomes 3. Overall balance 0 → index 3 works.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var canCompleteCircuit = function (gas, cost) {
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
