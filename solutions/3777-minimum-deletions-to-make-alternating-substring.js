/**
 * Minimum Deletions to Make Alternating Substring
 * Intuition: We can convert the string s into an array \textit{nums} of length n, where \textit{nums}[0] = 0, and for 1 \leq i < n, if s[i] = s[i-1], then \textit{nums}[i] = 1, otherwise \textit{nums}[i] = 0. This way \textit{nums}[i] represents whether there are adjacent and equal characters at index i. Then calculating the minimum number of character deletions required to make the substring s[l..r] an alternating string in the interval [l, r] is equivalent to calculating the sum of elements in the \textit{nums} array over the interval [l+1, r].
 * Approach: To handle queries efficiently, we can use a Binary Indexed Tree to maintain the prefix sum of the \textit{nums} array. For queries of type [1, j], we need to flip \textit{nums}[j] and \textit{nums}[j+1] (if j+1 < n), and update the Binary Indexed Tree. For queries of type [2, l, r], we can quickly calculate the sum of elements over the interval [l+1, r] through the Binary Indexed Tree. The time complexity is O((n + q) \log n), and the space complexity is O(n), where n is the length of the string s, and q is the number of queries.
 * Dry Run: Input s = "ABA", queries = [[2,1,2],[1,1],[2,0,2]]. Output [0,2].
 * Time Complexity: O((n + q) log n)
 * Space Complexity: O(n)
 */
class BinaryIndexedTree {
  constructor(n) {
    this.n = n;
    this.c = Array(n + 1).fill(0);
  }

  update(x, delta) {
    while (x <= this.n) {
      this.c[x] += delta;
      x += x & -x;
    }
  }

  query(x) {
    let s = 0;
    while (x > 0) {
      s += this.c[x];
      x -= x & -x;
    }
    return s;
  }
}

var minDeletions = function (s, queries) {
  const n = s.length;
  const nums = Array(n).fill(0);
  const bit = new BinaryIndexedTree(n);

  for (let i = 1; i < n; i++) {
    if (s[i] === s[i - 1]) {
      nums[i] = 1;
      bit.update(i + 1, 1);
    }
  }

  const ans = [];

  for (const q of queries) {
    if (q[0] === 1) {
      const j = q[1];

      let delta = (nums[j] ^ 1) - nums[j];
      nums[j] ^= 1;
      bit.update(j + 1, delta);

      if (j + 1 < n) {
        delta = (nums[j + 1] ^ 1) - nums[j + 1];
        nums[j + 1] ^= 1;
        bit.update(j + 2, delta);
      }
    } else {
      const l = q[1],
        r = q[2];
      ans.push(bit.query(r + 1) - bit.query(l + 1));
    }
  }

  return ans;
};
