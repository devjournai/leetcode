/**
 * Invalid Transactions
 * Intuition: A transaction is invalid if amount > 1000, or the same name appears in a different city within 60 minutes. Flag both sides of each conflicting pair.
 * Approach: 1. Parse name,time,amount,city. 2. Mark amount>1000. 3. Nested scan: same name, different city, |time|<=60, mark both original indices. 4. Return the original strings at those indices.
 * Dry Run: ["alice,20,800,mtv","alice,50,100,beijing"].
 *   - Amounts ok, but same name, 30 minutes apart, different cities. Both invalid.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var invalidTransactions = function (transactionsInput) {
  const transactionRecords = transactionsInput.map(
    (transactionStringData, currentOriginalIndex) => {
      const transactionParts = transactionStringData.split(",");
      const transactionNameIdentifier = transactionParts[0];
      const transactionTimestamp = Number(transactionParts[1]);
      const transactionAmountValue = Number(transactionParts[2]);
      const transactionCityName = transactionParts[3];
      return {
        name: transactionNameIdentifier,
        time: transactionTimestamp,
        amount: transactionAmountValue,
        city: transactionCityName,
        originalIndex: currentOriginalIndex,
      };
    }
  );

  const invalidEntryIndices = new Set();

  for (const transactionItem of transactionRecords) {
    if (transactionItem.amount > 1000) {
      invalidEntryIndices.add(transactionItem.originalIndex);
    }
  }

  const totalTransactionCount = transactionRecords.length;
  let primaryIterator = 0;
  while (primaryIterator < totalTransactionCount) {
    const firstTransactionComparison = transactionRecords[primaryIterator];
    let secondaryIterator = 0;
    while (secondaryIterator < totalTransactionCount) {
      const secondTransactionComparison = transactionRecords[secondaryIterator];

      if (
        primaryIterator !== secondaryIterator &&
        firstTransactionComparison.name === secondTransactionComparison.name &&
        Math.abs(
          firstTransactionComparison.time - secondTransactionComparison.time
        ) <= 60 &&
        firstTransactionComparison.city !== secondTransactionComparison.city
      ) {
        invalidEntryIndices.add(firstTransactionComparison.originalIndex);
        invalidEntryIndices.add(secondTransactionComparison.originalIndex);
      }
      secondaryIterator++;
    }
    primaryIterator++;
  }

  const finalInvalidList = [];
  const collectedInvalidIndices = Array.from(invalidEntryIndices);
  const numberOfInvalidEntries = collectedInvalidIndices.length;

  for (
    let resultScanIndex = 0;
    resultScanIndex < numberOfInvalidEntries;
    resultScanIndex++
  ) {
    const specificInvalidIndex = collectedInvalidIndices[resultScanIndex];
    finalInvalidList.push(transactionsInput[specificInvalidIndex]);
  }

  return finalInvalidList;
};
