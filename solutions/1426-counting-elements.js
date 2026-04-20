/**
 * Counting Elements
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var countElements = function (arr) {
  const uniqueValuesContainer = new Set();
  for (const element of arr) {
    uniqueValuesContainer.add(element);
  }

  let finalCount = 0;
  for (const currentItem of arr) {
    const nextInteger = currentItem + 1;
    if (uniqueValuesContainer.has(nextInteger)) {
      finalCount++;
    }
  }

  return finalCount;
};
