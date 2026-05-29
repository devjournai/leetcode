/**
 * Divide A String Into Groups Of Size K
 * Intuition: Pad the input string to an exact multiple of k length, then repeatedly slice groups of k characters.
 * Approach: 1. Determine the number of fill characters needed to make the string's length a multiple of `k`. 2. Construct a new string by appending the required number of `fill` characters to the original string. 3. Iterate through this padded string, extracting substrings of length `k` and adding them to a result array.
 * Dry Run: s = "abc", k = 4, fill = "x"
 *   1. originalStringLength = 3
 *   2. charactersRemaining = 3 % 4 = 3
 *   3. paddingNeeded = (4 - 3) % 4 = 1 % 4 = 1
 *   4. filledUpString = "abc" + "x".repeat(1) = "abcx"
 *   5. resultGroups = []
 *   6. stringForIterationLength = 4
 *   7. Loop (startIndex = 0):
 *      - slicedSegment = filledUpString.slice(0, 4) = "abcx"
 *      - resultGroups.push("abcx") -> ["abcx"]
 *   8. Loop terminates as startIndex (4) is no longer less than stringForIterationLength (4).
 *   9. Returns ["abcx"].
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var divideString = function (s, k, fill) {
  const originalStringLength = s.length;
  const charactersRemaining = originalStringLength % k;
  const paddingNeeded = (k - charactersRemaining) % k;

  const filledUpString = s + fill.repeat(paddingNeeded);
  const resultGroups = [];
  const stringForIterationLength = filledUpString.length;

  for (
    let startIndex = 0;
    startIndex < stringForIterationLength;
    startIndex += k
  ) {
    const slicedSegment = filledUpString.slice(startIndex, startIndex + k);
    resultGroups.push(slicedSegment);
  }

  return resultGroups;
};
