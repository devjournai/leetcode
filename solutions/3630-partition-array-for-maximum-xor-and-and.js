/**
 * Partition Array for Maximum XOR and AND
 * Intuition: XOR(A)+XOR(C) given a fixed B equals XOR(rest)+2*maxXOR-subset of (rest masked by bits off in XOR(rest)). Enumerate B's mask (n≤19).
 * Approach: 1. For each subset B compute AND(B) and XOR of the complement. 2. Linear-basis maximum XOR on complement values with bits of XOR(rest) cleared. 3. Track AND + XOR(rest) + 2*basis. Include empty B.
 * Dry Run: [2,3,6,7] with B={2,3} AND=2, rest XOR 6^7=1, extra 2*7 style split yields 15.
 * Time Complexity: O(n * log A * 2^n)
 * Space Complexity: O(2^n)
 */
var maximizeXorAndXor = function (nums) {
  const bitLength = Math.max(...nums).toString(2).length;
  const n = nums.length;
  const andOf = Array(1 << n).fill(0);
  const xorOf = Array(1 << n).fill(0);

  for (let mask = 1; mask < 1 << n; mask++) {
    const lowest = mask & -mask;
    const index = Math.log2(lowest);
    const without = mask ^ lowest;
    andOf[mask] = without ? andOf[without] & nums[index] : nums[index];
    xorOf[mask] = xorOf[without] ^ nums[index];
  }

  const maxXorSubset = (values) => {
    const basis = Array(bitLength).fill(0);
    for (let value of values) {
      for (let bit = bitLength - 1; bit >= 0; bit--) {
        if (((value >> bit) & 1) === 0) {
          continue;
        }
        if (basis[bit] === 0) {
          basis[bit] = value;
          break;
        }
        value ^= basis[bit];
      }
    }
    let best = 0;
    for (let bit = bitLength - 1; bit >= 0; bit--) {
      if ((best ^ basis[bit]) > best) {
        best ^= basis[bit];
      }
    }
    return best;
  };

  const full = (1 << n) - 1;
  let answer = 0;
  for (let mask = 0; mask < 1 << n; mask++) {
    const andValue = mask === 0 ? 0 : andOf[mask];
    const restXor = xorOf[full ^ mask];
    const restValues = [];
    for (let index = 0; index < n; index++) {
      if ((mask & (1 << index)) === 0) {
        restValues.push(nums[index] & ~restXor);
      }
    }
    answer = Math.max(
      answer,
      andValue + restXor + 2 * maxXorSubset(restValues)
    );
  }
  return answer;
};
