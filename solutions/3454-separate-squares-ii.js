/**
 * Separate Squares II
 * Intuition: Sweep along y with a segment tree on x-coverage to get exact union area vs y, then walk the recorded slabs until half the union area is reached.
 * Approach: Compress x-coordinates, emit enter/leave events at y and y+l. Sweep events, updating a coverage segment tree and recording (y, height, width) slabs. After computing total union area, scan slabs until remaining area hits target/2 and interpolate y = seg.y + needed/width.
 * Dry Run: One square [0,0,2] produces one slab of height 2 and width 2; half area 2 sits at y=1.
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var separateSquares = function (squares) {
  const xSet = new Set();
  const events = [];

  for (const [x, y, l] of squares) {
    xSet.add(x);
    xSet.add(x + l);
    events.push({ y: y, type: 1, x1: x, x2: x + l });
    events.push({ y: y + l, type: -1, x1: x, x2: x + l });
  }

  const xSorted = Array.from(xSet).sort((a, b) => a - b);
  const xMap = new Map();
  xSorted.forEach((val, index) => xMap.set(val, index));
  events.sort((a, b) => a.y - b.y);

  const m = xSorted.length;
  const count = new Int32Array(4 * m);
  const len = new Float64Array(4 * m);
  function update(node, start, end, l, r, val) {
    if (l > end || r < start) return;

    if (l <= start && end <= r) {
      count[node] += val;
    } else {
      const mid = (start + end) >> 1;
      update(node * 2, start, mid, l, r, val);
      update(node * 2 + 1, mid + 1, end, l, r, val);
    }

    if (count[node] > 0) {
      len[node] = xSorted[end + 1] - xSorted[start];
    } else {
      if (start !== end) {
        len[node] = len[node * 2] + len[node * 2 + 1];
      } else {
        len[node] = 0;
      }
    }
  }

  let totalArea = 0;
  let prevY = events[0].y;
  const history = [];

  for (const e of events) {
    const currY = e.y;
    const width = len[1] || 0;

    if (currY > prevY) {
      const dy = currY - prevY;
      const segmentArea = dy * width;
      totalArea += segmentArea;
      history.push({ y: prevY, h: dy, w: width });
    }

    const lIdx = xMap.get(e.x1);
    const rIdx = xMap.get(e.x2) - 1;

    if (lIdx <= rIdx) {
      update(1, 0, m - 2, lIdx, rIdx, e.type);
    }

    prevY = currY;
  }

  const target = totalArea / 2;
  let currentArea = 0;

  for (const seg of history) {
    const segArea = seg.h * seg.w;

    if (currentArea + segArea >= target) {
      if (seg.w === 0) continue;

      const needed = target - currentArea;
      return seg.y + needed / seg.w;
    }
    currentArea += segArea;
  }

  return prevY;
};
