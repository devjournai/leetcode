/**
 * Movement of Robots
 *
 * Intuition:
 * When two robots collide and reverse their directions, it is equivalent to
 * them passing through each other while swapping identities.
 *
 * Since we only need the sum of pairwise distances, robot identities do not
 * matter. Therefore, we can ignore collisions completely.
 *
 * Compute each robot's final position after d seconds, sort the positions,
 * and calculate the sum of pairwise distances.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute the final position of every robot.
 *
 *      If direction is 'L':
 *
 *          position = nums[i] - d
 *
 *      Else:
 *
 *          position = nums[i] + d
 *
 * 2. Sort all final positions.
 *
 * 3. Traverse the sorted positions.
 *
 *      Let:
 *
 *          prefix = sum of previous positions.
 *
 *      For the current position x:
 *
 *          contribution =
 *              x * i - prefix
 *
 *      This equals the total distance from x to all previous robots.
 *
 * 4. Add all contributions modulo 1e9+7.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums = [-2,0,2]
 * s = "RLL"
 * d = 3
 *
 * Final positions:
 *
 * [1,-3,-1]
 *
 * Sort:
 *
 * [-3,-1,1]
 *
 * Contributions:
 *
 * -3 -> 0
 *
 * -1 -> (-1)-(-3)=2
 *
 * 1 -> (1+4)=6
 *
 * Total = 8
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */

var sumDistance = function (nums, s, d) {
  const MOD = 1000000007n;

  const positions = [];

  for (let i = 0; i < nums.length; i++) {
    if (s[i] === "L") {
      positions.push(nums[i] - d);
    } else {
      positions.push(nums[i] + d);
    }
  }

  positions.sort((a, b) => a - b);

  let prefix = 0n;
  let answer = 0n;

  for (let i = 0; i < positions.length; i++) {
    const current = BigInt(positions[i]);

    answer = (answer + current * BigInt(i) - prefix) % MOD;

    prefix += current;
  }

  answer %= MOD;

  if (answer < 0) {
    answer += MOD;
  }

  return Number(answer);
};
