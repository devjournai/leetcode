/**
 * Maximum Number Of Achievable Transfer Requests
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
    currentBuildingBalances,
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
          currentAcceptedRequests,
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
      currentBuildingBalances,
    );
    currentBuildingBalances[sourceBuildingIndex]++;
    currentBuildingBalances[destinationBuildingIndex]--;

    evaluateCombinations(
      requestPosition + 1,
      currentAcceptedRequests,
      currentBuildingBalances,
    );
  }

  evaluateCombinations(0, 0, buildingNetBalances);

  return overallMaxRequests;
};
