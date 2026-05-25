/**
 * Adding Spaces To A String
 * Intuition: The problem requires inserting characters (spaces) into a string at specific positions. Instead of direct string manipulation which can be inefficient due to string immutability, we can build a new string character by character. We iterate through the original string and conditionally insert spaces based on a separate list of indices. Building the new string in an array and then joining it at the end is generally more performant than repeated string concatenation.
 * Approach: 1. Initialize an empty array, `outputParts`, to accumulate the characters and spaces of the resulting string. 2. Initialize two distinct pointers: `currentSourceIndex` for iterating through the input string `s` and `currentSpaceIndex` for iterating through the `spaces` array. 3. Begin a loop `while` `currentSourceIndex` is less than the length of `s`. 4. Inside the loop, check if `currentSpaceIndex` is a valid index for the `spaces` array and if the current character position `currentSourceIndex` matches the value at `spaces[currentSpaceIndex]`. 5. If a match is found, append a space character to `outputParts` and then increment `currentSpaceIndex`. 6. Regardless of whether a space was added, append the character `s[currentSourceIndex]` to `outputParts`. 7. Increment `currentSourceIndex` to move to the next character in `s`. 8. After the loop completes, join all elements in `outputParts` to form the final string.
 * Dry Run: s = "EnjoyYourCoffee", spaces = [5, 9]
 * Initial: outputParts = [], currentSourceIndex = 0, currentSpaceIndex = 0
 * Loop (currentSourceIndex = 0):
 *   (currentSpaceIndex < 2 (0<2) && 0 === spaces[0] (5)) -> False
 *   outputParts.push('E') -> ['E']
 *   currentSourceIndex = 1
 * Loop (currentSourceIndex = 1):
 *   (0<2 && 1 === 5) -> False
 *   outputParts.push('n') -> ['E', 'n']
 *   currentSourceIndex = 2
 * Loop (currentSourceIndex = 2):
 *   (0<2 && 2 === 5) -> False
 *   outputParts.push('j') -> ['E', 'n', 'j']
 *   currentSourceIndex = 3
 * Loop (currentSourceIndex = 3):
 *   (0<2 && 3 === 5) -> False
 *   outputParts.push('o') -> ['E', 'n', 'j', 'o']
 *   currentSourceIndex = 4
 * Loop (currentSourceIndex = 4):
 *   (0<2 && 4 === 5) -> False
 *   outputParts.push('y') -> ['E', 'n', 'j', 'o', 'y']
 *   currentSourceIndex = 5
 * Loop (currentSourceIndex = 5):
 *   (currentSpaceIndex < 2 (0<2) && 5 === spaces[0] (5)) -> True
 *   outputParts.push(' ') -> ['E', 'n', 'j', 'o', 'y', ' ']
 *   currentSpaceIndex = 1
 *   outputParts.push('Y') -> ['E', 'n', 'j', 'o', 'y', ' ', 'Y']
 *   currentSourceIndex = 6
 * Loop (currentSourceIndex = 6):
 *   (currentSpaceIndex < 2 (1<2) && 6 === spaces[1] (9)) -> False
 *   outputParts.push('o') -> ['E', 'n', 'j', 'o', 'y', ' ', 'Y', 'o']
 *   currentSourceIndex = 7
 * Loop (currentSourceIndex = 7):
 *   (1<2 && 7 === 9) -> False
 *   outputParts.push('u') -> ['E', 'n', 'j', 'o', 'y', ' ', 'Y', 'o', 'u']
 *   currentSourceIndex = 8
 * Loop (currentSourceIndex = 8):
 *   (1<2 && 8 === 9) -> False
 *   outputParts.push('r') -> ['E', 'n', 'j', 'o', 'y', ' ', 'Y', 'o', 'u', 'r']
 *   currentSourceIndex = 9
 * Loop (currentSourceIndex = 9):
 *   (currentSpaceIndex < 2 (1<2) && 9 === spaces[1] (9)) -> True
 *   outputParts.push(' ') -> ['E', 'n', 'j', 'o', 'y', ' ', 'Y', 'o', 'u', 'r', ' ']
 *   currentSpaceIndex = 2
 *   outputParts.push('C') -> ['E', 'n', 'j', 'o', 'y', ' ', 'Y', 'o', 'u', 'r', ' ', 'C']
 *   currentSourceIndex = 10
 * Loop (currentSourceIndex = 10):
 *   (currentSpaceIndex < 2 (2<2)) -> False
 *   outputParts.push('o') -> ['E', 'n', 'j', 'o', 'y', ' ', 'Y', 'o', 'u', 'r', ' ', 'C', 'o']
 *   currentSourceIndex = 11
 * ... (This process continues until `currentSourceIndex` reaches 15)
 * Final step: `outputParts.join('')` -> "Enjoy Your Coffee"
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var addSpaces = function (s, spaces) {
  let outputParts = [];
  let currentSourceIndex = 0;
  let currentSpaceIndex = 0;

  while (currentSourceIndex < s.length) {
    if (
      currentSpaceIndex < spaces.length &&
      currentSourceIndex === spaces[currentSpaceIndex]
    ) {
      outputParts.push(" ");
      currentSpaceIndex++;
    }
    outputParts.push(s[currentSourceIndex]);
    currentSourceIndex++;
  }

  return outputParts.join("");
};
