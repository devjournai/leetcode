/**
 * Sort Array By Parity II
 * Time Complexity: O(N)
 * Space Complexity: O(1)
 */
var sortArrayByParityII = function (arrayInput) {
  let evenPositionPointer = 0;
  const totalCount = arrayInput.length;
  let oddPositionPointer = 1;

  while (evenPositionPointer < totalCount) {
    if (arrayInput[evenPositionPointer] % 2 !== 0) {
      while (arrayInput[oddPositionPointer] % 2 !== 0) {
        oddPositionPointer += 2;
      }
      let temporaryHolder = arrayInput[evenPositionPointer];
      arrayInput[evenPositionPointer] = arrayInput[oddPositionPointer];
      arrayInput[oddPositionPointer] = temporaryHolder;
    }
    evenPositionPointer += 2;
  }
  return arrayInput;
};
