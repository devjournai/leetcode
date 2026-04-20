/**
 * Number Of Dice Rolls With Target Sum
 * Time Complexity: O(n * target * k)
 * Space Complexity: O(target)
 */
var numRollsToTarget = function (n, k, target) {
  const MODULUS_VALUE = 1e9 + 7;
  let waysForSum = new Array(target + 1).fill(0);
  waysForSum[0] = 1;

  for (let currentDice = 1; currentDice <= n; currentDice++) {
    const nextWaysForSum = new Array(target + 1).fill(0);
    for (let currentSum = 1; currentSum <= target; currentSum++) {
      for (
        let currentFaceValue = 1;
        currentFaceValue <= k;
        currentFaceValue++
      ) {
        if (currentSum - currentFaceValue >= 0) {
          nextWaysForSum[currentSum] =
            (nextWaysForSum[currentSum] +
              waysForSum[currentSum - currentFaceValue]) %
            MODULUS_VALUE;
        }
      }
    }
    waysForSum = nextWaysForSum;
  }

  return waysForSum[target];
};
