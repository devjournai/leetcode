/**
 * Cycle Length Queries In A Tree
 * Intuition: The cycle formed by adding an edge between two nodes A and B in a complete binary tree consists of the path from A to their Lowest Common Ancestor (LCA), the path from B to the LCA, and the newly added edge (A, B). The length of this cycle is the sum of the number of edges in these three components.
 * Approach: 1. Initialize an array to store the cycle lengths for all queries. 2. Iterate through each query `[nodeA, nodeB]`. 3. For each query, initialize `currentWalkerA = nodeA`, `currentWalkerB = nodeB`, and `currentCycleLength = 1` (representing the newly added edge). 4. Repeatedly move the numerically larger of `currentWalkerA` and `currentWalkerB` up to its parent (`Math.floor(node / 2)`). If they are equal, they have met at their LCA. In each step that a node moves, increment `currentCycleLength`. 5. Stop when `currentWalkerA` becomes equal to `currentWalkerB` (this is their LCA). 6. The final `currentCycleLength` is the answer for the current query. Add it to the results array. 7. After processing all queries, return the results array.
 * Dry Run: n = 3, queries = [[6, 10]]
 *   treeTotalDepth = 3 (this parameter indicates the maximum depth but isn't directly used in calculation for node values).
 *   allQueries = [[6, 10]]
 *   cycleAnswers = []
 *
 *   queryIndex = 0: current query is [6, 10]
 *     nodeOne = 6, nodeTwo = 10
 *     walkerOne = 6, walkerTwo = 10
 *     currentCycleCount = 1
 *
 *     Loop 1:
 *       walkerOne (6) !== walkerTwo (10).
 *       walkerOne (6) > walkerTwo (10) is false.
 *       walkerTwo = Math.floor(10 / 2) = 5.
 *       currentCycleCount = 1 + 1 = 2.
 *
 *     Loop 2:
 *       walkerOne (6) !== walkerTwo (5).
 *       walkerOne (6) > walkerTwo (5) is true.
 *       walkerOne = Math.floor(6 / 2) = 3.
 *       currentCycleCount = 2 + 1 = 3.
 *
 *     Loop 3:
 *       walkerOne (3) !== walkerTwo (5).
 *       walkerOne (3) > walkerTwo (5) is false.
 *       walkerTwo = Math.floor(5 / 2) = 2.
 *       currentCycleCount = 3 + 1 = 4.
 *
 *     Loop 4:
 *       walkerOne (3) !== walkerTwo (2).
 *       walkerOne (3) > walkerTwo (2) is true.
 *       walkerOne = Math.floor(3 / 2) = 1.
 *       currentCycleCount = 4 + 1 = 5.
 *
 *     Loop 5:
 *       walkerOne (1) !== walkerTwo (2).
 *       walkerOne (1) > walkerTwo (2) is false.
 *       walkerTwo = Math.floor(2 / 2) = 1.
 *       currentCycleCount = 5 + 1 = 6.
 *
 *     Loop 6:
 *       walkerOne (1) === walkerTwo (1). Break loop.
 *
 *     Add currentCycleCount (6) to cycleAnswers. cycleAnswers = [6].
 *
 *   End of queries iteration.
 *   Return cycleAnswers = [6].
 * Time Complexity: O(M * log(MaxNodeValue))
 * Space Complexity: O(M)
 */
var cycleLengthQueries = function (n, queries) {
  const cycleAnswers = [];

  for (let queryIndex = 0; queryIndex < queries.length; queryIndex++) {
    const currentQuery = queries[queryIndex];
    let nodeOne = currentQuery[0];
    let nodeTwo = currentQuery[1];

    let walkerOne = nodeOne;
    let walkerTwo = nodeTwo;
    let currentCycleCount = 1;

    for (;;) {
      if (walkerOne === walkerTwo) {
        break;
      }

      if (walkerOne > walkerTwo) {
        walkerOne = Math.floor(walkerOne / 2);
      } else {
        walkerTwo = Math.floor(walkerTwo / 2);
      }
      currentCycleCount++;
    }

    cycleAnswers.push(currentCycleCount);
  }

  return cycleAnswers;
};
