/**
 * Cheapest Flights Within K Stops
 * Time Complexity: O(k * flights.length)
 * Space Complexity: O(n)
 */
var findCheapestPrice = function (n, flights, src, dst, k) {
  const infinityValue = Number.MAX_SAFE_INTEGER;
  let currentIterationPrices = new Array(n).fill(infinityValue);
  currentIterationPrices[src] = 0;

  for (let iterationIndex = 0; iterationIndex <= k; iterationIndex++) {
    let temporaryPricesHolder = [...currentIterationPrices];

    for (const flightPath of flights) {
      const departureCity = flightPath[0];
      const arrivalCity = flightPath[1];
      const flightCost = flightPath[2];

      const priceFromDeparture = currentIterationPrices[departureCity];

      if (priceFromDeparture === infinityValue) {
        continue;
      }

      const potentialNewPrice = priceFromDeparture + flightCost;

      if (potentialNewPrice < temporaryPricesHolder[arrivalCity]) {
        temporaryPricesHolder[arrivalCity] = potentialNewPrice;
      }
    }
    currentIterationPrices = temporaryPricesHolder;
  }

  const finalAnswer = currentIterationPrices[dst];
  return finalAnswer === infinityValue ? -1 : finalAnswer;
};
