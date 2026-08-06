/**
 * Smallest Divisible Digit Product I
 * Intuition: Given the small constraints (n <= 100, t <= 10), we can efficiently check numbers sequentially starting from 'n'. If a number contains a digit '0', its digit product is '0', which is divisible by any 't >= 1'. Numbers within this range (up to around 110) will often contain a '0' or have a digit product that is a small multiple of 't', making the search space very limited.
 * Approach: 1. Start a loop from `currentNum = n` and increment indefinitely. 2. Inside the loop, calculate the product of digits for `currentNum`. 3. While calculating the product, if any digit is '0', the product immediately becomes '0', and we can stop processing digits for that number (as '0' is divisible by any `t >= 1`). 4. After calculating the product, check if `product % t === 0`. 5. If it is, return `currentNum` because it's the smallest number greater than or equal to `n` that satisfies the condition.
 * Dry Run: n = 15, t = 3
 * currentNum = 15:
 *   Initialize product = 1, temp = 15.
 *   Digit 5: product = 1 * 5 = 5, temp = 1.
 *   Digit 1: product = 5 * 1 = 5, temp = 0.
 *   Loop ends.
 *   Check: 5 % 3 !== 0. Continue.
 * currentNum = 16:
 *   Initialize product = 1, temp = 16.
 *   Digit 6: product = 1 * 6 = 6, temp = 1.
 *   Digit 1: product = 6 * 1 = 6, temp = 0.
 *   Loop ends.
 *   Check: 6 % 3 === 0. Return 16.
 * Time Complexity: O((M - n + 1) * log10(M))
 * Space Complexity: O(1)
 */
var smallestNumber = function (n, t) {
  for (let currentNum = n; ; currentNum++) {
    let product = 1;
    let temp = currentNum;

    while (temp > 0) {
      const digit = temp % 10;
      if (digit === 0) {
        product = 0;
        break;
      }
      product *= digit;
      temp = Math.floor(temp / 10);
    }

    if (product % t === 0) {
      return currentNum;
    }
  }
};
