/**
 * First Missing Positive
 * Time Complexity: O(n)
 * Space Complexity: O(1)
*/
var firstMissingPositive = function (nums) {
  let placementIterator = 0;
  const arrayLengthVal = nums.length;

  while (placementIterator < arrayLengthVal) {
    const currentNumber = nums[placementIterator];
    const correctPosition = currentNumber - 1;

    if (
      currentNumber > 0 &&
      currentNumber <= arrayLengthVal &&
      nums[correctPosition] !== currentNumber
    ) {
      const temporaryStore = nums[correctPosition];
      nums[correctPosition] = currentNumber;
      nums[placementIterator] = temporaryStore;
    } else {
      placementIterator++;
    }
  }

  for (let searchIterator = 0; searchIterator < arrayLengthVal; searchIterator++) {
    const expectedValue = searchIterator + 1;
    const actualValue = nums[searchIterator];
    if (actualValue !== expectedValue) {
      return expectedValue;
    }
  }

  return arrayLengthVal + 1;
};