/**
 * Sum Of Beautiful Subsequences
 * Intuition: Beauty sums g times the count of strictly increasing subsequences with gcd exactly g. That equals sum_d phi(d) * (increasing subsequences whose values are all multiples of d).
 * Approach: 1. Build Euler totients up to max(nums). 2. For each value, push it onto lists keyed by every divisor. 3. For each divisor d, count strictly increasing subsequences of that list with a Fenwick tree on compressed ranks. 4. Add phi(d) * count modulo 10^9+7.
 * Dry Run: nums = [1, 2, 3]. Divisor 1 sees [1, 2, 3] (7 increasing subsequences), phi(1)=1. Divisor 2 sees [2], phi(2)=1. Divisor 3 sees [3], phi(3)=2. 1*7 + 1*1 + 2*1 = 10.
 * Time Complexity: O(N * sqrt(M) + M log M + D log N) where M = max(nums) and D is the total divisor occurrences
 * Space Complexity: O(N + M)
 */
var totalBeauty = function (nums) {
  const MOD = 1e9 + 7;
  const maxValue = Math.max(...nums);

  const phi = new Array(maxValue + 1).fill(0);
  for (let i = 0; i <= maxValue; i++) {
    phi[i] = i;
  }
  for (let i = 2; i <= maxValue; i++) {
    if (phi[i] === i) {
      for (let multiple = i; multiple <= maxValue; multiple += i) {
        phi[multiple] -= Math.floor(phi[multiple] / i);
      }
    }
  }

  const valuesByDivisor = Array.from({ length: maxValue + 1 }, () => []);
  for (const value of nums) {
    for (let divisor = 1; divisor * divisor <= value; divisor++) {
      if (value % divisor === 0) {
        valuesByDivisor[divisor].push(value);
        if (divisor * divisor !== value) {
          valuesByDivisor[value / divisor].push(value);
        }
      }
    }
  }

  function countIncreasing(sequence) {
    if (sequence.length === 0) {
      return 0;
    }

    const ranks = Array.from(new Set(sequence)).sort(
      (left, right) => left - right
    );
    const rankOf = new Map();
    for (let i = 0; i < ranks.length; i++) {
      rankOf.set(ranks[i], i + 1);
    }

    const tree = new Array(ranks.length + 1).fill(0);

    function add(index, delta) {
      while (index < tree.length) {
        tree[index] = (tree[index] + delta) % MOD;
        index += index & -index;
      }
    }

    function prefix(index) {
      let sum = 0;
      while (index > 0) {
        sum = (sum + tree[index]) % MOD;
        index -= index & -index;
      }
      return sum;
    }

    let total = 0;
    for (const value of sequence) {
      const rank = rankOf.get(value);
      const ways = (prefix(rank - 1) + 1) % MOD;
      add(rank, ways);
      total = (total + ways) % MOD;
    }
    return total;
  }

  let answer = 0;
  for (let divisor = 1; divisor <= maxValue; divisor++) {
    if (valuesByDivisor[divisor].length === 0) {
      continue;
    }
    const count = countIncreasing(valuesByDivisor[divisor]);
    answer = (answer + ((phi[divisor] * count) % MOD)) % MOD;
  }

  return answer;
};
