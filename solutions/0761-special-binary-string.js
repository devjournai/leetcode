/**
 * Special Binary String
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
        iterationIndex,
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
