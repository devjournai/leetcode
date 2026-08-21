/**
 * Last Moment Before All Ants Fall Out Of A Plank
 * Intuition: Colliding ants bouncing is equivalent to each walking straight through. Last time is max(left positions, n-right positions).
 * Approach: 1. Track the maximum left-ant position. 2. For each right ant, take n-position. 3. Return the max of those times.
 * Dry Run: n = 4, left = [4,3], right = [0,1].
 *   - left max=4; right: 4-0=4, 4-1=3 → 4.
 * Time Complexity: O(L + R)
 * Space Complexity: O(1)
 */
var getLastMoment = function (n, left, right) {
  let finalMoment = 0;

  for (const leftAntLocation of left) {
    finalMoment = Math.max(finalMoment, leftAntLocation);
  }

  right.forEach((rightAntLocation) => {
    finalMoment = Math.max(finalMoment, n - rightAntLocation);
  });

  return finalMoment;
};
