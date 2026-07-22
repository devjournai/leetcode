/**
 * Maximize Active Section with Trade II
 *
 * Intuition:
 * A trade consists of:
 *
 * 1. Converting one contiguous block of '1's (surrounded by '0's) into '0's.
 * 2. Converting one contiguous block of '0's (surrounded by '1's) into '1's.
 *
 * After analyzing the operation, the only thing that can increase the number
 * of active sections is the size of the zero block that can be merged after
 * removing an intermediate block of '1's.
 *
 * Therefore, for every query we only need to determine the maximum number of
 * zeros that can be connected into one valid block.
 *
 * -----------------------------------------------------------------------
 *
 * Approach:
 *
 * 1. Preprocess the string once.
 *
 *    • Count the total number of '1's.
 *    • Store every maximal zero block:
 *
 *          start index
 *          end index
 *          length
 *
 * 2. For every pair of adjacent zero blocks, compute:
 *
 *          adjacentLength =
 *              leftZeroBlock.length +
 *              rightZeroBlock.length
 *
 *    These values represent the gain obtained by removing the '1' block
 *    between them.
 *
 * 3. Build a Segment Tree over the adjacent-length array so range maximum
 *    queries can be answered in O(log N).
 *
 * 4. For each query:
 *
 *      • Binary search the first zero block intersecting the query.
 *      • Binary search the last zero block intersecting the query.
 *
 *      Handle three situations:
 *
 *      a) No or only one zero block.
 *         → No merge is possible.
 *
 *      b) Exactly two zero blocks.
 *         → Gain equals the visible part of both blocks.
 *
 *      c) Three or more zero blocks.
 *         → Consider:
 *             - left partial block + next full block
 *             - previous full block + right partial block
 *             - any fully contained adjacent pair
 *               (obtained from the Segment Tree)
 *
 *      The maximum of these candidates is the best gain.
 *
 * 5. Since total active sections before every query are constant,
 *
 *          answer = totalOnes + maximumGain
 *
 * -----------------------------------------------------------------------
 *
 * Dry Run:
 *
 * s = "01010"
 *
 * Zero blocks:
 *
 *      [0]
 *      [2]
 *      [4]
 *
 * Adjacent sums:
 *
 *      1 + 1 = 2
 *      1 + 1 = 2
 *
 * Segment Tree stores:
 *
 *      [2, 2]
 *
 * Query:
 *
 *      [0,3]
 *
 * Visible zero blocks:
 *
 *      [0]
 *      [2]
 *
 * Gain:
 *
 *      1 + 1 = 2
 *
 * Total ones:
 *
 *      2
 *
 * Answer:
 *
 *      2 + 2 = 4
 *
 * -----------------------------------------------------------------------
 *
 * Data Structures Used:
 *
 * • Array of zero blocks
 * • Binary Search
 * • Segment Tree (Range Maximum Query)
 *
 * -----------------------------------------------------------------------
 *
 * Time Complexity: O(N + Q log N)
 * Space Complexity: O(Z)
 */
class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Int32Array(this.n * 4);
    if (this.n > 0) {
      this.build(arr, 0, 0, this.n - 1);
    }
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
    } else {
      const mid = Math.floor((start + end) / 2);
      const leftChild = 2 * node + 1;
      const rightChild = 2 * node + 2;
      this.build(arr, leftChild, start, mid);
      this.build(arr, rightChild, mid + 1, end);
      this.tree[node] = Math.max(this.tree[leftChild], this.tree[rightChild]);
    }
  }

  query(node, start, end, l, r) {
    if (r < start || end < l) return 0;
    if (l <= start && end <= r) return this.tree[node];

    const mid = Math.floor((start + end) / 2);
    const p1 = this.query(2 * node + 1, start, mid, l, r);
    const p2 = this.query(2 * node + 2, mid + 1, end, l, r);
    return Math.max(p1, p2);
  }

  getMax(l, r) {
    if (l > r || this.n === 0) return 0;
    return this.query(0, 0, this.n - 1, l, r);
  }
}

var maxActiveSectionsAfterTrade = function (s, queries) {
  const n = s.length;
  let totalOnes = 0;
  const zeroBlocks = [];

  let i = 0;
  while (i < n) {
    if (s[i] === "1") {
      totalOnes++;
      i++;
    } else {
      let start = i;
      while (i < n && s[i] === "0") {
        i++;
      }
      zeroBlocks.push({ start: start, end: i - 1, len: i - start });
    }
  }

  const m = zeroBlocks.length;
  const adjacentSums = new Int32Array(Math.max(0, m - 1));
  for (let j = 0; j < m - 1; j++) {
    adjacentSums[j] = zeroBlocks[j].len + zeroBlocks[j + 1].len;
  }

  const segTree = new SegmentTree(adjacentSums);

  const findA = (target) => {
    let left = 0,
      right = m - 1,
      ans = m;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (zeroBlocks[mid].end >= target) {
        ans = mid;
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return ans;
  };

  const findB = (target) => {
    let left = 0,
      right = m - 1,
      ans = -1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (zeroBlocks[mid].start <= target) {
        ans = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return ans;
  };

  const answer = [];

  for (const [l, r] of queries) {
    let maxGain = 0;

    let a = findA(l);
    let b = findB(r);

    if (a <= b) {
      if (a === b) {
        maxGain = 0;
      } else if (a + 1 === b) {
        let leftLen = zeroBlocks[a].end - Math.max(l, zeroBlocks[a].start) + 1;
        let rightLen = Math.min(r, zeroBlocks[b].end) - zeroBlocks[b].start + 1;
        maxGain = leftLen + rightLen;
      } else {
        let leftLen = zeroBlocks[a].end - Math.max(l, zeroBlocks[a].start) + 1;
        let rightLen = Math.min(r, zeroBlocks[b].end) - zeroBlocks[b].start + 1;

        maxGain = Math.max(maxGain, leftLen + zeroBlocks[a + 1].len);
        maxGain = Math.max(maxGain, zeroBlocks[b - 1].len + rightLen);

        if (b - 2 >= a + 1) {
          maxGain = Math.max(maxGain, segTree.getMax(a + 1, b - 2));
        }
      }
    }

    answer.push(totalOnes + maxGain);
  }

  return answer;
};

var maximizeActiveSection = maxActiveSectionsAfterTrade;
