/**
 * Sort Integers by The Number of 1 Bits
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var sortByBits = function (arr) {
  const calculateSetBits = function (numberValue) {
    let setBitsCount = 0;
    let workingNumber = numberValue;
    while (workingNumber !== 0) {
      workingNumber &= workingNumber - 1;
      setBitsCount++;
    }
    return setBitsCount;
  };

  const customSortFunction = function (firstInt, secondInt) {
    const firstIntBits = calculateSetBits(firstInt);
    const secondIntBits = calculateSetBits(secondInt);

    if (firstIntBits !== secondIntBits) {
      return firstIntBits - secondIntBits;
    } else {
      return firstInt - secondInt;
    }
  };

  return arr.sort(customSortFunction);
};
