/**
 * Maximum Points Activated with One Addition
 * Intuition: We can use a Union-Find data structure to solve this problem. First, we map the $x$ coordinates and $y$ coordinates of all points into the same Union-Find structure. Specifically, we add a sufficiently large constant $m$ (e.g., $3 \times 10^9$) to each $y$ coordinate to ensure that the $x$ and $y$ coordinates do not conflict. Next, we iterate over all points and union those that share the same $x$ coordinate or the same $y$ coordinate. This way, points with the same $x$ or $y$ coordinate will be grouped into the same set. Finally, we count the number of points in each set and find the sizes of the two largest sets. Since we can add one new point to connect these two sets, the final answer is the sum of the sizes of the two largest sets plus $1$. The time complexity is $O(n \alpha(n))$, where $n$ is the number of points and $\alpha$ is the inverse Ackermann function. The space complexity ...
 * Approach: We can use a Union-Find data structure to solve this problem. First, we map the $x$ coordinates and $y$ coordinates of all points into the same Union-Find structure. Specifically, we add a sufficiently large constant $m$ (e.g., $3 \times 10^9$) to each $y$ coordinate to ensure that the $x$ and $y$ coordinates do not conflict. Next, we iterate over all points and union those that share the same $x$ coordinate or the same $y$ coordinate. This way, points with the same $x$ or $y$ coordinate will be grouped into the same set. Finally, we count the number of points in each set and find the sizes of the two largest sets. Since we can add one new point to connect these two sets, the final answer is the sum of the sizes of the two largest sets plus $1$. The time complexity is $O(n \alpha(n))$, where $n$ is the number of points and $\alpha$ is the inverse Ackermann function. The space complexity ...
 * Dry Run: Input: points = [[1,1],[1,2],[2,2]] => Output: 4
 * Time Complexity: O(O(n alpha(n)))
 * Space Complexity: O(O(n))
 */
var UnionFind = function () {
  this.p = new Map();
  this.size = new Map();
};

UnionFind.prototype.find = function (x) {
  if (!this.p.has(x)) {
    this.p.set(x, x);
    this.size.set(x, 1);
  }
  if (this.p.get(x) !== x) {
    this.p.set(x, this.find(this.p.get(x)));
  }
  return this.p.get(x);
};

UnionFind.prototype.union = function (a, b) {
  const pa = this.find(a);
  const pb = this.find(b);
  if (pa === pb) return false;

  const sa = this.size.get(pa);
  const sb = this.size.get(pb);

  if (sa > sb) {
    this.p.set(pb, pa);
    this.size.set(pa, sa + sb);
  } else {
    this.p.set(pa, pb);
    this.size.set(pb, sa + sb);
  }
  return true;
};

var maxActivated = function (points) {
  const uf = new UnionFind();
  const m = 3e9;

  for (const [x, y] of points) {
    uf.union(x, y + m);
  }

  const cnt = new Map();
  for (const [x] of points) {
    const root = uf.find(x);
    cnt.set(root, (cnt.get(root) ?? 0) + 1);
  }

  let mx1 = 0,
    mx2 = 0;
  for (const x of cnt.values()) {
    if (mx1 < x) {
      mx2 = mx1;
      mx1 = x;
    } else if (mx2 < x) {
      mx2 = x;
    }
  }

  return mx1 + mx2 + 1;
};
