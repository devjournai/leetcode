/**
 * Alternating Groups III
 * Intuition: Alternating runs are disjoint intervals. A run of length L contributes max(L - size + 1, 0) groups of a given size. Maintain run lengths in a segment tree and update O(1) local runs when a color flips. Duplicate the circular array to [0..2n-2] so wrap-around is an ordinary interval, then subtract double-counted groups that cross index n.
 * Approach: 1. Build doubled colors and split into maximal alternating intervals; store lengths in a segment tree (count and total length for each length). 2. Type-1 query: sum (length - size + 1) over intervals with length >= size, then adjust the unique interval that contains n. 3. Type-2 query: recolor index (and index+n if needed), split/merge neighboring intervals.
 * Dry Run: colors = [0, 1, 1, 0, 1], queries = [[2, 1, 0], [1, 4]]. After flipping index 1 to 0, two alternating groups of size 4 exist. Answer [2].
 * Time Complexity: O(n + q log n)
 * Space Complexity: O(n)
 */
var numberOfAlternatingGroups = function (colors, queries) {
  class SegmentTree {
    constructor(size) {
      this.size = size;
      this.intervalCounts = Array(4 * size).fill(0);
      this.intervalLengths = Array(4 * size).fill(0);
    }

    add(length, delta) {
      this.addAt(0, 0, this.size - 1, length, delta);
    }

    queryIntervalCounts(minimumLength) {
      return this.query(
        this.intervalCounts,
        0,
        0,
        this.size - 1,
        minimumLength,
        this.size - 1
      );
    }

    queryIntervalLengths(minimumLength) {
      return this.query(
        this.intervalLengths,
        0,
        0,
        this.size - 1,
        minimumLength,
        this.size - 1
      );
    }

    addAt(treeIndex, rangeStart, rangeEnd, length, delta) {
      if (rangeStart === rangeEnd) {
        this.intervalCounts[treeIndex] += delta;
        this.intervalLengths[treeIndex] =
          this.intervalCounts[treeIndex] * length;
        return;
      }
      const mid = Math.floor((rangeStart + rangeEnd) / 2);
      if (length <= mid) {
        this.addAt(2 * treeIndex + 1, rangeStart, mid, length, delta);
      } else {
        this.addAt(2 * treeIndex + 2, mid + 1, rangeEnd, length, delta);
      }
      this.intervalCounts[treeIndex] =
        this.intervalCounts[2 * treeIndex + 1] +
        this.intervalCounts[2 * treeIndex + 2];
      this.intervalLengths[treeIndex] =
        this.intervalLengths[2 * treeIndex + 1] +
        this.intervalLengths[2 * treeIndex + 2];
    }

    query(tree, treeIndex, rangeStart, rangeEnd, queryStart, queryEnd) {
      if (queryStart <= rangeStart && rangeEnd <= queryEnd) {
        return tree[treeIndex];
      }
      if (queryEnd < rangeStart || rangeEnd < queryStart) {
        return 0;
      }
      const mid = Math.floor((rangeStart + rangeEnd) / 2);
      return (
        this.query(
          tree,
          2 * treeIndex + 1,
          rangeStart,
          mid,
          queryStart,
          queryEnd
        ) +
        this.query(
          tree,
          2 * treeIndex + 2,
          mid + 1,
          rangeEnd,
          queryStart,
          queryEnd
        )
      );
    }
  }

  class IntervalTreap {
    constructor() {
      this.root = null;
    }

    insert(start, end) {
      const [left, right] = this.split(this.root, start);
      const [, rest] = this.split(right, start + 1);
      this.root = this.merge(
        this.merge(left, this.createNode(start, end)),
        rest
      );
    }

    erase(start) {
      const [left, right] = this.split(this.root, start);
      const [, rest] = this.split(right, start + 1);
      this.root = this.merge(left, rest);
    }

    findContaining(target) {
      let node = this.root;
      let best = null;
      while (node) {
        if (node.start <= target) {
          best = node;
          node = node.right;
        } else {
          node = node.left;
        }
      }
      return best ? [best.start, best.end] : null;
    }

    successor(start) {
      let node = this.root;
      let best = null;
      while (node) {
        if (node.start > start) {
          best = node;
          node = node.left;
        } else {
          node = node.right;
        }
      }
      return best;
    }

    predecessor(start) {
      let node = this.root;
      let best = null;
      while (node) {
        if (node.start < start) {
          best = node;
          node = node.right;
        } else {
          node = node.left;
        }
      }
      return best;
    }

    createNode(start, end) {
      return {
        start,
        end,
        priority: Math.random(),
        left: null,
        right: null,
      };
    }

    split(node, start) {
      if (!node) {
        return [null, null];
      }
      if (node.start < start) {
        const [left, right] = this.split(node.right, start);
        node.right = left;
        return [node, right];
      }
      const [left, right] = this.split(node.left, start);
      node.left = right;
      return [left, node];
    }

    merge(left, right) {
      if (!left || !right) {
        return left || right;
      }
      if (left.priority > right.priority) {
        left.right = this.merge(left.right, right);
        return left;
      }
      right.left = this.merge(left, right.left);
      return right;
    }
  }

  const colorCount = colors.length;
  const doubledColors = colors.concat(colors);
  const answers = [];
  const segmentTree = new SegmentTree(2 * colorCount);
  const intervals = new IntervalTreap();

  const insertInterval = (start, end) => {
    intervals.insert(start, end);
    if (start < colorCount) {
      segmentTree.add(end - start + 1, 1);
    }
  };

  const removeInterval = (start, end) => {
    intervals.erase(start);
    if (start < colorCount) {
      segmentTree.add(end - start + 1, -1);
    }
  };

  const getNumAlternatingGroups = (groupSize, intervalWithN) => {
    const intervalCount = segmentTree.queryIntervalCounts(groupSize);
    const intervalLengthSum = segmentTree.queryIntervalLengths(groupSize);
    let groupCount =
      intervalLengthSum - intervalCount * groupSize + intervalCount;
    const [left, right] = intervalWithN;
    if (left >= colorCount || right - left + 1 < groupSize) {
      return groupCount;
    }
    if (right >= colorCount) {
      const nonDuplicateGroups = colorCount - left;
      const groupsInInterval = right - left + 1 - groupSize + 1;
      return groupCount - Math.max(0, groupsInInterval - nonDuplicateGroups);
    }
    return groupCount;
  };

  const updateColor = (index, color) => {
    doubledColors[index] = color;
    const [intervalStart, intervalEnd] = intervals.findContaining(index);
    removeInterval(intervalStart, intervalEnd);
    let start = intervalStart;
    let end = intervalEnd;

    if (start < index && index < end) {
      insertInterval(start, index - 1);
      insertInterval(index, index);
      insertInterval(index + 1, end);
      return;
    }

    if (start === index && index < end) {
      insertInterval(start + 1, end);
    }
    if (start < index && index === end) {
      insertInterval(start, end - 1);
    }

    start = index;
    end = index;
    const intervalsToRemove = [];

    let leftNode = intervals.findContaining(index);
    while (leftNode) {
      const [leftStart, leftEnd] = leftNode;
      if (doubledColors[leftEnd] === doubledColors[start]) {
        break;
      }
      intervalsToRemove.push([leftStart, leftEnd]);
      start = leftStart;
      const predecessor = intervals.predecessor(leftStart);
      leftNode = predecessor ? [predecessor.start, predecessor.end] : null;
    }

    let rightNode = intervals.successor(index);
    while (rightNode) {
      if (doubledColors[rightNode.start] === doubledColors[end]) {
        break;
      }
      intervalsToRemove.push([rightNode.start, rightNode.end]);
      end = rightNode.end;
      rightNode = intervals.successor(rightNode.start);
    }

    for (const [removeStart, removeEnd] of intervalsToRemove) {
      removeInterval(removeStart, removeEnd);
    }
    insertInterval(start, end);
  };

  let runStart = 0;
  for (let index = 1; index < 2 * colorCount - 1; index++) {
    if (doubledColors[index] === doubledColors[index - 1]) {
      insertInterval(runStart, index - 1);
      runStart = index;
    }
  }
  insertInterval(runStart, 2 * colorCount - 2);

  for (const query of queries) {
    if (query[0] === 1) {
      const groupSize = query[1];
      const intervalWithN = intervals.findContaining(colorCount);
      answers.push(getNumAlternatingGroups(groupSize, intervalWithN));
    } else {
      const index = query[1];
      const color = query[2];
      if (doubledColors[index] === color) {
        continue;
      }
      updateColor(index, color);
      if (index < colorCount - 1) {
        updateColor(index + colorCount, color);
      }
    }
  }

  return answers;
};
