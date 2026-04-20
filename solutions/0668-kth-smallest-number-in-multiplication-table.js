/**
 * Kth Smallest Number In Multiplication Table
 * Time Complexity: O(m * log(m*n))
 * Space Complexity: O(1)
 */
var findKthNumber = function (m, n, k) {
  let searchStart = 1;
  let searchEnd = m * n;

  while (searchStart < searchEnd) {
    const midValue = Math.floor((searchStart + searchEnd) / 2);
    const currentCount = calculateOccurrences(midValue, m, n);

    if (currentCount < k) {
      searchStart = midValue + 1;
    } else {
      searchEnd = midValue;
    }
  }

  return searchStart;

  function calculateOccurrences(valueToCheck, maxRows, maxCols) {
    let totalItemsCovered = 0;
    for (let rowIterator = 1; rowIterator <= maxRows; rowIterator++) {
      const availableInRow = Math.min(
        Math.floor(valueToCheck / rowIterator),
        maxCols,
      );
      totalItemsCovered += availableInRow;
    }
    return totalItemsCovered;
  }
};
