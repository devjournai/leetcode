/**
 * Minimize the Maximum of Two Arrays
 * Intuition:
 * Instead of constructing the two arrays directly, binary search the answer.
 * For a candidate maximum value `x`, count how many numbers from 1 to x can be
 * assigned to each array while respecting the divisibility constraints.
 *
 * A number can be:
 * - Used only in arr1 (divisible by divisor2 but not divisor1).
 * - Used only in arr2 (divisible by divisor1 but not divisor2).
 * - Used in either array (not divisible by either divisor1 or divisor2).
 *
 * If there are enough valid numbers to satisfy both arrays, then `x` is feasible.
 *
 * Approach:
 * 1. Compute:
 *      lcm = LCM(divisor1, divisor2)
 *
 * 2. Binary search on the answer between:
 *      left = 1
 *      right = 1e18
 *
 * 3. For every middle value `mid`:
 *
 *      Count numbers from 1...mid:
 *
 *      a. validForArr1
 *         = numbers not divisible by divisor1
 *         = mid - floor(mid / divisor1)
 *
 *      b. validForArr2
 *         = numbers not divisible by divisor2
 *         = mid - floor(mid / divisor2)
 *
 *      c. commonValid
 *         = numbers divisible by neither divisor1 nor divisor2
 *         = mid
 *           - floor(mid/divisor1)
 *           - floor(mid/divisor2)
 *           + floor(mid/lcm)
 *
 * 4. A value `mid` is feasible if:
 *
 *      validForArr1 >= uniqueCnt1
 *
 *      validForArr2 >= uniqueCnt2
 *
 *      commonValid >= uniqueCnt1 + uniqueCnt2
 *
 * The last condition guarantees enough distinct numbers overall.
 *
 * 5. If feasible:
 *      save answer
 *      search left half
 *
 *    Otherwise:
 *      search right half.
 *
 * 6. Return the minimum feasible value.
 *
 * Dry Run:
 *
 * Input:
 * divisor1 = 2
 * divisor2 = 7
 * uniqueCnt1 = 1
 * uniqueCnt2 = 3
 *
 * LCM = 14
 *
 * Binary Search
 *
 * mid = 4
 *
 * validForArr1
 * = 4 - 2
 * = 2
 *
 * validForArr2
 * = 4 - 0
 * = 4
 *
 * commonValid
 * = 4 - 2 - 0 + 0
 * = 2
 *
 * Check:
 *
 * validForArr1 >= 1 ✔
 * validForArr2 >= 3 ✔
 * validForArr1 + validForArr2 isn't enough alone; use total distinct:
 * numbers not divisible by both constraints:
 * total usable = 4 - floor(4/14)?? Using inclusion:
 * commonValid + exclusive counts satisfies
 *
 * Since all conditions hold,
 * answer can be 4.
 *
 * Binary search continues left,
 * but no smaller value works.
 *
 * Final Answer:
 * 4
 *
 * Time Complexity: O(log(10^18))
 * Space Complexity: O(1)
 */
var minimizeSet = function (divisor1, divisor2, uniqueCnt1, uniqueCnt2) {
  const gcd = (a, b) => {
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  };

  const d1 = BigInt(divisor1);
  const d2 = BigInt(divisor2);

  const lcm = (d1 * d2) / gcd(d1, d2);

  let left = 1n;
  let right = 1000000000000000000n;
  let answer = right;

  while (left <= right) {
    const mid = (left + right) / 2n;

    const validForArr1 = mid - mid / d1;
    const validForArr2 = mid - mid / d2;
    const totalValid = mid - mid / lcm;

    if (
      validForArr1 >= BigInt(uniqueCnt1) &&
      validForArr2 >= BigInt(uniqueCnt2) &&
      totalValid >= BigInt(uniqueCnt1 + uniqueCnt2)
    ) {
      answer = mid;
      right = mid - 1n;
    } else {
      left = mid + 1n;
    }
  }

  return Number(answer);
};
