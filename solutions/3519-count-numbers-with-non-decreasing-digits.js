/**
 * Count Numbers with Non-Decreasing Digits
 * Intuition: Convert L and R to base b, then digit-DP count non-decreasing base-b numbers up to a bound; answer is count(R) - count(L-1).
 * Approach: 1. Decrement L as a decimal string, convert bounds to base-b digit arrays, pad to the same length. 2. DP on position, last digit, tight flag. 3. Next digit must be ≥ lastDigit and ≤ the bound digit when tight.
 * Dry Run: l = "1", r = "11", b = 10. Count non-decreasing values in 1..11 (1-9, 11) → 10.
 * Time Complexity: O(N * B^2 + N^3)
 * Space Complexity: O(N * B^2)
 */
var countNumbers = function (l, r, b) {
  const MOD = 1000000007;

  const decrement = (s) => {
    const arr = s.split("");
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] > "0") {
        arr[i] = String(arr[i].charCodeAt(0) - 1);
        break;
      }
      arr[i] = "9";
    }
    if (arr[0] === "0" && arr.length > 1) {
      return arr.join("").replace(/^0+/, "") || "0";
    }
    return arr.join("");
  };

  const convertToBaseB = (numStr, base) => {
    const currentNum = [0];
    for (const c of numStr) {
      const d = c.charCodeAt(0) - 48;
      let carry = 0;
      for (let i = 0; i < currentNum.length; i++) {
        const product = currentNum[i] * 10 + carry;
        currentNum[i] = product % base;
        carry = Math.floor(product / base);
      }
      while (carry > 0) {
        currentNum.push(carry % base);
        carry = Math.floor(carry / base);
      }
      carry = d;
      for (let i = 0; i < currentNum.length && carry; i++) {
        const sum = currentNum[i] + carry;
        currentNum[i] = sum % base;
        carry = Math.floor(sum / base);
      }
      while (carry > 0) {
        currentNum.push(carry % base);
        carry = Math.floor(carry / base);
      }
    }
    const digits = [];
    for (let i = currentNum.length - 1; i >= 0; i--) digits.push(currentNum[i]);
    if (!digits.length) digits.push(0);
    return digits;
  };

  const padToSameLength = (a, target) => {
    while (a.length < target.length) a.unshift(0);
  };

  const countWithMem = (digits) => {
    const memo = Array.from({ length: digits.length }, () =>
      Array.from({ length: 2 }, () => new Array(b).fill(-1))
    );
    const count = (pos, lastDigit, tight) => {
      if (pos === digits.length) return 1;
      const tightIndex = tight ? 1 : 0;
      if (memo[pos][tightIndex][lastDigit] !== -1) {
        return memo[pos][tightIndex][lastDigit];
      }
      let res = 0;
      const limit = tight ? digits[pos] : b - 1;
      for (let d = lastDigit; d <= limit; d++) {
        res = (res + count(pos + 1, d, tight && d === limit)) % MOD;
      }
      memo[pos][tightIndex][lastDigit] = res;
      return res;
    };
    return count(0, 0, true);
  };

  const rDigits = convertToBaseB(r, b);
  const lMinus1Digits = convertToBaseB(decrement(l), b);
  padToSameLength(lMinus1Digits, rDigits);
  return (countWithMem(rDigits) - countWithMem(lMinus1Digits) + MOD) % MOD;
};
