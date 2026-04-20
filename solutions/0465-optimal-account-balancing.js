/**
 * Optimal Account Balancing
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

  let unsettledAccountList = personBalanceTracker.filter(accountAmount => accountAmount !== 0);

  function calculateMinSettlement(currentDebtIndex, completedTransferCount) {
    if (currentDebtIndex === unsettledAccountList.length) {
      return completedTransferCount;
    }

    if (unsettledAccountList[currentDebtIndex] === 0) {
      return calculateMinSettlement(currentDebtIndex + 1, completedTransferCount);
    }

    let currentPersonNet = unsettledAccountList[currentDebtIndex];
    let minimumOperationsRequired = Infinity;

    for (let nextDebtorIndex = currentDebtIndex + 1; nextDebtorIndex < unsettledAccountList.length; nextDebtorIndex++) {
      let nextPersonNet = unsettledAccountList[nextDebtorIndex];

      if (nextPersonNet * currentPersonNet < 0) {
        unsettledAccountList[nextDebtorIndex] += currentPersonNet;
        let resultFromNextStep = calculateMinSettlement(currentDebtIndex + 1, completedTransferCount + 1);
        minimumOperationsRequired = Math.min(minimumOperationsRequired, resultFromNextStep);
        unsettledAccountList[nextDebtorIndex] -= currentPersonNet;
      }
    }

    return minimumOperationsRequired;
  }

  return calculateMinSettlement(0, 0);
};