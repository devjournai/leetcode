/**
 * Best Time To Buy And Sell Stock Iv
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
                infiniteTransactionsProfit += (currentDayPrice - previousDayPrice);
            }
        }
        return infiniteTransactionsProfit;
    }

    const holdStockProfits = new Array(maxTransactionsAllowed + 1).fill(-Infinity);
    const cashProfits = new Array(maxTransactionsAllowed + 1).fill(0);

    for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
        const priceOnCurrentDay = priceArray[dayIndex];
        for (let transactionIndex = maxTransactionsAllowed; transactionIndex >= 1; transactionIndex--) {
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