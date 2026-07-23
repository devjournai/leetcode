/**
 * Repeat String
 * Intuition: To replicate a string a given number of times without utilizing a built-in method, one can repeatedly append the original string to an accumulating result string.
 * Approach: 1. Initialize an empty string variable, `replicatedContent`, to store the final replicated string. 2. Implement a `for` loop that iterates from zero up to (but not including) the specified number of repetitions (`timesToRepeat`). 3. Inside each iteration of the loop, concatenate the original string (accessed via `this` within the prototype method) to the `replicatedContent` string. 4. After the loop completes, return the fully constructed `replicatedContent` string.
 * Dry Run: Input: String = "hello", timesToRepeat = 2
 *   1. replicatedContent = ""
 *   2. currentIteration = 0. `0 < 2` is true. replicatedContent = "" + "hello" = "hello"
 *   3. currentIteration = 1. `1 < 2` is true. replicatedContent = "hello" + "hello" = "hellohello"
 *   4. currentIteration = 2. `2 < 2` is false. Loop terminates.
 *   5. Return replicatedContent ("hellohello").
 * Time Complexity: O(N * L^2)
 * Space Complexity: O(N * L)
 */
String.prototype.replicate = function (timesToRepeat) {
  let replicatedContent = "";
  for (
    let currentIteration = 0;
    currentIteration < timesToRepeat;
    currentIteration++
  ) {
    replicatedContent += this;
  }
  return replicatedContent;
};
