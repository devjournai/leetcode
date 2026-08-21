/**
 * Optimal Account Balancing
 * Intuition: After netting every transaction, people with balance 0 drop out. Settling the rest is matching opposite-sign nets: giving person i’s entire leftover to a later person j of opposite sign is one transfer, then i is cleared.
 * Approach: 1. Track nets in a length-12 `personBalanceTracker` (from/to/amount). 2. Keep `unsettledAccountList` of nonzero nets. 3. `calculateMinSettlement(currentDebtIndex, completedTransferCount)` skips zeros, then tries every later opposite-sign index: add current net into that person, recurse with +1 transfer, backtrack. 4. Return the minimum over those choices (or the completed count when the index runs off the list).
 * Dry Run: transactions = [[0,1,10],[1,0,1],[1,2,5]] → nets [−9, 4, 5] after filtering zeros.
 *   - Index 0 net −9. Try j=1 (4): 4+(−9)=−5, transfers=1; then index 1 is −5, pair with 5 → 0, transfers=2; index 2 is 0 so skip. Result 2.
 *   - Also try j=2 first: 5+(−9)=−4, then settle the leftover against 4 → also 2. Return 2.
 * Time Complexity: O(K * K!)
 * Space Complexity: O(P + K)
 */
var minTransfers = function (transactions) {
  let personBalanceTracker = new Array(12).fill(0);

  for (let currentTransaction of transactions) {
    let debtOriginator = currentTransaction[0];
    let debtRecipient = currentTransaction[1];
    let transferSum = currentTransaction[2];

    personBalanceTracker[debtOriginator] -= transferSum;
    personBalanceTracker[debtRecipient] += transferSum;
  }

  let unsettledAccountList = personBalanceTracker.filter(
    (accountAmount) => accountAmount !== 0
  );

  function calculateMinSettlement(currentDebtIndex, completedTransferCount) {
    if (currentDebtIndex === unsettledAccountList.length) {
      return completedTransferCount;
    }

    if (unsettledAccountList[currentDebtIndex] === 0) {
      return calculateMinSettlement(
        currentDebtIndex + 1,
        completedTransferCount
      );
    }

    let currentPersonNet = unsettledAccountList[currentDebtIndex];
    let minimumOperationsRequired = Infinity;

    for (
      let nextDebtorIndex = currentDebtIndex + 1;
      nextDebtorIndex < unsettledAccountList.length;
      nextDebtorIndex++
    ) {
      let nextPersonNet = unsettledAccountList[nextDebtorIndex];

      if (nextPersonNet * currentPersonNet < 0) {
        unsettledAccountList[nextDebtorIndex] += currentPersonNet;
        let resultFromNextStep = calculateMinSettlement(
          currentDebtIndex + 1,
          completedTransferCount + 1
        );
        minimumOperationsRequired = Math.min(
          minimumOperationsRequired,
          resultFromNextStep
        );
        unsettledAccountList[nextDebtorIndex] -= currentPersonNet;
      }
    }

    return minimumOperationsRequired;
  }

  return calculateMinSettlement(0, 0);
};
