/**
 * Binary Prefix Divisible By 5
 * Intuition: Track the running number modulo 5: each new bit doubles the previous remainder then adds 0 or 1.
 * Approach: 1. Start remainder 0. 2. For each bit, remainder = (remainder*2 + bit) % 5. 3. Record whether remainder is 0.
 * Dry Run: nums = [0,1,1].
 *   - 0 -> rem 0 true. 1 -> rem 1 false. 1 -> rem 3 false. [true,false,false].
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
