/**
 * Remove Zeros in Decimal Representation
 * Intuition: We start from the lowest digit of n and check each digit one by one. If the digit is not zero, we add it to the result. We also need a variable to keep track of the current digit position in order to correctly construct the final integer.
 * Approach: Specifically, we can use a variable k to represent the current digit position, then check each digit from the lowest to the highest. If the digit is not zero, we multiply it by k and add it to the result, and then multiply k by 10 for the next digit. In the end, we obtain an integer without any zeros. The time complexity is O(d), where d is the number of digits in n. The space complexity is O(1).
 * Dry Run: Input n = 1020030. Output 123.
 * Time Complexity: O(d)
 * Space Complexity: O(1)
 */
var removeZeros = function (n) {
  let k = 1;
  let ans = 0;
  while (n) {
    const x = n % 10;
    if (x) {
      ans = k * x + ans;
      k *= 10;
    }
    n = Math.floor(n / 10);
  }
  return ans;
};
