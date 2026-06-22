/**
 * Smallest Even Multiple
 * Intuition: The problem asks for the Least Common Multiple (LCM) of 2 and n. The LCM of two positive integers 'a' and 'b' can be found using the formula: LCM(a, b) = (a * b) / GCD(a, b), where GCD is the Greatest Common Divisor. In this case, 'a' is 2 and 'b' is n.
 * Approach: 1. Determine if the input integer 'n' is even or odd. This can be efficiently done using a bitwise AND operation: (n & 1) will be 0 if n is even, and 1 if n is odd. 2. If 'n' is even, it means 'n' is already a multiple of 2. Therefore, the smallest positive integer that is a multiple of both 2 and 'n' is 'n' itself (since GCD(2, n) = 2, then LCM(2, n) = (2 * n) / 2 = n). 3. If 'n' is odd, it is not a multiple of 2. To find the smallest common multiple, we must multiply 'n' by 2. This product (2 * n) will be even and also a multiple of 'n' (since GCD(2, n) = 1, then LCM(2, n) = (2 * n) / 1 = 2 * n). 4. Implement this logic using an if-else statement.
 * Dry Run: Input: n = 5. The expression (n & 1) evaluates to (5 & 1) which is 1. The condition (1 === 0) is false. The code enters the else block. A new variable 'doubledValue' is assigned 2 * n (2 * 5 = 10). The function returns 10.
 * Input: n = 6. The expression (n & 1) evaluates to (6 & 1) which is 0. The condition (0 === 0) is true. The code enters the if block. The function returns n, which is 6.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var smallestEvenMultiple = function (n) {
  if ((n & 1) === 0) {
    return n;
  } else {
    let doubledValue = 2 * n;
    return doubledValue;
  }
};
