/**
 * Minimum Time to Complete All Deliveries
 * Intuition: Only one drone can deliver each hour, and drone i is idle on multiples of r[i]. The earliest feasible hour T must give each drone enough personal free hours and enough hours when at least one drone is free.
 * Approach: 1. Let L = lcm(r[0], r[1]). 2. Binary search T in [d[0]+d[1], 2*(d[0]+d[1])]. 3. T is feasible iff T-floor(T/r[0]) >= d[0], T-floor(T/r[1]) >= d[1], and T-floor(T/L) >= d[0]+d[1].
 * Dry Run: d = [3,1], r = [2,3]. T=5: drone0 has 3 free hours, drone1 has 4, shared free hours 5. Feasible and minimal.
 * Time Complexity: O(log(d1+d2))
 * Space Complexity: O(1)
 */
var minimumTime = function (d, r) {
  const gcd = (a, b) => {
    while (b) {
      const t = a % b;
      a = b;
      b = t;
    }
    return a;
  };
  const l = (r[0] / gcd(r[0], r[1])) * r[1];
  const check = (t) =>
    t - Math.floor(t / r[0]) >= d[0] &&
    t - Math.floor(t / r[1]) >= d[1] &&
    t - Math.floor(t / l) >= d[0] + d[1];

  let left = d[0] + d[1];
  let right = (d[0] + d[1]) * 2;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    if (check(mid)) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return left;
};
