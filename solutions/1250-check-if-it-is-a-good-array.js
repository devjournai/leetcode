/**
 * Check If It Is A Good Array
 * Time Complexity: O(N * log M)
 * Space Complexity: O(1)
 */
var isGoodArray = function (nums) {
  let currentGcdValue = nums[0];

  for (let elementIndex = 1; elementIndex < nums.length; elementIndex++) {
    let nextNumberToProcess = nums[elementIndex];

    let operandOne = currentGcdValue;
    let operandTwo = nextNumberToProcess;

    while (operandTwo !== 0) {
      let temporaryRemainder = operandOne % operandTwo;
      operandOne = operandTwo;
      operandTwo = temporaryRemainder;
    }
    currentGcdValue = operandOne;
    if (currentGcdValue === 1) {
      return true;
    }
  }

  return currentGcdValue === 1;
};
