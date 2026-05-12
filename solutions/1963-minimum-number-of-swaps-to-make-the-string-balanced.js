/**
 * Minimum Number Of Swaps To Make The String Balanced
 * Intuition: The minimum number of swaps is determined by the maximum "debt" of closing brackets encountered without available opening brackets. Each time a closing bracket appears and no opening bracket is available to match it, one swap is needed. This swap effectively turns the current closing bracket into an opening one, resolving two imbalances.
 * Approach: 1. Initialize a counter `openBracketTally` to track the number of available opening brackets (starts at 0). 2. Initialize `swapOperationsCount` to 0. 3. Iterate through each character in the string: if it's an opening bracket `[`, increment `openBracketTally`. If it's a closing bracket `]`, check `openBracketTally`. If `openBracketTally` is greater than 0, decrement it (matching an available opening bracket). If `openBracketTally` is 0, it means an unmatched closing bracket is found; increment `swapOperationsCount` and increment `openBracketTally` by 1 (simulating the current bracket becoming an opening one after a swap). 4. Return `swapOperationsCount`.
 * Dry Run: s = "[]][]["
 * openBracketTally = 0, swapOperationsCount = 0
 * 1. currentSymbol = '[': openBracketTally = 1
 * 2. currentSymbol = ']': openBracketTally > 0 (is 1), openBracketTally = 0
 * 3. currentSymbol = ']': openBracketTally is 0. swapOperationsCount = 1, openBracketTally = 1
 * 4. currentSymbol = '[': openBracketTally = 2
 * 5. currentSymbol = ']': openBracketTally > 0 (is 2), openBracketTally = 1
 * 6. currentSymbol = '[': openBracketTally = 2
 * End of string. Result: swapOperationsCount = 1.
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var minSwaps = function (s) {
  let openBracketTally = 0;
  let swapOperationsCount = 0;

  for (const currentSymbol of s) {
    if (currentSymbol === "[") {
      openBracketTally++;
    } else {
      if (openBracketTally > 0) {
        openBracketTally--;
      } else {
        swapOperationsCount++;
        openBracketTally++;
      }
    }
  }

  return swapOperationsCount;
};
