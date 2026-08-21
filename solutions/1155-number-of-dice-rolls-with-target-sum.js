/**
 * Number Of Dice Rolls With Target Sum
 * Intuition: After d dice, ways[s] is the number of ways to total s. A new die with face f adds ways[s-f] from the previous layer, modulo 1e9+7.
 * Approach: 1. Start with ways[0]=1. 2. For each of n dice, build a new array: for each sum 1..target and face 1..k, add previous[sum-face]. 3. Return ways[target].
 * Dry Run: n = 2, k = 6, target = 7.
 *   - After 1 die: ways[1..6]=1. After 2 dice: ways[7] = 6 (1+6 .. 6+1). Answer 6.
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
