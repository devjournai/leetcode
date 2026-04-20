/**
 * Decompress Run Length Encoded List
 * Time Complexity: O(M)
 * Space Complexity: O(M)
 */
var decompressRLElist = function (nums) {
  let decompressedResult = [];
  let processingPointer = 0;

  while (processingPointer < nums.length) {
    let currentFrequency = nums[processingPointer];
    let currentValue = nums[processingPointer + 1];

    let elementRepeater = 0;
    while (elementRepeater < currentFrequency) {
      decompressedResult.push(currentValue);
      elementRepeater++;
    }
    processingPointer += 2;
  }

  return decompressedResult;
};
