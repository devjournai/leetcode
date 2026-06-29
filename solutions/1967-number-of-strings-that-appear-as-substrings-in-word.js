/**
 * Number of Strings That Appear as Substrings in Word
 * Intuition: The problem requires identifying and counting how many given pattern strings exist as contiguous subsequences within a larger target string. This directly translates to iterating through each pattern and using a built-in substring check.
 * Approach: 1. Initialize a counter variable to zero to keep track of the number of matching patterns. 2. Determine the total number of patterns in the input array. 3. Iterate through the `patterns` array from the first element to the last using a standard `for` loop and an index. 4. For each `currentPatternToEvaluate` obtained at the current `patternIndex`, use the `word.includes()` method to determine if `currentPatternToEvaluate` is a substring of `word`. 5. If `word.includes(currentPatternToEvaluate)` returns true, increment the `matchingStringsCount`. 6. After checking all patterns in the array, return the final `matchingStringsCount` value.
 * Dry Run: patterns = ["a","abc","bc","d"], word = "abc"
 * 1. `matchingStringsCount = 0`
 * 2. `patternArrayLength = 4`
 * 3. `patternIndex = 0`, `currentPatternToEvaluate = "a"`. `word.includes("a")` is true. `matchingStringsCount` becomes `1`.
 * 4. `patternIndex = 1`, `currentPatternToEvaluate = "abc"`. `word.includes("abc")` is true. `matchingStringsCount` becomes `2`.
 * 5. `patternIndex = 2`, `currentPatternToEvaluate = "bc"`. `word.includes("bc")` is true. `matchingStringsCount` becomes `3`.
 * 6. `patternIndex = 3`, `currentPatternToEvaluate = "d"`. `word.includes("d")` is false. `matchingStringsCount` remains `3`.
 * 7. Loop finishes as `patternIndex` reaches `patternArrayLength`.
 * 8. Return `matchingStringsCount` which is `3`.
 * Time Complexity: O(P * W * M)
 * Space Complexity: O(1)
 */
var numOfStrings = function (patterns, word) {
  let matchingStringsCount = 0;
  let patternArrayLength = patterns.length;

  for (
    let patternIndex = 0;
    patternIndex < patternArrayLength;
    patternIndex++
  ) {
    let currentPatternToEvaluate = patterns[patternIndex];
    if (word.includes(currentPatternToEvaluate)) {
      matchingStringsCount++;
    }
  }

  return matchingStringsCount;
};
