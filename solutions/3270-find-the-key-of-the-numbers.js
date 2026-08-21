/**
 * Find the Key of the Numbers
 * Intuition: The key is the number formed by the digit-wise minimum of the three 4-digit zero-padded inputs.
 * Approach: 1. Pad each number to 4 digits. 2. At every position take min(d1, d2, d3). 3. Parse the resulting string as an integer.
 * Dry Run:
 *   num1 = 1, num2 = 10, num3 = 1000 -> "0001", "0010", "1000" -> "0000" -> 0.
 *   987, 879, 798 -> 879.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
var generateKey = function (num1, num2, num3) {
  const s1 = String(num1).padStart(4, "0");
  const s2 = String(num2).padStart(4, "0");
  const s3 = String(num3).padStart(4, "0");
  let ans = "";

  for (let i = 0; i < 4; i++) {
    ans += String.fromCharCode(
      Math.min(s1.charCodeAt(i), s2.charCodeAt(i), s3.charCodeAt(i))
    );
  }

  return Number(ans);
};
