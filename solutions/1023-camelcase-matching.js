/**
 * Camelcase Matching
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
    checkMatch(queryItem, pattern),
  );
  return matchingResults;
};
