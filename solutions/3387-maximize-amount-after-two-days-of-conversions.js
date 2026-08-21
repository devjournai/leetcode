/**
 * Maximize Amount After Two Days of Conversions
 * Intuition: Day 1 and day 2 are separate rate graphs. Maximize the amount of `initialCurrency` after using day-1 rates then day-2 rates. Bellman-Ford style relaxation finds the best multiplicative path in each day's graph (including reverse rates).
 * Approach: 1. Map currency → max amount, start with 1 of `initialCurrency`. 2. Relax all day-1 edges `|pairs|` times in both directions. 3. Repeat for day 2. 4. Return the amount of the initial currency.
 * Dry Run: initial = "EUR", day1 EUR→USD 2, day2 USD→EUR 0.6? Better example: start 1 EUR, convert to USD at 2 then back at 1.1 → 2.2 EUR.
 * Time Complexity: O(|pairs|^2)
 * Space Complexity: O(|pairs|)
 */

var maxAmount = function (initialCurrency, pairs1, rates1, pairs2, rates2) {
  const maxAmountByCurrency = new Map();
  maxAmountByCurrency.set(initialCurrency, 1);

  const relaxRates = (pairs, rates) => {
    for (let relaxRound = 0; relaxRound < pairs.length; relaxRound++) {
      for (let pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
        const startCurrency = pairs[pairIndex][0];
        const targetCurrency = pairs[pairIndex][1];
        const exchangeRate = rates[pairIndex];
        const startAmount = maxAmountByCurrency.get(startCurrency) || 0;
        const targetAmount = maxAmountByCurrency.get(targetCurrency) || 0;
        maxAmountByCurrency.set(
          targetCurrency,
          Math.max(targetAmount, startAmount * exchangeRate)
        );
        maxAmountByCurrency.set(
          startCurrency,
          Math.max(
            maxAmountByCurrency.get(startCurrency) || 0,
            (maxAmountByCurrency.get(targetCurrency) || 0) / exchangeRate
          )
        );
      }
    }
  };

  relaxRates(pairs1, rates1);
  relaxRates(pairs2, rates2);
  return maxAmountByCurrency.get(initialCurrency);
};
