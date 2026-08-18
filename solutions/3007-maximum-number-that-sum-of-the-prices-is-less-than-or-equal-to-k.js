/**
 * Maximum Number That Sum Of The Prices Is Less Than Or Equal To K
 * Intuition: Price(num) counts bits whose 1-based positions are multiples of x, and the total price up to n is monotone, so binary search the largest n whose accumulated price is at most k. Each bit column contributes a closed-form count of 1s.
 * Approach: 1. Binary search n in [1, 10^15]. 2. To sum prices up to num, increment num so groups line up, then for every bit position i that is a multiple of x add how many 1s appear in that column. 3. A column of width 2^i has 2^{i-1} ones per full group, plus leftover ones in the last partial group.
 * Dry Run: k = 9, x = 1
 *   1. Search mid values; getSumPrices(6) = 9, getSumPrices(7) = 12.
 *   2. The largest feasible number is 6.
 * Time Complexity: O(log 10^15)
 * Space Complexity: O(1)
 */
var findMaximumNumber = function (k, x) {
  const getBitLength = (value) => {
    if (value === 0) return 0;
    return value.toString(2).length;
  };

  const getSumPrices = (num) => {
    let sumPrices = 0;
    let adjustedNum = num + 1;
    for (
      let bitPosition = getBitLength(adjustedNum);
      bitPosition > 0;
      bitPosition--
    ) {
      if (bitPosition % x === 0) {
        const groupSize = 2 ** bitPosition;
        const halfGroupSize = 2 ** (bitPosition - 1);
        sumPrices += Math.floor(adjustedNum / groupSize) * halfGroupSize;
        sumPrices += Math.max(0, (adjustedNum % groupSize) - halfGroupSize);
      }
    }
    return sumPrices;
  };

  let low = 1;
  let high = 1e15;
  while (low < high) {
    const mid = Math.floor((low + high + 1) / 2);
    if (getSumPrices(mid) <= k) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }
  return low;
};
