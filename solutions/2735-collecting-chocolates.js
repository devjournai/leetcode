/**
 * Collecting Chocolates
 *
 * Intuition:
 * Suppose we perform the rotation operation exactly k times.
 *
 * Every rotation costs x, so the total rotation cost is:
 *
 *      k * x
 *
 * After k rotations, the chocolate of type i can be bought from any of the
 * previous k rotated positions. Therefore, for each type we keep the minimum
 * cost seen so far.
 *
 * Try every possible number of rotations (0 to n-1) and compute the minimum
 * total cost.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Let:
 *
 *      best[i]
 *
 *      =
 *      minimum cost for collecting type i after current rotations.
 *
 * Initially:
 *
 *      best = nums
 *
 * 2. Compute the answer for:
 *
 *      0 rotations
 *
 * 3. For every rotation:
 *
 *      k = 1 ... n-1
 *
 *      Update
 *
 *          best[i]
 *
 *      with
 *
 *          nums[(i-k+n)%n]
 *
 *      because after k rotations that chocolate becomes type i.
 *
 * 4. Sum all best values.
 *
 * 5. Total cost:
 *
 *      sum(best) + k * x
 *
 * 6. Keep the minimum.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [20,1,15]
 * x = 5
 *
 * Rotation 0:
 *
 * best =
 * [20,1,15]
 *
 * cost = 36
 *
 * ----------------
 *
 * Rotation 1:
 *
 * best =
 * [15,1,1]
 *
 * cost =
 * 17 + 5 = 22
 *
 * ----------------
 *
 * Rotation 2:
 *
 * best =
 * [1,1,1]
 *
 * cost =
 * 3 + 10 = 13
 *
 * Answer = 13
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N²)
 * Space Complexity: O(N)
 */

var minCost = function (nums, x) {
  const n = nums.length;

  const best = [...nums];

  let sum = 0n;

  for (const value of best) {
    sum += BigInt(value);
  }

  let answer = sum;

  for (let rotation = 1; rotation < n; rotation++) {
    sum = 0n;

    for (let i = 0; i < n; i++) {
      best[i] = Math.min(best[i], nums[(i - rotation + n) % n]);

      sum += BigInt(best[i]);
    }

    const current = sum + BigInt(rotation) * BigInt(x);

    if (current < answer) {
      answer = current;
    }
  }

  return Number(answer);
};
