/**
 * Check If It Is A Good Array
 * Intuition: Bézout’s identity says integer combinations of the numbers include 1 iff gcd of the whole array is 1.
 * Approach: 1. Start currentGcdValue as nums[0]. 2. For each later number, Euclidean-gcd it into currentGcdValue. 3. Return true as soon as gcd becomes 1. 4. After the loop, return whether gcd is 1.
 * Dry Run: nums = [12,5,7,23]
 *   gcd(12,5)=1 -> return true immediately.
 *   nums = [6,10,15]: gcd(6,10)=2, gcd(2,15)=1 -> true.
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
