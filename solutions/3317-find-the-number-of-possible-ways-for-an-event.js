/**
 * Find the Number of Possible Ways for an Event
 * Intuition: Use k non-empty stages: choose k of x stages, partition n performers into k non-empty unlabeled groups (Stirling 2nd kind), assign groups to stages (k!), and score each stage in [1, y] (y^k).
 * Approach: 1. Precompute factorials, inverse factorials, and Stirling2[n][k]. 2. Sum over k = 1..min(n,x): C(x,k) * S(n,k) * k! * y^k mod 1e9+7.
 * Dry Run: n = 2, x = 3, y = 2
 *   - k=1: C(3,1)*1*1*2 = 6; k=2: C(3,2)*1*2*4 = 24; total 30
 * Time Complexity: O(N * max(N, X))
 * Space Complexity: O(N * max(N, X))
 */
var numberOfWays = function (n, x, y) {
  const MOD = 1_000_000_007n;
  const maxStages = Math.min(n, x);

  const getFactAndInvFact = (limit) => {
    const fact = Array(limit + 1).fill(0n);
    const invFact = Array(limit + 1).fill(0n);
    const inv = Array(limit + 1).fill(0n);
    fact[0] = invFact[0] = 1n;
    inv[0] = inv[1] = 1n;
    for (let i = 1; i <= limit; i++) {
      const ii = BigInt(i);
      if (i >= 2) {
        inv[i] = (MOD - (((MOD / ii) * inv[Number(MOD % ii)]) % MOD)) % MOD;
      }
      fact[i] = (fact[i - 1] * ii) % MOD;
      invFact[i] = (invFact[i - 1] * inv[i]) % MOD;
    }
    return [fact, invFact];
  };

  const nCk = (nn, kk, fact, invFact) =>
    (((fact[nn] * invFact[kk]) % MOD) * invFact[nn - kk]) % MOD;

  const getStirling = (nn, kk) => {
    const stirling = Array.from({ length: nn + 1 }, () =>
      Array(kk + 1).fill(0n)
    );
    stirling[0][0] = 1n;
    for (let i = 1; i <= nn; i++) {
      stirling[i][1] = 1n;
      for (let j = 2; j <= Math.min(i, kk); j++) {
        stirling[i][j] =
          (BigInt(j) * stirling[i - 1][j] + stirling[i - 1][j - 1]) % MOD;
      }
    }
    return stirling;
  };

  const modPow = (base, exp) => {
    if (exp === 0n) {
      return 1n;
    }
    if (exp % 2n === 1n) {
      return (base * modPow(base, exp - 1n)) % MOD;
    }
    return modPow((base * base) % MOD, exp / 2n);
  };

  const [fact, invFact] = getFactAndInvFact(Math.max(n, x));
  const stirling = getStirling(n, maxStages);
  let ans = 0n;

  for (let k = 1; k <= maxStages; k++) {
    let events = nCk(x, k, fact, invFact);
    events = (events * stirling[n][k]) % MOD;
    events = (events * fact[k]) % MOD;
    events = (events * modPow(BigInt(y), BigInt(k))) % MOD;
    ans = (ans + events) % MOD;
  }

  return Number(ans);
};
