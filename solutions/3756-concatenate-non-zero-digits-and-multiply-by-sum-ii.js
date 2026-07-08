/**
 * Concatenate Non-Zero Digits and Multiply by Sum II
 * Intuition:
 * The problem requires extracting non-zero digits from substrings to form a number (x),
 * summing those digits, and returning (x * sum) % (10^9 + 7). Since the string is static
 * (no updates are made to it), we can completely avoid building a Segment Tree. Instead,
 * we can use Prefix Arrays to answer any range query in O(1) time. By precomputing the
 * prefix sums, the counts of non-zero digits, and the accumulated number values `x`,
 * we can extract the properties of any substring using basic modular arithmetic.
 *
 * Approach:
 * 1. Define `MOD = 1000000007n` and initialize prefix arrays of size `n + 1`:
 * - `pow10`: Stores 10^k % MOD to shift prefixes correctly during queries.
 * - `count`: Stores the prefix count of non-zero digits.
 * - `sum`: Stores the prefix sum of all digits.
 * - `x`: Stores the accumulated number formed by non-zero digits modulo MOD.
 * 2. Iterate through the string `s` to build the prefix arrays:
 * - Maintain powers of 10: `pow10[i + 1] = (pow10[i] * 10n) % MOD`.
 * - Accumulate the digit count and sum.
 * - Build the number `x`: if a digit is non-zero, shift `x[i]` by one decimal place
 * (`* 10n`) and add the digit. If it is zero, simply carry over `x[i]`.
 * 3. Process each query `[l, r]`:
 * - Find `countDiff`, the number of non-zero digits in this specific range.
 * - Extract `x_val`: Subtract the left prefix `x[l]` from the right prefix `x[r + 1]`.
 * To properly align `x[l]` by place value before subtracting, multiply it by
 * `pow10[countDiff]`. We add `MOD` before the final modulo to handle JavaScript's
 * negative modulo behavior.
 * - Extract `sum_val`: Simple prefix difference `sum[r + 1] - sum[l]`.
 * - Calculate final answer `(x_val * sum_val) % MOD` and convert safely back to `Number`.
 *
 * Dry Run: s = "102", queries = [[0, 2]]
 * n = 3. MOD = 1000000007n
 * * Prefix Arrays generation:
 * i=0 (char '1'): count[1]=1, sum[1]=1n, x[1]=1n, pow10[1]=10n
 * i=1 (char '0'): count[2]=1, sum[2]=1n, x[2]=1n, pow10[2]=100n
 * i=2 (char '2'): count[3]=2, sum[3]=3n, x[3]=12n, pow10[3]=1000n
 * * Query [0, 2] (l=0, r=2):
 * countDiff = count[3] - count[0] = 2 - 0 = 2
 * x_val = (x[3] - x[0] * pow10[2]) % MOD = (12n - 0n * 100n) % MOD = 12n
 * sum_val = sum[3] - sum[0] = 3n - 0n = 3n
 * finalAnswer = (12n * 3n) % MOD = 36
 *
 * Time Complexity: O(N + Q)
 * Space Complexity: O(N + Q)
 */
var sumAndMultiply = function (s, queries) {
  const MOD = 1000000007n;
  const n = s.length;

  const pow10 = new Array(n + 1).fill(1n);
  const count = new Array(n + 1).fill(0);
  const sum = new Array(n + 1).fill(0n);
  const x = new Array(n + 1).fill(0n);

  for (let i = 0; i < n; i++) {
    const d = Number(s[i]);

    pow10[i + 1] = (pow10[i] * 10n) % MOD;
    count[i + 1] = count[i] + (d !== 0 ? 1 : 0);
    sum[i + 1] = sum[i] + BigInt(d);

    if (d !== 0) {
      x[i + 1] = (x[i] * 10n + BigInt(d)) % MOD;
    } else {
      x[i + 1] = x[i];
    }
  }

  const ans = [];
  for (const [l, r] of queries) {
    const countDiff = count[r + 1] - count[l];
    let x_val = (x[r + 1] - ((x[l] * pow10[countDiff]) % MOD) + MOD) % MOD;
    let sum_val = sum[r + 1] - sum[l];

    ans.push(Number((x_val * sum_val) % MOD));
  }

  return ans;
};
