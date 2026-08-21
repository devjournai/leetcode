/**
 * Number of Strings Which Can Be Rearranged to Contain Substring
 *
 * Intuition:
 * A string is good if it has at least one `l`, two `e`s, and one `t`
 * (enough to rearrange into substring "leet"). Count strings of length n
 * over 26 letters that reach those counts.
 *
 * Approach: Memoized DFS `dfs(i, l, e, t)` on remaining length i and capped
 * counts (l<=1, e<=2, t<=1). From each state add 23 other letters, one `l`,
 * one `e`, and one `t` (modulo 1e9+7). Base: i===0 succeeds iff l===1, e===2, t===1.
 *
 * A string is good if its characters can be rearranged to contain
 * "leet" as a substring.
 *
 * The word "leet" requires:
 *
 *     l -> at least 1
 *     e -> at least 2
 *     t -> at least 1
 *
 * Therefore, a string is good if it contains at least:
 *
 *     1 'l'
 *     2 'e'
 *     1 't'
 *
 * The remaining characters can be anything.
 *
 * Instead of directly counting good strings, it is easier to count
 * ALL strings and subtract the BAD strings.
 *
 * Total strings of length n:
 *
 *     26^n
 *
 * A string is BAD if it does not contain enough characters to form
 * "leet".
 *
 * Since we only need:
 *
 *     l >= 1
 *     e >= 2
 *     t >= 1
 *
 * we can use inclusion-exclusion.
 *
 * ------------------------------------------------------------
 *
 * Define these bad conditions:
 *
 * A = no 'l'
 * B = fewer than 2 'e'
 * C = no 't'
 *
 * We want:
 *
 *     Good = Total - |A ∪ B ∪ C|
 *
 * Using inclusion-exclusion:
 *
 *     Good =
 *       Total
 *       - |A|
 *       - |B|
 *       - |C|
 *       + |A ∩ B|
 *       + |A ∩ C|
 *       + |B ∩ C|
 *       - |A ∩ B ∩ C|
 *
 * ------------------------------------------------------------
 *
 * Counting each case:
 *
 * 1. No 'l':
 *
 *    Every position has 25 choices.
 *
 *    |A| = 25^n
 *
 *
 * 2. No 't':
 *
 *    Same:
 *
 *    |C| = 25^n
 *
 *
 * 3. Fewer than 2 'e':
 *
 *    There are two possibilities:
 *
 *    - 0 occurrences of 'e':
 *
 *          25^n
 *
 *    - Exactly 1 occurrence of 'e':
 *
 *          n * 25^(n - 1)
 *
 *    Therefore:
 *
 *          |B| = 25^n + n * 25^(n - 1)
 *
 * ------------------------------------------------------------
 *
 * Pair intersections:
 *
 * A ∩ C:
 *
 * No 'l' and no 't'.
 *
 * Each position has 24 choices:
 *
 *     |A ∩ C| = 24^n
 *
 *
 * A ∩ B:
 *
 * No 'l' and fewer than 2 'e'.
 *
 * We have:
 *
 *     0 e:
 *         24^n
 *
 *     exactly 1 e:
 *         n * 24^(n - 1)
 *
 * Therefore:
 *
 *     |A ∩ B|
 *       = 24^n + n * 24^(n - 1)
 *
 *
 * B ∩ C:
 *
 * No 't' and fewer than 2 'e':
 *
 *     24^n + n * 24^(n - 1)
 *
 * ------------------------------------------------------------
 *
 * Triple intersection:
 *
 * No 'l', no 't', and fewer than 2 'e'.
 *
 * Available characters:
 *
 *     26 - 3 = 23
 *
 * because l, e, t are restricted.
 *
 * 0 e:
 *
 *     23^n
 *
 * exactly 1 e:
 *
 *     n * 23^(n - 1)
 *
 * Therefore:
 *
 *     |A ∩ B ∩ C|
 *       = 23^n + n * 23^(n - 1)
 *
 * ------------------------------------------------------------
 *
 * We can simplify the final formula:
 *
 * Good =
 *
 * 26^n
 * - 2 * 25^n
 * - (25^n + n * 25^(n-1))
 * + 24^n
 * + (24^n + n * 24^(n-1))
 * + (24^n + n * 24^(n-1))
 * - (23^n + n * 23^(n-1))
 *
 * ------------------------------------------------------------
 *
 * Dry Run:
 *
 * n = 4
 *
 * We need exactly the four required characters:
 *
 *     l, e, e, t
 *
 * Since length = 4, every good string must contain exactly:
 *
 *     1 l
 *     2 e
 *     1 t
 *
 * Number of arrangements:
 *
 *     4! / 2!
 *     = 12
 *
 * Therefore:
 *
 *     answer = 12
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
var stringCount = function (n) {
  const MOD = 1000000007;
  const memo = new Map();

  function dfs(i, l, e, t) {
    if (i === 0) {
      return l === 1 && e === 2 && t === 1 ? 1 : 0;
    }

    const key = `${i},${l},${e},${t}`;
    if (memo.has(key)) {
      return memo.get(key);
    }

    let res = (dfs(i - 1, l, e, t) * 23) % MOD;
    res = (res + dfs(i - 1, Math.min(1, l + 1), e, t)) % MOD;
    res = (res + dfs(i - 1, l, Math.min(2, e + 1), t)) % MOD;
    res = (res + dfs(i - 1, l, e, Math.min(1, t + 1))) % MOD;

    memo.set(key, res);
    return res;
  }

  return dfs(n, 0, 0, 0);
};
