/**
 * Check If N And Its Double Exist
 * Intuition: Need i≠j with arr[i]=2*arr[j]. Two zeros work. Otherwise a set lookup for 2x or x/2.
 * Approach: 1. Count zeros and store nonzero values in a set. 2. Two or more zeros → true. 3. For each nonzero, if 2x or (even and x/2) is in the set, true. 4. Else false.
 * Dry Run: arr = [10,2,5,3]. 5 and 10 → true. arr = [7,1,14,11] → true via 7 and 14.
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
var checkIfExist = function (arr) {
  const uniqueElements = new Set();
  let numberOfZeros = 0;

  for (const currentNumber of arr) {
    if (currentNumber === 0) {
      numberOfZeros++;
    } else {
      uniqueElements.add(currentNumber);
    }
  }

  if (numberOfZeros >= 2) {
    return true;
  }

  for (const itemValue of arr) {
    if (itemValue === 0) {
      continue;
    }

    const targetMultiple = itemValue * 2;
    if (uniqueElements.has(targetMultiple)) {
      return true;
    }

    if (itemValue % 2 === 0) {
      const targetDivisor = itemValue / 2;
      if (uniqueElements.has(targetDivisor)) {
        return true;
      }
    }
  }

  return false;
};
