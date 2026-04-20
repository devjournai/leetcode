/**
 * Check If N And Its Double Exist
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
