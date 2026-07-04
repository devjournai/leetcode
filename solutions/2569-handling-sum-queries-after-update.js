/**
 * Handling Sum Queries After Update
 *
 * Intuition:
 * We never need the individual values of `nums2`.
 *
 * Observe:
 *
 * • Query Type 1:
 *      Flip bits in nums1 over a range.
 *
 * • Query Type 2:
 *      Increase every nums2[i] by
 *
 *          nums1[i] × p
 *
 *      Therefore, the total sum increases by:
 *
 *          (number of 1's in nums1) × p
 *
 * Thus, we only need:
 *
 * 1. Current total sum of nums2.
 * 2. Current number of 1's in nums1.
 *
 * A Segment Tree with Lazy Propagation efficiently supports:
 * - Range bit flips.
 * - Query total number of 1's.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Compute:
 *
 *      totalSum =
 *          sum(nums2)
 *
 * 2. Build a Segment Tree on nums1.
 *
 *      Every node stores:
 *
 *          count of 1's
 *
 *      Every node also stores:
 *
 *          lazy flip flag.
 *
 * 3. Process every query.
 *
 *      Type 1:
 *
 *          Flip interval [l,r]
 *
 *          During flip:
 *
 *              ones =
 *                  segmentLength - ones
 *
 *              Toggle lazy flag.
 *
 *      Type 2:
 *
 *          totalSum +=
 *              p × totalOnes
 *
 *      Type 3:
 *
 *          Store totalSum.
 *
 * 4. Return all answers.
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * nums1:
 *
 * [1,0,1]
 *
 * nums2:
 *
 * [0,0,0]
 *
 * totalSum = 0
 *
 * Segment Tree:
 *
 * totalOnes = 2
 *
 * Query:
 *
 * [1,1,1]
 *
 * Flip index1
 *
 * nums1:
 *
 * [1,1,1]
 *
 * totalOnes =3
 *
 * -------------------
 *
 * Query:
 *
 * [2,1,0]
 *
 * totalSum
 *
 * +=
 *
 * 3 ×1
 *
 * =3
 *
 * -------------------
 *
 * Query:
 *
 * [3,0,0]
 *
 * Answer:
 *
 * 3
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N)
 */

var handleQuery = function (nums1, nums2, queries) {
  const n = nums1.length;

  const tree = new Array(4 * n).fill(0);
  const lazy = new Array(4 * n).fill(false);

  const build = (node, left, right) => {
    if (left === right) {
      tree[node] = nums1[left];
      return;
    }

    const mid = (left + right) >> 1;

    build(node * 2, left, mid);
    build(node * 2 + 1, mid + 1, right);

    tree[node] = tree[node * 2] + tree[node * 2 + 1];
  };

  const push = (node, left, right) => {
    if (!lazy[node]) return;

    tree[node] = right - left + 1 - tree[node];

    if (left !== right) {
      lazy[node * 2] = !lazy[node * 2];
      lazy[node * 2 + 1] = !lazy[node * 2 + 1];
    }

    lazy[node] = false;
  };

  const update = (node, left, right, ql, qr) => {
    push(node, left, right);

    if (right < ql || left > qr) {
      return;
    }

    if (ql <= left && right <= qr) {
      lazy[node] = !lazy[node];
      push(node, left, right);
      return;
    }

    const mid = (left + right) >> 1;

    update(node * 2, left, mid, ql, qr);
    update(node * 2 + 1, mid + 1, right, ql, qr);

    tree[node] = tree[node * 2] + tree[node * 2 + 1];
  };

  build(1, 0, n - 1);

  let totalSum = 0n;

  for (const num of nums2) {
    totalSum += BigInt(num);
  }

  const answer = [];

  for (const [type, x, y] of queries) {
    if (type === 1) {
      update(1, 0, n - 1, x, y);
    } else if (type === 2) {
      totalSum += BigInt(tree[1]) * BigInt(x);
    } else {
      answer.push(Number(totalSum));
    }
  }

  return answer;
};
