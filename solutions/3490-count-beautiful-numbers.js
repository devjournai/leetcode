/**
 * Count Beautiful Numbers
 * Intuition: A number is beautiful if the product of its digits is divisible by their sum. Digit DP counts numbers <= a bound by building digits left to right, tracking tightness, leading zeros, whether a zero digit appeared, digit-sum, and product.
 * Approach: 1. Answer is count(r) - count(l-1). 2. DP state (index, tight, leadingZero, hasZero, sum, prod). 3. At the end, reject empty numbers; accept if hasZero or prod % sum == 0. 4. If a non-leading zero already appeared and the prefix is not tight, the remaining digits are free: 10^(len-i). 5. Memoize states.
 * Dry Run: l = 1, r = 10.
 *   - 1..9: product equals the digit, sum equals the digit → all beautiful.
 *   - 10: product 0, sum 1 → 0 % 1 == 0. Count 10.
 * Time Complexity: O(D^4) with D = number of digits of r
 * Space Complexity: O(states)
 */
var beautifulNumbers = function (l, r) {
  const countUpTo = (limit) => {
    if (limit < 0) {
      return 0;
    }
    const digits = String(limit);
    const memo = new Map();

    const hashState = (i, tight, isLeadingZero, hasZero, sum, prod) =>
      `${i}_${tight ? 1 : 0}_${isLeadingZero ? 1 : 0}_${hasZero ? 1 : 0}_${sum}_${prod}`;

    const count = (i, tight, isLeadingZero, hasZero, sum, prod) => {
      if (i === digits.length) {
        if (isLeadingZero) {
          return 0;
        }
        return hasZero || prod % sum === 0 ? 1 : 0;
      }

      const key = hashState(i, tight, isLeadingZero, hasZero, sum, prod);
      if (!isLeadingZero && hasZero && !tight) {
        return 10 ** (digits.length - i);
      }
      if (memo.has(key)) {
        return memo.get(key);
      }

      let result = 0;
      const maxDigit = tight ? digits.charCodeAt(i) - 48 : 9;

      for (let d = 0; d <= maxDigit; d++) {
        const nextTight = tight && d === maxDigit;
        const nextIsLeadingZero = isLeadingZero && d === 0;
        const nextHasZero = hasZero || (!nextIsLeadingZero && d === 0);
        const nextProd = nextIsLeadingZero ? 1 : prod * d;
        result += count(
          i + 1,
          nextTight,
          nextIsLeadingZero,
          nextHasZero,
          sum + d,
          nextProd
        );
      }

      memo.set(key, result);
      return result;
    };

    return count(0, true, true, false, 0, 1);
  };

  return countUpTo(r) - countUpTo(l - 1);
};
