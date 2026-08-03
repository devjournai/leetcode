/**
 * String Transformation
 *
 * Intuition:
 * One operation moves a non-empty suffix (not the whole string) to the front.
 *
 * This is exactly a cyclic rotation of the string.
 *
 * Let every rotation of s be a state.
 *
 * If the current rotation is x, then after one operation we can move to
 * every other rotation exactly once (but never stay at the same rotation).
 *
 * Therefore, the state graph is:
 *
 *      Complete graph with n vertices
 *      (without self-loops)
 *
 * -----------------------------------------------------------------------
 *
 * Observation:
 *
 * t may match s at multiple rotation offsets.
 *
 * Example:
 *
 *      s = "abab"
 *      t = "abab"
 *
 * Valid rotations:
 *
 *      offset = 0
 *      offset = 2
 *
 * Let:
 *
 *      good = number of rotation offsets where
 *              rotation(s, offset) == t
 *
 * Then every state is either:
 *
 *      • Good
 *      • Bad
 *
 * Because every vertex has identical outgoing edges, we only need two DP
 * states:
 *
 *      dpGood
 *      dpBad
 *
 * -----------------------------------------------------------------------
 *
 * DP Transition
 *
 * Let:
 *
 *      G = number of good rotations
 *      B = n - G
 *
 * From a good state:
 *
 *      → another good state : G - 1 ways
 *      → bad state          : B ways
 *
 * From a bad state:
 *
 *      → good state : G ways
 *      → bad state  : B - 1 ways
 *
 * Hence:
 *
 *      nextGood =
 *          good * (G - 1)
 *        + bad  * G
 *
 *      nextBad =
 *          good * B
 *        + bad  * (B - 1)
 *
 * Since k can be as large as 10^15,
 * compute these transitions using matrix exponentiation.
 *
 * -----------------------------------------------------------------------
 *
 * Finding good rotations
 *
 * Search t inside:
 *
 *      s + s
 *
 * (excluding the last character)
 *
 * using KMP.
 *
 * Every occurrence corresponds to one valid rotation.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(n + log k)
 * Space Complexity: O(n)
 */

var numberOfWays = function (s, t, k) {
  const MOD = 1000000007n;
  const n = s.length;

  const text = s + s.slice(0, n - 1);

  const buildLPS = (pat) => {
    const lps = new Array(pat.length).fill(0);

    for (let i = 1, j = 0; i < pat.length; ) {
      if (pat[i] === pat[j]) {
        lps[i++] = ++j;
      } else if (j > 0) {
        j = lps[j - 1];
      } else {
        i++;
      }
    }

    return lps;
  };

  const lps = buildLPS(t);

  let good = 0;

  for (let i = 0, j = 0; i < text.length; ) {
    if (text[i] === t[j]) {
      i++;
      j++;

      if (j === t.length) {
        good++;
        j = lps[j - 1];
      }
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i++;
    }
  }

  const bad = n - good;

  const startGood = s === t ? 1n : 0n;
  const startBad = s === t ? 0n : 1n;

  const mul = (A, B) => {
    return [
      [
        (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % MOD,
        (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % MOD,
      ],
      [
        (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % MOD,
        (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % MOD,
      ],
    ];
  };

  let mat = [
    [BigInt(good - 1), BigInt(good)],
    [BigInt(bad), BigInt(bad - 1)],
  ];

  let res = [
    [1n, 0n],
    [0n, 1n],
  ];

  let exp = BigInt(k);

  while (exp > 0n) {
    if (exp & 1n) {
      res = mul(res, mat);
    }

    mat = mul(mat, mat);
    exp >>= 1n;
  }

  const answer = (res[0][0] * startGood + res[0][1] * startBad) % MOD;

  return Number(answer);
};
