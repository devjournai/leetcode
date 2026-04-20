/**
 * Card Flipping Game
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var flipgame = function (fronts, backs) {
  const totalCardCount = fronts.length;
  const valuesToExclude = new Set();

  for (
    let firstLoopIndex = 0;
    firstLoopIndex < totalCardCount;
    firstLoopIndex++
  ) {
    if (fronts[firstLoopIndex] === backs[firstLoopIndex]) {
      valuesToExclude.add(fronts[firstLoopIndex]);
    }
  }

  let minimumPossibleGood = Infinity;

  for (const numberOnFront of fronts) {
    if (!valuesToExclude.has(numberOnFront)) {
      minimumPossibleGood = Math.min(minimumPossibleGood, numberOnFront);
    }
  }

  for (const numberOnBack of backs) {
    if (!valuesToExclude.has(numberOnBack)) {
      minimumPossibleGood = Math.min(minimumPossibleGood, numberOnBack);
    }
  }

  return minimumPossibleGood === Infinity ? 0 : minimumPossibleGood;
};
