/**
 * Special Binary String
 * Intuition: A special binary string is a correctly matched 1/0 string (like balanced parentheses). Split into special components, recursively enlarge each interior, then sort those components lexicographically descending and concatenate.
 * Approach: 1. If `s` is empty or length 2, return it. 2. Walk with `currentBalanceTracker` (+1 for `'1'`, -1 for `'0'`). 3. When balance hits 0, the slice between `currentSegmentBegin+1` and `iterationIndex` is the interior; recurse and wrap as `"1" + interior + "0"`. 4. Sort `foundSubStrings` with `localeCompare` descending and `join("")`.
 * Dry Run: s = "11011000".
 *   - First special: indices 0–7 is one component with interior "101100" → recurse.
 *   - Interior splits into "10" and "1100" → recurse "10" stays; "1100" interior "10" → "1100".
 *   - Sort "1100","10" → "110010". Wrap: "11100100".
 * Time Complexity: O(N^2)
 * Space Complexity: O(N)
 */
var makeLargestSpecial = function (s) {
  if (!s.length || s.length === 2) {
    return s;
  }

  let currentBalanceTracker = 0;
  let currentSegmentBegin = 0;
  const foundSubStrings = [];

  let iterationIndex = 0;
  while (iterationIndex < s.length) {
    currentBalanceTracker += s[iterationIndex] === "1" ? 1 : -1;

    if (!currentBalanceTracker) {
      const extractedInnerString = s.substring(
        currentSegmentBegin + 1,
        iterationIndex
      );
      const recursivelyProcessed = makeLargestSpecial(extractedInnerString);
      foundSubStrings.push("1" + recursivelyProcessed + "0");
      currentSegmentBegin = iterationIndex + 1;
    }
    iterationIndex++;
  }

  return foundSubStrings
    .sort((stringA, stringB) => stringB.localeCompare(stringA))
    .join("");
};
