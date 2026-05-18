/**
 * Stone Game Ix
 * Intuition: The game's outcome hinges on the counts of stones modulo 3. Stones with value 0 (mod 3) only serve to pass turns without altering the sum modulo 3. Stones with values 1 (mod 3) and 2 (mod 3) are critical for changing the sum modulo 3, and a player loses if their move makes the total sum of removed stones divisible by 3. Bob automatically wins if Alice faces no remaining stones.
 * Approach: 1. Count the occurrences of stones for each remainder modulo 3. Let these be `count0`, `count1`, and `count2`. 2. Analyze the strategic implications based on `count0`'s parity. 3. If `count0` is even, `0`-stones allow turns to alternate normally; Alice wins if and only if she has both `1`-stones and `2`-stones available for the strategic game. 4. If `count0` is odd, `0`-stones effectively give the player who made the last non-`0`-stone move an extra turn for `1`-stones or `2`-stones; Alice wins if and only if the absolute difference between `count1` and `count2` is greater than 2, indicating she can exploit an imbalance.
 * Dry Run:
 * Input: [2, 1, 2]
 * 1. Initialize `modulusCounts = [0, 0, 0]`.
 * 2. Iterate through `inputStonesCollection` (original `stones`):
 *    - `currentStoneElement = 2`: `modulusCounts[2 % 3]` (i.e., `modulusCounts[2]`) becomes 1. `modulusCounts = [0, 0, 1]`.
 *    - `currentStoneElement = 1`: `modulusCounts[1 % 3]` (i.e., `modulusCounts[1]`) becomes 1. `modulusCounts = [0, 1, 1]`.
 *    - `currentStoneElement = 2`: `modulusCounts[2 % 3]` (i.e., `modulusCounts[2]`) becomes 2. `modulusCounts = [0, 1, 2]`.
 * 3. `modulusCounts[0]` is 0, which is an even number.
 * 4. Evaluate the condition for even `modulusCounts[0]`: `modulusCounts[1] >= 1 && modulusCounts[2] >= 1`:
 *    - `1 >= 1` is true.
 *    - `2 >= 1` is true.
 *    - The combined condition `true && true` evaluates to `true`.
 * 5. Return `true`.
 *
 * Input: [1, 1, 1, 2, 2, 2, 0, 0, 0]
 * 1. Initialize `modulusCounts = [0, 0, 0]`.
 * 2. After iterating through all elements, `modulusCounts` becomes `[3, 3, 3]`.
 * 3. `modulusCounts[0]` is 3, which is an odd number.
 * 4. Evaluate the condition for odd `modulusCounts[0]`: `Math.abs(modulusCounts[1] - modulusCounts[2]) > 2`:
 *    - `Math.abs(3 - 3)` is `0`.
 *    - `0 > 2` is `false`.
 * 5. Return `false`.
 *
 * Input: [1, 1, 1, 1, 1, 2, 0, 0, 0]
 * 1. Initialize `modulusCounts = [0, 0, 0]`.
 * 2. After iterating through all elements, `modulusCounts` becomes `[3, 5, 1]`.
 * 3. `modulusCounts[0]` is 3, which is an odd number.
 * 4. Evaluate the condition for odd `modulusCounts[0]`: `Math.abs(modulusCounts[1] - modulusCounts[2]) > 2`:
 *    - `Math.abs(5 - 1)` is `4`.
 *    - `4 > 2` is `true`.
 * 5. Return `true`.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var stoneGameIX = function (inputStonesCollection) {
  const modulusCounts = [0, 0, 0];
  let stoneIterator = 0;
  while (stoneIterator < inputStonesCollection.length) {
    const currentStoneElement = inputStonesCollection[stoneIterator];
    modulusCounts[currentStoneElement % 3]++;
    stoneIterator++;
  }

  const countZeroMod = modulusCounts[0];
  const countOneMod = modulusCounts[1];
  const countTwoMod = modulusCounts[2];

  if (countZeroMod % 2 === 0) {
    return countOneMod >= 1 && countTwoMod >= 1;
  } else {
    const differenceOneTwo = Math.abs(countOneMod - countTwoMod);
    return differenceOneTwo > 2;
  }
};
