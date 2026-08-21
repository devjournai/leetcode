/**
 * Minimum Time to Transport All Individuals
 * Intuition: Classic boat-crossing with at most k people, cyclic stage multipliers, and Dijkstra on (people-at-destination mask, boat-side, stage).
 * Approach: 1. State = (mask of people on the destination bank, boat at dest? 0/1, stage). 2. From camp, try every nonempty subset of remaining people of size ≤ k; time is max(time[i])*mul[stage], stage advances floor(time)%m. 3. If anyone remains at camp, a return trip of one person on the dest bank is required. 4. Dijkstra for the min time to full mask with boat on dest.
 * Dry Run: n = 1, k = 1, time = [5], mul = [1, 1.3]. One crossing 5*1=5.
 * Time Complexity: O(3^N * M * N) with Dijkstra on 2^N * 2 * M states
 * Space Complexity: O(2^N * M)
 */
var minTime = function (n, k, m, time, mul) {
  const full = (1 << n) - 1;
  const INF = Number.POSITIVE_INFINITY;
  const dist = Array.from({ length: 1 << n }, () =>
    Array.from({ length: 2 }, () => Array(m).fill(INF))
  );
  dist[0][0][0] = 0;

  const heap = [[0, 0, 0, 0]];
  const push = (item) => {
    heap.push(item);
    let i = heap.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (heap[p][0] <= heap[i][0]) {
        break;
      }
      [heap[p], heap[i]] = [heap[i], heap[p]];
      i = p;
    }
  };
  const pop = () => {
    const top = heap[0];
    const last = heap.pop();
    if (heap.length) {
      heap[0] = last;
      let i = 0;
      while (true) {
        let s = i;
        const l = i * 2 + 1;
        const r = i * 2 + 2;
        if (l < heap.length && heap[l][0] < heap[s][0]) {
          s = l;
        }
        if (r < heap.length && heap[r][0] < heap[s][0]) {
          s = r;
        }
        if (s === i) {
          break;
        }
        [heap[i], heap[s]] = [heap[s], heap[i]];
        i = s;
      }
    }
    return top;
  };

  const popcount = (x) => {
    let c = 0;
    while (x) {
      c += x & 1;
      x >>= 1;
    }
    return c;
  };

  while (heap.length) {
    const [d, mask, boat, stage] = pop();
    if (d !== dist[mask][boat][stage]) {
      continue;
    }
    if (mask === full && boat === 1) {
      return d;
    }

    if (boat === 0) {
      const remain = full ^ mask;
      for (let sub = remain; sub > 0; sub = (sub - 1) & remain) {
        if (popcount(sub) > k) {
          continue;
        }
        let slowest = 0;
        for (let i = 0; i < n; i++) {
          if (sub & (1 << i)) {
            slowest = Math.max(slowest, time[i]);
          }
        }
        const trip = slowest * mul[stage];
        const nextStage = (stage + Math.floor(trip)) % m;
        const nextMask = mask | sub;
        const nd = d + trip;
        if (nd < dist[nextMask][1][nextStage]) {
          dist[nextMask][1][nextStage] = nd;
          push([nd, nextMask, 1, nextStage]);
        }
      }
    } else {
      if (mask === full) {
        continue;
      }
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          const trip = time[i] * mul[stage];
          const nextStage = (stage + Math.floor(trip)) % m;
          const nextMask = mask ^ (1 << i);
          const nd = d + trip;
          if (nd < dist[nextMask][0][nextStage]) {
            dist[nextMask][0][nextStage] = nd;
            push([nd, nextMask, 0, nextStage]);
          }
        }
      }
    }
  }

  return -1;
};
