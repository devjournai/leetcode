/**
 * Minimum String Length After Removing Substrings
 * Intuition: Removing adjacent "AB" or "CD" characters implies that the order matters and new pairs can form after removal. This is characteristic of problems best solved with a stack, where we can efficiently check the last processed character and decide whether to remove or append.
 * Approach: 1. Initialize an empty array, `processedChars`, to serve as a stack. 2. Iterate through each `currentChar` in the input string `s`. 3. For each `currentChar`, check if `processedChars` is not empty and if `currentChar` forms a removable pair ("AB" or "CD") with the last character in `processedChars`. 4. If a removable pair is found (e.g., `lastCharInStack === 'A'` and `currentChar === 'B'`), pop the last character from `processedChars`. 5. Otherwise, push `currentChar` onto `processedChars`. 6. After iterating through all characters in `s`, the final length of `processedChars` is the minimum possible length of the string.
 * Dry Run: s = "ABFCDE"
 * 1. Initialize `processedChars = []`
 * 2. `currentChar = 'A'`: `processedChars` is empty. Push 'A'. `processedChars = ['A']`
 * 3. `currentChar = 'B'`: `processedChars` is not empty. `lastCharInStack = 'A'`. 'A' and 'B' form "AB". Pop 'A'. `processedChars = []`
 * 4. `currentChar = 'F'`: `processedChars` is empty. Push 'F'. `processedChars = ['F']`
 * 5. `currentChar = 'C'`: `processedChars` is not empty. `lastCharInStack = 'F'`. 'F' and 'C' do not form a pair. Push 'C'. `processedChars = ['F', 'C']`
 * 6. `currentChar = 'D'`: `processedChars` is not empty. `lastCharInStack = 'C'`. 'C' and 'D' form "CD". Pop 'C'. `processedChars = ['F']`
 * 7. `currentChar = 'E'`: `processedChars` is not empty. `lastCharInStack = 'F'`. 'F' and 'E' do not form a pair. Push 'E'. `processedChars = ['F', 'E']`
 * End of string. Return `processedChars.length` which is `2`.
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minLength = function (s) {
  const processedChars = [];

  for (const iterationChar of s) {
    const currentStackSize = processedChars.length;
    if (currentStackSize > 0) {
      const lastCharInStack = processedChars[currentStackSize - 1];
      if (
        (lastCharInStack === "A" && iterationChar === "B") ||
        (lastCharInStack === "C" && iterationChar === "D")
      ) {
        processedChars.pop();
      } else {
        processedChars.push(iterationChar);
      }
    } else {
      processedChars.push(iterationChar);
    }
  }

  const finalLength = processedChars.length;
  return finalLength;
};
