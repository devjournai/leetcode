/**
 * Number Of Ways To Reach Destination In The Grid
 * Intuition: The movement rules depend only on whether the current cell shares a row or column with the destination. This suggests using dynamic programming with states representing these relative positions.
 * Approach: 1. Define four states based on the current cell's relationship to the destination: (0) current cell is the destination, (1) current cell is in the same row as destination but different column, (2) current cell is in the same column as destination but different row, (3) current cell is in a different row and different column than destination. 2. Initialize a DP table `dpTable` of size `(k+1) x 4`, where `dpTable[i][state]` stores the number of ways to reach `state` in exactly `i` moves. 3. Set the base case `dpTable[0]` based on the initial `source` cell's relationship to `dest`. 4. Iterate from `i = 1` to `k`. For each `i`, calculate `dpTable[i][state]` for all four states by considering all possible transitions from `dpTable[i-1][prevState]`. Use `BigInt` for intermediate products to prevent overflow before applying the modulo operator. 5. The final answer is `dpTable[k][0]`.
 * Dry Run: n=2, m=2, k=2, source=[1,1], dest=[2,2]
 *   modulusValue = 1_000_000_007
 *   dpTable = new Array(3).fill().map(() => new Array(4).fill(0))
 *   Initial state: source=[1,1], dest=[2,2]. Different row, different column.
 *   dpTable[0] = [0, 0, 0, 1] (state 3 has 1 way)
 *
 *   Loop for loopIndex = 1:
 *     prevZeroWays = 0, prevOneWays = 0, prevTwoWays = 0, prevThreeWays = 1
 *     nMinusOne = 1, mMinusOne = 1, nMinusTwo = 0, mMinusTwo = 0, mPlusNMinusFour = 0
 *
 *     currentZeroWays = (BigInt(prevOneWays) + BigInt(prevTwoWays)) % BigInt(modulusValue) = (0 + 0) % MOD = 0
 *     currentOneWays = (BigInt(prevZeroWays) * BigInt(mMinusOne) + BigInt(prevOneWays) * BigInt(mMinusTwo) + BigInt(prevThreeWays) * BigInt(1)) % BigInt(modulusValue) = (0*1 + 0*0 + 1*1) % MOD = 1
 *     currentTwoWays = (BigInt(prevZeroWays) * BigInt(nMinusOne) + BigInt(prevTwoWays) * BigInt(nMinusTwo) + BigInt(prevThreeWays) * BigInt(1)) % BigInt(modulusValue) = (0*1 + 0*0 + 1*1) % MOD = 1
 *     currentThreeWays = (BigInt(prevOneWays) * BigInt(nMinusOne) + BigInt(prevTwoWays) * BigInt(mMinusOne) + BigInt(prevThreeWays) * BigInt(mPlusNMinusFour)) % BigInt(modulusValue) = (0*1 + 0*1 + 1*0) % MOD = 0
 *
 *     dpTable[1] = [0, 1, 1, 0]
 *
 *   Loop for loopIndex = 2:
 *     prevZeroWays = 0, prevOneWays = 1, prevTwoWays = 1, prevThreeWays = 0
 *     nMinusOne = 1, mMinusOne = 1, nMinusTwo = 0, mMinusTwo = 0, mPlusNMinusFour = 0
 *
 *     currentZeroWays = (BigInt(prevOneWays) + BigInt(prevTwoWays)) % BigInt(modulusValue) = (1 + 1) % MOD = 2
 *     currentOneWays = (BigInt(prevZeroWays) * BigInt(mMinusOne) + BigInt(prevOneWays) * BigInt(mMinusTwo) + BigInt(prevThreeWays) * BigInt(1)) % BigInt(modulusValue) = (0*1 + 1*0 + 0*1) % MOD = 0
 *     currentTwoWays = (BigInt(prevZeroWays) * BigInt(nMinusOne) + BigInt(prevTwoWays) * BigInt(nMinusTwo) + BigInt(prevThreeWays) * BigInt(1)) % BigInt(modulusValue) = (0*1 + 1*0 + 0*1) % MOD = 0
 *     currentThreeWays = (BigInt(prevOneWays) * BigInt(nMinusOne) + BigInt(prevTwoWays) * BigInt(mMinusOne) + BigInt(prevThreeWays) * BigInt(mPlusNMinusFour)) % BigInt(modulusValue) = (1*1 + 1*1 + 0*0) % MOD = 2
 *
 *     dpTable[2] = [2, 0, 0, 2]
 *
 *   Return dpTable[2][0] = 2.
 *
 * Time Complexity: O(k)
 * Space Complexity: O(k)
 */
var numberOfWays = function (n, m, k, source, dest) {
  const modulusValue = 1_000_000_007;
  const dpTable = new Array(k + 1).fill(null).map(() => new Array(4).fill(0));

  const initialSourceX = source[0];
  const initialSourceY = source[1];
  const destinationX = dest[0];
  const destinationY = dest[1];

  if (initialSourceX === destinationX && initialSourceY === destinationY) {
    dpTable[0][0] = 1;
  } else if (initialSourceX === destinationX) {
    dpTable[0][1] = 1;
  } else if (initialSourceY === destinationY) {
    dpTable[0][2] = 1;
  } else {
    dpTable[0][3] = 1;
  }

  const nGridSize = n;
  const mGridSize = m;

  const nMinusOne = nGridSize - 1;
  const mMinusOne = mGridSize - 1;
  const nMinusTwo = nGridSize - 2;
  const mMinusTwo = mGridSize - 2;
  const mPlusNMinusFour = mGridSize + nGridSize - 4;

  for (let iterationCount = 1; iterationCount <= k; iterationCount++) {
    const prevZeroWays = dpTable[iterationCount - 1][0];
    const prevOneWays = dpTable[iterationCount - 1][1];
    const prevTwoWays = dpTable[iterationCount - 1][2];
    const prevThreeWays = dpTable[iterationCount - 1][3];

    let currentZeroWays =
      (BigInt(prevOneWays) + BigInt(prevTwoWays)) % BigInt(modulusValue);

    let currentOneWays =
      (BigInt(prevZeroWays) * BigInt(mMinusOne) +
        BigInt(prevOneWays) * BigInt(mMinusTwo) +
        BigInt(prevThreeWays) * BigInt(1)) %
      BigInt(modulusValue);

    let currentTwoWays =
      (BigInt(prevZeroWays) * BigInt(nMinusOne) +
        BigInt(prevTwoWays) * BigInt(nMinusTwo) +
        BigInt(prevThreeWays) * BigInt(1)) %
      BigInt(modulusValue);

    let currentThreeWays =
      (BigInt(prevOneWays) * BigInt(nMinusOne) +
        BigInt(prevTwoWays) * BigInt(mMinusOne) +
        BigInt(prevThreeWays) * BigInt(mPlusNMinusFour)) %
      BigInt(modulusValue);

    dpTable[iterationCount][0] = Number(currentZeroWays);
    dpTable[iterationCount][1] = Number(currentOneWays);
    dpTable[iterationCount][2] = Number(currentTwoWays);
    dpTable[iterationCount][3] = Number(currentThreeWays);
  }

  return dpTable[k][0];
};
