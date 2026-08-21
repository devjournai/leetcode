/**
 * Single Number II
 * Intuition: Two bitmasks count bits modulo 3: countOnce holds bits seen 1 mod 3, countTwice bits seen 2 mod 3. After three appearances a bit leaves both masks, so the singleton remains in countOnce.
 * Approach: 1. countOnce = countTwice = 0. 2. For each x: nextOnce = (countOnce ^ x) & ~countTwice; nextTwice = (countTwice ^ x) & ~(countOnce ^ x). 3. Assign both. Return countOnce.
 * Dry Run: [2,2,3,2]. After two 2’s, those bits sit in countTwice. Third 2 clears them. 3 sets countOnce to 3.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var singleNumber = function (nums) {
  let countOnce = 0;
  let countTwice = 0;

  for (const currentNumber of nums) {
    const updatedCountOnce = (countOnce ^ currentNumber) & ~countTwice;
    const updatedCountTwice =
      (countTwice ^ currentNumber) & ~(countOnce ^ currentNumber);

    countOnce = updatedCountOnce;
    countTwice = updatedCountTwice;
  }
  return countOnce;
};
