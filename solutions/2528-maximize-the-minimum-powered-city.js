/**
 * Maximize the Minimum Powered City
 *
 * Intuition:
 * We need to maximize the minimum power among all cities after adding at most
 * `k` new power stations. The answer is monotonic:
 *
 * - If we can make every city's power at least X,
 *   then we can also make every city's power at least X-1.
 *
 * Therefore, we can Binary Search on the minimum power.
 *
 * To check whether a candidate minimum power is achievable, greedily add
 * power stations as far to the right as possible while sweeping from left
 * to right. A difference array is used so every addition affects a range
 * efficiently.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute the initial power of every city using a sliding window.
 *
 *      power[i] =
 *      total stations whose range covers city i.
 *
 * 2. Binary Search:
 *
 *      left = minimum initial power
 *      right = minimum initial power + k + total stations
 *
 * 3. For every candidate minimum power `target`,
 *    perform a feasibility check.
 *
 * 4. During feasibility:
 *
 *      Maintain:
 *      - difference array
 *      - current extra power affecting this city
 *      - remaining stations
 *
 *      For every city:
 *
 *          currentPower =
 *              initialPower
 *              + active additions
 *
 *          If currentPower < target:
 *
 *              need = target - currentPower
 *
 *              Add `need` stations at
 *
 *                  min(i + r, n-1)
 *
 *              because placing them as far right as possible
 *              helps future cities too.
 *
 *              If need > remaining stations,
 *              target is impossible.
 *
 * 5. If target is achievable,
 *      search larger values.
 *
 *    Otherwise,
 *      search smaller values.
 *
 * 6. Return the maximum feasible target.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * stations = [1,2,4,5,0]
 * r = 1
 * k = 2
 *
 * Initial Power:
 *
 * city0 = 3
 * city1 = 7
 * city2 = 11
 * city3 = 9
 * city4 = 5
 *
 * Binary Search:
 *
 * target = 5
 *
 * Sweep:
 *
 * city0
 * power = 3
 * need = 2
 *
 * Place 2 stations at city1.
 *
 * Remaining k = 0
 *
 * Updated powers:
 *
 * city0 = 5
 * city1 = 9
 * city2 = 13
 * city3 = 9
 * city4 = 5
 *
 * Every city >=5
 *
 * feasible.
 *
 * Try larger value...
 *
 * Eventually maximum feasible answer = 5.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log (sum(stations)+k))
 * Space Complexity: O(N)
 */

var maxPower = function (stations, r, k) {
  const n = stations.length;

  const initialPower = new Array(n).fill(0);

  let windowSum = 0;

  for (let i = 0; i <= Math.min(n - 1, r); i++) {
    windowSum += stations[i];
  }

  for (let i = 0; i < n; i++) {
    initialPower[i] = windowSum;

    if (i - r >= 0) {
      windowSum -= stations[i - r];
    }

    if (i + r + 1 < n) {
      windowSum += stations[i + r + 1];
    }
  }

  let left = Math.min(...initialPower);
  let right = left + k + stations.reduce((a, b) => a + b, 0);
  let answer = left;

  const canAchieve = (target) => {
    const diff = new Array(n + 1).fill(0);

    let extra = 0;
    let remaining = k;

    for (let i = 0; i < n; i++) {
      extra += diff[i];

      const current = initialPower[i] + extra;

      if (current < target) {
        const need = target - current;

        if (need > remaining) {
          return false;
        }

        remaining -= need;
        extra += need;

        const end = Math.min(n, i + 2 * r + 1);

        diff[end] -= need;
      }
    }

    return true;
  };

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (canAchieve(mid)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
};
