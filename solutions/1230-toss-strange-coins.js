/**
 * Toss Strange Coins
 * Intuition: dp[h] is the probability of exactly h heads so far; each coin mixes tails (stay) and heads (shift).
 * Approach: 1. dp[0]=1. 2. For each coin, new[0]=old[0]*(1-p); new[h]=old[h]*(1-p)+old[h-1]*p for h=1..target. 3. Return dp[target].
 * Dry Run: prob=[0.4], target=1 → 0.4.
 * Time Complexity: O(prob.length * target)
 * Space Complexity: O(target)
 */
var probabilityOfHeads = function (prob, target) {
  const probabilityLength = prob.length;

  let dpPreviousIteration = new Array(target + 1).fill(0);
  dpPreviousIteration[0] = 1;

  for (let coinIndex = 0; coinIndex < probabilityLength; coinIndex++) {
    let currentCoinProb = prob[coinIndex];
    let probOfTails = 1 - currentCoinProb;

    let dpCurrentIteration = new Array(target + 1).fill(0);

    dpCurrentIteration[0] = dpPreviousIteration[0] * probOfTails;

    for (
      let headCountIteration = 1;
      headCountIteration <= target;
      headCountIteration++
    ) {
      dpCurrentIteration[headCountIteration] =
        dpPreviousIteration[headCountIteration] * probOfTails +
        dpPreviousIteration[headCountIteration - 1] * currentCoinProb;
    }

    dpPreviousIteration = dpCurrentIteration;
  }

  return dpPreviousIteration[target];
};
