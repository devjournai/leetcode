/**
 * Existence Of A Substring In A String And Its Reverse
 * Intuition: To determine if any 2-character substring of the original string is also present in its reverse, we can systematically check each possible 2-character substring from the original string against the reversed version.
 * Approach: 1. First, create a new string that is the reverse of the input string `s`. 2. Initialize an index to traverse the original string `s`. 3. Iterate through `s`, extracting each 2-character substring. 4. For each extracted substring, check if it exists within the previously generated reversed string. 5. If a match is found at any point, immediately return `true`. 6. If the iteration completes without finding any such substring, return `false`.
 * Dry Run:
 * Input: s = "banana"
 * 1. `reversedInputString` = "ananab" (from "banana".split('').reverse().join(''))
 * 2. `currentTraversalIndex` = 0
 * 3. Loop: `while (currentTraversalIndex < s.length - 1)` (which is `0 < 5`)
 *    a. `currentTraversalIndex` = 0:
 *       `currentTwoCharSub` = s.slice(0, 2) -> "ba"
 *       `reversedInputString.includes("ba")` -> `false`
 *       `currentTraversalIndex` becomes 1
 *    b. `currentTraversalIndex` = 1:
 *       `currentTwoCharSub` = s.slice(1, 3) -> "an"
 *       `reversedInputString.includes("an")` -> `true` (found in "anana**an**ab")
 *       Return `true`.
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var isSubstringPresent = function (s) {
  const reversedInputString = s.split("").reverse().join("");
  let currentTraversalIndex = 0;
  const stringLength = s.length;

  while (currentTraversalIndex < stringLength - 1) {
    const currentTwoCharSub = s.slice(
      currentTraversalIndex,
      currentTraversalIndex + 2,
    );
    if (reversedInputString.includes(currentTwoCharSub)) {
      return true;
    }
    currentTraversalIndex++;
  }

  return false;
};
