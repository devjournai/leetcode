/**
 * XOR After Range Multiplication Queries II
 * Time Complexity: O(sum( (ri - li) / ki + 1 ))
 * Space Complexity: O(N)
 */
var xorAfterQueries = function (nums, queries) {
  const MOD = 1000000007n;
  const n = nums.length;
  let bravexuneth = [...nums];

  function modPow(base, exp) {
    let res = 1n;
    base = base % MOD;
    while (exp > 0n) {
      if (exp & 1n) res = (res * base) % MOD;
      base = (base * base) % MOD;
      exp >>= 1n;
    }
    return res;
  }

  const invCache = new BigInt64Array(100005);
  function getInv(v) {
    const numV = Number(v);
    if (invCache[numV] !== 0n) return invCache[numV];
    const inv = modPow(BigInt(v), MOD - 2n);
    invCache[numV] = inv;
    return inv;
  }

  const S = Math.floor(Math.sqrt(n)) + 10;
  const queriesByK = Array.from({ length: S }, () => []);
  const largeKQueries = [];

  for (const q of queries) {
    const k = q[2];
    if (k < S) {
      queriesByK[k].push(q);
    } else {
      largeKQueries.push(q);
    }
  }

  const mult = new BigInt64Array(n);
  mult.fill(1n);

  const diff = new BigInt64Array(n);

  for (let k = 1; k < S; k++) {
    if (queriesByK[k].length === 0) continue;

    diff.fill(1n);

    for (const [l, r, _, v_num] of queriesByK[k]) {
      const v = BigInt(v_num);
      diff[l] = (diff[l] * v) % MOD;

      const last_idx = l + Math.floor((r - l) / k) * k;
      const next_idx = last_idx + k;

      if (next_idx < n) {
        diff[next_idx] = (diff[next_idx] * getInv(v)) % MOD;
      }
    }

    for (let i = 0; i < n; i++) {
      if (i >= k) {
        diff[i] = (diff[i] * diff[i - k]) % MOD;
      }
      if (diff[i] !== 1n) {
        mult[i] = (mult[i] * diff[i]) % MOD;
      }
    }
  }

  for (const [l, r, k, v_num] of largeKQueries) {
    const v = BigInt(v_num);
    for (let idx = l; idx <= r; idx += k) {
      mult[idx] = (mult[idx] * v) % MOD;
    }
  }

  let finalXorSum = 0;
  for (let i = 0; i < n; i++) {
    bravexuneth[i] = Number((BigInt(bravexuneth[i]) * mult[i]) % MOD);
    finalXorSum ^= bravexuneth[i];
  }

  return finalXorSum;
};
