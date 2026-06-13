/**
 * Number Of Distinct Roll Sequences
 * Intuition: The problem requires counting sequences under specific conditions involving adjacent and 'two-away' elements (GCD and distinctness). This inherently suggests a dynamic programming approach where the state needs to track the most recent two rolls to enforce these rules.
 * Approach: 1. Define a 3D DP table `memoTable[length][lastRoll][secondLastRoll]` to store the number of distinct valid sequences. The `secondLastRoll` being 0 serves as a placeholder for sequences of length 1 or when there isn't a third-to-last roll. 2. Implement a standard Euclidean algorithm for `computeGcd`. 3. Initialize the base cases: For a sequence of `lengthCounter = 1`, any single roll from 1 to 6 is valid. Set `memoTable[1][faceOne][0] = 1` for all `faceOne` from 1 to 6. 4. Iterate `lengthCounter` from 2 up to `numRolls`. For each `lengthCounter`, iterate through all possible `currentDiceFace` (1-6) and `previousDiceFace` (0-6). 5. To compute `memoTable[lengthCounter][currentDiceFace][previousDiceFace]`, iterate through all possible `secondPreviousDiceFace` (0-6). Sum up `memoTable[lengthCounter - 1][previousDiceFace][secondPreviousFace]` if all conditions are met for forming the current sequence: `currentDiceFace` must not equal `previousDiceFace`, `currentDiceFace` must not equal `secondPreviousDiceFace`, and `computeGcd(currentDiceFace, previousDiceFace)` must be 1 (unless `previousDiceFace` is 0). 6. Apply the modulo operation (`modulusValue`) at each addition to prevent integer overflow. 7. Finally, sum all entries `memoTable[numRolls][finalFaceValue][finalPreviousFaceValue]` for `numRolls` length to get the total number of distinct valid sequences.
 * Dry Run:
 * n = 1:
 *   - memoTable is initialized with zeros.
 *   - Base cases: `faceOne` loops from 1 to 6. `memoTable[1][1][0] = 1`, `memoTable[1][2][0] = 1`, ..., `memoTable[1][6][0] = 1`.
 *   - Loops for `lengthCounter` from 2 to `numRolls` are skipped since `numRolls` is 1.
 *   - Final summation: `finalFaceValue` loops from 1 to 6, `finalPreviousFaceValue` loops from 0 to 6.
 *     - Only `memoTable[1][finalFaceValue][0]` entries are non-zero.
 *     - `totalValidSequences` becomes `memoTable[1][1][0] + memoTable[1][2][0] + ... + memoTable[1][6][0]`.
 *     - `totalValidSequences = 1 + 1 + 1 + 1 + 1 + 1 = 6`.
 *   - Returns 6.
 * n = 2:
 *   - `memoTable` and base cases (for `lengthCounter = 1`) are initialized as above.
 *   - `lengthCounter = 2`:
 *     - `currentDiceFace` iterates 1-6. `previousDiceFace` iterates 0-6. `secondPreviousDiceFace` iterates 0-6.
 *     - The only non-zero `memoTable[lengthCounter - 1][previousDiceFace][secondPreviousDiceFace]` entries are `memoTable[1][p][0]` for `p` in 1-6. So `secondPreviousDiceFace` must be 0 for any contribution.
 *     - Consider calculating `memoTable[2][currentDiceFace][previousDiceFace]`:
 *       - Valid if: `previousDiceFace` is 1-6 (since `memoTable[1][0][0]` is 0), `secondPreviousDiceFace` is 0.
 *       - Conditions:
 *         1. `currentDiceFace !== previousDiceFace` (e.g., [1,1] invalid)
 *         2. `currentDiceFace !== secondPreviousDiceFace` (i.e., `currentDiceFace !== 0`, which is always true for rolls 1-6, so this condition is met for length 2).
 *         3. `previousDiceFace !== 0 && computeGcd(currentDiceFace, previousDiceFace) !== 1`.
 *       - Example: `currentDiceFace = 2, previousDiceFace = 1, secondPreviousDiceFace = 0`.
 *         - `memoTable[1][1][0]` is 1.
 *         - `2 !== 1` (OK). `2 !== 0` (OK). `computeGcd(2,1)` is 1 (OK).
 *         - So, `memoTable[2][2][1]` gets `memoTable[1][1][0] = 1`. This accounts for sequence `[1, 2]`.
 *       - Similarly, `memoTable[2][3][1]` gets 1 for sequence `[1,3]`, `memoTable[2][5][1]` for `[1,5]`.
 *       - For `currentDiceFace = 4, previousDiceFace = 2, secondPreviousDiceFace = 0`.
 *         - `memoTable[1][2][0]` is 1.
 *         - `4 !== 2` (OK). `4 !== 0` (OK). `computeGcd(4,2)` is 2 (`!== 1`), so this path is skipped. Sequence `[2,4]` is invalid.
 *   - Final summation: `totalValidSequences` sums all `memoTable[2][finalFaceValue][finalPreviousFaceValue]` for `finalFaceValue` 1-6 and `finalPreviousFaceValue` 0-6. This sum represents the count of all valid two-roll sequences.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var distinctSequences = function (numRolls) {
  const modulusValue = 1e9 + 7;

  const computeGcd = (valueA, valueB) => {
    return valueB === 0 ? valueA : computeGcd(valueB, valueA % valueB);
  };

  const memoTable = new Array(numRolls + 1)
    .fill(null)
    .map(() => new Array(7).fill(null).map(() => new Array(7).fill(0)));

  for (let faceOne = 1; faceOne <= 6; faceOne++) {
    memoTable[1][faceOne][0] = 1;
  }

  for (let lengthCounter = 2; lengthCounter <= numRolls; lengthCounter++) {
    for (let currentDiceFace = 1; currentDiceFace <= 6; currentDiceFace++) {
      for (
        let previousDiceFace = 0;
        previousDiceFace <= 6;
        previousDiceFace++
      ) {
        for (
          let secondPreviousDiceFace = 0;
          secondPreviousDiceFace <= 6;
          secondPreviousDiceFace++
        ) {
          if (
            memoTable[lengthCounter - 1][previousDiceFace][
              secondPreviousDiceFace
            ] === 0
          ) {
            continue;
          }

          if (
            currentDiceFace === previousDiceFace ||
            currentDiceFace === secondPreviousDiceFace
          ) {
            continue;
          }

          if (
            previousDiceFace !== 0 &&
            computeGcd(currentDiceFace, previousDiceFace) !== 1
          ) {
            continue;
          }

          memoTable[lengthCounter][currentDiceFace][previousDiceFace] =
            (memoTable[lengthCounter][currentDiceFace][previousDiceFace] +
              memoTable[lengthCounter - 1][previousDiceFace][
                secondPreviousDiceFace
              ]) %
            modulusValue;
        }
      }
    }
  }

  let totalValidSequences = 0;
  for (let finalFaceValue = 1; finalFaceValue <= 6; finalFaceValue++) {
    for (
      let finalPreviousFaceValue = 0;
      finalPreviousFaceValue <= 6;
      finalPreviousFaceValue++
    ) {
      totalValidSequences =
        (totalValidSequences +
          memoTable[numRolls][finalFaceValue][finalPreviousFaceValue]) %
        modulusValue;
    }
  }

  return totalValidSequences;
};
