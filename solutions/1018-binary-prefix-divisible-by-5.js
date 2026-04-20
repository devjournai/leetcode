/**
 * Binary Prefix Divisible By 5
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var prefixesDivBy5 = function (nums) {
  let currentPrefixModulus = 0;
  const inputLength = nums.length;
  const divisibilityFlags = new Array(inputLength);

  for (let loopIndex = 0; loopIndex < inputLength; loopIndex++) {
    currentPrefixModulus = (currentPrefixModulus * 2 + nums[loopIndex]) % 5;
    divisibilityFlags[loopIndex] = currentPrefixModulus === 0;
  }

  return divisibilityFlags;
};
