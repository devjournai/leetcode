/**
 * Minimum Operations to Equalize Subarrays
 * Intuition: Values can meet iff they share the same residue modulo k. The cheapest common value is a median of the quotients nums[i]/k, and the cost is the L1 distance to that median.
 * Approach: 1. Prefix-mark residue breaks so a query is impossible when any adjacent pair in [l,r] disagrees modulo k. 2. Build a persistent segment tree on quotients. 3. For each valid query, walk to the median and return sum |q_i - median|.
 * Dry Run: nums = [1,4,7], k = 3, query [0,2]. All residues 1. Quotients [0,1,2], median 1, L1 cost 2.
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N log N)
 */
function PersistentSegmentTree(vals) {
  const LEFT = 0;
  const RIGHT = 1;
  const CNT = 2;
  const TOTAL = 3;
  const unique = [...new Set(vals)].sort((a, b) => a - b);
  const valToIdx = new Map(unique.map((x, i) => [x, i]));
  const n = unique.length;
  const newNode = () => [null, null, 0, 0];
  const roots = [];
  let root = newNode();
  roots.push(root);
  for (const x of vals) {
    root = root.slice();
    roots.push(root);
    let curr = root;
    let left = 0;
    let right = n - 1;
    const i = valToIdx.get(x);
    while (left < right) {
      curr[CNT]++;
      curr[TOTAL] += x;
      const mid = left + Math.floor((right - left) / 2);
      if (i <= mid) {
        curr[LEFT] = curr[LEFT] ? curr[LEFT].slice() : newNode();
        curr = curr[LEFT];
        right = mid;
      } else {
        curr[RIGHT] = curr[RIGHT] ? curr[RIGHT].slice() : newNode();
        curr = curr[RIGHT];
        left = mid + 1;
      }
    }
    curr[CNT]++;
    curr[TOTAL] += x;
  }

  this.query = function (l, r) {
    let a = roots[l];
    let b = roots[r + 1];
    let leftCnt = 0;
    let leftTotal = 0;
    let medCnt = Math.floor((r - l + 1) / 2) + 1;
    let left = 0;
    let right = n - 1;
    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      const cnt =
        (b && b[LEFT] ? b[LEFT][CNT] : 0) - (a && a[LEFT] ? a[LEFT][CNT] : 0);
      if (medCnt <= cnt) {
        a = a ? a[LEFT] : null;
        b = b ? b[LEFT] : null;
        right = mid;
      } else {
        medCnt -= cnt;
        leftCnt += cnt;
        leftTotal +=
          (b && b[LEFT] ? b[LEFT][TOTAL] : 0) -
          (a && a[LEFT] ? a[LEFT][TOTAL] : 0);
        a = a ? a[RIGHT] : null;
        b = b ? b[RIGHT] : null;
        left = mid + 1;
      }
    }
    const median = unique[left];
    const rightCnt = r - l + 1 - leftCnt;
    const rightTotal = roots[r + 1][TOTAL] - roots[l][TOTAL] - leftTotal;
    return median * leftCnt - leftTotal + (rightTotal - median * rightCnt);
  };
}

var minOperations = function (nums, k, queries) {
  const prefix = Array(nums.length + 1).fill(0);
  for (let i = 0; i < nums.length; i++) {
    prefix[i + 1] =
      prefix[i] + (i - 1 >= 0 && nums[i] % k !== nums[i - 1] % k ? 1 : 0);
  }
  const pst = new PersistentSegmentTree(nums.map((x) => Math.floor(x / k)));
  return queries.map(([s, t]) =>
    prefix[t + 1] - prefix[s + 1] === 0 ? pst.query(s, t) : -1
  );
};
