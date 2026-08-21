/**
 * Count Subarrays With Even Odd Ratio II
 * Intuition: For a subarray, let x be the number of even elements and y be the number of odd elements. The problem requires y > 0 and frac{x}{y} le frac{a}{b}. Since b > 0 and y > 0, the inequality is equivalent to a cdot y - b cdot x ge 0.
 * Approach: For a subarray, let x be the number of even elements and y be the number of odd elements. The problem requires y > 0 and frac{x}{y} le frac{a}{b}. Since b > 0 and y > 0, the inequality is equivalent to a cdot y - b cdot x ge 0. When y = 0, since the subarray is non-empty, we must have x > 0. In this case, a cdot y - b cdot x = -b cdot x < 0, so the inequality does not hold. Therefore, the two conditions in the problem can be merged into a single one: a cdot y - b cdot x ge 0. We treat the odd numbers in nums as a and the even numbers as -b, resulting in an array arr. The original problem is then equivalent to counting the number of non-empty contiguous subarrays of arr whose element sum is at least 0.
 * Dry Run: Input: nums = [1,2,1,2], a = 3, b = 2. Output: 7.
 * Time Complexity: O(n * logn)
 * Space Complexity: O(n)
 */
class BinaryIndexedTree {
  constructor(n) {
    this.n = n;
    this.c = new Array(n + 1).fill(0);
  }

  update(x, delta) {
    while (x <= this.n) {
      this.c[x] += delta;
      x += x & -x;
    }
  }

  query(x) {
    let sum = 0;
    while (x > 0) {
      sum += this.c[x];
      x -= x & -x;
    }
    return sum;
  }
}

var countRatioSubarrays = function (nums, a, b) {
  const n = nums.length;

  const s = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    s[i + 1] = s[i] + (nums[i] % 2 === 1 ? a : -b);
  }

  const st = [...s].sort((x, y) => x - y);

  const uniq = [];
  for (const x of st) {
    if (uniq.length === 0 || uniq[uniq.length - 1] !== x) {
      uniq.push(x);
    }
  }

  const bit = new BinaryIndexedTree(uniq.length + 1);

  let ans = 0;

  for (const v of s) {
    const x = _.sortedIndex(uniq, v) + 1;

    ans += bit.query(x);
    bit.update(x, 1);
  }

  return ans;
};
