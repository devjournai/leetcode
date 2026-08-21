/**
 * Counting Elements
 * Intuition: An element counts if x+1 also appears. A set of unique values lets each array entry be checked in constant time.
 * Approach: 1. Insert every arr value into a Set. 2. Scan arr again. 3. For each currentItem, if currentItem+1 is in the set, increment the count. 4. Return the count.
 * Dry Run: arr = [1,2,3]
 *   - set = {1,2,3}
 *   - 1 has 2 -> count=1
 *   - 2 has 3 -> count=2
 *   - 3 has 4? no. Return 2.
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
