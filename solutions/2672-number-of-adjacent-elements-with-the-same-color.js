/**
 * Number Of Adjacent Elements With The Same Color
 * Intuition: When a single element's color changes, only its immediate neighbors can be affected regarding same-color adjacent pairs. We can efficiently update a running count of such pairs by considering the old color's contribution and the new color's contribution to these neighbors in constant time per query.
 * Approach: 1. Initialize an array `currentArrayColors` of size `n` with zeros to represent uncolored elements, an empty `responseArray` to store results, and `totalAdjacentPairs` to 0. 2. Iterate through each query using a `while` loop. 3. For each query, identify the `updatedElementIndex` and `newElementColor`. Store the `oldElementColor` at that index. 4. Calculate `changesInPairs` for the current query by first checking if changing from `oldElementColor` breaks any existing pairs with its left or right neighbors (if `oldElementColor` was a valid color). 5. Update `currentArrayColors[updatedElementIndex]` to `newElementColor`. 6. Then, check if `newElementColor` forms any new pairs with its left or right neighbors. 7. Add `changesInPairs` to `totalAdjacentPairs`. 8. Record `totalAdjacentPairs` in the `responseArray` for the current query. 9. Return the `responseArray` after all queries are processed.
 * Dry Run: n = 4, queries = [[0,1],[1,2],[2,1],[3,2],[1,1],[2,2]]
 * Initial: currentArrayColors = [0,0,0,0], totalAdjacentPairs = 0, responseArray = []
 * Q1: [0,1]
 *   updatedElementIndex = 0, newElementColor = 1, oldElementColor = 0.
 *   oldElementColor is 0, no pairs broken.
 *   currentArrayColors becomes [1,0,0,0].
 *   newElementColor 1: No adjacent pairs formed (neighbor at index 1 is 0).
 *   changesInPairs = 0. totalAdjacentPairs = 0. responseArray = [0]
 * Q2: [1,2]
 *   updatedElementIndex = 1, newElementColor = 2, oldElementColor = 0.
 *   oldElementColor is 0, no pairs broken.
 *   currentArrayColors becomes [1,2,0,0].
 *   newElementColor 2: No adjacent pairs formed (neighbors at 0 (1) and 2 (0) are not 2).
 *   changesInPairs = 0. totalAdjacentPairs = 0. responseArray = [0,0]
 * Q3: [2,1]
 *   updatedElementIndex = 2, newElementColor = 1, oldElementColor = 0.
 *   oldElementColor is 0, no pairs broken.
 *   currentArrayColors becomes [1,2,1,0].
 *   newElementColor 1: No adjacent pairs formed (neighbors at 1 (2) and 3 (0) are not 1).
 *   changesInPairs = 0. totalAdjacentPairs = 0. responseArray = [0,0,0]
 * Q4: [3,2]
 *   updatedElementIndex = 3, newElementColor = 2, oldElementColor = 0.
 *   oldElementColor is 0, no pairs broken.
 *   currentArrayColors becomes [1,2,1,2].
 *   newElementColor 2: No adjacent pairs formed (neighbor at 2 (1) is not 2).
 *   changesInPairs = 0. totalAdjacentPairs = 0. responseArray = [0,0,0,0]
 * Q5: [1,1]
 *   updatedElementIndex = 1, newElementColor = 1, oldElementColor = 2.
 *   oldElementColor 2: currentArrayColors[0](1) != 2, currentArrayColors[2](1) != 2. No pairs broken.
 *   changesInPairs = 0.
 *   currentArrayColors becomes [1,1,1,2].
 *   newElementColor 1: currentArrayColors[0](1) == 1 (forms pair, changesInPairs++ -> 1). currentArrayColors[2](1) == 1 (forms pair, changesInPairs++ -> 2).
 *   changesInPairs = 2. totalAdjacentPairs = 0 + 2 = 2. responseArray = [0,0,0,0,2]
 * Q6: [2,2]
 *   updatedElementIndex = 2, newElementColor = 2, oldElementColor = 1.
 *   oldElementColor 1: currentArrayColors[1](1) == 1 (breaks pair, changesInPairs-- -> -1). currentArrayColors[3](2) != 1.
 *   changesInPairs = -1.
 *   currentArrayColors becomes [1,1,2,2].
 *   newElementColor 2: currentArrayColors[1](1) != 2. currentArrayColors[3](2) == 2 (forms pair, changesInPairs++ -> 0).
 *   changesInPairs = 0. totalAdjacentPairs = 2 + 0 = 2. responseArray = [0,0,0,0,2,2]
 * Final responseArray = [0,0,0,0,2,2]
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N + Q)
 */
var colorTheArray = function (n, queries) {
  const currentArrayColors = new Array(n).fill(0);
  const responseArray = new Array(queries.length);
  let totalAdjacentPairs = 0;

  let processingIteration = 0;
  const numQueries = queries.length;

  while (processingIteration < numQueries) {
    const currentQueryEntry = queries[processingIteration];
    const updatedElementIndex = currentQueryEntry[0];
    const newElementColor = currentQueryEntry[1];

    const oldElementColor = currentArrayColors[updatedElementIndex];
    let changesInPairs = 0;

    if (oldElementColor !== 0) {
      const leftAdjacentIndex = updatedElementIndex - 1;
      if (
        leftAdjacentIndex >= 0 &&
        currentArrayColors[leftAdjacentIndex] === oldElementColor
      ) {
        changesInPairs--;
      }
      const rightAdjacentIndex = updatedElementIndex + 1;
      if (
        rightAdjacentIndex < n &&
        currentArrayColors[rightAdjacentIndex] === oldElementColor
      ) {
        changesInPairs--;
      }
    }

    currentArrayColors[updatedElementIndex] = newElementColor;

    const leftNeighborIndex = updatedElementIndex - 1;
    if (
      leftNeighborIndex >= 0 &&
      currentArrayColors[leftNeighborIndex] === newElementColor
    ) {
      changesInPairs++;
    }
    const rightNeighborIndex = updatedElementIndex + 1;
    if (
      rightNeighborIndex < n &&
      currentArrayColors[rightNeighborIndex] === newElementColor
    ) {
      changesInPairs++;
    }

    totalAdjacentPairs += changesInPairs;
    responseArray[processingIteration] = totalAdjacentPairs;
    processingIteration++;
  }

  return responseArray;
};
