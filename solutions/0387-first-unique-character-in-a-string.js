/**
 * First Unique Character In A String
 * Intuition: The first unique character is the leftmost index whose frequency is exactly 1, so count every character then scan the string once more.
 * Approach: 1. Tally frequencies into an object. 2. Scan again and return the first index whose count is 1. 3. Return -1 if none.
 * Dry Run: s = "leetcode". Counts l:1,e:3,t:1,c:1,o:1,d:1; first index with count 1 is 0 ('l').
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var firstUniqChar = function (s) {
  const charFrequencies = {};
  const stringLength = s.length;

  let initialScanIndex = 0;
  for (; initialScanIndex < stringLength; initialScanIndex++) {
    const currentSymbol = s[initialScanIndex];
    charFrequencies[currentSymbol] = (charFrequencies[currentSymbol] || 0) + 1;
  }

  let finalCheckIndex = 0;
  for (; finalCheckIndex < stringLength; finalCheckIndex++) {
    const symbolToEvaluate = s[finalCheckIndex];
    const symbolCount = charFrequencies[symbolToEvaluate];
    if (symbolCount === 1) {
      return finalCheckIndex;
    }
  }

  return -1;
};
