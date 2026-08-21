/**
 * Sort Array By Parity II
 * Intuition: Even indices must hold even values. Walk even slots; when one is odd, find the next odd-index that holds an even value and swap.
 * Approach: 1. evenPositionPointer=0, oddPositionPointer=1. 2. While even index in range: if A[even] is odd, advance odd by 2 until A[odd] is even, then swap. 3. even += 2. Return the array.
 * Dry Run: [4,2,5,7]. 4 even ok. Next even index 2 is 5: odd pointer at 1 is 2 (even) → swap → [4,5,2,7].
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
