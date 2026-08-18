/**
 * Count Prefix And Suffix Pairs I
 * Intuition: Iterate through all unique pairs of words (words[i], words[j]) where i < j. For each pair, directly check if the first word is both a prefix and a suffix of the second word using built-in string methods.
 * Approach: 1. Initialize a counter `totalFoundPairs` to zero. 2. Start an outer loop with `outerWordIndex` iterating from `0` to `words.length - 1`. 3. Inside the outer loop, start an inner loop with `innerWordIndex` iterating from `outerWordIndex + 1` to `words.length - 1`. 4. Obtain `currentPrefixString` as `words[outerWordIndex]` and `currentTargetString` as `words[innerWordIndex]`. 5. Check if `currentTargetString` starts with `currentPrefixString` AND `currentTargetString` ends with `currentPrefixString`. 6. If both conditions are true, increment `totalFoundPairs`. 7. After both loops complete, return `totalFoundPairs`.
 * Dry Run: words = ["a", "aba", "ababa"]
 * totalFoundPairs = 0
 * outerWordIndex = 0, currentPrefixString = "a"
 *   innerWordIndex = 1, currentTargetString = "aba"
 *     "aba".startsWith("a") is true. "aba".endsWith("a") is true.
 *     totalFoundPairs = 1
 *   innerWordIndex = 2, currentTargetString = "ababa"
 *     "ababa".startsWith("a") is true. "ababa".endsWith("a") is true.
 *     totalFoundPairs = 2
 * outerWordIndex = 1, currentPrefixString = "aba"
 *   innerWordIndex = 2, currentTargetString = "ababa"
 *     "ababa".startsWith("aba") is true. "ababa".endsWith("aba") is true.
 *     totalFoundPairs = 3
 * Return 3.
 * Time Complexity: O(N^2 * L)
 * Space Complexity: O(1)
 */
var countPrefixSuffixPairs = function (words) {
  let totalFoundPairs = 0;

  for (
    let outerWordIndex = 0;
    outerWordIndex < words.length;
    outerWordIndex++
  ) {
    for (
      let innerWordIndex = outerWordIndex + 1;
      innerWordIndex < words.length;
      innerWordIndex++
    ) {
      const currentPrefixString = words[outerWordIndex];
      const currentTargetString = words[innerWordIndex];

      if (
        currentTargetString.startsWith(currentPrefixString) &&
        currentTargetString.endsWith(currentPrefixString)
      ) {
        totalFoundPairs++;
      }
    }
  }

  return totalFoundPairs;
};
