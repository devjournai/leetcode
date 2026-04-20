/**
 * Longest Balanced Subarray II
 * Time Complexity: O(N log N)
 * Space Complexity: O(N)
 */
var longestBalanced = function (nums) {
  const n = nums.length;
  if (n === 0) {
    return 0;
  }

  class SegmentTree {
    constructor(size) {
      this.n = size;
      this.tree = Array.from({ length: 4 * size }, () => ({
        minVal: 0,
        maxVal: 0,
        lazy: 0,
      }));
    }

    _pushDown(nodeIdx) {
      const node = this.tree[nodeIdx];
      if (node.lazy !== 0) {
        const leftChildIdx = 2 * nodeIdx + 1;
        const rightChildIdx = 2 * nodeIdx + 2;

        this.tree[leftChildIdx].minVal += node.lazy;
        this.tree[leftChildIdx].maxVal += node.lazy;
        this.tree[leftChildIdx].lazy += node.lazy;

        this.tree[rightChildIdx].minVal += node.lazy;
        this.tree[rightChildIdx].maxVal += node.lazy;
        this.tree[rightChildIdx].lazy += node.lazy;

        node.lazy = 0;
      }
    }

    _updateNode(nodeIdx) {
      const leftChildIdx = 2 * nodeIdx + 1;
      const rightChildIdx = 2 * nodeIdx + 2;
      this.tree[nodeIdx].minVal = Math.min(
        this.tree[leftChildIdx].minVal,
        this.tree[rightChildIdx].minVal,
      );
      this.tree[nodeIdx].maxVal = Math.max(
        this.tree[leftChildIdx].maxVal,
        this.tree[rightChildIdx].maxVal,
      );
    }

    rangeAdd(nodeIdx, rangeStart, rangeEnd, updateL, updateR, val) {
      if (rangeStart > updateR || rangeEnd < updateL) {
        return;
      }

      if (updateL <= rangeStart && rangeEnd <= updateR) {
        this.tree[nodeIdx].minVal += val;
        this.tree[nodeIdx].maxVal += val;
        this.tree[nodeIdx].lazy += val;
        return;
      }

      this._pushDown(nodeIdx);

      const mid = Math.floor((rangeStart + rangeEnd) / 2);
      this.rangeAdd(2 * nodeIdx + 1, rangeStart, mid, updateL, updateR, val);
      this.rangeAdd(2 * nodeIdx + 2, mid + 1, rangeEnd, updateL, updateR, val);

      this._updateNode(nodeIdx);
    }

    findSmallestIWithZero(nodeIdx, rangeStart, rangeEnd, queryL, queryR) {
      const node = this.tree[nodeIdx];
      if (
        rangeStart > queryR ||
        rangeEnd < queryL ||
        node.minVal > 0 ||
        node.maxVal < 0
      ) {
        return -1;
      }

      if (rangeStart === rangeEnd) {
        if (node.minVal === 0) {
          return rangeStart;
        }
        return -1;
      }

      this._pushDown(nodeIdx);

      const mid = Math.floor((rangeStart + rangeEnd) / 2);

      const resLeft = this.findSmallestIWithZero(
        2 * nodeIdx + 1,
        rangeStart,
        mid,
        queryL,
        queryR,
      );
      if (resLeft !== -1) {
        return resLeft;
      }

      return this.findSmallestIWithZero(
        2 * nodeIdx + 2,
        mid + 1,
        rangeEnd,
        queryL,
        queryR,
      );
    }
  }

  const st = new SegmentTree(n);
  let maxLength = 0;

  const lastEvenSeen = new Map();
  const lastOddSeen = new Map();

  for (let j = 0; j < n; j++) {
    const num = nums[j];
    if (num % 2 === 0) {
      const prevIndex = lastEvenSeen.get(num);
      if (prevIndex !== undefined) {
        st.rangeAdd(0, 0, n - 1, 0, prevIndex, -1);
      }
      st.rangeAdd(0, 0, n - 1, 0, j, 1);
      lastEvenSeen.set(num, j);
    } else {
      const prevIndex = lastOddSeen.get(num);
      if (prevIndex !== undefined) {
        st.rangeAdd(0, 0, n - 1, 0, prevIndex, 1);
      }
      st.rangeAdd(0, 0, n - 1, 0, j, -1);
      lastOddSeen.set(num, j);
    }

    const smallestI = st.findSmallestIWithZero(0, 0, n - 1, 0, j);
    if (smallestI !== -1) {
      maxLength = Math.max(maxLength, j - smallestI + 1);
    }
  }

  return maxLength;
};
