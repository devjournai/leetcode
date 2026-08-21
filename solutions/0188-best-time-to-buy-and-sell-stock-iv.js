/**
 * Best Time To Buy And Sell Stock Iv
 * Intuition: At most k buys/sells. If k is large, every uphill day can be taken. Otherwise keep, for each transaction count, the best profit while holding a stock vs holding cash, and update backwards so the same day is not reused twice.
 * Approach: 1. If fewer than 2 prices or k=0, return 0. 2. If k >= n/2, sum all positive day-to-day gains. 3. Else hold[t] starts at -Infinity, cash[t] at 0. 4. For each day and t from k down to 1: cash[t] = max(cash[t], hold[t] + price); hold[t] = max(hold[t], cash[t-1] - price). 5. Return cash[k].
 * Dry Run: k=2, prices = [3,2,6,5,0,3].
 *   - Not unlimited-k. After processing days, cash[2] = 7 (buy 2 sell 6, buy 0 sell 3).
 * Time Complexity: O(N * min(K, N))
 * Space Complexity: O(min(K, N))
 */
var maxProfit = function (maxTransactionsAllowed, priceArray) {
  const numberOfDays = priceArray.length;

  if (numberOfDays < 2 || maxTransactionsAllowed === 0) {
    return 0;
  }

  if (maxTransactionsAllowed >= numberOfDays / 2) {
    let infiniteTransactionsProfit = 0;
    for (let dayIterator = 1; dayIterator < numberOfDays; dayIterator++) {
      const currentDayPrice = priceArray[dayIterator];
      const previousDayPrice = priceArray[dayIterator - 1];
      if (currentDayPrice > previousDayPrice) {
        infiniteTransactionsProfit += currentDayPrice - previousDayPrice;
      }
    }
    return infiniteTransactionsProfit;
  }

  const holdStockProfits = new Array(maxTransactionsAllowed + 1).fill(
    -Infinity
  );
  const cashProfits = new Array(maxTransactionsAllowed + 1).fill(0);

  for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
    const priceOnCurrentDay = priceArray[dayIndex];
    for (
      let transactionIndex = maxTransactionsAllowed;
      transactionIndex >= 1;
      transactionIndex--
    ) {
      cashProfits[transactionIndex] = Math.max(
        cashProfits[transactionIndex],
        holdStockProfits[transactionIndex] + priceOnCurrentDay
      );
      holdStockProfits[transactionIndex] = Math.max(
        holdStockProfits[transactionIndex],
        cashProfits[transactionIndex - 1] - priceOnCurrentDay
      );
    }
  }

  return cashProfits[maxTransactionsAllowed];
};
