/**
 * Construct String With Repeat Limit
 * Intuition: To construct the lexicographically largest string, we should prioritize using larger characters. We iterate from 'z' down to 'a'. For each character, we append it as many times as possible up to the repeat limit. If we still have occurrences of that character left but hit the repeat limit, we must insert a single smaller character to break the sequence, choosing the largest available smaller character. Then, we can try to append the larger character again. If no smaller character is available, we stop.
 * Approach:
 * 1. Initialize a frequency array (or map) for all 26 lowercase English letters.
 * 2. Populate the frequency array by iterating through the input string `s`.
 * 3. Initialize an empty array `resultCharacters` to build the new string.
 * 4. Iterate `currentCharCodeIndex` from 25 (for 'z') down to 0 (for 'a').
 * 5. Inside this loop:
 *    a. If `characterFrequencies[currentCharCodeIndex]` is 0, continue to the next smaller character.
 *    b. Calculate `currentAppendCount` as the minimum of `characterFrequencies[currentCharCodeIndex]` and `repeatConstraint`.
 *    c. Append `currentCharCodeIndex` character `currentAppendCount` times to `resultCharacters`.
 *    d. Decrement `characterFrequencies[currentCharCodeIndex]` by `currentAppendCount`.
 *    e. If `characterFrequencies[currentCharCodeIndex]` is still greater than 0 (meaning we hit the `repeatConstraint` for this character), then:
 *       i. Search for the `nextLowerCharCodeIndex` starting from `currentCharCodeIndex - 1` downwards, until a character with a frequency greater than 0 is found, or `nextLowerCharCodeIndex` goes below 0.
 *       ii. If `nextLowerCharCodeIndex` is less than 0, it means no smaller characters are available to break the sequence, so break the main loop.
 *       iii. Otherwise, append the character at `nextLowerCharCodeIndex` once to `resultCharacters` and decrement its frequency.
 *    f. If `characterFrequencies[currentCharCodeIndex]` is 0, decrement `currentCharCodeIndex` to move to the next character in the alphabet.
 * 6. Join the `resultCharacters` array into a string and return it.
 * Dry Run: s = "baccc", repeatLimit = 2
 * 1. Initialize: `characterFrequencies = [0,...0]`, `resultCharacters = []`
 * 2. Populate Frequencies: `characterFrequencies = [1,1,3,0,...0]` (a:1, b:1, c:3)
 * 3. `currentCharCodeIndex = 25` (z) down to `3` (d): All have `0` frequency, `currentCharCodeIndex` decrements to 2.
 * 4. `currentCharCodeIndex = 2` (c):
 *    a. `characterFrequencies[2]` is 3.
 *    b. `currentAppendCount = Math.min(3, 2) = 2`.
 *    c. Append 'c' twice: `resultCharacters = ['c', 'c']`.
 *    d. `characterFrequencies[2]` becomes 1.
 *    e. `characterFrequencies[2]` (1) > 0.
 *       i. `nextLowerCharCodeIndex = 1` (b). `characterFrequencies[1]` is 1 (not 0). Loop for `nextLowerCharCodeIndex` stops.
 *       ii. `nextLowerCharCodeIndex` is 1 (not < 0).
 *       iii. Append 'b': `resultCharacters = ['c', 'c', 'b']`. `characterFrequencies[1]` becomes 0.
 *    f. `currentCharCodeIndex` remains 2.
 * 5. `currentCharCodeIndex = 2` (c) again:
 *    a. `characterFrequencies[2]` is 1.
 *    b. `currentAppendCount = Math.min(1, 2) = 1`.
 *    c. Append 'c' once: `resultCharacters = ['c', 'c', 'b', 'c']`.
 *    d. `characterFrequencies[2]` becomes 0.
 *    e. `characterFrequencies[2]` (0) is not > 0.
 *    f. `currentCharCodeIndex` decrements to 1.
 * 6. `currentCharCodeIndex = 1` (b):
 *    a. `characterFrequencies[1]` is 0.
 *    b. `currentCharCodeIndex` decrements to 0.
 * 7. `currentCharCodeIndex = 0` (a):
 *    a. `characterFrequencies[0]` is 1.
 *    b. `currentAppendCount = Math.min(1, 2) = 1`.
 *    c. Append 'a' once: `resultCharacters = ['c', 'c', 'b', 'c', 'a']`.
 *    d. `characterFrequencies[0]` becomes 0.
 *    e. `characterFrequencies[0]` (0) is not > 0.
 *    f. `currentCharCodeIndex` decrements to -1.
 * 8. `currentCharCodeIndex` is -1. Main loop terminates.
 * 9. Return `resultCharacters.join('')` which is "ccbca".
 * Time Complexity: O(N + A^2)
 * Space Complexity: O(A)
 */
var repeatLimitedString = function (stringInput, repeatConstraint) {
  const characterFrequencies = new Array(26).fill(0);
  const stringInputLength = stringInput.length;

  for (
    let frequencyLoopIndex = 0;
    frequencyLoopIndex < stringInputLength;
    frequencyLoopIndex++
  ) {
    characterFrequencies[stringInput.charCodeAt(frequencyLoopIndex) - 97]++;
  }

  const resultCharacters = [];
  let currentCharCodeIndex = 25;

  while (currentCharCodeIndex >= 0) {
    if (characterFrequencies[currentCharCodeIndex] === 0) {
      currentCharCodeIndex--;
      continue;
    }

    const currentAppendCount = Math.min(
      characterFrequencies[currentCharCodeIndex],
      repeatConstraint
    );

    for (
      let appendLoopCounter = 0;
      appendLoopCounter < currentAppendCount;
      appendLoopCounter++
    ) {
      const charValueOne = currentCharCodeIndex + 97;
      const charStringOne = String.fromCharCode(charValueOne);
      resultCharacters.push(charStringOne);
    }
    characterFrequencies[currentCharCodeIndex] -= currentAppendCount;

    if (characterFrequencies[currentCharCodeIndex] > 0) {
      let nextLowerCharCodeIndex = currentCharCodeIndex - 1;
      while (
        nextLowerCharCodeIndex >= 0 &&
        characterFrequencies[nextLowerCharCodeIndex] === 0
      ) {
        nextLowerCharCodeIndex--;
      }

      if (nextLowerCharCodeIndex < 0) {
        break;
      }

      const charValueTwo = nextLowerCharCodeIndex + 97;
      const charStringTwo = String.fromCharCode(charValueTwo);
      resultCharacters.push(charStringTwo);
      characterFrequencies[nextLowerCharCodeIndex]--;
    } else {
      currentCharCodeIndex--;
    }
  }

  return resultCharacters.join("");
};
