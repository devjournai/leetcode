/**
 * Count Ways To Distribute Candies
 * Time Complexity: O(n * k)
 * Space Complexity: O(n * k)
 */
var waysToDistribute = function (n, k) {
  const modulusValue = 1e9 + 7;
  const dpTable = new Array(n + 1).fill(0).map(() => new Array(k + 1).fill(0));

  for (let currentCandyCount = 1; currentCandyCount <= n; currentCandyCount++) {
    dpTable[currentCandyCount][1] = 1;
  }

  for (let candiesIter = 2; candiesIter <= n; candiesIter++) {
    for (let bagsIter = 2; bagsIter <= Math.min(candiesIter, k); bagsIter++) {
      let optionOne = dpTable[candiesIter - 1][bagsIter - 1];
      let optionTwo =
        (bagsIter * dpTable[candiesIter - 1][bagsIter]) % modulusValue;
      dpTable[candiesIter][bagsIter] = (optionOne + optionTwo) % modulusValue;
    }
  }

  return dpTable[n][k];
};
