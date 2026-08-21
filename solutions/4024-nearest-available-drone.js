/**
 * Nearest Available Drone
 * Intuition: We iterate through each drone and compute the Manhattan distance d = |x_i - t_x| + |y_i - t_y| to the target. If d le range_i, the drone can reach the target. Among all reachable drones, we choose the one with the minimum distance. If there is a tie, we keep the smaller index because we scan from left to right and only update when the distance is strictly smaller. If no drone can reach the target, return -1.
 * Approach: 1. Follow Traversal. 2. Implement the official LeetCode function. 3. Return the required result.
 * Dry Run: Input: drones = [[0,0,8],[2,2,9]], target = [3,4]. Output: 1.
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
var nearestDrone = function (drones, target) {
  let ans = -1;
  let mn = Infinity;
  const [tx, ty] = target;

  for (let i = 0; i < drones.length; i++) {
    const [x, y, r] = drones[i];

    const d = Math.abs(x - tx) + Math.abs(y - ty);

    if (d <= r && mn > d) {
      ans = i;
      mn = d;
    }
  }

  return ans;
};
