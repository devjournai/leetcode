/**
 * Minimum Possible Maximum Waiting Time
 * Intuition: Two dispensers, cars in order, maximize served then minimize max wait. Binary search max wait W and simulate assignment.
 * Approach: 1. Binary search W. 2. Greedy: when a car is allowed, assign the dispenser that can serve it (enough fuel, free time <= allowed+W) choosing to maximize remaining.
 * Dry Run: Input: demand=[6,8,4,6,5], fuel=[16,13]. Output: 6.
 * Time Complexity: O(N log T)
 * Space Complexity: O(N)
 */
var minMaxWait = function (demand, fuel) {
  const n = demand.length;
  const can = (W) => {
    let f0 = fuel[0],
      f1 = fuel[1];
    let free0 = 0,
      free1 = 0;
    let allowed = 0;
    let served = 0;
    for (let i = 0; i < n; i++) {
      const start0 = Math.max(allowed, free0);
      const start1 = Math.max(allowed, free1);
      const ok0 = f0 >= demand[i] && start0 - allowed <= W;
      const ok1 = f1 >= demand[i] && start1 - allowed <= W;
      if (!ok0 && !ok1) break;
      let use0 = false;
      if (ok0 && ok1)
        ((use0 = start0 <= start1 ? f0 >= f1 : false),
          (use0 = start0 < start1 || (start0 === start1 && f0 >= f1)));
      else use0 = ok0;
      if (use0) {
        if (start0 - allowed > W || f0 < demand[i]) {
          if (!ok1) break;
          free1 = start1 + demand[i];
          f1 -= demand[i];
          allowed = start1;
        } else {
          free0 = start0 + demand[i];
          f0 -= demand[i];
          allowed = start0;
        }
      } else {
        free1 = start1 + demand[i];
        f1 -= demand[i];
        allowed = start1;
      }
      served++;
    }
    return served;
  };
  let maxServe = 0;
  for (let w = 0; w <= 5000; w++) maxServe = Math.max(maxServe, can(w));
  if (maxServe === 0) return -1;
  let lo = 0,
    hi = 1e9,
    ans = -1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (can(mid) === maxServe && can(mid) > 0) {
      ans = mid;
      hi = mid - 1;
    } else lo = mid + 1;
  }
  return ans;
};
