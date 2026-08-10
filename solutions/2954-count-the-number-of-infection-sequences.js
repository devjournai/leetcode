/**
 * 2954. Count the Number of Infection Sequences
 *
 * Intuition:
 *
 * Initially, the people in `sick` are already infected.
 *
 * An uninfected person can become infected only if they are
 * adjacent to someone who is already infected.
 *
 * Therefore, every continuous group of healthy people between
 * two infected people behaves like an independent segment.
 *
 * ------------------------------------------------------------
 *
 * Consider:
 *
 *     n = 5
 *     sick = [0, 4]
 *
 * The healthy people are:
 *
 *     [1, 2, 3]
 *
 * Initially, only positions 1 and 3 can be infected.
 *
 * So the infection order must start from either:
 *
 *     1
 *
 * or:
 *
 *     3
 *
 * Once one side is infected, the infection can continue toward
 * the middle.
 *
 * Valid sequences:
 *
 *     [1,2,3]
 *     [1,3,2]
 *     [3,2,1]
 *     [3,1,2]
 *
 * Answer = 4
 *
 * ------------------------------------------------------------
 *
 * Step 1:
 *
 * Find the number of healthy people in every gap.
 *
 * There are three types of gaps:
 *
 * 1. Before the first sick person.
 *
 * 2. Between two sick people.
 *
 * 3. After the last sick person.
 *
 * ------------------------------------------------------------
 *
 * Example:
 *
 *     n = 10
 *     sick = [2, 6]
 *
 * Left gap:
 *
 *     positions [0,1]
 *     size = 2
 *
 * Middle gap:
 *
 *     positions [3,4,5]
 *     size = 3
 *
 * Right gap:
 *
 *     positions [7,8,9]
 *     size = 3
 *
 * ------------------------------------------------------------
 *
 * Step 2:
 *
 * Count how many ways we can arrange all infections.
 *
 * Suppose there are:
 *
 *     totalHealthy
 *
 * healthy people.
 *
 * If all groups were independent, we could arrange the
 * infections using:
 *
 *     totalHealthy!
 *
 * permutations.
 *
 * But each gap has restrictions on the order.
 *
 * ------------------------------------------------------------
 *
 * For a gap of length L at an END:
 *
 * Example:
 *
 *     [healthy, healthy, healthy] [sick]
 *
 * The infection must happen from the sick side:
 *
 *     3 -> 2 -> 1
 *
 * Therefore there is only:
 *
 *     1
 *
 * valid internal ordering.
 *
 * The same is true for a gap at the left end.
 *
 * ------------------------------------------------------------
 *
 * For a gap of length L BETWEEN two sick people:
 *
 * Example:
 *
 *     sick [1,2,3,4] sick
 *
 * The infection can start from either side.
 *
 * The number of valid internal infection orders is:
 *
 *     2^(L - 1)
 *
 * Why?
 *
 * The first infection can happen from either end.
 *
 * After that, every next infection can be taken from either
 * currently infected side.
 *
 * For L = 4:
 *
 *     2^(4 - 1)
 *     = 8
 *
 * ------------------------------------------------------------
 *
 * Step 3:
 *
 * We need to interleave the infection sequences of all gaps.
 *
 * Suppose the gap sizes are:
 *
 *     a, b, c
 *
 * The total number of healthy people is:
 *
 *     a + b + c
 *
 * The number of ways to interleave these independent groups is:
 *
 *     totalHealthy!
 *     ----------------
 *     a! * b! * c!
 *
 * This is a multinomial coefficient.
 *
 * ------------------------------------------------------------
 *
 * Therefore:
 *
 * Answer =
 *
 *     totalHealthy!
 *     ----------------
 *     product(gap!)
 *
 * multiplied by:
 *
 *     2^(L - 1)
 *
 * for every internal gap of length L.
 *
 * ------------------------------------------------------------
 *
 * Example 1:
 *
 *     n = 5
 *     sick = [0,4]
 *
 * There is one internal gap:
 *
 *     L = 3
 *
 * Total healthy:
 *
 *     3
 *
 * Multinomial part:
 *
 *     3! / 3! = 1
 *
 * Internal gap contribution:
 *
 *     2^(3 - 1) = 4
 *
 * Answer:
 *
 *     1 * 4 = 4
 *
 * ------------------------------------------------------------
 *
 * Example 2:
 *
 *     n = 4
 *     sick = [1]
 *
 * Left gap:
 *
 *     L = 1
 *
 * Right gap:
 *
 *     L = 2
 *
 * Total healthy:
 *
 *     3
 *
 * Multinomial:
 *
 *     3! / (1! * 2!)
 *     = 3
 *
 * There are no internal gaps.
 *
 * Answer:
 *
 *     3
 *
 * ------------------------------------------------------------
 *
 * We use factorials and modular inverses because n can be
 * 100000 and the answer is required modulo 1e9 + 7.
 *
 * ------------------------------------------------------------
 *
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */

var numberOfSequence = function (n, sick) {
  const MOD = 1000000007n;

  const fact = new Array(n + 1);

  fact[0] = 1n;

  for (let i = 1; i <= n; i++) {
    fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
  }

  const power = (base, exponent) => {
    let result = 1n;
    base %= MOD;

    while (exponent > 0n) {
      if (exponent & 1n) {
        result = (result * base) % MOD;
      }

      base = (base * base) % MOD;

      exponent >>= 1n;
    }

    return result;
  };

  const inverse = (value) => {
    return power(value, MOD - 2n);
  };

  const healthyCount = n - sick.length;
  let answer = fact[healthyCount];

  let previous = -1;
  for (let i = 0; i < sick.length; i++) {
    const current = sick[i];
    const gap = current - previous - 1;

    if (gap > 0) {
      answer = (answer * inverse(fact[gap])) % MOD;
      if (previous !== -1) {
        answer = (answer * power(2n, BigInt(gap - 1))) % MOD;
      }
    }

    previous = current;
  }

  const lastGap = n - previous - 1;

  if (lastGap > 0) {
    answer = (answer * inverse(fact[lastGap])) % MOD;
  }

  return Number(answer);
};
