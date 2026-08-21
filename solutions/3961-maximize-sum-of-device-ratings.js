/**
 * Maximize Sum of Device Ratings
 * Intuition: Adding a unit to a device can only decrease or keep its rating unchanged. Therefore, if n = 1, we can directly return the sum of all device ratings.
 * Approach: Adding a unit to a device can only decrease or keep its rating unchanged. Therefore, if n = 1, we can directly return the sum of all device ratings. Otherwise, we sort the units of each device in ascending order, take the smallest unit from each device, and concentrate them into one device with rating mn. If we concentrate them into device i, the rating of device i changes from the second smallest value mn2 to mn, so the total rating decreases by mn2 - mn. To maximize the total rating, we should choose the device with the smallest decrease, i.e., the device with the smallest mn2.
 * Dry Run: Input: units = [[1,3],[2,2]]. Output: 4.
 * Time Complexity: O(m * n)
 * Space Complexity: O(1)
 */
var maxRatings = function (units) {
  const n = units[0].length;

  if (n === 1) {
    let ans = 0;
    for (const x of units) {
      ans += x[0];
    }
    return ans;
  }

  let ans = 0;
  let mn = Infinity;
  let mn2 = Infinity;

  for (const x of units) {
    x.sort((a, b) => a - b);
    ans += x[1];
    mn2 = Math.min(mn2, x[1]);
    mn = Math.min(mn, x[0]);
  }

  return ans - (mn2 - mn);
};
