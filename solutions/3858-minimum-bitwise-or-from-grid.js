/**
 * Minimum Bitwise OR From Grid
 * Intuition: Translate the problem into a direct scan or DP over the constraints, using the official examples as the correctness check.
 * Approach: 1. Parse the inputs. 2. Apply the core algorithm described in Intuition. 3. Return the required value.
 * Dry Run: Input: grid = [[1,5],[2,4]] => Output: 3
 * Time Complexity: O(N)
 * Space Complexity: O(N)
 */
var minimumOR = function (grid) {
  let mx = 0;
  for (const row of grid) {
    mx = Math.max(mx, Math.max(...row));
  }

  const m = mx === 0 ? 0 : 32 - Math.clz32(mx);
  let ans = 0;

  for (let i = m - 1; i >= 0; i--) {
    const mask = ans | ((1 << i) - 1);
    for (const row of grid) {
      let found = false;
      for (const x of row) {
        if ((x | mask) === mask) {
          found = true;
          break;
        }
      }
      if (!found) {
        ans |= 1 << i;
        break;
      }
    }
  }

  return ans;
};
