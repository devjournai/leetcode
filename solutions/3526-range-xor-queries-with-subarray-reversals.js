/**
 * Range XOR Queries with Subarray Reversals
 * Intuition: An implicit treap stores the array, subtree XOR, and a reverse lazy flag so split/merge support point updates, range XOR, and range reverse.
 * Approach: 1. Build a treap by merging successive values. 2. Type 1: split out index, set val. 3. Type 2: split [L,R], read subXor. 4. Type 3: split [L,R] and toggle rev.
 * Dry Run: nums = [1, 2, 3], XOR [0,2] = 0, reverse [0,1] then XOR [0,1] = 2^1=3.
 * Time Complexity: O((N + Q) log N)
 * Space Complexity: O(N)
 */
var getResults = function (nums, queries) {
  class Node {
    constructor(v) {
      this.val = v;
      this.subXor = v;
      this.sz = 1;
      this.rev = false;
      this.prior = Math.random();
      this.l = null;
      this.r = null;
    }
  }

  const getSize = (t) => (t ? t.sz : 0);
  const getXor = (t) => (t ? t.subXor : 0);

  const push = (t) => {
    if (!t || !t.rev) return;
    const tmp = t.l;
    t.l = t.r;
    t.r = tmp;
    if (t.l) t.l.rev = !t.l.rev;
    if (t.r) t.r.rev = !t.r.rev;
    t.rev = false;
  };

  const update = (t) => {
    if (!t) return;
    t.sz = 1 + getSize(t.l) + getSize(t.r);
    t.subXor = t.val ^ getXor(t.l) ^ getXor(t.r);
  };

  const split = (t, k) => {
    if (!t) return [null, null];
    push(t);
    if (getSize(t.l) >= k) {
      const [ll, lr] = split(t.l, k);
      t.l = lr;
      update(t);
      return [ll, t];
    }
    const [rl, rr] = split(t.r, k - getSize(t.l) - 1);
    t.r = rl;
    update(t);
    return [t, rr];
  };

  const merge = (l, r) => {
    push(l);
    push(r);
    if (!l || !r) return l || r;
    if (l.prior > r.prior) {
      l.r = merge(l.r, r);
      update(l);
      return l;
    }
    r.l = merge(l, r.l);
    update(r);
    return r;
  };

  let root = null;
  for (const num of nums) root = merge(root, new Node(num));

  const answer = [];
  for (const query of queries) {
    const type = query[0];
    if (type === 1) {
      const index = query[1];
      const val = query[2];
      const [l, rest] = split(root, index);
      const [m, r] = split(rest, 1);
      if (m) m.val = val;
      update(m);
      root = merge(merge(l, m), r);
    } else if (type === 2) {
      const left = query[1];
      const right = query[2];
      const [l, rest] = split(root, left);
      const [m, r] = split(rest, right - left + 1);
      answer.push(getXor(m));
      root = merge(merge(l, m), r);
    } else if (type === 3) {
      const left = query[1];
      const right = query[2];
      const [l, rest] = split(root, left);
      const [m, r] = split(rest, right - left + 1);
      if (m) m.rev = !m.rev;
      root = merge(merge(l, m), r);
    }
  }
  return answer;
};
