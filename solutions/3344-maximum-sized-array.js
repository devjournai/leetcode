/**
 * Maximum Sized Array
 * Intuition: The 3D array contribution is sum_{i,j,k < n} i * (j OR k) = (n(n-1)/2) * sum(j OR k). sum(j OR k) is computed bit-wise: count pairs where bit i is set in j|k. Binary search the largest n whose formula is <= s.
 * Approach: 1. If s == 0 return 1. 2. Binary search n in [0, 1196]. 3. Count numbers in [0, n) with bit i set via groups of size 2^(i+1). 4. pairsWithBit = n^2 - (n - bitCount)^2.
 * Dry Run: s = 0 -> n = 1. s large enough for n = 2: arithmeticSum=1, orSum of j,k in {0,1} is 0|0 + 0|1 + 1|0 + 1|1 = 3, product 3.
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */

var maxSizedArray = function (s) {
  if (s === 0) {
    return 1;
  }

  let left = 0;
  let right = 1196;

  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);
    if (getArraySum(mid) <= s) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

function getNumbersWithBitSet(n, bit) {
  const groupSize = 1 << (bit + 1);
  const halfGroupSize = 1 << bit;
  const fullGroups = Math.floor(n / groupSize);
  const remaining = Math.max(0, (n % groupSize) - halfGroupSize);
  return fullGroups * halfGroupSize + remaining;
}

function getArraySum(n) {
  const arithmeticSum = (n * (n - 1)) / 2;
  let orSum = 0;
  const bits = n === 0 ? 0 : 32 - Math.clz32(n);
  for (let bit = 0; bit < bits; bit++) {
    const numbersWithoutBit = n - getNumbersWithBitSet(n, bit);
    const pairsWithBit = n * n - numbersWithoutBit * numbersWithoutBit;
    orSum += pairsWithBit * (1 << bit);
  }
  return arithmeticSum * orSum;
}
