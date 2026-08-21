/**
 * Number Of Same End Substrings
 * Intuition: Precompute prefix sums of character frequencies to quickly determine character counts within any substring. For each character, if it appears 'k' times in a substring, it contributes k * (k + 1) / 2 same-end substrings (by choosing any two occurrences as start/end, or a single occurrence as start=end).
 * Approach: 1. Initialize a 2D array `allPrefixCounts` (26 rows for characters, N+1 columns for prefix sums up to index N). 2. Populate `allPrefixCounts` by iterating through the string `s`, incrementing the count for the current character at `currentStringIndex + 1` based on the previous index's count, and copying previous counts for other characters. 3. Initialize an empty array `queryResults`. 4. For each `currentQuery = [queryLeftBoundary, queryRightBoundary]` in `queries`: a. Initialize `querySubstringsTotal = 0`. b. Iterate through all 26 possible character types (0 to 25): i. Calculate `charTypeFrequency` within `s[queryLeftBoundary..queryRightBoundary]` using `allPrefixCounts`. ii. Add `charTypeFrequency * (charTypeFrequency + 1) / 2` to `querySubstringsTotal`. c. Push `querySubstringsTotal` to `queryResults`. 5. Return `queryResults`.
 * Dry Run: s = "aba", queries = [[0,2]]
 *   1. stringLength = 3.
 *   2. allPrefixCounts initialized as 26x4 zero matrix.
 *   3. Populate allPrefixCounts:
 *      - currentStringIndex=0 ('a'): allPrefixCounts[0][1]=1. Others 0.
 *      - currentStringIndex=1 ('b'): allPrefixCounts[0][2]=1, allPrefixCounts[1][2]=1. Others 0.
 *      - currentStringIndex=2 ('a'): allPrefixCounts[0][3]=2, allPrefixCounts[1][3]=1. Others 0.
 *      (e.g., allPrefixCounts['a'] becomes [0,1,1,2], allPrefixCounts['b'] becomes [0,0,1,1])
 *   4. queryResults = [].
 *   5. Process query [0,2]:
 *      - queryLeftBoundary = 0, queryRightBoundary = 2.
 *      - querySubstringsTotal = 0.
 *      - charTypeIterator = 0 ('a'):
 *        - charTypeFrequency = allPrefixCounts[0][3] - allPrefixCounts[0][0] = 2 - 0 = 2.
 *        - querySubstringsTotal += 2 * (2+1) / 2 = 3. (Substrings: "a"(s[0]), "a"(s[2]), "aba"(s[0..2]))
 *      - charTypeIterator = 1 ('b'):
 *        - charTypeFrequency = allPrefixCounts[1][3] - allPrefixCounts[1][0] = 1 - 0 = 1.
 *        - querySubstringsTotal += 1 * (1+1) / 2 = 1. (Substring: "b"(s[1]))
 *      - Remaining charTypeIterator (2 to 25): charTypeFrequency = 0, adds 0.
 *      - querySubstringsTotal = 3 + 1 = 4.
 *      - queryResults.push(4).
 *   6. Return [4].
 * Time Complexity: O(N + M)
 * Space Complexity: O(N + M)
 */
var sameEndSubstringCount = function (s, queries) {
  const stringLength = s.length;
  const allPrefixCounts = new Array(26)
    .fill(null)
    .map(() => new Array(stringLength + 1).fill(0));

  for (
    let currentStringIndex = 0;
    currentStringIndex < stringLength;
    currentStringIndex++
  ) {
    const characterAsciiOffset = s.charCodeAt(currentStringIndex) - 97;

    for (
      let alphabetLoopIndex = 0;
      alphabetLoopIndex < 26;
      alphabetLoopIndex++
    ) {
      allPrefixCounts[alphabetLoopIndex][currentStringIndex + 1] =
        allPrefixCounts[alphabetLoopIndex][currentStringIndex];
    }
    allPrefixCounts[characterAsciiOffset][currentStringIndex + 1]++;
  }

  const queryResults = [];

  for (const currentQuery of queries) {
    const queryLeftBoundary = currentQuery[0];
    const queryRightBoundary = currentQuery[1];
    let querySubstringsTotal = 0;

    for (let charTypeIterator = 0; charTypeIterator < 26; charTypeIterator++) {
      const charTypeFrequency =
        allPrefixCounts[charTypeIterator][queryRightBoundary + 1] -
        allPrefixCounts[charTypeIterator][queryLeftBoundary];
      querySubstringsTotal += Math.floor(
        (charTypeFrequency * (charTypeFrequency + 1)) / 2
      );
    }
    queryResults.push(querySubstringsTotal);
  }

  return queryResults;
};
