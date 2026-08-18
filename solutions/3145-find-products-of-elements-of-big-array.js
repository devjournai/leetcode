/**
 * Find Products of Elements of Big Array
 * Intuition: big_nums concatenates the powers (bit positions) of 1, 2, 3, ... The product of a range is 2 raised to the sum of those powers. Prefix sums of bit counts and of bit-position totals up to x can be computed with binary-digit DP, then binary search which number contains the k-th power.
 * Approach: 1. For each query [from, to, mod], compute exponent = sumPowers(to + 1) - sumPowers(from). 2. sumPowers(k) finds the number whose cumulative bit count reaches k, adds all powers of earlier numbers, then the remaining bits of that number. 3. Return 2^exponent mod mod.
 * Dry Run: queries = [[1, 3, 7]]
 * - Powers in big_nums at indices 1..3 sum to exponent 2, so 2^2 % 7 = 4
 * Time Complexity: O(q log^2 max(to))
 * Space Complexity: O(q)
 */
var findProductsOfElements = function (queries) {
  const bitLength = (x) => {
    if (x === 0n) {
      return 0;
    }
    return x.toString(2).length;
  };

  const sumBitsTill = (x) => {
    let sumBits = 0n;
    for (let powerOfTwo = 1n; powerOfTwo <= x; powerOfTwo *= 2n) {
      const cycle = 2n * powerOfTwo;
      sumBits += (x / cycle) * powerOfTwo;
      const rem = (x % cycle) + 1n - powerOfTwo;
      if (rem > 0n) {
        sumBits += rem;
      }
    }
    return sumBits;
  };

  const sumPowersTill = (x) => {
    let sumPowers = 0n;
    let powerOfTwo = 1n;
    const length = bitLength(x);
    for (let power = 0; power < length; power++) {
      const cycle = 2n * powerOfTwo;
      sumPowers += (x / cycle) * powerOfTwo * BigInt(power);
      const rem = (x % cycle) + 1n - powerOfTwo;
      if (rem > 0n) {
        sumPowers += rem * BigInt(power);
      }
      powerOfTwo *= 2n;
    }
    return sumPowers;
  };

  const firstNumberHavingSumBitsTillGreaterThan = (k) => {
    let left = 1n;
    let right = k;
    while (left < right) {
      const mid = (left + right) / 2n;
      if (sumBitsTill(mid) < k) {
        left = mid + 1n;
      } else {
        right = mid;
      }
    }
    return left;
  };

  const sumPowersFirstKBigNums = (k) => {
    if (k === 0n) {
      return 0n;
    }
    const num = firstNumberHavingSumBitsTillGreaterThan(k);
    let sumPowers = sumPowersTill(num - 1n);
    let remainingCount = k - sumBitsTill(num - 1n);
    const length = bitLength(num);
    for (let power = 0; power < length; power++) {
      if (((num >> BigInt(power)) & 1n) === 1n) {
        sumPowers += BigInt(power);
        remainingCount--;
        if (remainingCount === 0n) {
          break;
        }
      }
    }
    return sumPowers;
  };

  const modPow = (base, exp, mod) => {
    if (mod === 1n) {
      return 0n;
    }
    let result = 1n;
    let b = base % mod;
    let e = exp;
    while (e > 0n) {
      if (e % 2n === 1n) {
        result = (result * b) % mod;
      }
      b = (b * b) % mod;
      e /= 2n;
    }
    return result;
  };

  return queries.map(([from, to, mod]) => {
    const exponent =
      sumPowersFirstKBigNums(BigInt(to) + 1n) -
      sumPowersFirstKBigNums(BigInt(from));
    return Number(modPow(2n, exponent, BigInt(mod)));
  });
};
