/**
 * Count Number Of Texts
 * Intuition: The problem involves counting combinations based on sequences of identical digits. This often suggests a dynamic programming approach where the number of ways to decode a prefix depends on the number of ways to decode shorter prefixes.
 * Approach: 1. Initialize a DP array `waysToDecode` where `waysToDecode[k]` stores the number of possible text messages for the first `k` characters of `pressedKeys`. Set `waysToDecode[0] = 1` for the empty string. 2. Create a map `digitPressesCount` to store the maximum allowed consecutive presses for each digit ('7' and '9' allow 4, others allow 3). 3. Iterate `currentLength` from `1` to `totalInputLength` (length of `pressedKeys`). For each `currentLength`:
 *    a. The base case is that the last character `pressedKeys[currentLength - 1]` is decoded as a single letter, adding `waysToDecode[currentLength - 1]` to the total.
 *    b. Check if the current character `pressedKeys[currentLength - 1]` is the same as `pressedKeys[currentLength - 2]`. If so, they can be decoded as a two-letter sequence. Add `waysToDecode[currentLength - 2]` to the total.
 *    c. If the above is true, then check if `pressedKeys[currentLength - 1]`, `pressedKeys[currentLength - 2]`, and `pressedKeys[currentLength - 3]` are all the same. If so, they can be decoded as a three-letter sequence. Add `waysToDecode[currentLength - 3]` to the total.
 *    d. If the above is true, and the digit `pressedKeys[currentLength - 1]` allows for four presses (i.e., '7' or '9'), then check if `pressedKeys[currentLength - 1]`, `pressedKeys[currentLength - 2]`, `pressedKeys[currentLength - 3]`, and `pressedKeys[currentLength - 4]` are all the same. If so, they can be decoded as a four-letter sequence. Add `waysToDecode[currentLength - 4]` to the total.
 *    e. All additions should be performed modulo `1e9 + 7`. 4. The final answer is `waysToDecode[totalInputLength]`.
 * Dry Run: For `pressedKeys = "222"`:
 *   - `moduloValue = 1e9 + 7`, `totalInputLength = 3`
 *   - `digitPressesCount = {'2': 3, '3': 3, ..., '7': 4, ...}`
 *   - `waysToDecode = [1, 0, 0, 0]`
 *   - `currentLength = 1`: `waysToDecode[1] = waysToDecode[0] = 1`. `waysToDecode = [1, 1, 0, 0]`
 *   - `currentLength = 2`:
 *     - `computedWays = waysToDecode[1] = 1`
 *     - `currentChar = '2'`, `precedingChar = '2'`
 *     - `2 >= 2 && '2' === '2'` is true. `computedWays = (1 + waysToDecode[0]) % moduloValue = (1 + 1) % moduloValue = 2`.
 *     - `precedingTwoChars` is out of bounds for `currentLength=2`.
 *     - `waysToDecode[2] = 2`. `waysToDecode = [1, 1, 2, 0]`
 *   - `currentLength = 3`:
 *     - `computedWays = waysToDecode[2] = 2`
 *     - `currentChar = '2'`, `precedingChar = '2'`
 *     - `3 >= 2 && '2' === '2'` is true. `computedWays = (2 + waysToDecode[1]) % moduloValue = (2 + 1) % moduloValue = 3`.
 *     - `precedingTwoChars = '2'`
 *     - `3 >= 3 && '2' === '2'` is true. `computedWays = (3 + waysToDecode[0]) % moduloValue = (3 + 1) % moduloValue = 4`.
 *     - `maxKeyAllowedPresses = digitPressesCount.get('2') = 3`. `precedingThreeChars` is out of bounds. The `maxKeyAllowedPresses === 4` condition is false.
 *     - `waysToDecode[3] = 4`. `waysToDecode = [1, 1, 2, 4]`
 *   - Return `waysToDecode[3] = 4`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var countTexts = function (pressedKeys) {
  const moduloValue = 1e9 + 7;
  const totalInputLength = pressedKeys.length;
  const waysToDecode = new Array(totalInputLength + 1).fill(0);
  waysToDecode[0] = 1;

  const digitPressesCount = new Map([
    ["2", 3],
    ["3", 3],
    ["4", 3],
    ["5", 3],
    ["6", 3],
    ["7", 4],
    ["8", 3],
    ["9", 4],
  ]);

  for (
    let currentLength = 1;
    currentLength <= totalInputLength;
    currentLength++
  ) {
    let computedWays = waysToDecode[currentLength - 1]; // Option 1: current character is a single letter

    const currentChar = pressedKeys[currentLength - 1];

    if (currentLength >= 2 && currentChar === pressedKeys[currentLength - 2]) {
      computedWays =
        (computedWays + waysToDecode[currentLength - 2]) % moduloValue; // Option 2: current character combines with previous

      if (
        currentLength >= 3 &&
        currentChar === pressedKeys[currentLength - 3]
      ) {
        // Implies current, previous, and two-previous are identical
        computedWays =
          (computedWays + waysToDecode[currentLength - 3]) % moduloValue; // Option 3: current character combines with previous two

        const maxKeyAllowedPresses = digitPressesCount.get(currentChar);
        if (
          maxKeyAllowedPresses === 4 &&
          currentLength >= 4 &&
          currentChar === pressedKeys[currentLength - 4]
        ) {
          // Implies current, previous, two-previous, and three-previous are identical, AND key allows 4 presses
          computedWays =
            (computedWays + waysToDecode[currentLength - 4]) % moduloValue; // Option 4: current character combines with previous three
        }
      }
    }
    waysToDecode[currentLength] = computedWays;
  }

  return waysToDecode[totalInputLength];
};
