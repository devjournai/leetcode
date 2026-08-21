/**
 * Maximum Sum Queries
 * Intuition: Process queries offline by decreasing xi so we only insert points with nums1 >= xi. A segment tree on compressed nums2 stores the max nums1+nums2 for nums2 >= yi.
 * Approach: 1. Compress nums2 and query y values. 2. Build points (nums1, nums2, sum) and sort both points and queries by nums1/xi descending. 3. For each query, insert eligible points into the tree at their nums2 rank. 4. Query max on ranks >= yi.
 * Dry Run: nums1=[4,3,1], nums2=[2,4,6], queries=[[3,2]]. Insert (4,2,6) then (3,4,7). Query nums2>=2 yields max 7.
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
      query(node * 2 + 1, mid + 1, right, ql, qr)
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
