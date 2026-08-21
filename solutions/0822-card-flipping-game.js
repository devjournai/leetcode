/**
 * Card Flipping Game
 * Intuition: A number that appears on both sides of the same card can never be "good" (you cannot hide it). The answer is the smallest number appearing on any face that is not such a blocked value.
 * Approach: 1. If `fronts[i]===backs[i]`, add to `valuesToExclude`. 2. Min over remaining front and back values. 3. Infinity → 0 else that min.
 * Dry Run: fronts = [1,2,4,4,7], backs = [1,3,4,1,3]. 1 and 4 are same-card; min good is 2.
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
