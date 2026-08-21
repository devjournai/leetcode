/**
 * Hexadecimal and Hexatrigesimal Conversion
 * Intuition: n^2 in base 16 concatenated with n^3 in base 36 uses the same remainder-division conversion, mapping 10–35 to A–Z.
 * Approach: 1. Convert by repeated x % k, prepend the digit, then divide. 2. Digits are 0-9 then A-Z. 3. Return toBase(n^2, 16) + toBase(n^3, 36).
 * Dry Run: n = 13 → 169 base 16 is "A9", 2197 base 36 is "1P1", concat "A91P1".
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
var concatHex36 = function (n) {
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const toBase = (value, base) => {
    let result = "";
    let remaining = value;

    while (remaining > 0) {
      result = digits[remaining % base] + result;
      remaining = Math.floor(remaining / base);
    }

    return result;
  };

  return toBase(n * n, 16) + toBase(n * n * n, 36);
};
