/**
 * Sort Integers by The Number of 1 Bits
 * Intuition: Primary key is popcount, secondary is numeric value.
 * Approach: 1. Count set bits with n&=n-1. 2. Sort by bit count then value. 3. Return the sorted array.
 * Dry Run: arr = [0,1,2,3,4,5,6,7,8]. Groups by bits: 0; 1,2,4,8; 3,5,6; 7.
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
