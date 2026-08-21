/**
 * Cheapest Flights Within K Stops
 * Intuition: At most k stops means at most k+1 edges. Bellman-Ford-style relaxation for `k+1` rounds, copying prices each round so each flight uses only the previous iteration.
 * Approach: 1. `currentIterationPrices` is ∞ except `src` = 0. 2. For `iterationIndex` from 0 to k: clone into `temporaryPricesHolder`. 3. For each `[departureCity, arrivalCity, flightCost]`, if departure is reachable, relax arrival with `priceFromDeparture + flightCost` on the clone. 4. Swap arrays. Return dst price or -1 if still ∞.
 * Dry Run: n=4, flights=[[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src=0, dst=3, k=1.
 *   - Round 0 (0 stops): 0→1 cost 100. Round 1: 1→3 cost 700 (two cities, one stop). 2 is not reachable in one edge from 0, so 2→3 unused. Return 700.
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
