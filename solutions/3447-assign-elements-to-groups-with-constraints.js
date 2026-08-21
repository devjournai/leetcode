/**
 * Assign Elements to Groups with Constraints
 * Intuition: Group g can take the smallest-index element that divides g. Check divisors up to sqrt(g) against the first index of each element value.
 * Approach: 1. Map each element value to its earliest index. 2. For every group, scan divisors i and g/i and take the minimum known index. 3. Use -1 when no divisor is present.
 * Dry Run: groups = [8,4], elements = [4,2]. 8's divisors include 4 (index 0) and 2 (index 1) → 0. 4 matches 4 at 0.
 * Time Complexity: O(N * sqrt(MAX))
 * Space Complexity: O(N)
 */

var assignElements = function (groups, elements) {
  const elementToMinIndex = new Map();
  for (let index = 0; index < elements.length; index++) {
    if (!elementToMinIndex.has(elements[index])) {
      elementToMinIndex.set(elements[index], index);
    }
  }

  const minIndexFor = (num) => {
    let best = Infinity;
    for (let divisor = 1; divisor * divisor <= num; divisor++) {
      if (num % divisor !== 0) {
        continue;
      }
      if (elementToMinIndex.has(divisor)) {
        best = Math.min(best, elementToMinIndex.get(divisor));
      }
      const pair = num / divisor;
      if (pair !== divisor && elementToMinIndex.has(pair)) {
        best = Math.min(best, elementToMinIndex.get(pair));
      }
    }
    return best === Infinity ? -1 : best;
  };

  return groups.map(minIndexFor);
};
