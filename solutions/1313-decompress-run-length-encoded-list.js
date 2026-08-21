/**
 * Decompress Run Length Encoded List
 * Intuition: Pairs (freq, val) expand to freq copies of val in order.
 * Approach: 1. Walk nums two at a time. 2. Push `currentValue` `currentFrequency` times. 3. Return the expanded array.
 * Dry Run: nums = [1,2,3,4] → one 2 then three 4s → [2,4,4,4].
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
