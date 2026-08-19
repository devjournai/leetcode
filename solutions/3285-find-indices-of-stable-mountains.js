/**
 * Find Indices of Stable Mountains
 * Intuition: Mountain i (i >= 1) is stable iff the mountain immediately before it is strictly taller than `threshold`. Index 0 has no previous mountain, so it is never stable.
 * Approach: Scan i from 1 to n-1 and collect every i where height[i-1] > threshold.
 * Dry Run: height = [1, 2, 3, 4, 5], threshold = 2
 *   - i=1: height[0]=1 is not > 2
 *   - i=2: height[1]=2 is not > 2
 *   - i=3: height[2]=3 > 2 -> take 3
 *   - i=4: height[3]=4 > 2 -> take 4
 *   - Answer [3, 4]
 * Time Complexity: O(n)
 * Space Complexity: O(n) for the output list
 */
var stableMountains = function (height, threshold) {
  const ans = [];

  for (let i = 1; i < height.length; i++) {
    if (height[i - 1] > threshold) ans.push(i);
  }

  return ans;
};
