/**
 * Maximum Number Of Achievable Transfer Requests
 * Intuition: A subset of transfers is valid only when every building's net flow is zero (each person who leaves is replaced). With few requests, try every subset and keep the largest balanced one.
 * Approach: 1. Keep a net-balance array of size N. 2. Recurse on request index: accept it (decrement source, increment destination) or skip it. 3. At the end of a subset, if all balances are 0, update the max accepted count. 4. Backtrack balances after the accept branch. 5. Return the global max.
 * Dry Run: n = 2, requests = [[0,1],[1,0],[0,1]].
 *   - Accept both [0,1] and [1,0]: balances [0,0], size 2.
 *   - Accept both [0,1]s: building 0 is -2, building 1 is +2, invalid.
 *   - Best valid size is 2.
 * Time Complexity: O(2^R * N)
 * Space Complexity: O(R + N)
 */
var maximumRequests = function (n, requests) {
  let overallMaxRequests = 0;
  let totalBuildingsCount = n;
  let allTransferRequests = requests;
  let totalRequestsCount = allTransferRequests.length;

  let buildingNetBalances = new Array(totalBuildingsCount).fill(0);

  function evaluateCombinations(
    requestPosition,
    currentAcceptedRequests,
    currentBuildingBalances
  ) {
    if (requestPosition === totalRequestsCount) {
      let allBalancesZero = true;
      for (let buildingId = 0; buildingId < totalBuildingsCount; buildingId++) {
        if (currentBuildingBalances[buildingId] !== 0) {
          allBalancesZero = false;
          break;
        }
      }

      if (allBalancesZero) {
        overallMaxRequests = Math.max(
          overallMaxRequests,
          currentAcceptedRequests
        );
      }
      return;
    }

    let singleRequest = allTransferRequests[requestPosition];
    let sourceBuildingIndex = singleRequest[0];
    let destinationBuildingIndex = singleRequest[1];

    currentBuildingBalances[sourceBuildingIndex]--;
    currentBuildingBalances[destinationBuildingIndex]++;
    evaluateCombinations(
      requestPosition + 1,
      currentAcceptedRequests + 1,
      currentBuildingBalances
    );
    currentBuildingBalances[sourceBuildingIndex]++;
    currentBuildingBalances[destinationBuildingIndex]--;

    evaluateCombinations(
      requestPosition + 1,
      currentAcceptedRequests,
      currentBuildingBalances
    );
  }

  evaluateCombinations(0, 0, buildingNetBalances);

  return overallMaxRequests;
};
