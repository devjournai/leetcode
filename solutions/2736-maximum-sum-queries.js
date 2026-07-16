/**
 * Maximum Sum Queries
 *
 * Intuition:
 * Process queries offline.
 *
 * Sort points by nums1 in descending order.
 * Sort queries by xi in descending order.
 *
 * While processing a query, insert every point whose nums1 >= xi.
 *
 * Among the inserted points, we need:
 *
 *      nums2 >= yi
 *
 * and maximize
 *
 *      nums1 + nums2
 *
 * Compress all nums2 values and use a Segment Tree that stores the maximum
 * value (nums1 + nums2) for every nums2 coordinate.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Build points:
 *
 *      (nums1, nums2, sum)
 *
 * 2. Coordinate-compress all nums2 values and query yi values.
 *
 * 3. Sort
 *
 *      points descending by nums1.
 *
 *      queries descending by xi.
 *
 * 4. Maintain a segment tree.
 *
 * 5. While
 *
 *      point.nums1 >= xi
 *
 *      update its compressed nums2 position with
 *
 *      nums1 + nums2.
 *
 * 6. Query the maximum value over
 *
 *      nums2 >= yi
 *
 * using the segment tree.
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O((N + Q) log(N + Q))
 * Space Complexity: O(N + Q)
 */

var maximumSumQueries = function (nums1, nums2, queries) {
  const n = nums1.length;

  const values = [];

  for (let x of nums2) values.push(x);
  for (let [_, y] of queries) values.push(y);

  values.sort((a, b) => a - b);

  const compressed = [];

  for (let x of values) {
    if (compressed.length === 0 || compressed[compressed.length - 1] !== x) {
      compressed.push(x);
    }
  }

  const getIndex = (x) => {
    let l = 0;
    let r = compressed.length - 1;

    while (l <= r) {
      const mid = (l + r) >> 1;

      if (compressed[mid] >= x) {
        r = mid - 1;
      } else {
        l = mid + 1;
      }
    }

    return l;
  };

  const size = compressed.length;

  const tree = new Array(size * 4).fill(-1);

  const update = (node, left, right, index, value) => {
    if (left === right) {
      tree[node] = Math.max(tree[node], value);
      return;
    }

    const mid = (left + right) >> 1;

    if (index <= mid) {
      update(node * 2, left, mid, index, value);
    } else {
      update(node * 2 + 1, mid + 1, right, index, value);
    }

    tree[node] = Math.max(tree[node * 2], tree[node * 2 + 1]);
  };

  const query = (node, left, right, ql, qr) => {
    if (ql > right || qr < left) {
      return -1;
    }

    if (ql <= left && right <= qr) {
      return tree[node];
    }

    const mid = (left + right) >> 1;

    return Math.max(
      query(node * 2, left, mid, ql, qr),
      query(node * 2 + 1, mid + 1, right, ql, qr),
    );
  };

  const points = [];

  for (let i = 0; i < n; i++) {
    points.push([nums1[i], nums2[i], nums1[i] + nums2[i]]);
  }

  points.sort((a, b) => b[0] - a[0]);

  const qs = [];

  for (let i = 0; i < queries.length; i++) {
    qs.push([queries[i][0], queries[i][1], i]);
  }

  qs.sort((a, b) => b[0] - a[0]);

  const answer = new Array(queries.length);

  let ptr = 0;

  for (const [x, y, idx] of qs) {
    while (ptr < n && points[ptr][0] >= x) {
      const pos = getIndex(points[ptr][1]);

      update(1, 0, size - 1, pos, points[ptr][2]);

      ptr++;
    }

    const pos = getIndex(y);

    if (pos >= size) {
      answer[idx] = -1;
    } else {
      answer[idx] = query(1, 0, size - 1, pos, size - 1);
    }
  }

  return answer;
};
