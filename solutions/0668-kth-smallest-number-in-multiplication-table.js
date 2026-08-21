/**
 * Kth Smallest Number In Multiplication Table
 * Intuition: Binary-search the value x; count how many table entries are ≤ x by summing min(floor(x/row), n) per row. The smallest x with count ≥ k is the k-th.
 * Approach: 1. Search `[1, m*n]`. 2. Mid: `calculateOccurrences`. 3. If count < k, searchStart = mid+1 else searchEnd = mid. 4. Return searchStart.
 * Dry Run: m=3, n=3, k=5.
 *   - Mid 5: rows contribute 3+2+1=6 ≥5 → hi=5. Mid 3: 3+1+1=5 ≥5 → hi=3. Mid 2: 2+1+0=3 <5 → lo=3. Return 3.
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
        maxCols
      );
      totalItemsCovered += availableInRow;
    }
    return totalItemsCovered;
  }
};
