/**
 * Toss Strange Coins
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
