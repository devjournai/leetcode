/**
 * Camelcase Matching
 * Intuition: Pattern letters must appear in order. Extra lowercase letters in the query are fine; extra uppercase letters are not.
 * Approach: 1. Two pointers over query and pattern. 2. On match, advance both. 3. On mismatch, reject if the query char is uppercase; else skip it. 4. Query matches iff the pattern is fully consumed.
 * Dry Run: query "FooBar", pattern "FB".
 *   - F matches F, o/o skipped, B matches B, a/r skipped. Pattern done -> true.
 * Time Complexity: O(N * Lq_max)
 * Space Complexity: O(N)
 */
var camelMatch = function (queries, pattern) {
  const checkMatch = (currentQuery, targetPattern) => {
    let currentQueryPointer = 0;
    let targetPatternPointer = 0;

    while (currentQueryPointer < currentQuery.length) {
      if (
        targetPatternPointer < targetPattern.length &&
        currentQuery[currentQueryPointer] ===
          targetPattern[targetPatternPointer]
      ) {
        currentQueryPointer++;
        targetPatternPointer++;
      } else {
        const queryCharacterCode = currentQuery.charCodeAt(currentQueryPointer);
        if (queryCharacterCode >= 65 && queryCharacterCode <= 90) {
          // ASCII values for 'A' to 'Z'
          return false;
        }
        currentQueryPointer++;
      }
    }

    return targetPatternPointer === targetPattern.length;
  };

  const matchingResults = queries.map((queryItem) =>
    checkMatch(queryItem, pattern)
  );
  return matchingResults;
};
