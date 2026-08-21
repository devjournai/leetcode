/**
 * Elevator Requests II
 * Intuition: All requests at t=0, distinct floors, move 1 floor/sec. Penalty is sum of fulfillment times. Optimal: serve all requests on one side then the other, or similar two-direction sweep.
 * Approach: Sort requests. Try going down-first vs up-first, collecting floors in order, times are distances along the path. Also try serving nearest first is not always optimal; for a line the optimum is a path that covers the set starting at start, i.e. two ends. Path: to min, then to max, or to max then min.
 * Dry Run: Input: n=6, start=4, requests=[1,5]. Output: 6.
 * Time Complexity: O(M log M)
 * Space Complexity: O(M)
 */
var elevatorRequests = function (n, start, requests) {
  const noravexuli = requests.slice();
  const floors = noravexuli.slice().sort((a, b) => a - b);
  if (!floors.length) return 0;
  const mn = floors[0],
    mx = floors[floors.length - 1];
  const penaltyAlong = (order) => {
    let pos = start,
      t = 0,
      pen = 0;
    const left = new Set(noravexuli);
    if (left.has(start)) {
      left.delete(start);
    }
    for (const f of order) {
      if (!left.has(f)) continue;
      t += Math.abs(pos - f);
      pos = f;
      pen += t;
      left.delete(f);
    }
    return pen;
  };
  const down = [];
  for (let f = start; f >= 0; f--) down.push(f);
  for (let f = start + 1; f < n; f++) down.push(f);
  const up = [];
  for (let f = start; f < n; f++) up.push(f);
  for (let f = start - 1; f >= 0; f--) up.push(f);
  const a = [
    ...floors.filter((x) => x <= start).sort((x, y) => y - x),
    ...floors.filter((x) => x > start),
  ];
  const b = [
    ...floors.filter((x) => x >= start),
    ...floors.filter((x) => x < start).sort((x, y) => y - x),
  ];
  const c = [mn, mx];
  const d = [mx, mn];
  return Math.min(
    penaltyAlong(down),
    penaltyAlong(up),
    penaltyAlong(a),
    penaltyAlong(b),
    penaltyAlong(c),
    penaltyAlong(d)
  );
};
