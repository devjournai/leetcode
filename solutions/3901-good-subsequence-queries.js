/**
 * Good Subsequence Queries
 * Intuition: We only care about numbers that are multiples of p, because if a number is not divisible by p, it can never belong to a subsequence whose GCD is exactly p.
 * Approach: We only care about numbers that are multiples of p, because if a number is not divisible by p, it can never belong to a subsequence whose GCD is exactly p. Therefore, we can treat positions whose values are not divisible by p as 0, and only maintain the following value for each position in the segment tree: - If nums[i] is divisible by p, store its actual value in the segment tree. - Otherwise, store 0.
 * Dry Run: Input: nums = [4,8,12,16], p = 2, queries = [[0,3],[2,6]]. Output: 1.
 * Time Complexity: O((n+q) * logn)
 * Space Complexity: O(n)
 */
var gcd = function (a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
};
class SegNode {
  constructor(l, r) {
    this.l = l;
    this.r = r;
    this.g = 0;
  }
}

class SegmentTree {
  constructor(n) {
    this.tr = Array(n << 2);
    this.build(1, 1, n);
  }

  build(u, l, r) {
    this.tr[u] = new SegNode(l, r);
    if (l === r) {
      return;
    }
    const mid = (l + r) >> 1;
    this.build(u << 1, l, mid);
    this.build((u << 1) | 1, mid + 1, r);
  }

  pushup(u) {
    this.tr[u].g = gcd(this.tr[u << 1].g, this.tr[(u << 1) | 1].g);
  }

  modify(u, x, v) {
    if (this.tr[u].l === this.tr[u].r) {
      this.tr[u].g = v;
      return;
    }
    const mid = (this.tr[u].l + this.tr[u].r) >> 1;
    if (x <= mid) {
      this.modify(u << 1, x, v);
    } else {
      this.modify((u << 1) | 1, x, v);
    }
    this.pushup(u);
  }

  query(u, l, r) {
    if (l > r) {
      return 0;
    }
    if (this.tr[u].l >= l && this.tr[u].r <= r) {
      return this.tr[u].g;
    }
    const mid = (this.tr[u].l + this.tr[u].r) >> 1;
    if (r <= mid) {
      return this.query(u << 1, l, r);
    }
    if (l > mid) {
      return this.query((u << 1) | 1, l, r);
    }
    return gcd(
      this.query(u << 1, l, mid),
      this.query((u << 1) | 1, mid + 1, r)
    );
  }
}

var countGoodSubseq = function (nums, p, queries) {
  const n = nums.length;
  const tree = new SegmentTree(n);
  let cnt = 0;
  for (let i = 0; i < n; ++i) {
    if (nums[i] % p === 0) {
      tree.modify(1, i + 1, nums[i]);
      ++cnt;
    }
  }

  let ans = 0;
  for (const [idx, val] of queries) {
    if (nums[idx] % p === 0) {
      tree.modify(1, idx + 1, 0);
      --cnt;
    }
    if (val % p === 0) {
      tree.modify(1, idx + 1, val);
      ++cnt;
    }
    nums[idx] = val;

    if (tree.tr[1].g !== p) {
      continue;
    }
    if (cnt < n || n > 6) {
      ++ans;
      continue;
    }
    for (let i = 1; i <= n; ++i) {
      const leftG = tree.query(1, 1, i - 1);
      const rightG = tree.query(1, i + 1, n);
      if (gcd(leftG, rightG) === p) {
        ++ans;
        break;
      }
    }
  }
  return ans;
};
