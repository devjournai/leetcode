/**
 * Count The Number of Winning Sequences
 * Intuition: Bob beats Alice if his score is strictly higher. F/W/E cycle like RPS, and Bob cannot repeat the previous summon. DP over (index, previous summon, score).
 * Approach: 1. Map F,W,E to 0,1,2. 2. dp(i, prev, bob) enumerates Bob’s next move if it differs from prev and updates the score vs Alice[i]. 3. Sum starts with prev = 0,1,2 then divide by 2 (each first move is counted twice). 4. Mod 1e9+7.
 * Dry Run: s = "F"
 *   - Bob W wins, F ties, E loses → 1 winning sequence
 * Time Complexity: O(N^2)
 * Space Complexity: O(N^2)
 */
var countWinningSequences = function (s) {
  const MOD = 1_000_000_007;
  const n = s.length;
  const mem = Array.from({ length: n }, () =>
    Array.from({ length: 3 }, () => Array(2 * n).fill(-1))
  );

  const count = (i, prev, bob) => {
    if (i === n) {
      return bob > 0 ? 1 : 0;
    }
    const bobIdx = bob + n;
    if (mem[i][prev][bobIdx] !== -1) {
      return mem[i][prev][bobIdx];
    }

    let f = 0;
    let w = 0;
    let e = 0;

    if (s[i] === "F") {
      if (prev !== 0) {
        f = count(i + 1, 0, bob) % MOD;
      }
      if (prev !== 1) {
        w = count(i + 1, 1, bob + 1) % MOD;
      }
      if (prev !== 2) {
        e = count(i + 1, 2, bob - 1) % MOD;
      }
    } else if (s[i] === "W") {
      if (prev !== 0) {
        f = count(i + 1, 0, bob - 1) % MOD;
      }
      if (prev !== 1) {
        w = count(i + 1, 1, bob) % MOD;
      }
      if (prev !== 2) {
        e = count(i + 1, 2, bob + 1) % MOD;
      }
    } else {
      if (prev !== 0) {
        f = count(i + 1, 0, bob + 1) % MOD;
      }
      if (prev !== 1) {
        w = count(i + 1, 1, bob - 1) % MOD;
      }
      if (prev !== 2) {
        e = count(i + 1, 2, bob) % MOD;
      }
    }

    mem[i][prev][bobIdx] = f + w + e;
    return mem[i][prev][bobIdx];
  };

  const ans = count(0, 0, 0) + count(0, 1, 0) + count(0, 2, 0);
  return Math.floor(ans / 2) % MOD;
};
